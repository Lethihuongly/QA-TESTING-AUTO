# 02-01 — Đăng nhập

## Thông tin chung

- **Mã chức năng:** `02-01`
- **Website:** `Sport Highlight` (`02`)
- **URL liên quan:** `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang đăng nhập của Sport Highlight hiển thị đúng form đăng nhập (`CMCATI Highlight` / `VTV HIGHLIGHT`), bảo vệ route `/matches` khi chưa xác thực (`GET /api/auth/me` trả `401`), kiểm tra ràng buộc `required` khi bỏ trống và cho phép đăng nhập hợp lệ vào `/matches`.

## Tiền điều kiện

- Trình duyệt mở qua `chrome-devtools` MCP ở trạng thái chưa đăng nhập khi kiểm tra hiển thị form.
- Người kiểm thử hỗ trợ nhập tài khoản/mật khẩu hợp lệ trên cửa sổ Chrome do MCP mở.

---

## Danh sách Test Case

### TC `02-01-01` — Hiển thị màn hình đăng nhập và chuyển hướng khi chưa xác thực

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở `https://sport-highlight.cmcati.vn/matches` bằng `navigate_page` khi chưa có phiên đăng nhập.
  2. Lấy snapshot trang bằng `take_snapshot` và kiểm tra network request `GET /api/auth/me`.
  3. Kiểm tra các phần tử: tiêu đề `Đăng nhập`, ô `input#username`, ô `input#password`, nút `Hiện mật khẩu` và nút `Đăng nhập`.
- **Dữ liệu kiểm thử:** URL `https://sport-highlight.cmcati.vn/matches`
- **Kết quả mong đợi (Expected):**
  - Hệ thống trả `GET /api/auth/me [401]` và tự động chuyển hướng sang `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`.
  - Hiển thị đầy đủ form đăng nhập với `input#username`, `input#password`, `button[aria-label="Hiện mật khẩu"]` và `form button[type="submit"]`.
  - Không phát sinh lỗi runtime JavaScript ngoài response `401` kiểm tra phiên.
- **Điểm cần chụp minh chứng:** `02-01-01-login-page.png`

---

### TC `02-01-02` — Đăng nhập thành công với tài khoản hợp lệ

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`, người dùng nhập tài khoản và mật khẩu hợp lệ trên trình duyệt.
  2. Nhấn nút `Đăng nhập` (`form button[type="submit"]`).
  3. Chờ điều hướng hoàn tất, lấy snapshot và kiểm tra `GET /api/auth/me`.
- **Dữ liệu kiểm thử:** Tài khoản hợp lệ (do người dùng nhập trực tiếp, không lưu vào file).
- **Kết quả mong đợi (Expected):**
  - `GET /api/auth/me` trả HTTP `200`.
  - Chuyển hướng thành công sang `https://sport-highlight.cmcati.vn/matches` (`Quản lý trận đấu`).
  - Hiển thị bộ lọc bên trái, danh sách trận đấu và nút `Mở menu tài khoản`.
- **Điểm cần chụp minh chứng:** `02-01-02-after-login.png`

---

### TC `02-01-03` — Kiểm tra thông báo lỗi khi để trống thông tin đăng nhập

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative`
- **Các bước thực hiện:**
  1. Ở màn hình `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`, để trống cả `input#username` và `input#password`.
  2. Nhấn nút `Đăng nhập` (`form button[type="submit"]`).
  3. Kiểm tra trạng thái HTML5 validation (`required`, `checkValidity()`, `validationMessage`) và URL hiện tại.
- **Dữ liệu kiểm thử:** Username = `""`, Password = `""`
- **Kết quả mong đợi (Expected):**
  - Form không gửi request đăng nhập; cả hai trường có thuộc tính `required=true`.
  - Trình duyệt hiển thị cảnh báo `Please fill out this field.` trên trường `input#username` và giữ nguyên trang `/login?next=%2Fmatches`.
- **Điểm cần chụp minh chứng:** `02-01-03-empty-validation.png`
