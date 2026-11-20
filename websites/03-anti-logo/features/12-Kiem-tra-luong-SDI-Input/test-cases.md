# 03-12 — Kiểm tra Nguồn `Videos` và `Live SDI inputs (auto-detected)`

## Thông tin chung

- **Mã chức năng:** `03-12`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:**
  - `https://anti-logo.cmcati.vn/` (`/channel/1`)
  - `https://anti-logo.cmcati.vn/channel/2`
  - `https://anti-logo.cmcati.vn/channel/3`
  - `https://anti-logo.cmcati.vn/channels` (`Command Center`)
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh toàn diện hai nhóm nguồn phát đầu vào ở cột bên trái của hệ thống **Anti-Logo (`https://anti-logo.cmcati.vn/`)**:
1. **Danh sách nguồn `Videos` (`select#defaultVideos`, API `/v2/api/videos` & `/v2/api/video_frame_preview`):**
   - Kiểm tra thư mục chứa video trên server (`video_dir_exists = true`), số lượng file video (`33` videos), kiểm tra hiện tượng tên file dài (`..._part_001.mp4` .. `_part_006.mp4`) bị khuất phần đuôi trong listbox hẹp, và **xác minh khả năng đọc/giải mã Frame 0 (`HTTP 200`, `image/jpeg`) của toàn bộ 33 file video**.
2. **Danh sách nguồn `Live SDI inputs (auto-detected)` (`select#sdiInputs`, API `/v2/api/sdi_inputs`, `/channels/api/{1..3}/sdi_inputs`, `/channels/api/state`):**
   - Nhận diện đầy đủ các nguồn **Virtual SDI / Live SDI** (`Virtual SDI 01: VTVPrime BONGDA_HD`, `Virtual SDI 02: VTVPrime THETHAO_TINTUC_HD`, `Virtual SDI 03: VTVPrime HAY_TV` và luồng `🟢 Live SDI Stream ... [Active]` khi đang phát).
   - Kiểm tra cơ chế **khóa an toàn (`Stream Lock`)** giữa hộp chọn `Videos` (`select#defaultVideos`) và `Live SDI inputs (auto-detected)` (`select#sdiInputs`) khi có luồng đang phát trực tiếp (`🔒 [Locked - Active stream running]`).
   - Kiểm tra tình trạng hoạt động thực tế của các cổng **SDI Input theo từng kênh (`Kênh 1`, `Kênh 2`, `Kênh 3`)**, bao gồm trạng thái Worker (`17861`, `17862`, `17863`), luồng RTSP/HLS nội bộ (`/v2/api/hls/.../index.m3u8`) và chất lượng giải mã video (`<video>` playback, FPS, độ phân giải `1920x1080`).

## Tiền điều kiện

- Đã đăng nhập thành công vào hệ thống `Anti-Logo` (`https://anti-logo.cmcati.vn/`).
- Tuân thủ **chế độ chỉ đọc (`Read-Only`)** khi kênh đang phát (`LIVE`): không bấm `Stop current stream` hoặc khởi chạy đè luồng mới khi chưa được phép.

---

## Danh sách Test Case

### TC `03-12-01` — Kiểm tra danh sách `Live SDI inputs (auto-detected)` (`select#sdiInputs`) và thông số kỹ thuật

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở trang điều khiển kênh (`https://anti-logo.cmcati.vn/` hoặc `/channel/1`).
  2. Quan sát khung `Live SDI inputs (auto-detected)` (`select#sdiInputs`) ở cột bên trái ngay dưới khung `Videos` (`select#defaultVideos`).
  3. Dùng `evaluate_script` kiểm tra danh sách `<option>` và các thuộc tính `dataset` (`data-kind`, `data-run-id`, `data-width`, `data-height`, `data-fps`, `data-rtsp-url`, `data-active-stream`).
