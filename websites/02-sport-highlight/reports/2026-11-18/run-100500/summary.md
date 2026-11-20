# Báo Cáo Kiểm Thử Sport Highlight (`02-sport-highlight`) — Run `2026-11-18/run-100500`

- **Ngày giờ:** `2026-11-18 10:05:00 (+07:00)`
- **URL kiểm thử:** `https://sport-highlight.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP
- **Phạm vi:** Kiểm tra màn hình xác thực và form validation (`02-Dang-nhap`).

---

## 1. Kết Quả Tổng Thể

| Tổng số TC | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` (Chờ đăng nhập) | `NOT_RUN` (Ngoài phạm vi) | Tỷ lệ PASS |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **24** | **2** | **2** | **0** | **19** | **3** | **100.00% (2/2)** |

---

## 2. Ghi Chú Hiện Trạng
- URL hiện tại: `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`.
- Form validation: Ô username, password và nút submit hoạt động đúng đặc tả (`checkValidity()=false`).
- 19 case nghiệp vụ sau đăng nhập đang chờ người dùng đăng nhập lại trên Chrome MCP (hoặc cung cấp mật khẩu tài khoản test) để giải phóng.

