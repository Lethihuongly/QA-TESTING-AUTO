# Báo Cáo Kiểm Thử Sport Highlight (`02-sport-highlight`) — Run `2026-11-18/run-092000`

- **Ngày giờ:** `2026-11-18 09:20:00 (+07:00)`
- **URL kiểm thử:** `https://sport-highlight.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP
- **Phạm vi kiểm thử:** Kiểm tra màn hình xác thực và route guard (`02-Dang-nhap`).

---

## 1. Kết Quả Tổng Thể

| Tổng số TC | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` (Chờ đăng nhập lại) | `NOT_RUN` (Ngoài phạm vi) | Tỷ lệ PASS (trên số TC đã chạy) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **24** | **2** | **2** | **0** | **19** | **3** | **100.00% (2/2)** |

---

## 2. Ghi Chú Hiện Trạng
- Phiên làm việc trên `https://sport-highlight.cmcati.vn/` đã hết hạn cookie.
- Hệ thống tự động chuyển hướng về `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`.
- Hai test case về giao diện đăng nhập và form validation rỗng (`02-01-01` và `02-01-03`) đã thực thi thành công: **2 PASS**.
- 19 test case nghiệp vụ sau đăng nhập tạm thời ở trạng thái **BLOCKED** chờ người dùng đăng nhập lại trên cửa sổ Chrome do MCP mở để retest (đặc biệt các bug BUG-02-02, BUG-02-03).

