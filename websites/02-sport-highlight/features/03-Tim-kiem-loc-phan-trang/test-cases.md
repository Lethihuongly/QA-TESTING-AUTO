# 02-03 — Tìm kiếm, lọc và phân trang

## Thông tin chung

- **Mã chức năng:** `02-03`
- **Website:** `Sport Highlight` (`02`)
- **URL liên quan:** `https://sport-highlight.cmcati.vn/matches`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh bộ lọc bên trái (`aside form`) của trang `/matches` cho phép tìm kiếm theo từ khóa đội/trận đấu, xử lý từ khóa không khớp, đặt lại bộ lọc (`Đặt lại`) và chuyển trang (`Trước` / `Tiếp`).

## Tiền điều kiện

- Đã đăng nhập và đang ở màn hình `https://sport-highlight.cmcati.vn/matches`.

---

## Danh sách Test Case

### TC `02-03-01` — Tìm kiếm trận đấu theo từ khóa hợp lệ và Đặt lại bộ lọc

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Nhập từ khóa `"Real Madrid"` vào ô `Từ khóa đội hoặc trận đấu` (`aside form input[placeholder="Từ khóa đội hoặc trận đấu"]`).
  2. Nhấn nút `Áp dụng`.
  3. Kiểm tra danh sách trận đấu trả về và số lượng kết quả.
  4. Nhấn nút `Đặt lại` để xóa bộ lọc.
- **Dữ liệu kiểm thử:** Từ khóa `"Real Madrid"`
- **Kết quả mong đợi (Expected):**
  - Sau khi nhấn `Áp dụng`, danh sách lọc còn các trận có `"Real Madrid"` (ví dụ `12 trận đấu`, `Trang 1 / 1`, tất cả thẻ đều chứa `Real Madrid`).
  - Sau khi nhấn `Đặt lại`, ô tìm kiếm được xóa trắng và danh sách khôi phục toàn bộ trận đấu (`207 trận đấu`, `Trang 1 / 18`).
- **Điểm cần chụp minh chứng:** `02-03-01-search-real-madrid.png`

---

### TC `02-03-02` — Tìm kiếm với từ khóa không tồn tại

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative / Boundary`
- **Các bước thực hiện:**
  1. Nhập chuỗi `"xyz_khong_ton_tai_9999"` vào ô `Từ khóa đội hoặc trận đấu`.
  2. Nhấn nút `Áp dụng`.
  3. Quan sát thông báo trạng thái rỗng trên giao diện.
- **Dữ liệu kiểm thử:** Từ khóa `"xyz_khong_ton_tai_9999"`
- **Kết quả mong đợi (Expected):**
  - Hiển thị `0 trận đấu` (`Trang 1 / 1`).
  - Hiển thị thông báo trạng thái rỗng rõ ràng: `"Không tìm thấy trận đấu"` và `"Điều chỉnh bộ lọc hoặc tạo trận mới để bắt đầu ghi hình."`
  - Không phát sinh lỗi crash giao diện.
- **Điểm cần chụp minh chứng:** `02-03-02-empty-search.png`

---

### TC `02-03-03` — Phân trang danh sách trận đấu (`Tiếp` / `Trước`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Ở trạng thái danh sách mặc định (`Trang 1 / 18`), kiểm tra nút `Trước` (`nav[aria-label="pagination"] a[aria-label="Go to previous page"]`).
  2. Nhấn nút `Tiếp` (`nav[aria-label="pagination"] a[aria-label="Go to next page"]`).
  3. Quan sát chỉ số trang và danh sách trận đấu trên trang 2.
- **Dữ liệu kiểm thử:** Chuyển từ trang 1 sang trang 2.
- **Kết quả mong đợi (Expected):**
  - Ở trang 1, nút `Trước` ở trạng thái `disabled`.
  - Sau khi nhấn `Tiếp`, chỉ số trang cập nhật thành `Trang 2 / 18` (`2 / 18`), nút `Trước` được bật và danh sách hiển thị 12 trận tiếp theo (ví dụ `Levante vs Oviedo`, `Atletico Madrid vs Athletic Bilbao`, ...).
- **Điểm cần chụp minh chứng:** `02-03-03-pagination-page2.png`
