/**
 * Script kiểm tra định lượng độ mượt / giật lag của 2 luồng video trên SafeVision
 * (LUỒNG STREAM GỐC & LUỒNG DELAYED — ĐANG GIÁM SÁT)
 * Dùng với công cụ `mcp_chrome-devtools_evaluate_script`
 * Thời gian đo mặc định: 8000ms (lấy mẫu mỗi 500ms = 16 chu kỳ)
 */
async () => {
  const durationMs = 8000;
  const intervalMs = 500;
  const ticks = Math.floor(durationMs / intervalMs);
  const videos = Array.from(document.querySelectorAll('video'));

  if (videos.length === 0) {
    return { status: 'NO_VIDEO_FOUND', message: 'Không tìm thấy phần tử <video> trên trang.' };
  }

  const streamLabels = ['LUỒNG STREAM GỐC', 'LUỒNG DELAYED — ĐANG GIÁM SÁT'];

  const trackers = videos.map((v, idx) => {
    const q = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality() : {};
    const tracker = {
      index: idx,
      streamName: streamLabels[idx] || `Video #${idx + 1}`,
      videoEl: v,
      resolution: `${v.videoWidth}x${v.videoHeight}`,
      initialPaused: v.paused,
      startWallMs: performance.now(),
      startVideoTime: v.currentTime,
      lastVideoTime: v.currentTime,
      startTotalFrames: q.totalVideoFrames ?? 0,
      startDroppedFrames: q.droppedVideoFrames ?? 0,
      waitingEvents: 0,
      stalledEvents: 0,
      readyStateDrops: 0,
      freezeTicks: 0,
      bufferAheadSamples: []
    };

    const onWaiting = () => { tracker.waitingEvents++; };
    const onStalled = () => { tracker.stalledEvents++; };
    v.addEventListener('waiting', onWaiting);
    v.addEventListener('stalled', onStalled);
    tracker._cleanup = () => {
      v.removeEventListener('waiting', onWaiting);
      v.removeEventListener('stalled', onStalled);
    };

    return tracker;
  });

  for (let i = 0; i < ticks; i++) {
    await new Promise(r => setTimeout(r, intervalMs));
    for (const t of trackers) {
      const v = t.videoEl;
      const cur = v.currentTime;
      const deltaTick = cur - t.lastVideoTime;

      if (!v.paused && deltaTick < 0.05) {
        t.freezeTicks++;
      }
      if (v.readyState < 3) {
        t.readyStateDrops++;
      }

      let bufAhead = 0;
      if (v.buffered && v.buffered.length > 0) {
        for (let b = 0; b < v.buffered.length; b++) {
          if (v.buffered.start(b) <= cur + 0.5 && v.buffered.end(b) >= cur) {
            bufAhead = v.buffered.end(b) - cur;
            break;
          }
        }
      }
      t.bufferAheadSamples.push(Number(bufAhead.toFixed(2)));
      t.lastVideoTime = cur;
    }
  }

  const results = trackers.map(t => {
    t._cleanup();
    const v = t.videoEl;
    const elapsedWallSec = (performance.now() - t.startWallMs) / 1000;
    const deltaVideoSec = v.currentTime - t.startVideoTime;
    const playbackRatio = elapsedWallSec > 0 ? deltaVideoSec / elapsedWallSec : 0;

    const qEnd = v.getVideoPlaybackQuality ? v.getVideoPlaybackQuality() : {};
    const decodedFrames = (qEnd.totalVideoFrames ?? 0) - t.startTotalFrames;
    const droppedFrames = (qEnd.droppedVideoFrames ?? 0) - t.startDroppedFrames;
    const effectiveFps = elapsedWallSec > 0 ? decodedFrames / elapsedWallSec : 0;
    const dropRatePercent = decodedFrames > 0 ? (droppedFrames / decodedFrames) * 100 : 0;

    const minBufferAheadSec = t.bufferAheadSamples.length
      ? Math.min(...t.bufferAheadSamples)
      : 0;
    const avgBufferAheadSec = t.bufferAheadSamples.length
      ? t.bufferAheadSamples.reduce((a, b) => a + b, 0) / t.bufferAheadSamples.length
      : 0;

    let verdict = 'SMOOTH';
    const reasons = [];

    if (v.paused || deltaVideoSec <= 0.1 || decodedFrames === 0) {
      verdict = 'FROZEN';
      reasons.push('Video đang dừng hoặc đứng hình hoàn toàn (không tiến thời gian / không giải mã khung hình mới)');
    } else {
      if (playbackRatio < 0.90) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`Tốc độ phát thực tế chậm hơn thời gian thực (playbackRatio = ${playbackRatio.toFixed(2)} < 0.90)`);
      }
      if (t.waitingEvents > 0 || t.readyStateDrops > 0) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`Bị hụt buffer / rebuffering (waitingEvents = ${t.waitingEvents}, readyStateDrops = ${t.readyStateDrops})`);
      }
      if (t.freezeTicks >= 2) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`Khựng hình ${t.freezeTicks}/${ticks} chu kỳ lấy mẫu 500ms`);
      }
      if (dropRatePercent >= 5) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`Tỷ lệ rớt khung hình cao (${dropRatePercent.toFixed(2)}% >= 5%)`);
      }
      if (effectiveFps < 20) {
        verdict = 'LAG_OR_STUTTER';
        reasons.push(`FPS giải mã thực tế thấp (${effectiveFps.toFixed(1)} fps < 20 fps)`);
      }
    }

    return {
      index: t.index,
      streamName: t.streamName,
      resolution: t.resolution,
      verdict,
      reasons: reasons.length ? reasons : ['Luồng phát mượt, ổn định'],
      metrics: {
        elapsedWallSec: Number(elapsedWallSec.toFixed(2)),
        deltaVideoSec: Number(deltaVideoSec.toFixed(2)),
        playbackRatio: Number(playbackRatio.toFixed(3)),
        decodedFrames,
        droppedFrames,
        dropRatePercent: Number(dropRatePercent.toFixed(2)),
        effectiveFps: Number(effectiveFps.toFixed(1)),
        waitingEvents: t.waitingEvents,
        stalledEvents: t.stalledEvents,
        readyStateDrops: t.readyStateDrops,
        freezeTicks: t.freezeTicks,
        minBufferAheadSec: Number(minBufferAheadSec.toFixed(2)),
        avgBufferAheadSec: Number(avgBufferAheadSec.toFixed(2))
      }
    };
  });

  const bodyText = document.body.innerText;
  const hasBufferUnderrunLog = bodyText.includes('buffer underrun') || bodyText.includes('[VIDEO] waiting');

  return {
    measuredAt: new Date().toISOString(),
    url: location.href,
    videoCount: videos.length,
    hasBufferUnderrunLogInTerminal: hasBufferUnderrunLog,
    results
  };
}

