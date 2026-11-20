# 04-04 — Chi tiết kênh (`/channels/{id}`)

## Thông tin chung

- **Mã chức năng:** `04-04`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/channels/{id}`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang chi tiết kênh hiển thị đúng thông tin định danh kênh (`VTV3`, `Kênh VTV3 - Giải trí tổng hợp`, `Hà Nội`, `Đang hoạt động`), khu vực player kép (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`), khối `KÊNH SỰ KIỆN PHÁT HIỆN`, bảng `Danh sách các phát hiện` và xử lý khi truy cập ID kênh không tồn tại.

## Tiền điều kiện

- Đã đăng nhập vào SafeVision.

---

## Danh sách Test Case

### TC `04-04-01` — Hiển thị trang chi tiết kênh truyền hình hợp lệ (`VTV3`)

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở trang chi tiết kênh `VTV3` tại `https://safevision.cmcati.vn/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`.
  2. Lấy snapshot và kiểm tra các thành phần: nút `Quay lại` (`button[title="Quay lại danh sách kênh"]`), tên kênh `VTV3`, mô tả `Kênh VTV3 - Giải trí tổng hợp`, vị trí `Hà Nội`, trạng thái `Đang hoạt động`, khung stream, `MENU CẤU HÌNH & THIẾT LẬP`, `KÊNH SỰ KIỆN PHÁT HIỆN` và bảng `Danh sách các phát hiện`.
- **Dữ liệu kiểm thử:** Channel ID `5d5a7da4-478e-40a3-be39-bef238c2772a` (`VTV3`).
- **Kết quả mong đợi (Expected):**
  - Hiển thị đầy đủ các khối thông tin kênh, trạng thái `RUNNING` (`Playout Delay Buffer: 20s Active`) và bảng `Danh sách các phát hiện` (`13459 bản ghi`).
- **Điểm cần chụp minh chứng:** `04-04-01-channel-detail-vtv3.png`

---

### TC `04-04-02` — Điều hướng quay lại danh sách kênh từ trang chi tiết

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang chi tiết kênh, nhấn nút `Quay lại` (`button[title="Quay lại danh sách kênh"]`).
  2. Kiểm tra URL và nội dung trang đích.
- **Dữ liệu kiểm thử:** Từ `/channels/5d5a7da4-478e-40a3-be39-bef238c2772a` quay về `/channels`.
- **Kết quả mong đợi (Expected):**
  - Điều hướng về `https://safevision.cmcati.vn/channels` và hiển thị danh sách 9 kênh phát.
- **Điểm cần chụp minh chứng:** `04-04-02-back-to-channels.png`

---

### TC `04-04-03` — Truy cập trang chi tiết kênh với ID không tồn tại

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative`
- **Các bước thực hiện:**
  1. Truy cập URL `https://safevision.cmcati.vn/channels/00000000-0000-0000-0000-000000000000`.
  2. Lấy snapshot và kiểm tra thông báo lỗi trên giao diện.
  3. Nhấn nút `Quay lại danh sách kênh`.
- **Dữ liệu kiểm thử:** Channel ID `00000000-0000-0000-0000-000000000000`.
- **Kết quả mong đợi (Expected):**
  - Hiển thị thông báo rõ ràng: tiêu đề `h2` `"Không tìm thấy kênh"`, nội dung `"Kênh được yêu cầu không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống."` và nút `"Quay lại danh sách kênh"` hoạt động bình thường.
- **Điểm cần chụp minh chứng:** `04-04-03-invalid-channel-id.png`
