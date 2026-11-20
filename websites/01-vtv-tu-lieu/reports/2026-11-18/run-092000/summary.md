# Báo Cáo Kiểm Thử VTV Tư liệu (`01-vtv-tu-lieu`) — Run `2026-11-18/run-092000`

- **Ngày giờ:** `2026-11-18 09:20:00 (+07:00)`
- **URL kiểm thử:** `https://vtvtulieu.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP
- **Phạm vi kiểm thử:** Kiểm tra màn hình xác thực và route guard (`01-Dang-nhap`).

---

## 1. Kết Quả Tổng Thể

| Tổng số TC | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` (Chờ đăng nhập lại) | `NOT_RUN` (Ngoài phạm vi) | Tỷ lệ PASS (trên số TC đã chạy) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **33** | **2** | **2** | **0** | **29** | **2** | **100.00% (2/2)** |

---

## 2. Ghi Chú Hiện Trạng
- Phiên làm việc trên `https://vtvtulieu.cmcati.vn/` đã hết hạn cookie sau 5 ngày (đợt chạy trước vào ngày 2026-11-13).
- Hệ thống tự động chuyển hướng về `https://vtvtulieu.cmcati.vn/login?next=%2F`.
- Hai test case về giao diện đăng nhập và form validation rỗng (`01-01-01` và `01-01-03`) đã thực thi thành công: **2 PASS**.
- 29 test case nghiệp vụ sau đăng nhập tạm thời ở trạng thái **BLOCKED** chờ người dùng đăng nhập lại trên cửa sổ Chrome do MCP mở để giải phóng.

