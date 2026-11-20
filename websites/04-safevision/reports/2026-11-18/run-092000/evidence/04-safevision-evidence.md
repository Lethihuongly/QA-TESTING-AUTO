# Bằng chứng kiểm thử Website 04 — SafeVision (`run-092000`)

- **Run_ID:** `run-092000`
- **Ngày giờ:** `2026-11-18T09:20:00+07:00`
- **URL:** `https://safevision.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` (`04-01-01`, `04-01-03`)
- **Trang `/login`:**
  - URL thực tế: `https://safevision.cmcati.vn/login?next=%2F`
  - Tiêu đề: `VTV Logo Detection – AI Enterprise Platform`
  - Khối giao diện: `Đăng nhập VTV PCD`
  - Form validation:
    - Ô `input[name="username"]`: `required=true`, `validity.valueMissing=true` khi để trống.
    - Ô `input[name="password"]`: `type="password"`, `required=true`.
    - Nút submit: `button[type="submit"]` kích hoạt chặn submit rỗng (`checkValidity()=false`).
    - Kết quả: `04-01-01 = PASS`, `04-01-03 = PASS`.
- **Trạng thái xác thực:**
  - Phiên làm việc chưa đăng nhập. Cần người dùng đăng nhập tài khoản trên Chrome MCP để chạy 23 test case nghiệp vụ còn lại.

