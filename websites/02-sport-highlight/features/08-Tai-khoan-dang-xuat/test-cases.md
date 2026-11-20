# 02-08 — Tài khoản & Đăng xuất

## Thông tin chung

- **Mã chức năng:** `02-08`
- **Website:** `Sport Highlight` (`02`)
- **URL liên quan:** `https://sport-highlight.cmcati.vn/matches`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh menu tài khoản (`button[aria-label="Mở menu tài khoản"]`) mở được tuỳ chọn `Đăng xuất`, kết thúc phiên làm việc và chặn truy cập lại `/matches` sau khi đã đăng xuất.

## Tiền điều kiện

- Đang đăng nhập hợp lệ trên `https://sport-highlight.cmcati.vn/matches`.

---

## Danh sách Test Case

### TC `02-08-01` — Mở menu tài khoản trên thanh công cụ

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang `/matches`, nhấn vào nút `Mở menu tài khoản` (`button[aria-label="Mở menu tài khoản"]`).
  2. Lấy snapshot để kiểm tra menu xổ xuống (`[role="menu"]`).
- **Dữ liệu kiểm thử:** Phiên đăng nhập hiện tại.
- **Kết quả mong đợi (Expected):**
  - Hiển thị menu dọc (`[role="menu"]`) chứa mục `menuitem "Đăng xuất"` (`[role="menu"] [role="menuitem"]`).
- **Điểm cần chụp minh chứng:** `02-08-01-account-menu.png`

---

### TC `02-08-02` — Đăng xuất thành công khỏi hệ thống

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở menu tài khoản (`button[aria-label="Mở menu tài khoản"]`).
  2. Nhấn vào mục `Đăng xuất` (`[role="menu"] [role="menuitem"]`).
  3. Chờ trang chuyển hướng và lấy snapshot.
- **Dữ liệu kiểm thử:** N/A
- **Kết quả mong đợi (Expected):**
  - Hệ thống xóa phiên đăng nhập và chuyển hướng về `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`.
  - Hiển thị lại form đăng nhập.
- **Điểm cần chụp minh chứng:** `02-08-02-after-logout.png`

---

### TC `02-08-03` — Kiểm tra bảo vệ route `/matches` sau khi đã đăng xuất

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative / Security`
- **Các bước thực hiện:**
  1. Sau khi đã đăng xuất ở `02-08-02`, dùng `navigate_page` truy cập trực tiếp `https://sport-highlight.cmcati.vn/matches`.
  2. Lấy snapshot và kiểm tra URL hiện tại.
- **Dữ liệu kiểm thử:** URL `https://sport-highlight.cmcati.vn/matches`
- **Kết quả mong đợi (Expected):**
  - Không cho phép truy cập màn hình Quản lý trận đấu; tự động chuyển hướng về `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`.
- **Điểm cần chụp minh chứng:** `02-08-03-protected-route-after-logout.png`
