# 04-01 — Đăng nhập

## Thông tin chung

- **Mã chức năng:** `04-01`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/login?next=%2F`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang đăng nhập `VTV Logo Detection – AI Enterprise Platform` (`Đăng nhập VTV PCD`) hiển thị đầy đủ form đăng nhập, tự động chuyển hướng từ `/` sang `/login?next=%2F` khi chưa xác thực, kiểm tra ràng buộc `required` khi bỏ trống và đăng nhập hợp lệ vào hệ thống.

## Tiền điều kiện

- Trình duyệt mở qua `chrome-devtools` MCP ở trạng thái chưa đăng nhập khi kiểm tra hiển thị form.
- Người kiểm thử hỗ trợ nhập tài khoản/mật khẩu hợp lệ trên cửa sổ Chrome do MCP mở.

---

## Danh sách Test Case

### TC `04-01-01` — Hiển thị màn hình đăng nhập `Đăng nhập VTV PCD` và chuyển hướng khi chưa xác thực

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở `https://safevision.cmcati.vn/` bằng `navigate_page` khi chưa đăng nhập.
  2. Lấy snapshot trang bằng `take_snapshot`.
  3. Kiểm tra các phần tử: tiêu đề `main h3` (`Đăng nhập VTV PCD`), phụ đề `Truy cập hệ thống để giám sát kênh phát hiện logo`, ô `input#username`, ô `input#password`, nút `button[aria-label="Hiện mật khẩu"]` và nút `form button[type="submit"]` (`Đăng nhập`).
- **Dữ liệu kiểm thử:** URL `https://safevision.cmcati.vn/`
- **Kết quả mong đợi (Expected):**
  - Hệ thống tự động chuyển hướng sang `https://safevision.cmcati.vn/login?next=%2F`.
  - Hiển thị đầy đủ form đăng nhập với `input#username`, `input#password`, `button[aria-label="Hiện mật khẩu"]` và `form button[type="submit"]`.
- **Điểm cần chụp minh chứng:** `04-01-01-login-page.png`

---

### TC `04-01-02` — Đăng nhập thành công với tài khoản hợp lệ

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang `https://safevision.cmcati.vn/login?next=%2F`, người dùng nhập tài khoản và mật khẩu hợp lệ trên trình duyệt.
  2. Nhấn nút `Đăng nhập` (`form button[type="submit"]`).
  3. Chờ điều hướng hoàn tất và lấy snapshot trang chủ.
- **Dữ liệu kiểm thử:** Tài khoản hợp lệ (do người dùng nhập trực tiếp, không lưu vào file).
- **Kết quả mong đợi (Expected):**
  - Chuyển hướng thành công sang `https://safevision.cmcati.vn/` và hiển thị giao diện chính của SafeVision.
- **Điểm cần chụp minh chứng:** `04-01-02-after-login.png`

---

### TC `04-01-03` — Kiểm tra thông báo lỗi khi để trống thông tin đăng nhập

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative`
- **Các bước thực hiện:**
  1. Ở màn hình `https://safevision.cmcati.vn/login?next=%2F`, để trống cả `input#username` và `input#password`.
  2. Nhấn nút `Đăng nhập` (`form button[type="submit"]`).
  3. Kiểm tra cảnh báo HTML5 validation và URL hiện tại.
- **Dữ liệu kiểm thử:** Username = `""`, Password = `""`
- **Kết quả mong đợi (Expected):**
  - Cả hai trường có thuộc tính `required=true`.
  - Trình duyệt hiển thị cảnh báo `Please fill out this field.` và giữ nguyên trang `/login?next=%2F`.
- **Điểm cần chụp minh chứng:** `04-01-03-empty-validation.png`
