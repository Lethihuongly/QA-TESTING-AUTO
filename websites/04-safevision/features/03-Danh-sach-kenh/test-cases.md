# 04-03 — Danh sách kênh (`/channels`)

## Thông tin chung

- **Mã chức năng:** `04-03`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/channels`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang `Kênh phát` (`/channels`) hiển thị đầy đủ danh sách 9 kênh truyền hình VTV, thông tin từng thẻ kênh (tên kênh, mã kênh, mô tả, trạng thái `Đang phát`) và liên kết `Chi tiết` dẫn tới trang giám sát kênh.

## Tiền điều kiện

- Đã đăng nhập thành công vào `https://safevision.cmcati.vn/channels`.

---

## Danh sách Test Case

### TC `04-03-01` — Hiển thị danh sách 9 kênh truyền hình tại `/channels`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Truy cập `https://safevision.cmcati.vn/channels`.
  2. Lấy snapshot và kiểm tra tiêu đề `main h1` (`Kênh phát`), bộ đếm `"9 đang hoạt động"`, nút `Thêm kênh` và 9 thẻ kênh (`VTV10`, `VTV8`, `VTV2`, `VTV5`, `VTV1`, `VTV7`, `VTV4`, `VTV3`, `VTV9`).
- **Dữ liệu kiểm thử:** Danh sách 9 kênh từ `GET /api/v1/channels?asList=true`.
- **Kết quả mong đợi (Expected):**
  - Hiển thị đầy đủ 9 thẻ kênh (`main h3` `matchCount = 9`) và 9 liên kết `Chi tiết` (`main a[href^="/channels/"]` `matchCount = 9`).
- **Điểm cần chụp minh chứng:** `04-03-01-channels-list.png`

---

### TC `04-03-02` — Kiểm tra thông tin chi tiết trên thẻ kênh và điều hướng vào `Chi tiết`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Kiểm tra các trường thông tin trên thẻ kênh `VTV3` (`Kênh VTV3 - Giải trí tổng hợp`, trạng thái `Đang phát`, link `Chi tiết`).
  2. Nhấn vào link `Chi tiết` của kênh `VTV3` (`/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`).
- **Dữ liệu kiểm thử:** Kênh `VTV3` (`id=5d5a7da4-478e-40a3-be39-bef238c2772a`).
- **Kết quả mong đợi (Expected):**
  - Điều hướng chính xác sang `/channels/5d5a7da4-478e-40a3-be39-bef238c2772a` và hiển thị màn hình giám sát kênh `VTV3`.
- **Điểm cần chụp minh chứng:** `04-03-02-navigate-vtv3.png`

---

### TC `04-03-03` — Khảo sát nút `Thêm kênh` (ngoài phạm vi lượt đầu)

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Kiểm tra sự hiện diện của nút `Thêm kênh` trên trang `/channels` (không tạo/xóa kênh trên môi trường thực tế).
- **Dữ liệu kiểm thử:** N/A
- **Kết quả mong đợi (Expected):**
  - Nút `Thêm kênh` hiển thị trên thanh công cụ trang `/channels`.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không thêm/sửa/xóa kênh).
- **Điểm cần chụp minh chứng:** `04-03-03-add-channel-btn.png`