- **Dữ liệu kiểm thử:** `select#sdiInputs`
- **Kết quả mong đợi (Expected):**
  - Hiển thị tiêu đề `Live SDI inputs (auto-detected)` và dòng hướng dẫn `Select an SDI input to run as a live video source.`
  - `select#sdiInputs` liệt kê đầy đủ các đầu vào SDI đã nhận diện:
    - `Virtual SDI 01: VTVPrime BONGDA_HD (4 Levels -> Cap 1080p @ 50 FPS)` (`value="virtual_sdi:BONGDA_HD"`, `1920x1080`, `50 FPS`, gắn `Channel 01`)
    - `Virtual SDI 02: VTVPrime THETHAO_TINTUC_HD (4 Levels -> Cap 1080p @ 50 FPS)` (`value="virtual_sdi:THETHAO_TINTUC_HD"`, `1920x1080`, `50 FPS`, gắn `Channel 02`)
    - `Virtual SDI 03: VTVPrime HAY_TV (4 Levels -> Cap 1080p @ 50 FPS)` (`value="virtual_sdi:HAY_TV"`, `1920x1080`, `50 FPS`, gắn `Channel 03`)
    - Và mục `🟢 Live SDI Stream: ... [Active]` ở đầu danh sách nếu kênh hiện đang phát luồng trực tiếp.
- **Điểm cần chụp minh chứng:** `03-12-01-sdi-inputs-list.png`

---

### TC `03-12-02` — Cơ chế khóa liên động (`Stream Lock`) giữa `Videos` và `Live SDI inputs` khi có luồng đang chạy

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / State Lock`
- **Các bước thực hiện:**
  1. Kiểm tra trạng thái `anyStreamActive` (`active_stream_running`) từ API `/v2/api/sdi_inputs` hoặc `/channels/api/1/sdi_inputs`.
  2. Đối chiếu trạng thái `disabled` của `select#defaultVideos`, thông báo `#activeStreamLockNotice` và trạng thái của từng `<option>` trong `select#sdiInputs`.
- **Dữ liệu kiểm thử:** `select#defaultVideos`, `select#sdiInputs`, `#activeStreamLockNotice`
- **Kết quả mong đợi (Expected):**
  - **Khi có luồng đang phát (`active_stream_running = true`):**
    - Hộp chọn `Videos` (`select#defaultVideos`) bị vô hiệu hóa (`disabled = true`).
    - Hiển thị cảnh báo khóa nguồn phát: `🔒 An active stream is currently running. Other Video and SDI selections are locked...`
    - Trong `select#sdiInputs`, luồng đang phát có nhãn `🟢 Live SDI Stream: ... [Active]` (`disabled = false`, `selected = true`), còn các nguồn SDI khác chuyển sang `🔒 ... [Locked - Active stream running]` (`disabled = true`).
  - **Khi kênh ở trạng thái chờ (`active_stream_running = false` / `IDLE`):**
    - `select#defaultVideos` mở khóa (`disabled = false`), các mục `Virtual SDI 01..03` đều mở khóa (`disabled = false`, `status = READY`) sẵn sàng được chọn.
- **Điểm cần chụp minh chứng:** `03-12-02-sdi-stream-lock.png`

---

### TC `03-12-03` — Kiểm tra API trạng thái SDI Input trên cả 3 kênh (`/v2/api/sdi_inputs`, `/channels/api/{1..3}/sdi_inputs`, `/channels/api/state`)

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `API & Worker Health`
- **Các bước thực hiện:**
  1. Dùng `evaluate_script` truy vấn đồng thời:
     - `GET /v2/api/sdi_inputs`
     - `GET /channels/api/1/sdi_inputs` (`Channel 01` — cổng worker `17861`)
     - `GET /channels/api/2/sdi_inputs` (`Channel 02` — cổng worker `17862`)
     - `GET /channels/api/3/sdi_inputs` (`Channel 03` — cổng worker `17863`)
     - `GET /channels/api/state`
  2. Kiểm tra mã HTTP (`200` hay `502`), danh sách `inputs`, `status` (`LIVE`/`ACTIVE`/`READY`), `rtsp_url`, `hls_url`, `master_url` và `variant_url`.
