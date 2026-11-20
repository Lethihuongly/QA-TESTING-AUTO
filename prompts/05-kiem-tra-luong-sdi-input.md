# Prompt kiểm tra nguồn `Videos` và `Live SDI inputs (auto-detected)` trên Anti-Logo

Sao chép nội dung trong khung dưới đây và gửi cho Antigravity khi bạn muốn kiểm tra nhanh xem danh sách `Videos` (`#defaultVideos`) và các luồng `Live SDI inputs (auto-detected)` (`#sdiInputs`) trên Anti-Logo có đang hoạt động hay không:

```text
Hãy dùng chrome-devtools MCP để kiểm tra toàn diện nguồn Videos (#defaultVideos) và Live SDI inputs (auto-detected) (#sdiInputs) trên Anti-Logo (https://anti-logo.cmcati.vn/):
- Thực thi bộ test case: websites/03-anti-logo/features/12-Kiem-tra-luong-SDI-Input/test-cases.md (TC-03-12-01 đến TC-03-12-05)
- Chạy script chẩn đoán tự động: websites/03-anti-logo/features/12-Kiem-tra-luong-SDI-Input/scripts/check-sdi-inputs.js

Yêu cầu báo cáo:
1. Danh sách Videos (#defaultVideos & /v2/api/videos): tổng số file video, trạng thái thư mục video_dir trên server, và kết quả kiểm tra giải mã Frame 0 (/v2/api/video_frame_preview) cho toàn bộ các file video xem có file nào bị lỗi/hỏng không.
2. Danh sách Live SDI inputs (auto-detected) (#sdiInputs & /v2/api/sdi_inputs): tên luồng, loại kết nối, độ phân giải, FPS, kênh gắn kèm, trạng thái chọn/khóa.
3. Tình trạng API SDI và Worker của cả 3 kênh (/channels/api/1..3/sdi_inputs, /channels/api/state — cổng 17861, 17862, 17863).
4. Nếu có luồng đang ACTIVE, kiểm tra manifest HLS (/v2/api/hls/.../index.m3u8) và đo chất lượng phát trên thẻ <video> (playbackRatio, effectiveFps, droppedFrames, dropRatePercent, AI lane).
```
