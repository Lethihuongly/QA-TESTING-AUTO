# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES (`CMC-QA-TESTING`)

- **Run_ID dùng chung:** `2026-11-12/run-085600`
- **Múi giờ:** `Asia/Ho_Chi_Minh (+07:00)`
- **Thời gian thực hiện đợt chạy:** `2026-11-12 08:56:00 (+07:00)` → `2026-11-12 09:23:00 (+07:00)`
- **Công cụ thực thi:** Trực tiếp qua server `chrome-devtools` MCP (không dùng Playwright/Selenium/Browser Agent khác).
- **Phạm vi kiểm thử:** Chỉ đọc (`Read-Only`) — thực thi toàn bộ các test case chỉ đọc đủ điều kiện trên cả 4 hệ thống theo đúng thứ tự:
  `01-vtv-tu-lieu` → `02-sport-highlight` → `03-anti-logo` → `04-safevision`.

---

## 1. Bảng Tổng Hợp Kết Quả 4 Websites

| STT | Website | URL | Tổng TC (`test-cases.md`) | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` | `NOT_RUN` (Ngoài phạm vi chỉ đọc) | Tỷ lệ `PASS` (trên số TC đã chạy) |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| **01** | **VTV Tư liệu** (`01-vtv-tu-lieu`) | `https://vtvtulieu.cmcati.vn/` | **33** | 31 | **31** | **0** | **0** | 2 | **100.00% (31/31)** |
| **02** | **Sport Highlight** (`02-sport-highlight`) | `https://sport-highlight.cmcati.vn/matches` | **24** | 21 | **19** | **2** | **0** | 3 | **90.48% (19/21)** |
| **03** | **Anti-Logo** (`03-anti-logo`) | `https://anti-logo.cmcati.vn/` | **39** | 30 | **30** | **0** | **0** | 9 | **100.00% (30/30)** |
| **04** | **SafeVision** (`04-safevision`) | `https://safevision.cmcati.vn/` | **28** | 3 | **3** | **0** | **22** *(Chờ đăng nhập lại)* | 3 | **100.00% (3/3)** |
| **TỔNG** | **Toàn bộ 4 Websites** | — | **124** | **85** | **83** | **2** | **22** | **17** | **97.65% (83/85)** |

---

## 2. Trạng Thái Tất Cả Các Bug Đã Kiểm Tra Lại & Lỗi Phát Hiện (`BUG-01-01` → `BUG-04-04`)

| Mã Bug | Website | Case_ID | Mức độ | Trạng thái Đợt Này (`run-085600`) | Tóm tắt Bằng chứng Thực tế | Cần quay Jam xác minh? |
|---|---|---|---|---|---|---|
| **BUG-01-01** | `01-vtv-tu-lieu` | `01-03-02` | P1 | **FIXED** | Tìm kiếm `"Ẩm thực Việt Nam"` (`73` kết quả): bấm trang `2` (`uid=18_211`) chuyển ngay sang `&page_id=2`, `activePage="2"`, hiển thị đầy đủ 20 video mới của trang 2 (thẻ đầu: `"Tình hình kinh tế Việt Nam năm 2024"`). | Không |
| **BUG-01-02** | `01-vtv-tu-lieu` | `01-09-02` | P1 | **FIXED** | Gửi câu hỏi gợi ý `"Video này nói về nội dung gì?"` (`uid=23_14`) trên video `be08b277...`: AI phản hồi nhanh chóng, hiển thị câu trả lời tóm tắt chi tiết, không phát sinh lỗi UI hay Console. | Không |
| **BUG-02-01** | `02-sport-highlight` | `02-05-01` | P0 | **FIXED** | Video HLS trên trận `Sevilla vs Alaves` (`28fa419c...`) phát mượt mà ở độ phân giải 1080p (`readyState=4`, `duration=9900s`, `currentTime=12.01s`, `error=null`). | Không |
| **BUG-02-02** | `02-sport-highlight` | `02-04-03`, `02-05-03` | P1 | **PARTIALLY FIXED (SỬA MỘT PHẦN)** | Mở `/matches/00000000-0000-0000-0000-000000000000`:<br>- **Phần đã sửa:** Các nút player controls đã được disabled (`02-05-03` = `PASS`).<br>- **Phần chưa sửa (`02-04-03` = `FAIL`):** Giao diện vẫn treo vĩnh viễn ở trạng thái text `"Đang tải..."` (`uid=39_4`) và `"Đang tải video..."` (`uid=39_30`), không có màn hình Empty/Error state 404. | **CÓ (Cần quay Jam xác minh UI treo `"Đang tải..."`)** |
| **BUG-02-03** | `02-sport-highlight` | `02-03-03` | P1 | **OPEN (CHƯA SỬA)** | Lọc `TRẠNG THÁI = "Đã kết thúc"` (`uid=33_4`) rồi bấm `"Tiếp"` (`uid=34_183`) sang trang 2: URL bị mất tham số lọc (`/matches?page=2`), combobox (`uid=36_19`) bị reset về `"Tất cả"` và danh sách chuyển sang tải toàn bộ trận không lọc. | **CÓ (Cần quay Jam xác minh mất bộ lọc khi sang trang 2)** |
| **BUG-02-04** | `02-sport-highlight` | `02-05-02` | P1 | **FIXED (Phần UI Timeline)** | Timeline phân đoạn AI hiển thị đầy đủ 599 block phân đoạn và tua video mượt mà. | Không |
| **BUG-03-01** | `03-anti-logo` | `03-07-02` | P2 | **FIXED** | Nhấn `✏️ Sửa BBox` (`uid=41_452`) trên dòng frame vi phạm: modal mở an toàn, hiển thị đúng tiêu đề `Frame #72240 — FLAG 1 (Player: found, Logo: found)`. | Không |
| **BUG-03-02** | `03-anti-logo` | `03-06-02` | P1 | **FIXED** | Khi checkbox `Show only flag=1` (`#flag1OnlyToggle`, `uid=41_420`) bật: bảng Frame Logs lọc chính xác 75/75 dòng hiển thị có `Flag=1` (`nonFlag1Count=0`). | Không |
| **BUG-03-03** | `03-anti-logo` | `03-03-02`, `03-03-03`, `03-12-03` | P0 | **FIXED** | Cả 5 endpoint (`/v2/api/sdi_inputs`, `/channels/api/{1,2,3}/sdi_inputs` và `/channels/api/state`) đều trả về `HTTP 200`, trạng thái `READY`/`IDLE`, `ok=true`, không bị lỗi `502 Bad Gateway`. | Không |
| **BUG-03-04** | `03-anti-logo` | `03-04-04`, `03-05-02` | P0 | **PASS_SMOOTH / READY** | Trạng thái kênh `IDLE` được phản ánh đồng bộ trên UI và API; 13/13 file video cục bộ giải mã Frame 0 thành công (`HTTP 200 image/jpeg`); 3 nguồn Virtual SDI sẵn sàng (`READY`). | Không |
| **BUG-04-01..04** | `04-safevision` | `04-02-03`, `04-05-02`, `04-07-03`, `04-03-01` | P0–P2 | **BLOCKED (Chờ đăng nhập lại)** | Phiên đăng nhập trên `https://safevision.cmcati.vn/` đã hết hạn (chuyển hướng về `/login?next=%2F`). Đã kiểm tra xong `/login`, validation và route guard (`3 PASS`). Chờ người dùng đăng nhập thủ công trên cửa sổ Chrome MCP để chạy tiếp 22 case sau đăng nhập. | Không |

