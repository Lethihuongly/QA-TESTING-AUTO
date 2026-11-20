# 03-11 — Tài khoản & Đăng xuất

## Thông tin chung

- **Mã chức năng:** `03-11`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channel/1`, `/logout`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh nút tài khoản `button#userMenuBtn` (`vtv`) mở được menu chứa liên kết `a#logoutBtn` (`Đăng xuất`), thực hiện đăng xuất thành công và chặn truy cập lại các trang điều khiển sau khi đã đăng xuất.

## Tiền điều kiện

- Đang đăng nhập hợp lệ trên `https://anti-logo.cmcati.vn/channel/1`.

---

## Danh sách Test Case

### TC `03-11-01` — Mở menu tài khoản (`button#userMenuBtn`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại góc trên bên phải thanh header, nhấn vào nút tài khoản `button#userMenuBtn` (`vtv`).
  2. Kiểm tra trạng thái mở của menu (`aria-expanded="true"`) và sự hiển thị của nút `a#logoutBtn` (`Đăng xuất`).
- **Dữ liệu kiểm thử:** Tài khoản `vtv`.
- **Kết quả mong đợi (Expected):**
  - Nút `button#userMenuBtn` chuyển sang `aria-expanded="true"` và hiển thị liên kết `a#logoutBtn` (`href="/logout"`, text `"Đăng xuất"`).
- **Điểm cần chụp minh chứng:** `03-11-01-account-menu.png`

---

### TC `03-11-02` — Đăng xuất thành công khỏi hệ thống

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở menu tài khoản và nhấn vào `a#logoutBtn` (`Đăng xuất`).
  2. Chờ trang điều hướng và lấy snapshot.
- **Dữ liệu kiểm thử:** N/A
- **Kết quả mong đợi (Expected):**
  - Hệ thống kết thúc phiên đăng nhập và chuyển hướng về trang `/login?next=%2Fchannel%2F1`.
  - Hiển thị lại form đăng nhập `VTV PCD CONTROL`.
- **Điểm cần chụp minh chứng:** `03-11-02-after-logout.png`

---

### TC `03-11-03` — Kiểm tra bảo vệ route sau khi đã đăng xuất

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative / Security`
- **Các bước thực hiện:**
  1. Sau khi đã đăng xuất, dùng `navigate_page` truy cập trực tiếp `https://anti-logo.cmcati.vn/`.
  2. Lấy snapshot và kiểm tra URL hiện tại.
- **Dữ liệu kiểm thử:** URL `https://anti-logo.cmcati.vn/`
- **Kết quả mong đợi (Expected):**
  - Hệ thống chặn truy cập bàn điều khiển và tự động chuyển hướng về `https://anti-logo.cmcati.vn/login?next=/`.
- **Điểm cần chụp minh chứng:** `03-11-03-protected-route-after-logout.png`
