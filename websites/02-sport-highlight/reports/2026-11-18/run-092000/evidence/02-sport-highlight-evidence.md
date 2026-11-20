# Bằng chứng kiểm thử Website 02 — Sport Highlight (`run-092000`)

- **Run_ID:** `run-092000`
- **Ngày giờ:** `2026-11-18T09:20:00+07:00`
- **URL:** `https://sport-highlight.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` (`02-01-01`, `02-01-03`)
- **Trang `/login`:**
  - URL thực tế: `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`
  - Tiêu đề: `CMCATI Highlight`
  - Form validation:
    - Ô `input[name="username"]`: `required=true`, `validity.valueMissing=true` khi để trống.
    - Ô `input[name="password"]`: `type="password"`, `required=true`.
    - Nút submit: `button[type="submit"]` kích hoạt chặn submit rỗng (`checkValidity()=false`).
    - Kết quả: `02-01-01 = PASS`, `02-01-03 = PASS`.
- **Trạng thái xác thực:**
  - Phiên làm việc chưa đăng nhập. Cần người dùng đăng nhập tài khoản trên Chrome MCP để chạy 19 test case nghiệp vụ còn lại.