---

## 3. Đường Dẫn Đầy Đủ Toàn Bộ Các File Báo Cáo Đã Lưu (`Run_ID: 2026-11-12/run-085600`)

### A. Báo cáo Tổng hợp 4 Websites
- `reports/2026-11-12/run-085600/BAO-CAO-TONG-HOP-4-WEBSITES.md`

### B. Website 01 — VTV Tư liệu (`websites/01-vtv-tu-lieu/reports/2026-11-12/run-085600/`)
- `websites/01-vtv-tu-lieu/reports/2026-11-12/run-085600/results.csv`
- `websites/01-vtv-tu-lieu/reports/2026-11-12/run-085600/summary.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-12/run-085600/evidence/01-vtv-tu-lieu-evidence.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-12/run-085600/bugs/BUG-01-01-retest.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-12/run-085600/bugs/BUG-01-02-retest.md`

### C. Website 02 — Sport Highlight (`websites/02-sport-highlight/reports/2026-11-12/run-085600/`)
- `websites/02-sport-highlight/reports/2026-11-12/run-085600/results.csv`
- `websites/02-sport-highlight/reports/2026-11-12/run-085600/summary.md`
- `websites/02-sport-highlight/reports/2026-11-12/run-085600/evidence/02-sport-highlight-evidence.md`
- `websites/02-sport-highlight/reports/2026-11-12/run-085600/bugs/BUG-02-01-retest.md`
- `websites/02-sport-highlight/reports/2026-11-12/run-085600/bugs/BUG-02-02.md`
- `websites/02-sport-highlight/reports/2026-11-12/run-085600/bugs/BUG-02-03.md`
- `websites/02-sport-highlight/reports/2026-11-12/run-085600/bugs/BUG-02-04-retest.md`

### D. Website 03 — Anti-Logo (`websites/03-anti-logo/reports/2026-11-12/run-085600/`)
- `websites/03-anti-logo/reports/2026-11-12/run-085600/results.csv`
- `websites/03-anti-logo/reports/2026-11-12/run-085600/summary.md`
- `websites/03-anti-logo/reports/2026-11-12/run-085600/evidence/03-anti-logo-evidence.md`
- `websites/03-anti-logo/reports/2026-11-12/run-085600/bugs/BUG-03-01-retest.md`
- `websites/03-anti-logo/reports/2026-11-12/run-085600/bugs/BUG-03-02-retest.md`
- `websites/03-anti-logo/reports/2026-11-12/run-085600/bugs/BUG-03-03-retest.md`
- `websites/03-anti-logo/reports/2026-11-12/run-085600/bugs/BUG-03-04-retest.md`

### E. Website 04 — SafeVision (`websites/04-safevision/reports/2026-11-12/run-085600/`)
- `websites/04-safevision/reports/2026-11-12/run-085600/results.csv`
- `websites/04-safevision/reports/2026-11-12/run-085600/summary.md`
- `websites/04-safevision/reports/2026-11-12/run-085600/evidence/04-safevision-evidence.md`

