# Bằng chứng kiểm thử Website 02 — Sport Highlight (`run-100500`)

- **Run_ID:** `run-100500`
- **Ngày giờ:** `2026-11-18T10:05:00+07:00`
- **URL:** `https://sport-highlight.cmcati.vn/login`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap`
- `02-01-01 = PASS`: Trang login nạp thành công, tiêu đề `CMCATI Highlight`, form đăng nhập hiển thị đầy đủ.
- `02-01-03 = PASS`: Form validation chặn submit khi để trống trường thông tin (`valueMissing=true`, `checkValidity()=false`).
- Console message: 1 lỗi 401 Unauthorized từ request probe `/matches` không có auth header (đúng với hành vi bảo mật của route guard).

