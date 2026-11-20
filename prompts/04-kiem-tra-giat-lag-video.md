# Prompt kiểm tra giật/lag/đứng hình video trên Anti-Logo và SafeVision

Sao chép nội dung trong khung dưới đây và gửi cho Antigravity khi bạn muốn kiểm tra nhanh chất lượng phát trực tiếp (xem video có bị giật, lag, khựng hình hay rớt frame không):

```text
Hãy dùng chrome-devtools MCP để kiểm tra định lượng xem video trực tiếp trên:
1. Anti-Logo (https://antilogo.cmcati.vn/) — Thực thi: websites/03-anti-logo/features/04-Preview/test-cases.md (TC-03-04-04) bằng script websites/03-anti-logo/features/04-Preview/scripts/check-video-lag.js
2. SafeVision (https://safevision.cmcati.vn/) — Thực thi: websites/04-safevision/features/05-Xem-truc-tiep/test-cases.md (TC-04-05-04) bằng script websites/04-safevision/features/05-Xem-truc-tiep/scripts/check-video-lag.js

Yêu cầu:
- Đo trong 8 giây (lấy mẫu mỗi 500ms) cho từng phần tử <video>.
- Báo cáo đầy đủ bảng chỉ số:
  + playbackRatio (deltaCurrentTime / elapsedWallTime)
  + effectiveFps, decodedFrames, droppedFrames, dropRatePercent
  + waitingEvents, stalledEvents, readyStateDrops, freezeTicks
  + minBufferAheadSec, avgBufferAheadSec
  + Các thông số HLS/Telemetry hiển thị trên giao diện (nếu có)
- Kết luận rõ từng luồng là SMOOTH (Mượt - PASS), LAG_OR_STUTTER (Giật/Lag - FAIL) hay FROZEN (Đứng hình - FAIL).
```

