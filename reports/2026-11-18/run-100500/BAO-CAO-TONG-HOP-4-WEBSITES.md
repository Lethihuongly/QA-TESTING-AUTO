# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES (`CMC-QA-TESTING`)

- **Run_ID dùng chung:** `2026-11-18/run-100500`
- **Múi giờ:** `Asia/Ho_Chi_Minh (+07:00)`
- **Thời gian thực hiện đợt chạy:** `2026-11-18 10:05:00 (+07:00)` → `2026-11-18 10:08:00 (+07:00)`
- **Công cụ thực thi:** Trực tiếp qua server `chrome-devtools` MCP (không dùng Playwright/Selenium/Browser Agent khác).
- **Phạm vi kiểm thử:** Toàn bộ 4 hệ thống theo thứ tự:
  `01-vtv-tu-lieu` → `02-sport-highlight` → `03-anti-logo` → `04-safevision`.

---

## 1. Bảng Tổng Hợp Kết Quả 4 Websites

| STT | Website | URL | Tổng TC (`test-cases.md`) | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` (Chờ đăng nhập lại) | `NOT_RUN` (Ngoài phạm vi chỉ đọc) | Tỷ lệ `PASS` (trên số TC đã chạy) |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| **01** | **VTV Tư liệu** (`01-vtv-tu-lieu`) | `https://vtvtulieu.cmcati.vn/` | **33** | 2 | **2** | **0** | **29** *(Chờ đăng nhập lại)* | 2 | **100.00% (2/2)** |
| **02** | **Sport Highlight** (`02-sport-highlight`) | `https://sport-highlight.cmcati.vn/matches` | **24** | 2 | **2** | **0** | **19** *(Chờ đăng nhập lại)* | 3 | **100.00% (2/2)** |
| **03** | **Anti-Logo** (`03-anti-logo`) | `https://anti-logo.cmcati.vn/` | **47** | 38 | **38** | **0** | **0** | 9 | **100.00% (38/38)** |
| **04** | **SafeVision** (`04-safevision`) | `https://safevision.cmcati.vn/` | **28** | 2 | **2** | **0** | **23** *(Chờ đăng nhập lại)* | 3 | **100.00% (2/2)** |
| **TỔNG** | **Toàn bộ 4 Websites** | — | **132** | **44** | **44** | **0** | **71** | **17** | **100.00% (44/44)** |

---

## 2. Diễn Biến & Ghi Nhận Thực Tế Tại Đợt Chạy `run-100500`

1. **Website 03 — Anti-Logo:**
   - Phiên đăng nhập `vtv` duy trì hoạt động hoàn hảo.
   - Lúc **10:01:40 AM**, tiến độ gán nhãn vừa ghi nhận cập nhật tại **Frame #52440** (thay cho #52320).
   - Danh sách frame đã sửa đổi đạt **7 frame** (`Changed frames (7)`, `Export to Server (7)`).
   - Bộ công cụ mới `03-13` (Curation Resume & Quick View) và `03-14` (OBB, MobileSAM, Auto VLM) cùng 2 luồng Virtual SDI trực tiếp trên Channel 02 & 03 (hơn 25.7 triệu frames) đều đạt chuẩn tuyệt đối (**38/38 PASS — 100%**).
2. **Website 01 (VTV Tư liệu), Website 02 (Sport Highlight), Website 04 (SafeVision):**
   - Đã kiểm thử đầy đủ toàn bộ các case giao diện đăng nhập và form validation rỗng (**6/6 PASS**).
   - Session cookie của 3 website này đã hết hạn tự nhiên sau 5 ngày (từ đợt chạy 13/11).
   - 71 test case nghiệp vụ sau đăng nhập đang ở trạng thái **BLOCKED** chờ người dùng đăng nhập lại trên cửa sổ Chrome do MCP mở (hoặc cung cấp mật khẩu tài khoản test trong chat) để giải phóng toàn diện.

---

## 3. Đường Dẫn File Báo Cáo Đợt Chạy (`Run_ID: 2026-11-18/run-100500`)

### A. Báo cáo Tổng hợp 4 Websites
- [BAO-CAO-TONG-HOP-4-WEBSITES.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/reports/2026-11-18/run-100500/BAO-CAO-TONG-HOP-4-WEBSITES.md)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/reports/2026-11-18/run-100500/summary.md)

### B. Từng Website
- **Website 01:** [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-18/run-100500/summary.md), [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-18/run-100500/results.csv)
- **Website 02:** [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-18/run-100500/summary.md), [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-18/run-100500/results.csv)
- **Website 03:** [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-18/run-100500/summary.md), [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-18/run-100500/results.csv)
- **Website 04:** [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-18/run-100500/summary.md), [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-18/run-100500/results.csv)

