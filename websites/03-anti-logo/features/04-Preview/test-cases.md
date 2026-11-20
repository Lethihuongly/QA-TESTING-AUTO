# 03-04 — Preview (Xem luồng Video Stream, HLS Metrics & Kiểm tra Giật Lag)

## Thông tin chung

- **Mã chức năng:** `03-04`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channel/1` (hoặc `/channel/2`, `/channel/3`)
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh khung `Video Stream đa luồng` phát được luồng trực tiếp (`hls-playing`), hiển thị tùy chọn `Preview Method` (`HLS`, `WebRTC`, `MJPEG`), bảng thông số `Chi tiết kỹ thuật / HLS metrics` và **đo lường định lượng xem luồng video có bị giật, lag, đứng hình (freeze), rớt khung hình (dropped frames) hoặc cạn bộ đệm (buffer underrun) hay không**.

## Tiền điều kiện

- Đã đăng nhập và mở trang kênh đang có luồng phát hoạt động (`/channel/1`, `/channel/2`, `/channel/3` hoặc `/channels`).

---

## Danh sách Test Case

### TC `03-04-01` — Phát luồng trực tiếp trong khung `Video Stream đa luồng`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Tại trang `/channel/1`, kiểm tra khung `Video Stream đa luồng` (`virtual-sdi-BONGDA_HD`).
  2. Dùng `evaluate_script` kiểm tra trạng thái phần tử `<video>` (`readyState`, `currentTime`, `paused`, `videoWidth`, `videoHeight`, `error`) và nhãn trạng thái `hls-playing`.
- **Dữ liệu kiểm thử:** Luồng `virtual-sdi-BONGDA_HD` trên `/channel/1`.
- **Kết quả mong đợi (Expected):**
  - Phần tử `<video>` phát bình thường (`readyState = 4`, `paused = false`, độ phân giải `1920x1080`, `error = null`).
  - Hiển thị trạng thái `hls-playing` và nút `Expand preview`.
- **Điểm cần chụp minh chứng:** `03-04-01-preview-hls-playing.png`

---

### TC `03-04-02` — Kiểm tra hộp chọn `Preview Method` và nút `Watch Active Live Stream`

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Kiểm tra phần tử `select#previewMethod` (`Preview Method`) và các tùy chọn bên trong.
  2. Kiểm tra nút `button#runBtn` (`👁️ Watch Active Live Stream` hoặc `Start Real-Time Content Control`).
- **Dữ liệu kiểm thử:** `select#previewMethod`
- **Kết quả mong đợi (Expected):**
  - `select#previewMethod` đang bật (`disabled = false`), gồm 3 phương thức: `HLS` (mặc định), `WebRTC`, `MJPEG`.
  - Nút `button#runBtn` hiển thị đúng trạng thái kênh.
- **Điểm cần chụp minh chứng:** `03-04-02-preview-method.png`

---

### TC `03-04-03` — Hiển thị bảng `Chi tiết kỹ thuật / HLS metrics`

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Quan sát khối `Chi tiết kỹ thuật / HLS metrics` bên dưới khung video preview.
  2. Kiểm tra các nhóm chỉ số: `Preview elapsed`, `Continuous buffer`, `readyState`, `Control timing` (`YOLO`, `Control E2E`), `AI blur diagnostics` (`Source FPS: 50.00`).
- **Dữ liệu kiểm thử:** Luồng `virtual-sdi-BONGDA_HD` trên `/channel/1`.
- **Kết quả mong đợi (Expected):**
  - Hiển thị đầy đủ các thông số kỹ thuật thời gian thực (`readyState: 4`, `Source FPS: 50.00`, `Control E2E: ~35-75 ms`, `rebuffering: no`).
- **Điểm cần chụp minh chứng:** `03-04-03-hls-metrics.png`

---

### TC `03-04-04` — Kiểm tra định lượng hiện tượng Giật / Lag / Đứng hình / Rớt Frame trên luồng Video (`8–10 giây`)

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Performance / Stream Quality`
- **Các bước thực hiện:**
  1. Mở kênh đang phát luồng trực tiếp (`/channel/1`, `/channel/2`, `/channel/3` hoặc `/channels`).
  2. Dùng `evaluate_script` chạy script đo lường trong cửa sổ **8 giây** (`scripts/check-video-lag.js`), lấy mẫu mỗi `500ms` các thông số:
     - `currentTime` tăng thêm bao nhiêu giây so với `8.0s` thực tế (`playbackRatio = deltaVideoTime / deltaWallTime`).
     - `getVideoPlaybackQuality()`: số frame giải mã thêm (`decodedFrames`), số frame bị rớt (`droppedFrames`), `effectiveFps` và `dropRatePercent`.
     - Số lần xảy ra sự kiện `waiting` / `stalled` hoặc `readyState < 3` (`stallCount`).
     - Độ dài bộ đệm tải trước (`bufferAheadSec = buffered.end - currentTime`).
     - Đối chiếu thêm thông số `rebuffering` và `Continuous buffer` trên khối `HLS metrics` của UI.
- **Dữ liệu kiểm thử:** Các phần tử `<video>` đang phát trên trang.
- **Kết quả mong đợi (Expected — Tiêu chuẩn Không Giật Lag):**
  - **Không đứng hình (No Freeze):** `deltaVideoTime > 0` và `paused === false`.
  - **Tốc độ phát chuẩn (Playback Ratio):** `0.90 <= playbackRatio <= 1.10` (8 giây thực tế thì video tiến thêm từ `7.2s` đến `8.8s`).
  - **Không khựng/chờ nạp (No Buffering Stalls):** `waitingEvents === 0`, `readyStateDrops === 0`, chỉ số UI `rebuffering: no`.
  - **Tỷ lệ rớt khung hình thấp (Dropped Frames):** `dropRatePercent < 5%` và `effectiveFps >= 20 FPS`.
  - **Bộ đệm an toàn (Buffer Health):** `bufferAheadSec >= 1.5s`.
  - *(Nếu vi phạm bất kỳ ngưỡng nào ở trên: đánh `FAIL` và ghi rõ video bị đứng hình / giật khựng do buffer hay do rớt frame giải mã)*.
- **Điểm cần chụp minh chứng:** Kết quả JSON từ `scripts/check-video-lag.js`.
