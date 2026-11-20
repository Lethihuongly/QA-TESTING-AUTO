# Bằng chứng Kiểm thử Thực tế — Website 04: SafeVision (`2026-11-10/run-090400`)

> **Lưu ý về ảnh chụp màn hình (`screenshots/`):** Lời gọi `take_screenshot` của `chrome-devtools` MCP trả lỗi nguyên văn:
> `Error: Access denied: path "..." is not within any of the configured workspace roots.`
> Toàn bộ bằng chứng DOM Snapshot, Network Response, Console và kết quả chạy `check-video-lag.js` (đã loại bỏ mật khẩu/token/cookie) được lưu đầy đủ dưới đây.

---

## 1. Bằng chứng Dashboard & API (`GET /api/v1/dashboard/stats` — `reqid=64834`)
- `totalChannels = 9`, `totalStreams = 274`, `activeStreams = 1`, `totalDetections = 218697`, `todayDetections = 0`.
- `topLogos`: `3soc (16446)`, `3que (289)`, `ao3soc (279)`, `bản đồ 1 (156)`, `bản đồ 3 (32)`, `bản đồ 2 (28)`.

## 2. Bằng chứng Kết quả Đo `check-video-lag.js` trên `VTV10` (`/channels/a2884000-4624-4b57-b340-7b8c0e2cb657`)
```json
{
  "measuredAt": "2026-11-10T09:09:59.338Z",
  "url": "https://safevision.cmcati.vn/channels/a2884000-4624-4b57-b340-7b8c0e2cb657",
  "videoCount": 2,
  "hasBufferUnderrunLogInTerminal": false,
  "results": [
    {
      "index": 0,
      "streamName": "LUỒNG STREAM GỐC (UI derived)",
      "resolution": "1280x720",
      "paused": false,
      "readyState": 4,
      "verdict": "SMOOTH",
      "metrics": {
        "elapsedWallSec": 8.12,
        "deltaVideoSec": 8.12,
        "playbackRatio": 1,
        "startTotalFrames": 780,
        "endTotalFrames": 983,
        "decodedFrames": 203,
        "startDroppedFrames": 4,
        "endDroppedFrames": 4,
        "droppedFrames": 0,
        "dropRatePercent": 0,
        "effectiveFps": 25,
        "waitingEvents": 0,
        "stalledEvents": 0,
        "readyStateDrops": 0,
        "freezeTicks": 0,
        "minBufferAheadSec": 10.39,
        "avgBufferAheadSec": 12.16
      }
    },
    {
      "index": 1,
      "streamName": "LUỒNG DELAYED / OUTPUT (UI derived)",
      "resolution": "1280x720",
      "paused": false,
      "readyState": 4,
      "verdict": "SMOOTH",
      "metrics": {
        "elapsedWallSec": 8.12,
        "deltaVideoSec": 8.1,
        "playbackRatio": 0.998,
        "startTotalFrames": 792,
        "endTotalFrames": 991,
        "decodedFrames": 199,
        "startDroppedFrames": 0,
        "endDroppedFrames": 0,
        "droppedFrames": 0,
        "dropRatePercent": 0,
        "effectiveFps": 24.5,
        "waitingEvents": 0,
        "stalledEvents": 0,
        "readyStateDrops": 0,
        "freezeTicks": 0,
        "minBufferAheadSec": 2.74,
        "avgBufferAheadSec": 3.64
      }
    }
  ]
}
```

## 3. Bằng chứng Đo Thời gian Mở lại Kênh `VTV10` (`PerformanceResourceTiming`)
- `domContentLoadedMs = 158`, `loadEventEndMs = 160`.
- `vtv10/free/master.m3u8`: `startTimeMs = 267`, `responseEndMs = 287`.
- `vtv10__vtv720p-h264/index.m3u8`: `startTimeMs = 325`, `responseEndMs = 340`.
- `vtv10__vtv720p-h264/seg-1794301830016-382245.ts` (Segment 1 Luồng gốc): `startTimeMs = 387`, **`responseEndMs = 509`**.
- `/api/output_stream/bef9dc85-dd60-452c-bcb9-6b6e0939e8e2/playlist.m3u8`: `startTimeMs = 266`, `responseEndMs = 346`.
- `/api/output_stream/bef9dc85-dd60-452c-bcb9-6b6e0939e8e2/segment_19700101_071558.ts` (Segment 1 Luồng Output): `startTimeMs = 463`, **`responseEndMs = 590`**.

