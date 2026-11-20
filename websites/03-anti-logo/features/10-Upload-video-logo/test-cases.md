# 03-10 — Upload Video & Logo (`#videoUpload`, `#logoUpload`)

## Thông tin chung

- **Mã chức năng:** `03-10`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channel/1`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Khảo sát các phần tử tải lên video (`input#videoUpload`) và tải lên logo bổ sung (`input#logoUpload`). Theo quy tắc an toàn lượt đầu, **không** thực thi upload file lên server (`NOT_RUN`).

## Tiền điều kiện

- Đã đăng nhập vào `https://anti-logo.cmcati.vn/channel/1`.

---

## Danh sách Test Case

### TC `03-10-01` — Tải lên video kiểm thử mới (`Upload Your Videos` — `input#videoUpload`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Chọn file video hợp lệ qua `input#videoUpload`.
- **Dữ liệu kiểm thử:** File video `.mp4` (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Tải lên video thành công và thêm vào danh sách `#defaultVideos`.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không chạy upload file).
- **Điểm cần chụp minh chứng:** `03-10-01-upload-video.png`

---

### TC `03-10-02` — Tải lên ảnh logo bổ sung (`Upload Extra Logos` — `input#logoUpload`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Chọn file ảnh logo qua `input#logoUpload`.
- **Dữ liệu kiểm thử:** File ảnh logo `.png`/`.jpg` (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Tải lên logo bổ sung thành công.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không chạy upload file).
- **Điểm cần chụp minh chứng:** `03-10-02-upload-logo.png`

---

### TC `03-10-03` — Kiểm tra từ chối định dạng file không hợp lệ khi upload

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative`
- **Các bước thực hiện:**
  1. Thử chọn file sai định dạng vào `#videoUpload` hoặc `#logoUpload`.
- **Dữ liệu kiểm thử:** File không hợp lệ (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Hệ thống từ chối và thông báo lỗi định dạng.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu`.
- **Điểm cần chụp minh chứng:** `03-10-03-upload-invalid.png`
