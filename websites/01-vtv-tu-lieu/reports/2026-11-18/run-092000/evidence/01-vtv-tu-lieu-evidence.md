# Bằng chứng kiểm thử Website 01 — VTV Tư liệu (`run-092000`)

- **Run_ID:** `run-092000`
- **Ngày giờ:** `2026-11-18T09:20:00+07:00`
- **URL:** `https://vtvtulieu.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` (`01-01-01`, `01-01-03`)
- **Trang `/login`:**
  - URL thực tế: `https://vtvtulieu.cmcati.vn/login?next=%2F`
  - Tiêu đề: `CMC Video Miner`
  - Khối giao diện: `Đăng nhập VTV Tư liệu`
  - Form validation:
    - Ô `input#username`: `required=true`, `validity.valueMissing=true` khi để trống.
    - Ô `input#password`: `type="password"`, `required=true`.
    - Nút submit: `button[type="submit"]` kích hoạt chặn submit rỗng (`checkValidity()=false`).
    - Kết quả: `01-01-01 = PASS`, `01-01-03 = PASS`.
- **Trạng thái xác thực:**
  - Phiên làm việc chưa đăng nhập. Cần người dùng đăng nhập tài khoản trên Chrome MCP để chạy 29 test case nghiệp vụ còn lại.

