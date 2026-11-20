# Quy trình MCP: Anti-Logo / Kiểm tra luồng SDI Input (`Live SDI inputs (auto-detected)`)

Đây là hướng dẫn cho agent trong Antigravity khi thực hiện kiểm tra các luồng đầu vào SDI bằng `chrome-devtools` MCP.

## 1. Các bước chuẩn bị
1. Đọc `test-cases.md` cùng thư mục (`TC-03-12-01` đến `TC-03-12-04`).
2. Chọn tab đang mở `https://anti-logo.cmcati.vn/` (`/channel/1`, `/channel/2`, `/channel/3` hoặc `/channels`).
3. Lấy snapshot để quan sát cột bên trái (`Videos` và `Live SDI inputs (auto-detected)`).
4. **Quy tắc An toàn (`Read-Only`):** Tuyệt đối không bấm `Stop current stream` hoặc bấm `Start Real-Time Content Control` đè lên luồng đang phát trực tiếp nếu chưa có yêu cầu rõ ràng từ người dùng.

## 2. Chạy script chẩn đoán toàn diện SDI Input (`scripts/check-sdi-inputs.js`)
Gọi công cụ `evaluate_script` của `chrome-devtools` MCP với hàm trong file `scripts/check-sdi-inputs.js`. Script sẽ tự động thực hiện 4 lớp kiểm tra:
1. **DOM UI Check (`select#sdiInputs` & `select#defaultVideos`):**
   - Đọc tất cả `<option>` trong `#sdiInputs` (`value`, `text`, `disabled`, `selected`, `dataset`).
   - Kiểm tra trạng thái khóa liên động (`defaultVideos.disabled`, `#activeStreamLockNotice`).
2. **Backend SDI Endpoints Check (`/v2/api/sdi_inputs` & `/channels/api/1..3/sdi_inputs`):**
   - Kiểm tra danh sách nguồn SDI tự động nhận diện (`channel_sdi_stream`, `sdi_active_stream`, `virtual_sdi_hls`).
   - Đối chiếu tình trạng Worker của cả 3 kênh (`Channel 01` cổng `17861`, `Channel 02` cổng `17862`, `Channel 03` cổng `17863`) qua `/channels/api/state`.
3. **HLS Manifest & Stream Liveness Probe:**
   - Với luồng SDI đang `ACTIVE`/`LIVE`, fetch trực tiếp manifest `/v2/api/hls/<media_path>/index.m3u8` và playlist con để xác nhận server đang sinh segment `.ts` thời gian thực.
4. **Live Video Playback Quality Check (`4 giây`):**
   - Nếu trên trang đang có thẻ `<video>` phát luồng SDI, đo `playbackRatio`, `decodedFrames`, `droppedFrames`, `effectiveFps`, `readyState` và trạng thái `AI lane`.

## 3. Phân loại trạng thái từng luồng SDI (`sdiStatus`)
- **`ACTIVE_PLAYING` (`🟢 Đang phát trực tiếp`):** Luồng SDI đang chạy (`active_stream = true`), HLS manifest `200 OK`, video phát mượt (`playbackRatio ~ 1.0`).
- **`READY_LOCKED_BY_ACTIVE_STREAM` (`🔒 Sẵn sàng nhưng đang khóa bảo vệ`):** Nguồn Virtual SDI (`status = READY`) đã được nhận diện đầy đủ ở `1080p @ 50 FPS`, tạm khóa chọn trên UI vì kênh đang phát một luồng trực tiếp khác.
- **`READY_AVAILABLE` (`✅ Sẵn sàng khởi chạy`):** Nguồn Virtual SDI (`status = READY`, `disabled = false`) và Worker của kênh gắn kèm đang `ONLINE`.
- **`CHANNEL_WORKER_DOWN` (`⚠️ Worker kênh đích đang tắt - HTTP 502`):** Nguồn Virtual SDI có trong cấu hình nhưng Worker của kênh đích (`17862` hoặc `17863`) trả về `502 Bad Gateway`.

## 4. Ghi báo cáo
- Lưu kết quả JSON trả về từ `scripts/check-sdi-inputs.js` vào `results.csv` và bảng tổng hợp trong `summary.md`.

