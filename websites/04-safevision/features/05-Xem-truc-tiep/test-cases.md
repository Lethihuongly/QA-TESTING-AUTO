# 04-05 — Xem trực tiếp (`LUỒNG STREAM GỐC` & `LUỒNG DELAYED — ĐANG GIÁM SÁT`)

## Thông tin chung

- **Mã chức năng:** `04-05`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/channels/{id}`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trình phát trực tiếp 2 luồng (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`), các nút điều khiển player (`Unmute`, `HLS Telemetry Monitor HUD`, `Zoom`, `Fullscreen`), kiểm tra tình trạng luồng trên các kênh đang được đánh dấu `"Đang phát"` / `"RUNNING"` và đo định lượng hiện tượng **giật/lag/đứng hình/rớt khung hình/hụt buffer** của cả 2 luồng video trực tiếp.

## Tiền điều kiện

- Đã đăng nhập và mở trang chi tiết kênh truyền hình.

---

## Danh sách Test Case

### TC `04-05-01` — Phát trực tiếp thành công 2 luồng video trên kênh đang phát (`VTV3`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở trang chi tiết kênh `VTV3` (`/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`).
  2. Dùng `evaluate_script` kiểm tra 2 phần tử `<video>` (`readyState`, `currentTime`, `paused`, `videoWidth`, `videoHeight`, `error`) và nhãn trạng thái `LIVE`.
- **Dữ liệu kiểm thử:** Kênh `VTV3`.
- **Kết quả mong đợi (Expected):**
  - Cả 2 phần tử `<video>` (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`) đều phát bình thường (`readyState = 4`, `paused = false`, `1280x720`, `error = null`) và hiển thị nhãn `LIVE`.
- **Điểm cần chụp minh chứng:** `04-05-01-vtv3-live-playing.png`

---

### TC `04-05-02` — Kiểm tra thanh công cụ điều khiển trình phát (`Unmute`, `HUD`, `Zoom`, `Fullscreen`)

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại khung xem trực tiếp của kênh `VTV3`, kiểm tra sự hiện diện của các nút: `button[title="Bật âm thanh (Unmute)"]`, `button[title="Bật/Tắt HLS Telemetry Monitor HUD"]`, `button[title="Thu nhỏ (Zoom Out)"]`, `button[title="Đặt lại mức zoom (100%)"]`, `button[title="Phóng to (Zoom In)"]`, `button[title="Toàn màn hình (Fullscreen)"]`.
- **Dữ liệu kiểm thử:** Kênh `VTV3`.
- **Kết quả mong đợi (Expected):**
  - Hiển thị đầy đủ các nút điều khiển trình phát; nút `Thu nhỏ (Zoom Out)` ở mức `100%` mặc định có `disabled = true`.
- **Điểm cần chụp minh chứng:** `04-05-02-player-controls.png`

---

### TC `04-05-03` — Kiểm tra khả năng tải luồng trên các kênh khác đang báo `"Đang phát"` / `"RUNNING"` (`VTV6`, `VTV10`, `VTV7`, `VTV9`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative / Integration`
- **Các bước thực hiện:**
  1. Mở trang chi tiết các kênh đang có trạng thái `"Đang phát"` / `"RUNNING"` (ví dụ `VTV6` hoặc `VTV10`).
  2. Kiểm tra trạng thái khung video (`LIVE` hay `LOADING`), trạng thái WebSocket (`WS Live` hay `WS offline`), Console logs và Network requests.
- **Dữ liệu kiểm thử:** Kênh đang báo `"Đang phát"` trên trang chủ `/`.
- **Kết quả mong đợi (Expected):**
  - Luồng video phát được bình thường hoặc hệ thống cập nhật đúng trạng thái luồng đã dừng/lỗi, không bị chặn CORS từ `vtvgolive-vtv02.vtvdigital.vn` hay lặp vô hạn request `503 Service Unavailable` tới `safevision-ai.cmcati.vn/api/output_stream/.../playlist.m3u8`.
- **Điểm cần chụp minh chứng:** `04-05-03-stream-cors-503.png`

---

### TC `04-05-04` — Kiểm tra định lượng độ mượt và phát hiện giật/lag/đứng hình trên 2 luồng (`LUỒNG STREAM GỐC` & `LUỒNG DELAYED — ĐANG GIÁM SÁT`) trong 8–10 giây

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Performance / Stream Quality`
- **Các bước thực hiện:**
  1. Mở trang chi tiết kênh đang phát trực tiếp (ví dụ `VTV3` `/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`).
  2. (Tùy chọn) Bật nút `button[title="Bật/Tắt HLS Telemetry Monitor HUD"]` trên thanh điều khiển của cả 2 khung player để hiển thị thông số HLS trực tiếp trên giao diện.
  3. Dùng `evaluate_script` chạy script đo lường định lượng trong `8000ms` (lấy mẫu mỗi `500ms`) từ file `scripts/check-video-lag.js` cho cả 2 phần tử `<video>` (`index 0`: `LUỒNG STREAM GỐC`, `index 1`: `LUỒNG DELAYED — ĐANG GIÁM SÁT`), thu thập:
     - **Tỷ lệ thời gian phát thực tế (`playbackRatio`)**: `deltaCurrentTime / elapsedWallTimeSec`.
     - **Số khung hình giải mã & bị rớt (`decodedFrames`, `droppedFrames`, `dropRatePercent`, `effectiveFps`)** qua `video.getVideoPlaybackQuality()`.
     - **Sự kiện hụt buffer / khựng hình (`waitingEvents`, `stalledEvents`, `readyStateDrops`, `freezeTicks`)**: số lần `readyState < 3` hoặc `currentTime` đứng yên giữa các chu kỳ `500ms`.
     - **Độ dự trữ bộ đệm phía trước (`minBufferAheadSec`, `avgBufferAheadSec`)**: khoảng cách `buffered.end - currentTime`.
     - **Log cảnh báo từ `TERMINAL LOGS`**: kiểm tra xem trong khu vực log của trang có xuất hiện dòng `[VIDEO] waiting — buffer underrun` hay không.
- **Dữ liệu kiểm thử:** Kênh đang `LIVE` (ví dụ `VTV3`), thời gian đo `8 giây` (`16` mẫu cách nhau `500ms`) đồng thời trên cả 2 luồng.
- **Kết quả mong đợi (Expected):**
  - Cả 2 luồng (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`) đều đạt trạng thái **`SMOOTH` (Mượt — Không giật lag)**:
    - `0.90 <= playbackRatio <= 1.10` (tốc độ phát thực tế bám sát thời gian thực `1.0x`).
    - `effectiveFps >= 20` (chuẩn luồng `25 fps` hoặc `50 fps`).
    - `dropRatePercent < 5%` (tỷ lệ rớt frame dưới `5%`).
    - `waitingEvents === 0`, `readyStateDrops === 0`, `freezeTicks <= 1` (không bị khựng/rebuffering giữa chừng).
    - `minBufferAheadSec >= 1.5s` (luôn có buffer dự trữ an toàn phía trước).
- **Điểm cần chụp minh chứng:** `04-05-04-dual-stream-lag-telemetry.png`
