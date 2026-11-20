/**
 * Script đo lường định lượng hiện tượng Giật / Lag / Đứng hình / Rớt Frame
 * Dùng trực tiếp trong công cụ `evaluate_script` của chrome-devtools MCP
 * hoặc dán vào DevTools Console trên trang Anti-Logo (/channel/1..3 hoặc /channels).
 */
async (durationMs = 8000, intervalMs = 500) => {
  const videos = Array.from(document.querySelectorAll('video'));
  if (videos.length === 0) {
    return {
      status: 'NO_VIDEO_ELEMENT',
      message: 'Không tìm thấy thẻ <video> nào trên trang (kênh hiện đang ở trạng thái IDLE).'
    };
  }

  const getBufferedAhead = (v) => {
    try {
      if (!v.buffered || v.buffered.length === 0) return 0;
      for (let i = 0; i < v.buffered.length; i++) {
        if (v.buffered.start(i) <= v.currentTime + 0.5 && v.buffered.end(i) >= v.currentTime) {
          return Math.max(0, v.buffered.end(i) - v.currentTime);
        }
      }
      return Math.max(0, v.buffered.end(v.buffered.length - 1) - v.currentTime);
    } catch {
      return 0;
    }
  };

  const trackers = videos.map((v, idx) => {
    const q0 = typeof v.getVideoPlaybackQuality === 'function' ? v.getVideoPlaybackQuality() : {};
    const tracker = {
      index: idx,
      id: v.id || `video_${idx}`,
      resolution: `${v.videoWidth}x${v.videoHeight}`,
      t0Wall: performance.now(),
      t0Video: v.currentTime,
      frames0: q0.totalVideoFrames ?? v.webkitDecodedFrameCount ?? 0,
      dropped0: q0.droppedVideoFrames ?? v.webkitDroppedFrameCount ?? 0,
      waitingEvents: 0,
      stalledEvents: 0,
      readyStateDrops: 0,
      freezeTicks: 0,
      lastSampleTime: v.currentTime,
      bufferSamples: [getBufferedAhead(v)]
    };

    const onWaiting = () => { tracker.waitingEvents++; };
    const onStalled = () => { tracker.stalledEvents++; };
    v.addEventListener('waiting', onWaiting);
    v.addEventListener('stalled', onStalled);
    tracker._cleanup = () => {
      v.removeEventListener('waiting', onWaiting);
      v.removeEventListener('stalled', onStalled);
    };
    return { v, tracker };
  });

  const steps = Math.floor(durationMs / intervalMs);
  for (let s = 0; s < steps; s++) {
    await new Promise(r => setTimeout(r, intervalMs));
    for (const { v, tracker } of trackers) {
      const cur = v.currentTime;
      if (!v.paused && Math.abs(cur - tracker.lastSampleTime) < 0.02) {
        tracker.freezeTicks++;
      }
      if (v.readyState < 3) {
        tracker.readyStateDrops++;
      }
      tracker.lastSampleTime = cur;
      tracker.bufferSamples.push(getBufferedAhead(v));
    }
  }

  const results = trackers.map(({ v, tracker }) => {
    tracker._cleanup();
    const t1Wall = performance.now();
    const q1 = typeof v.getVideoPlaybackQuality === 'function' ? v.getVideoPlaybackQuality() : {};
    const frames1 = q1.totalVideoFrames ?? v.webkitDecodedFrameCount ?? 0;
    const dropped1 = q1.droppedVideoFrames ?? v.webkitDroppedFrameCount ?? 0;

    const wallSec = (t1Wall - tracker.t0Wall) / 1000;
    const deltaVideoSec = v.currentTime - tracker.t0Video;
    const playbackRatio = wallSec > 0 ? +(deltaVideoSec / wallSec).toFixed(3) : 0;
    const decodedFrames = Math.max(0, frames1 - tracker.frames0);
    const droppedFrames = Math.max(0, dropped1 - tracker.dropped0);
    const effectiveFps = wallSec > 0 ? +(decodedFrames / wallSec).toFixed(1) : 0;
    const dropRatePercent = decodedFrames > 0 ? +((droppedFrames / decodedFrames) * 100).toFixed(2) : 0;
    const minBufferAheadSec = +Math.min(...tracker.bufferSamples).toFixed(2);
    const avgBufferAheadSec = +(tracker.bufferSamples.reduce((a, b) => a + b, 0) / tracker.bufferSamples.length).toFixed(2);

    let verdict = 'SMOOTH';
    const reasons = [];
    if (v.paused || deltaVideoSec <= 0.1 || decodedFrames === 0) {
      verdict = 'FROZEN';
      reasons.push('Video không tiến thời gian hoặc không giải mã được frame mới');
    } else {
      if (playbackRatio < 0.90) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`Tốc độ phát chậm hơn thời gian thực (playbackRatio=${playbackRatio})`);
      }
      if (tracker.waitingEvents > 0 || tracker.readyStateDrops > 0) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`Xảy ra khựng buffer (waitingEvents=${tracker.waitingEvents}, readyStateDrops=${tracker.readyStateDrops})`);
      }
      if (tracker.freezeTicks >= 2) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`Video bị khựng tạm thời (${tracker.freezeTicks} chu kỳ 500ms không nhích hình)`);
      }
      if (dropRatePercent >= 5) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`Tỷ lệ rớt frame cao (${dropRatePercent}%)`);
      }
    }

    return {
      id: tracker.id,
      resolution: `${v.videoWidth}x${v.videoHeight}`,
      paused: v.paused,
      readyState: v.readyState,
      wallSec: +wallSec.toFixed(2),
      deltaVideoSec: +deltaVideoSec.toFixed(2),
      playbackRatio,
      decodedFrames,
      droppedFrames,
      effectiveFps,
      dropRatePercent,
      waitingEvents: tracker.waitingEvents,
      readyStateDrops: tracker.readyStateDrops,
      freezeTicks: tracker.freezeTicks,
      minBufferAheadSec,
      avgBufferAheadSec,
      verdict,
      reasons
    };
  });

  return {
    url: location.href,
    measuredAt: new Date().toISOString(),
    videoCount: results.length,
    overallVerdict: results.every(r => r.verdict === 'SMOOTH') ? 'PASS_SMOOTH' : 'FAIL_LAG_OR_FROZEN',
    streams: results
  };
};

