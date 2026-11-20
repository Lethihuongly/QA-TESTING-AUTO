# 03-01 — Đăng nhập

## Thông tin chung

- **Mã chức năng:** `03-01`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/login?next=/`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang đăng nhập Hệ thống kiểm soát nội dung thông minh VTV (`VTV PCD CONTROL`) hiển thị đầy đủ thành phần, bảo vệ route `/` khi chưa xác thực, kiểm tra ràng buộc `required` khi bỏ trống và cho phép đăng nhập hợp lệ vào bàn điều khiển.

## Tiền điều kiện

- Trình duyệt mở qua `chrome-devtools` MCP ở trạng thái chưa đăng nhập khi kiểm tra hiển thị form.
- Người kiểm thử hỗ trợ nhập tài khoản/mật khẩu hợp lệ trên cửa sổ Chrome do MCP mở.

---

## Danh sách Test Case

### TC `03-01-01` — Hiển thị trang đăng nhập `VTV PCD CONTROL` và chuyển hướng khi chưa xác thực

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở `https://anti-logo.cmcati.vn/` bằng `navigate_page` khi chưa có phiên đăng nhập.
  2. Lấy snapshot trang bằng `take_snapshot`.
  3. Kiểm tra các phần tử: logo `VTV PCD Logo`, tiêu đề `h1` (`VTV PCD CONTROL`), ô `input#usernameInput`, ô `input#passwordInput`, nút `Hiện mật khẩu` và nút `Đăng nhập`.
- **Dữ liệu kiểm thử:** URL `https://anti-logo.cmcati.vn/`
- **Kết quả mong đợi (Expected):**
  - Hệ thống tự động chuyển hướng sang `https://anti-logo.cmcati.vn/login?next=/`.
  - Hiển thị đầy đủ form đăng nhập với `input#usernameInput`, `input#passwordInput`, nút `Hiện mật khẩu` và `form button[type="submit"]`.
- **Điểm cần chụp minh chứng:** `03-01-01-login-page.png`

---

### TC `03-01-02` — Đăng nhập thành công vào bàn điều khiển `VTV PCD`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang `https://anti-logo.cmcati.vn/login?next=/`, người dùng nhập tài khoản và mật khẩu hợp lệ trên trình duyệt.
  2. Nhấn nút `Đăng nhập` (`form button[type="submit"]`).
  3. Chờ điều hướng hoàn tất và lấy snapshot trang chủ.
- **Dữ liệu kiểm thử:** Tài khoản hợp lệ (do người dùng nhập trực tiếp, không lưu vào file).
- **Kết quả mong đợi (Expected):**
  - Chuyển hướng thành công sang `https://anti-logo.cmcati.vn/` (`CMC ATI - VTV`).
  - Hiển thị thanh điều hướng kênh (`Kênh 1`, `Kênh 2`, `Kênh 3`, `📺 Multi-Channel (3 SDI)`), nút tài khoản `button#userMenuBtn` (`vtv`), khung preview và bảng `Logs`.
- **Điểm cần chụp minh chứng:** `03-01-02-after-login.png`

---

### TC `03-01-03` — Kiểm tra ràng buộc `required` khi để trống thông tin đăng nhập

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative`
- **Các bước thực hiện:**
  1. Ở màn hình `https://anti-logo.cmcati.vn/login?next=/`, để trống `input#usernameInput` và `input#passwordInput`.
  2. Nhấn nút `Đăng nhập` (`form button[type="submit"]`).
  3. Kiểm tra trạng thái HTML5 validation (`required`, `checkValidity()`, `validationMessage`) và URL hiện tại.
- **Dữ liệu kiểm thử:** Username = `""`, Password = `""`
- **Kết quả mong đợi (Expected):**
  - Cả hai trường có thuộc tính `required=true`, `checkValidity()=false`.
  - Trình duyệt hiển thị cảnh báo `Please fill out this field.` và giữ nguyên trang `/login?next=/`.
- **Điểm cần chụp minh chứng:** `03-01-03-empty-validation.png`
