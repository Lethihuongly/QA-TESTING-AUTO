# Bằng chứng kiểm thử Website 01 — VTV Tư liệu (`run-100500`)

- **Run_ID:** `run-100500`
- **Ngày giờ:** `2026-11-18T10:05:00+07:00`
- **URL:** `https://vtvtulieu.cmcati.vn/login`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap`
- `01-01-01 = PASS`: Trang login nạp thành công, tiêu đề `CMC Video Miner`, hiển thị đầy đủ 2 input `username`, `password` và nút `Đăng nhập`.
- `01-01-03 = PASS`: Form validation chặn submit khi để trống trường thông tin (`valueMissing=true`, `checkValidity()=false`).
- Console message: 0 errors.

