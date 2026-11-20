# Báo Cáo Kiểm Thử VTV Tư liệu (`01-vtv-tu-lieu`) — Run `2026-11-18/run-100500`

- **Ngày giờ:** `2026-11-18 10:05:00 (+07:00)`
- **URL kiểm thử:** `https://vtvtulieu.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP
- **Phạm vi:** Kiểm tra màn hình xác thực và form validation (`01-Dang-nhap`).

---

## 1. Kết Quả Tổng Thể

| Tổng số TC | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` (Chờ đăng nhập) | `NOT_RUN` (Ngoài phạm vi) | Tỷ lệ PASS |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **33** | **2** | **2** | **0** | **29** | **2** | **100.00% (2/2)** |

---

## 2. Ghi Chú Hiện Trạng
- URL hiện tại: `https://vtvtulieu.cmcati.vn/login?next=%2F`.
- Form validation: Ô username, password và nút submit hoạt động đúng đặc tả, kích hoạt chặn submit rỗng (`checkValidity()=false`).
- Console: 0 lỗi.
- 29 case nghiệp vụ sau đăng nhập đang chờ người dùng đăng nhập lại trên Chrome MCP (hoặc cung cấp mật khẩu tài khoản test) để giải phóng.