- **Dữ liệu kiểm thử:** Các endpoint SDI API của `Kênh 1`, `Kênh 2`, `Kênh 3`.
- **Kết quả mong đợi (Expected):**
  - Tất cả các kênh đang hoạt động trả về HTTP `200 OK` cùng danh sách `inputs` hợp lệ (`status: "LIVE"` hoặc `"READY"`).
  - Nếu kênh nào trả về HTTP `502 Bad Gateway` (`ClientConnectorError: Cannot connect to host 127.0.0.1:17862/17863`), đánh `FAIL` và ghi nhận rõ worker của kênh đó đang ngừng hoạt động (`CHANNEL_WORKER_DOWN`) khiến nguồn SDI gắn với kênh đó không thể khởi chạy trên kênh tương ứng.
- **Điểm cần chụp minh chứng:** Kết quả JSON từ `scripts/check-sdi-inputs.js`.

---

### TC `03-12-04` — Kiểm tra luồng HLS nội bộ và chất lượng phát thực tế của luồng `🟢 Live SDI Stream [Active]`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Stream Playback & HLS Probe`
- **Các bước thực hiện:**
  1. Với mỗi mục SDI có `active_stream === true` (ví dụ `🟢 Live SDI Stream ... [Active]`), lấy đường dẫn `hls_url` (`/v2/api/hls/<media_path>/index.m3u8`) và kiểm tra phản hồi HTTP + playlist con (`video1_stream.m3u8`).
  2. Đo lường phần tử `<video>` đang hiển thị luồng SDI trên giao diện (`readyState`, `paused`, `videoWidth`, `videoHeight`, `playbackRatio`, `decodedFrames`, `droppedFrames`, `effectiveFps`) và kiểm tra trạng thái `AI lane` (`ACTIVE` / `IDLE`).
- **Dữ liệu kiểm thử:** Luồng `🟢 Live SDI Stream [Active]` trên kênh đang phát.
- **Kết quả mong đợi (Expected):**
  - Playlist HLS trả về HTTP `200 OK`, có thẻ `#EXTM3U` và danh sách phân đoạn `.ts` đang cập nhật liên tục.
  - Thẻ `<video>` phát ở độ phân giải `1920x1080`, `readyState = 4`, `paused = false`, `AI lane: ACTIVE`.
- **Điểm cần chụp minh chứng:** Kết quả JSON từ `scripts/check-sdi-inputs.js`.

---

### TC `03-12-05` — Kiểm tra danh sách nguồn `Videos` (`select#defaultVideos`) và khả năng giải mã Frame 0 của toàn bộ file video (`/v2/api/videos` & `/v2/api/video_frame_preview`)

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Video Source Integrity`
- **Các bước thực hiện:**
  1. Gọi `GET /v2/api/videos` và đối chiếu với danh sách `<option>` trong `select#defaultVideos` (`Videos`).
  2. Kiểm tra tính duy nhất của tên file (`uniqueVideoValues === totalVideoOptions`), kiểm tra xem có file nào bị trùng tên hay chỉ do tên dài (`_part_001.mp4` .. `_part_006.mp4`) bị che khuất phần đuôi trong khung `select#defaultVideos`.
  3. Với từng file video trong danh sách (`33` videos), gọi API kiểm tra giải mã khung hình đầu tiên `GET /v2/api/video_frame_preview?video=<encodeURIComponent(video)>&frame=0&max_width=320` để xác nhận file tồn tại trên ổ đĩa server và bộ giải mã video (FFmpeg/OpenCV backend) đọc được khung hình hợp lệ.
- **Dữ liệu kiểm thử:** Toàn bộ `33` file video trong `select#defaultVideos`.
- **Kết quả mong đợi (Expected):**
  - API `/v2/api/videos` trả về `200 OK`, `video_dir_exists = true`, danh sách khớp 100% với `select#defaultVideos`.
  - Toàn bộ `100%` (`33/33`) file video khi gọi `/v2/api/video_frame_preview` đều trả về `HTTP 200 OK`, `Content-Type: image/jpeg` với dung lượng `> 500 bytes` (không có file hỏng hoặc lỗi `404`/`500`).
- **Điểm cần chụp minh chứng:** Kết quả JSON từ `scripts/check-sdi-inputs.js`.
