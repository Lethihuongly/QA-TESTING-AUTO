# 04-07 — Tìm kiếm & Lọc

## Thông tin chung

- **Mã chức năng:** `04-07`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/channels`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh chức năng tìm kiếm kênh theo tên/mã kênh trên trang `/channels` (`main input[placeholder="Tìm kiếm theo tên hoặc mã kênh..."]`), xử lý trạng thái không có kết quả và kiểm tra ô tìm kiếm toàn cục trên thanh header (`header input[placeholder="Tìm kiếm kênh, logo, kết quả..."]`).

## Tiền điều kiện

- Đã đăng nhập và truy cập `https://safevision.cmcati.vn/channels`.

---

## Danh sách Test Case

### TC `04-07-01` — Tìm kiếm kênh theo tên/mã kênh hợp lệ tại `/channels`

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang `/channels`, nhập `"VTV3"` vào ô `main input[placeholder="Tìm kiếm theo tên hoặc mã kênh..."]`.
  2. Lấy snapshot và kiểm tra danh sách thẻ kênh hiển thị.
- **Dữ liệu kiểm thử:** Từ khóa `"VTV3"`.
- **Kết quả mong đợi (Expected):**
  - Danh sách lọc chính xác còn thẻ kênh `VTV3` (`Kênh VTV3 - Giải trí tổng hợp`, link `Chi tiết`).
- **Điểm cần chụp minh chứng:** `04-07-01-search-channel-vtv3.png`

---

### TC `04-07-02` — Tìm kiếm kênh với từ khóa không tồn tại tại `/channels`

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative / Boundary`
- **Các bước thực hiện:**
  1. Nhập `"xyz_khong_ton_tai_9999"` vào ô `main input[placeholder="Tìm kiếm theo tên hoặc mã kênh..."]`.
  2. Quan sát thông báo hiển thị trên giao diện.
- **Dữ liệu kiểm thử:** Từ khóa `"xyz_khong_ton_tai_9999"`.
- **Kết quả mong đợi (Expected):**
  - Hiển thị thông báo trạng thái rỗng rõ ràng: tiêu đề `h3` `"Không tìm thấy kênh nào"` và nội dung `"Không có kênh nào khớp với \"xyz_khong_ton_tai_9999\""`.
- **Điểm cần chụp minh chứng:** `04-07-02-search-channel-empty.png`

---

### TC `04-07-03` — Kiểm tra ô tìm kiếm toàn cục trên thanh header (`Tìm kiếm kênh, logo, kết quả...`)

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive / Functional`
- **Các bước thực hiện:**
  1. Nhập từ khóa `"VTV3"` vào ô `header input[placeholder="Tìm kiếm kênh, logo, kết quả..."]` (`⌘K`) trên thanh header.
  2. Quan sát phản hồi tìm kiếm hoặc danh sách gợi ý kết quả.
- **Dữ liệu kiểm thử:** Từ khóa `"VTV3"`.
- **Kết quả mong đợi (Expected):**
  - Ô tìm kiếm toàn cục thực hiện tìm kiếm hoặc hiển thị danh sách kết quả/gợi ý khớp với từ khóa.
- **Điểm cần chụp minh chứng:** `04-07-03-header-global-search.png`
