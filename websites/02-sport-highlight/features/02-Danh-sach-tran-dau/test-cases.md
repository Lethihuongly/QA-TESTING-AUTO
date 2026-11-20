# 02-02 — Danh sách trận đấu

## Thông tin chung

- **Mã chức năng:** `02-02`
- **Website:** `Sport Highlight` (`02`)
- **URL liên quan:** `https://sport-highlight.cmcati.vn/matches`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang Quản lý trận đấu (`/matches`) tải và hiển thị đầy đủ danh sách trận đấu, thông tin mỗi thẻ trận (hai đội bóng, giải đấu, thời lượng, trạng thái, ngày giờ) và điều hướng sang trang chi tiết trận đấu.

## Tiền điều kiện

- Đã đăng nhập thành công vào `https://sport-highlight.cmcati.vn/matches`.

---

## Danh sách Test Case

### TC `02-02-01` — Hiển thị danh sách trận đấu tại trang `/matches`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Truy cập `https://sport-highlight.cmcati.vn/matches`.
  2. Chờ API `GET /api/matches?page=1&page_size=12&order_by=created_at&order_dir=desc` hoàn tất.
  3. Lấy snapshot và kiểm tra thanh công cụ (`Danh mục`, `Làm mới danh sách trận`, `Trận mới`), bộ lọc bên trái và danh sách thẻ trận đấu.
- **Dữ liệu kiểm thử:** Trang 1 mặc định (`page_size=12`).
- **Kết quả mong đợi (Expected):**
  - API `GET /api/matches` trả HTTP `200`.
  - Hiển thị tổng số trận đấu (ví dụ `207 trận đấu`), chỉ số trang (`Trang 1 / 18`) và 12 thẻ trận đấu trên trang đầu.
  - Không có lỗi runtime JavaScript trong Console.
- **Điểm cần chụp minh chứng:** `02-02-01-match-list.png`

---

### TC `02-02-02` — Kiểm tra thông tin hiển thị trên thẻ trận đấu và nút Làm mới

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Quan sát các thẻ trận đấu trên trang `/matches` (ví dụ `Troyes vs Le Mans`, `Nice vs Rennes`, `Racing Santander vs Real Madrid`).
  2. Kiểm tra các trường thông tin trên từng thẻ: trạng thái (`Đã kết thúc`), thời gian (`02:30 01 thg 11`), tên hai đội, giải đấu, thời lượng ghi hình (`180 phút`) và nút menu tuỳ chọn (`Tuỳ chọn cho trận ...`).
  3. Nhấn nút `Làm mới danh sách trận` (`button[aria-label="Làm mới danh sách trận"]`).
- **Dữ liệu kiểm thử:** Các thẻ trận đấu trên trang 1 (`/matches`).
- **Kết quả mong đợi (Expected):**
  - Mỗi thẻ trận đấu hiển thị đầy đủ tên 2 đội, giải đấu (hoặc `Chưa có giải đấu`), thời lượng, trạng thái và link `a[href^="/matches/"]`.
  - Nút `Làm mới danh sách trận` hoạt động bình thường, tải lại danh sách mà không gây lỗi.
- **Điểm cần chụp minh chứng:** `02-02-02-match-card-info.png`

---

### TC `02-02-03` — Điều hướng từ danh sách vào chi tiết trận đấu

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại danh sách `/matches`, nhấn vào thẻ trận đấu `Troyes – – Le Mans` (`id=775f9ccd-6933-422b-9b76-5cd13a553ba1`).
  2. Kiểm tra URL và nội dung trang đích.
- **Dữ liệu kiểm thử:** Trận `Troyes vs Le Mans` (`/matches/775f9ccd-6933-422b-9b76-5cd13a553ba1?fromPage=1`).
- **Kết quả mong đợi (Expected):**
  - Chuyển hướng sang `/matches/775f9ccd-6933-422b-9b76-5cd13a553ba1?fromPage=1`.
  - Hiển thị đúng tiêu đề trận `Troyes vs Le Mans`, trình phát video và khu vực phân đoạn AI.
- **Điểm cần chụp minh chứng:** `02-02-03-navigate-match-detail.png`
