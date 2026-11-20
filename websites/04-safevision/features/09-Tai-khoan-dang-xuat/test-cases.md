# 04-09 — Tài khoản & Đăng xuất

## Thông tin chung

- **Mã chức năng:** `04-09`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/channels`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh nút tài khoản ở góc phải thanh header (`VTV vtv VT`) mở được menu chứa mục `menuitem "Đăng xuất"`, kết thúc phiên đăng nhập và chặn truy cập lại `/channels` sau khi đã đăng xuất.

## Tiền điều kiện

- Đang đăng nhập hợp lệ trên `https://safevision.cmcati.vn/channels`.

---

## Danh sách Test Case

### TC `04-09-01` — Mở menu tài khoản trên thanh header

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại thanh header (`banner`), nhấn vào nút tài khoản `VTV vtv VT`.
  2. Lấy snapshot kiểm tra menu xổ xuống.
- **Dữ liệu kiểm thử:** Tài khoản `vtv`.
- **Kết quả mong đợi (Expected):**
  - Hiển thị popup menu chứa nhãn `"Tài khoản"` và mục `menuitem "Đăng xuất"` (`[role="menuitem"]`).
- **Điểm cần chụp minh chứng:** `04-09-01-account-menu.png`

---

### TC `04-09-02` — Đăng xuất thành công khỏi hệ thống SafeVision

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở menu tài khoản và nhấn vào `menuitem "Đăng xuất"` (`[role="menuitem"]`).
  2. Chờ trang điều hướng và lấy snapshot.
- **Dữ liệu kiểm thử:** N/A
- **Kết quả mong đợi (Expected):**
  - Hệ thống kết thúc phiên làm việc và chuyển hướng về `https://safevision.cmcati.vn/login`.
  - Hiển thị lại màn hình `Đăng nhập VTV PCD`.
- **Điểm cần chụp minh chứng:** `04-09-02-after-logout.png`

---

### TC `04-09-03` — Kiểm tra bảo vệ route `/channels` sau khi đã đăng xuất

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative / Security`
- **Các bước thực hiện:**
  1. Sau khi đã đăng xuất, dùng `navigate_page` truy cập trực tiếp `https://safevision.cmcati.vn/channels`.
  2. Lấy snapshot và kiểm tra URL hiện tại.
- **Dữ liệu kiểm thử:** URL `https://safevision.cmcati.vn/channels`.
- **Kết quả mong đợi (Expected):**
  - Không cho phép truy cập trang danh sách kênh; tự động chuyển hướng về `https://safevision.cmcati.vn/login?next=%2Fchannels`.
- **Điểm cần chụp minh chứng:** `04-09-03-protected-route-after-logout.png`
