# Bằng chứng kiểm thử Website 04 — SafeVision (`run-085600`)

- **Run_ID:** `run-085600`
- **Ngày giờ thực thi:** `2026-11-12T09:16:44+07:00` — `2026-11-12T09:17:35+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://safevision.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` & `09-Tai-khoan-Dang-xuat` (`04-01-01`, `04-01-03`, `04-09-03`)
- Khi điều hướng đến `https://safevision.cmcati.vn/`, trình duyệt tự động chuyển hướng sang `https://safevision.cmcati.vn/login?next=%2F` (`04-09-03` = `PASS`).
- Snapshot trang `/login` (`uid=44_0`..`44_11`):
  - `heading "Đăng nhập VTV PCD" level="3"` (`uid=44_3`)
  - `textbox "Tên đăng nhập" required` (`#username`, `uid=44_7`, `userRequired=true`)
  - `textbox "Mật khẩu" required` (`#password`, `uid=44_9`, `passRequired=true`, `passType="password"`)
  - `button "Hiện mật khẩu"` (`uid=44_10` -> nhấn đổi sang `"Ẩn mật khẩu"` — `04-01-03` = `PASS`)
  - `button "Đăng nhập"` (`uid=44_11`)
- Các test case sau đăng nhập (`04-01-02`, `04-02-*` .. `04-09-02`) tạm thời đánh dấu `BLOCKED` chờ đăng nhập thủ công trên cửa sổ Chrome MCP.

