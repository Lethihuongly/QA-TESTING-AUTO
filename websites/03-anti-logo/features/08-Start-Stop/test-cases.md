# 03-08 — Start / Stop Stream

## Thông tin chung

- **Mã chức năng:** `03-08`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channel/1`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Khảo sát các nút điều khiển `Start` / `Watch Active Live Stream` (`button#runBtn`) và `Stop current stream` (`button#stopBtn`). Theo quy tắc an toàn lượt đầu, **tuyệt đối không** thực thi Start/Stop hoặc tác động kênh đang LIVE (`NOT_RUN`).

## Tiền điều kiện

- Đã đăng nhập vào `https://anti-logo.cmcati.vn/channel/1`.

---

## Danh sách Test Case

### TC `03-08-01` — Khảo sát hiển thị nút `Watch Active Live Stream` (`#runBtn`) và `Stop current stream` (`#stopBtn`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Kiểm tra sự tồn tại và trạng thái của `button#runBtn` và `button#stopBtn` trên giao diện `/channel/1` (chỉ kiểm tra DOM, không nhấn Stop).
- **Dữ liệu kiểm thử:** Kênh 1 (`/channel/1`).
- **Kết quả mong đợi (Expected):**
  - Hiển thị `button#runBtn` (`👁️ Watch Active Live Stream`) và `button#stopBtn` (`Stop current stream`).
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không chạy Start/Stop).
- **Điểm cần chụp minh chứng:** `03-08-01-start-stop-buttons.png`

---

### TC `03-08-02` — Dừng luồng xử lý đang chạy (`Stop current stream`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Nhấn nút `button#stopBtn` (`Stop current stream`) trên kênh thử nghiệm.
- **Dữ liệu kiểm thử:** Kênh thử nghiệm (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Dừng luồng xử lý và mở khóa danh sách chọn nguồn video/SDI.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không tác động kênh đang LIVE).
- **Điểm cần chụp minh chứng:** `03-08-02-stop-stream.png`

---

### TC `03-08-03` — Khởi chạy luồng xử lý mới (`Start`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Chọn nguồn phát và nhấn nút `button#runBtn` để bắt đầu xử lý.
- **Dữ liệu kiểm thử:** Video mẫu (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Luồng bắt đầu chạy và phát preview HLS.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu`.
- **Điểm cần chụp minh chứng:** `03-08-03-start-stream.png`
