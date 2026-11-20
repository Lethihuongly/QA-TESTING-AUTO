# Bằng chứng kiểm thử Website 02 — Sport Highlight (`run-115540`)

- **Run_ID:** `run-115540`
- **Ngày giờ thực thi:** `2026-11-13T12:08:30+07:00` — `2026-11-13T12:08:50+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://sport-highlight.cmcati.vn/matches`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` & `08-Tai-khoan-Dang-xuat` (`02-01-01`, `02-01-03`, `02-08-03`)
- **Trang `/login` (`02-01-01`, `02-01-03`):**
  - URL: `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`
  - Tiêu đề trang: `CMCATI Highlight`
  - Header: Link `VTV HIGHLIGHT`
  - Tiêu đề khối: `Đăng nhập`, phụ đề: `Đăng nhập để quản lý trận đấu và biên tập highlight.`
  - Form: `input#username` (`required=true`), `input#password` (`required=true`), nút `Hiện mật khẩu` và nút `Đăng nhập`.
  - Validation: Kích hoạt thuộc tính `required=true`, `checkValidity()=false` khi bỏ trống form.
- **Route Guard (`02-08-03`):**
  - Truy cập trực tiếp `https://sport-highlight.cmcati.vn/matches` khi chưa có phiên: Hệ thống trả mã `401` và tự động chuyển hướng về `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`.
  - Truy cập trận đấu UUID rỗng `/matches/00000000-0000-0000-0000-000000000000` chuyển hướng về `/login?next=%2Fmatches%2F00000000-0000-0000-0000-000000000000`.

---

## 2. Các ca kiểm thử đang chờ phiên đăng nhập (18 cases)
- Do phiên làm việc trên Sport Highlight đã hết hạn, các ca kiểm thử sau đăng nhập (`02-01-02`, `02-02-01..03`, `02-03-01..03`, `02-04-01..03`, `02-05-01..03`, `02-06-01..03`, `02-08-01..02`) cùng việc retest 2 bug `BUG-02-02`, `BUG-02-03` tạm thời ở trạng thái **BLOCKED**.
- Người dùng chỉ cần đăng nhập thủ công trên cửa sổ Chrome MCP đang mở để tiếp tục chạy hoàn thiện 18 ca này.

