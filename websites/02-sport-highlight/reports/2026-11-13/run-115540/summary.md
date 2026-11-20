# Báo cáo Kiểm thử Hồi quy Website 02 — Sport Highlight (CMCATI Highlight)

- **Run_ID:** `run-115540`
- **Ngày giờ thực thi:** `2026-11-13T12:08:30+07:00` — `2026-11-13T12:08:50+07:00` (Asia/Ho_Chi_Minh)
- **URL kiểm thử:** `https://sport-highlight.cmcati.vn/matches`
- **Công cụ:** `chrome-devtools` MCP (Read-Only Regression)

---

## 1. Tổng hợp Kết quả Kiểm thử

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Tổng số Test Case (`test-cases.md`)** | **24** | 8 features |
| **PASS** | **3** | `02-01-01`, `02-01-03`, `02-08-03` (Trang `/login`, validation form & route guard) |
| **FAIL** | **0** | Không có |
| **BLOCKED** | **18** | Phiên đăng nhập trên Sport Highlight đã hết hạn; chờ đăng nhập thủ công trên Chrome MCP để chạy tiếp 18 case sau đăng nhập |
| **NOT_RUN** | **3** | `02-07-01..03` (Ngoài phạm vi chỉ đọc) |
| **Tỷ lệ PASS (`PASS / (PASS + FAIL)`)** | **100.0% (3/3)** | Tính trên các ca đã thực thi |

---

## 2. Trạng thái Bug Đã Ghi nhận & Chờ Retest

| Bug_ID | Case_ID | Mức độ | Trạng thái Hiện tại | Chi tiết |
|---|---|---|---|---|
| **BUG-02-01** | `02-05-01` | P0 | **WAITING_AUTH (Đã FIXED ở run trước)** | Chờ đăng nhập để retest lại phát video HLS trên trận `Sevilla vs Alaves`. |
| **BUG-02-02** | `02-04-03`, `02-05-03` | P1 | **PARTIALLY FIXED (Chờ retest sau đăng nhập)** | Match 404 đã disabled controls player (`02-05-03` PASS); tuy nhiên UI vẫn treo `"Đang tải..."` (`02-04-03` FAIL). Cần đăng nhập để retest. |
| **BUG-02-03** | `02-03-03` | P1 | **OPEN (Chờ retest sau đăng nhập)** | Mất bộ lọc khi sang trang 2 (`/matches?page=2`). Cần đăng nhập để retest. |
| **BUG-02-04** | `02-05-02` | P1 | **WAITING_AUTH (Đã FIXED ở run trước)** | Timeline phân đoạn AI tua mượt mà. |

