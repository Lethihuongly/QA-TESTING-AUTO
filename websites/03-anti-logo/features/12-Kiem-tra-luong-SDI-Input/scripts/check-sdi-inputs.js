/**
 * Script kiểm tra toàn diện nguồn `Videos` (#defaultVideos) và `Live SDI inputs (auto-detected)` (#sdiInputs)
 * Dùng trực tiếp trong công cụ `evaluate_script` của chrome-devtools MCP
 * hoặc dán vào DevTools Console trên trang Anti-Logo (https://anti-logo.cmcati.vn/).
 */
async (sampleVideoMs = 4000, verifyAllVideoFiles = true) => {
  const sdiSelect = document.querySelector('#sdiInputs');
  const defaultVideos = document.querySelector('#defaultVideos');
  const lockNoticeEl = document.querySelector('#activeStreamLockNotice');
  const aiLaneEl = document.querySelector('#aiLaneBadge');
  const runBtnEl = document.querySelector('#runBtn');

  // 1. Kiểm tra UI DOM (#defaultVideos & #sdiInputs)
  const videoUiOptions = defaultVideos
    ? Array.from(defaultVideos.options).map((opt, index) => ({
        index,
        value: opt.value,
        text: opt.text.trim(),
        disabled: opt.disabled,
        selected: opt.selected
      }))
    : [];

  const sdiUiOptions = sdiSelect
    ? Array.from(sdiSelect.options).map((opt, index) => ({
        index,
        value: opt.value,
        text: opt.text.trim(),
        disabled: opt.disabled,
        selected: opt.selected,
        kind: opt.dataset?.kind || null,
        runId: opt.dataset?.runId || null,
        activeRunId: opt.dataset?.activeRunId || null,
        activeStream: opt.dataset?.activeStream === '1',
        rtspUrl: opt.dataset?.rtspUrl || null,
        resolution:
          opt.dataset?.width && opt.dataset?.height
            ? `${opt.dataset.width}x${opt.dataset.height}`
            : null,
        fps: opt.dataset?.fps || null
      }))
    : [];

  // 2. Truy vấn các API Videos, SDI và Channel Workers
  const endpoints = {
    videosApi: '/v2/api/videos',
    globalSdi: '/v2/api/sdi_inputs',
    channel1Sdi: '/channels/api/1/sdi_inputs',
    channel2Sdi: '/channels/api/2/sdi_inputs',
    channel3Sdi: '/channels/api/3/sdi_inputs',
    channelsState: '/channels/api/state'
  };

  const apiResponses = {};
  for (const [key, ep] of Object.entries(endpoints)) {
    try {
      const res = await fetch(ep, { cache: 'no-store' });
      let body = null;
      try {
        body = await res.json();
      } catch {
        body = await res.text();
      }
      apiResponses[key] = {
        endpoint: ep,
        httpStatus: res.status,
        ok: res.ok,
        body
      };
    } catch (err) {
      apiResponses[key] = {
        endpoint: ep,
        httpStatus: 0,
        ok: false,
        error: String(err)
      };
    }
  }

  // 3. Kiểm tra khả năng đọc & giải mã Frame 0 của toàn bộ file trong danh sách Videos (#defaultVideos)
  const apiVideosList = apiResponses.videosApi?.body?.videos || [];
  const videoProbeResults = [];
  if (verifyAllVideoFiles && apiVideosList.length > 0) {
    for (let i = 0; i < apiVideosList.length; i += 6) {
      const batch = apiVideosList.slice(i, i + 6);
      const batchRes = await Promise.all(
        batch.map(async (videoName, bIdx) => {
          const url = `/v2/api/video_frame_preview?video=${encodeURIComponent(videoName)}&frame=0&max_width=320`;
          const t0 = performance.now();
          try {
            const r = await fetch(url, { cache: 'no-store' });
            const blob = await r.blob();
            return {
              index: i + bIdx,
              video: videoName,
              httpStatus: r.status,
              ok: r.ok && blob.type.startsWith('image/') && blob.size > 500,
              contentType: blob.type,
              byteSize: blob.size,
              latencyMs: Math.round(performance.now() - t0)
            };
          } catch (e) {
            return {
              index: i + bIdx,
              video: videoName,
              httpStatus: 0,
              ok: false,
              error: String(e)
            };
          }
        })
      );
      videoProbeResults.push(...batchRes);
    }
  }

  const videosSummary = {
    apiHttpStatus: apiResponses.videosApi?.httpStatus ?? 0,
    videoDir: apiResponses.videosApi?.body?.video_dir || null,
    videoDirExists: Boolean(apiResponses.videosApi?.body?.video_dir_exists),
    totalOptionsInUi: videoUiOptions.length,
    uniqueValuesInUi: new Set(videoUiOptions.map((o) => o.value)).size,
    defaultVideosDisabled: defaultVideos?.disabled ?? null,
    probedCount: videoProbeResults.length,
    decodablePassCount: videoProbeResults.filter((r) => r.ok).length,
    decodableFailCount: videoProbeResults.filter((r) => !r.ok).length,
    failedVideos: videoProbeResults.filter((r) => !r.ok),
    verdict:
      videoProbeResults.length > 0 &&
      videoProbeResults.every((r) => r.ok)
        ? 'ALL_VIDEOS_HEALTHY'
        : 'SOME_VIDEOS_FAILED'
  };

  // 4. Phân tích trạng thái Channel Workers & từng luồng SDI
  const channelsMap = {};
  const channelList = apiResponses.channelsState?.body?.channels || [];
  for (const ch of channelList) {
    channelsMap[ch.id] = {
      id: ch.id,
      name: ch.name,
      ok: Boolean(ch.ok),
      httpStatus: ch.status,
      state: ch.state,
      source: ch.source || null,
      mediaPath: ch.media_path || null,
      publisherReadiness: Boolean(ch.publisher_readiness),
      framesWritten: ch.streams?.[0]?.frames_written ?? null,
      error: ch.error || null
    };
  }

  const rawInputs = apiResponses.globalSdi?.body?.inputs || [];
  const anyStreamActive = Boolean(
    apiResponses.globalSdi?.body?.active_stream_running ||
      rawInputs.some((i) => Boolean(i.active_stream))
  );

  const sdiStreams = [];
  for (const inp of rawInputs) {
    const channelId = inp.channel_id || 1;
    const worker = channelsMap[channelId] || null;
    const uiMatch = sdiUiOptions.find(
      (o) =>
        o.value === inp.device ||
        o.runId === inp.run_id ||
        (inp.active_stream && o.activeStream)
    );

    let localHlsProbe = null;
    if (inp.hls_url) {
      try {
        const masterRes = await fetch(inp.hls_url, { cache: 'no-store' });
        const masterText = await masterRes.text();
        const masterLines = masterText
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l && !l.startsWith('#'));
        let variantInfo = null;
        if (masterLines.length > 0) {
          const variantUrl = masterLines[masterLines.length - 1];
          const varRes = await fetch(variantUrl, { cache: 'no-store' });
          const varText = await varRes.text();
          const tsSegments = varText
            .split('\n')
            .map((l) => l.trim())
            .filter((l) => l && !l.startsWith('#'));
          const seqMatch = varText.match(/#EXT-X-MEDIA-SEQUENCE:(\d+)/);
          variantInfo = {
            variantUrl,
            httpStatus: varRes.status,
            ok: varRes.ok && varText.includes('#EXTM3U'),
            mediaSequence: seqMatch ? Number(seqMatch[1]) : null,
            tsSegmentCount: tsSegments.length,
            latestTsSegment: tsSegments[tsSegments.length - 1] || null
          };
        }
        localHlsProbe = {
          masterUrl: inp.hls_url,
          httpStatus: masterRes.status,
          ok: masterRes.ok && masterText.includes('#EXTM3U'),
          variant: variantInfo
        };
      } catch (e) {
        localHlsProbe = { masterUrl: inp.hls_url, ok: false, error: String(e) };
      }
    }

    let operationalVerdict = 'UNKNOWN';
    let note = '';
    if (inp.active_stream) {
      const hlsAlive = Boolean(localHlsProbe?.ok && localHlsProbe?.variant?.ok);
      operationalVerdict = hlsAlive ? 'ACTIVE_PLAYING' : 'ACTIVE_NO_HLS';
      note = hlsAlive
        ? `Đang phát trực tiếp trên Channel ${channelId} (${localHlsProbe.variant.tsSegmentCount} phân đoạn .ts, seq=${localHlsProbe.variant.mediaSequence})`
        : `Đánh dấu ACTIVE nhưng HLS playlist chưa sẵn sàng`;
    } else if (worker && !worker.ok) {
      operationalVerdict = 'CHANNEL_WORKER_DOWN';
      note = `Nguồn SDI đã cấu hình (${inp.status}), nhưng Worker Channel ${channelId} đang lỗi (${worker.httpStatus}: ${worker.error})`;
    } else if (anyStreamActive) {
      operationalVerdict = 'READY_LOCKED_BY_ACTIVE_STREAM';
      note = `Nguồn SDI sẵn sàng (${inp.status}) trên Channel ${channelId}, đang khóa tạm thời trên UI vì có luồng khác đang phát`;
    } else {
      operationalVerdict = 'READY_AVAILABLE';
      note = `Nguồn SDI sẵn sàng khởi chạy trên Channel ${channelId}`;
    }

    sdiStreams.push({
      device: inp.device,
      label: inp.label,
      kind: inp.kind,
      channelId,
      apiStatus: inp.status,
      activeStream: Boolean(inp.active_stream),
      resolution: `${inp.width || 0}x${inp.height || 0}`,
      fps: inp.fps,
      rtspUrl: inp.rtsp_url || null,
      hlsUrl: inp.hls_url || null,
      upstreamMasterUrl: inp.master_url || null,
      upstreamVariantUrl: inp.variant_url || null,
      uiOptionPresent: Boolean(uiMatch),
      uiSelected: uiMatch?.selected ?? false,
      uiDisabled: uiMatch?.disabled ?? null,
      channelWorkerStatus: worker ? `${worker.state} (HTTP ${worker.httpStatus})` : 'N/A',
      localHlsProbe,
      operationalVerdict,
      note
    });
  }

  // 5. Đo phần tử <video> đang phát trên trang
  const videoEl = document.querySelector('video');
  let activeVideoPlayback = null;
  if (videoEl && sampleVideoMs > 0) {
    videoEl.scrollIntoView({ behavior: 'instant', block: 'center' });
    await new Promise((r) => setTimeout(r, 300));
    const q0 =
      typeof videoEl.getVideoPlaybackQuality === 'function'
        ? videoEl.getVideoPlaybackQuality()
        : {};
    const t0Wall = performance.now();
    const t0Video = videoEl.currentTime;
    const f0 = q0.totalVideoFrames ?? 0;
    const d0 = q0.droppedVideoFrames ?? 0;

    await new Promise((r) => setTimeout(r, sampleVideoMs));

    const q1 =
      typeof videoEl.getVideoPlaybackQuality === 'function'
        ? videoEl.getVideoPlaybackQuality()
        : {};
    const wallSec = (performance.now() - t0Wall) / 1000;
    const deltaVideoSec = videoEl.currentTime - t0Video;
    const decodedFrames = Math.max(0, (q1.totalVideoFrames ?? 0) - f0);
    const droppedFrames = Math.max(0, (q1.droppedVideoFrames ?? 0) - d0);
    const playbackRatio = wallSec > 0 ? +(deltaVideoSec / wallSec).toFixed(3) : 0;
    const effectiveFps = wallSec > 0 ? +(decodedFrames / wallSec).toFixed(1) : 0;
    const dropRatePercent =
      decodedFrames > 0 ? +((droppedFrames / decodedFrames) * 100).toFixed(2) : 0;

    activeVideoPlayback = {
      resolution: `${videoEl.videoWidth}x${videoEl.videoHeight}`,
      paused: videoEl.paused,
      readyState: videoEl.readyState,
      wallSec: +wallSec.toFixed(2),
      deltaVideoSec: +deltaVideoSec.toFixed(2),
      playbackRatio,
      decodedFrames,
      droppedFrames,
      dropRatePercent,
      effectiveFps,
      aiLaneText: aiLaneEl ? aiLaneEl.textContent.trim() : null,
      verdict:
        !videoEl.paused && playbackRatio >= 0.9 && dropRatePercent < 5
          ? 'SMOOTH'
          : 'LAG_OR_FRAME_DROP'
    };
  }

  return {
    url: location.href,
    checkedAt: new Date().toISOString(),
    videosSummary,
    sdiUiSummary: {
      sdiSelectFound: Boolean(sdiSelect),
      sdiOptionCount: sdiUiOptions.length,
      lockNoticeVisible: lockNoticeEl
        ? getComputedStyle(lockNoticeEl).display !== 'none'
        : false,
      runButtonText: runBtnEl ? runBtnEl.textContent.trim() : null
    },
    perChannelSdiApiHttpStatus: {
      channel1: apiResponses.channel1Sdi?.httpStatus,
      channel2: apiResponses.channel2Sdi?.httpStatus,
      channel3: apiResponses.channel3Sdi?.httpStatus
    },
    channelWorkers: channelsMap,
    sdiStreams,
    activeVideoPlayback
  };
};
