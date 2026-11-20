# Báo cáo Kiểm thử Hồi quy Website 04 — SafeVision (VTV Logo Detection)

- **Run_ID:** `run-085600`
- **Ngày giờ thực thi:** `2026-11-12T09:16:44+07:00` — `2026-11-12T09:17:35+07:00` (Asia/Ho_Chi_Minh)
- **URL kiểm thử:** `https://safevision.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP (Read-Only Regression)

---

## 1. Tổng hợp Kết quả Kiểm thử

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Tổng số Test Case (`test-cases.md`)** | **28** | 9 features |
| **PASS** | **3** | `04-01-01`, `04-01-03`, `04-09-03` (Trang `/login`, validation & route guard) |
| **FAIL** | **0** | Không có |
| **BLOCKED** | **22** | Phiên đăng nhập trên SafeVision đã hết hạn (`/login?next=%2F`); chờ đăng nhập thủ công trên Chrome MCP |
| **NOT_RUN** | **3** | `04-03-03`, `04-08-02`, `04-08-03` (Ngoài phạm vi chỉ đọc) |
| **Tỷ lệ PASS (`PASS / (PASS + FAIL)`)** | **100.0% (3/3)** | Tính trên các ca đã thực thi |

