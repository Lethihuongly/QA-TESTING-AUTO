# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES (`CMC-QA-TESTING`)

- **Run_ID dùng chung:** `2026-11-11/run-174400`
- **Múi giờ:** `Asia/Ho_Chi_Minh (+07:00)`
- **Thời gian thực hiện đợt chạy:** `2026-11-11 17:40:00 (+07:00)` → `2026-11-11 18:05:00 (+07:00)`
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
| **04** | **SafeVision** (`04-safevision`) | `https://safevision.cmcati.vn/` | **28** | 24 | **24** | **0** | **1** | 3 | **100.00% (24/24)** |
| **TỔNG** | **Toàn bộ 4 Websites** | — | **124** | **106** | **104** | **2** | **1** | **17** | **98.11% (104/106)** |

---

## 2. Trạng Thái Tất Cả Các Bug Đã Kiểm Tra Lại & Lỗi Phát Hiện (`BUG-01-01` → `BUG-04-04`)

| Mã Bug | Website | Case_ID | Mức độ | Trạng thái Đợt Này (`run-174400`) | Tóm tắt Bằng chứng Thực tế | Cần quay Jam xác minh? |
|---|---|---|---|---|---|---|
| **BUG-01-01** | `01-vtv-tu-lieu` | `01-03-02` | P1 | **FIXED** | Tìm kiếm `"Ẩm thực Việt Nam"` (`63` kết quả): bấm trang `2` chuyển ngay sang `&page_id=2`, `activePage="2"`, hiển thị đầy đủ 20 video mới của trang 2 (thẻ đầu: `"Tình hình kinh tế Việt Nam năm 2024"`). | Không |
| **BUG-01-02** | `01-vtv-tu-lieu` | `01-09-02` | P1 | **FIXED** | Gửi câu hỏi gợi ý `"Video này nói về nội dung gì?"` trên video `be08b277...`: AI phản hồi ngay, hiển thị câu trả lời tóm tắt chi tiết, không phát sinh lỗi UI hay Console. | Không |
| **BUG-02-01** | `02-sport-highlight` | `02-05-01` | P0 | **FIXED** | Video HLS trên trận `Sevilla vs Alaves` (`28fa419c...`) phát mượt mà ở độ phân giải 1080p (`readyState=4`, `currentTime` tăng liên tục, `error=null`). | Không |
| **BUG-02-02** | `02-sport-highlight` | `02-04-03`, `02-05-03` | P1 | **PARTIALLY FIXED (SỬA MỘT PHẦN)** | Mở `/matches/00000000-0000-0000-0000-000000000000`:<br>- **Phần đã sửa:** Các nút player controls đã được disabled (`02-05-03` = `PASS`).<br>- **Phần chưa sửa (`02-04-03` = `FAIL`):** Giao diện vẫn treo vĩnh viễn ở trạng thái text `"Đang tải..."` và `"Đang tải video..."`, không có màn hình Empty/Error state 404 hay nút quay lại. | **CÓ (Cần quay Jam xác minh UI treo `"Đang tải..."`)** |
| **BUG-02-03** | `02-sport-highlight` | `02-03-03` | P1 | **OPEN (CHƯA SỬA)** | Lọc `TRẠNG THÁI = "Đã kết thúc"` rồi bấm `"Tiếp"` sang trang 2: URL bị mất tham số lọc, combobox bị reset về `"Tất cả"` và danh sách chuyển sang tải toàn bộ trận không lọc. | **CÓ (Cần quay Jam xác minh mất bộ lọc khi sang trang 2)** |
| **BUG-02-04** | `02-sport-highlight` | `02-05-02` | P1 | **FIXED (Phần UI Timeline)** | Timeline phân đoạn AI hiển thị đầy đủ các block và tua video mượt mà khi click. | Không |
| **BUG-03-01** | `03-anti-logo` | `03-07-02` | P2 | **FIXED** | Nhấn `✏️ Sửa BBox` trên dòng frame vi phạm: modal mở an toàn, hiển thị đúng tiêu đề `Frame #72240 — FLAG 1 (Player: found, Logo: found)`. | Không |
| **BUG-03-02** | `03-anti-logo` | `03-06-02` | P1 | **FIXED** | Bật checkbox `Show only flag=1` (`#flag1OnlyToggle`): bảng Frame Logs lọc chính xác toàn bộ 75 frame có Flag=1. | Không |
| **BUG-03-03** | `03-anti-logo` | `03-03-02`, `03-03-03`, `03-12-03` | P0 | **FIXED** | Cả 3 kênh SDI workers (`/channels/api/{1,2,3}/sdi_inputs` và `/channels/api/state`) đều trả về `HTTP 200`, trạng thái `READY`/`IDLE`, không bị lỗi `502 Bad Gateway`. | Không |
| **BUG-03-04** | `03-anti-logo` | `03-04-04`, `03-05-02` | P0 | **PASS_SMOOTH / READY** | Trạng thái kênh IDLE được phản ánh đồng bộ trên UI và API; hạ tầng SDI sẵn sàng. | Không |
| **BUG-04-01** | `04-safevision` | `04-02-03` | P1 | **FIXED** | Dữ liệu thống kê phân loại logo hiển thị đồng bộ với backend. | Không |
| **BUG-04-02** | `04-safevision` | `04-05-02` | P0 | **FIXED (SMOOTH)** | Đo lường định lượng 8s trên `VTV10` (Luồng gốc): `wallSec=8.02s`, `deltaVideoSec=8.02s`, `playbackRatio=1.000`, `droppedFrames=0` (`0.00%`), `effectiveFps=24.9 FPS`, `freezeTicks=0`. Kết luận: `SMOOTH`. | Không |
| **BUG-04-03** | `04-safevision` | `04-07-03` | P2 | **CẦN XÁC NHẬN YÊU CẦU (BLOCKED)** | Không có ô `<input>` tìm kiếm trên thanh `<header>` (`headerInputCount = 0`). Ô tìm kiếm nằm ở trang `/channels`. Ghi `"Cần xác nhận yêu cầu"`. | Không (cần xác nhận PO/BA) |
| **BUG-04-04** | `04-safevision` | `04-03-01`, `04-05-04` | P1 | **Phần 1: CẦN XÁC NHẬN / Phần 2: SMOOTH** | Danh sách 9 kênh hiển thị đầy đủ; video khởi tạo và phát nhanh chóng. | Không |

---

## 3. Kết Quả Đo Lường Định Lượng Video (`check-video-lag.js`)

| Website / Trang | Luồng video | Độ phân giải | `wallSec` | `deltaVideoSec` | `playbackRatio` | `decodedFrames` | `droppedFrames` | `dropRatePercent` | `FPS` | `freezeTicks` | `readyState` | Kết luận |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **04 — SafeVision** (`/channels/a2884000...` — `VTV10`) | `LUỒNG STREAM GỐC` | `1280x720` | `8.02s` | `8.02s` | **`1.000`** | `200` | **`0`** | **`0.00%`** | **`24.9`** | `0` | `4` | **`SMOOTH`** |
| **03 — Anti-Logo** (`/channel/1`) | `Channel 01: virtual-sdi-BONGDA_HD` | `1920x1080` | `8.13s` | — | — | — | — | — | — | — | `2` | **`READY / IDLE`** (Hạ tầng SDI worker 200 OK) |

---

## 4. Danh Sách Các Case `BLOCKED` / `NOT_RUN` Và Lý Do

| Website | Case_ID | Trạng thái | Lý do cụ thể |
|---|---|---|---|
| `01-vtv-tu-lieu` | `01-10-02`, `01-10-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc: không thực hiện upload video mới hoặc gửi dữ liệu tạo mới lên server thật. |
| `02-sport-highlight` | `02-07-02`, `02-07-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc: không ghi hình luồng live thật, không export gói highlight mới. |
| `03-anti-logo` | `03-07-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc: không vẽ hoặc lưu BBox mới lên hệ thống. |
| `03-anti-logo` | `03-08-02`, `03-08-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc: không nhấn Stop kênh đang hoạt động hoặc Start luồng mới. |
| `03-anti-logo` | `03-09-01..03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc: không thay đổi FPS, Blur Kernel và Protect ROI. |
| `03-anti-logo` | `03-10-01..03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc: không upload video/logo hoặc xóa dữ liệu. |
| `04-safevision` | `04-03-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc: không thêm kênh truyền hình mới vào hệ thống. |
| `04-safevision` | `04-07-03` | `BLOCKED` | `BUG-04-03`: Ô tìm kiếm trên thanh `<header>` không tồn tại trong DOM (`headerInputCount = 0`). Ghi `"Cần xác nhận yêu cầu"`. |
| `04-safevision` | `04-08-02`, `04-08-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc: không lưu cấu hình mới và không thay đổi trạng thái phiên giám sát AI. |

---

## 5. Đường Dẫn Đầy Đủ Toàn Bộ Các File Báo Cáo Đã Lưu (`Run_ID: 2026-11-11/run-174400`)

### A. Báo cáo Tổng hợp 4 Websites
- `reports/2026-11-11/run-174400/BAO-CAO-TONG-HOP-4-WEBSITES.md`

### B. Website 01 — VTV Tư liệu (`websites/01-vtv-tu-lieu/reports/2026-11-11/run-174400/`)
- `websites/01-vtv-tu-lieu/reports/2026-11-11/run-174400/results.csv`
- `websites/01-vtv-tu-lieu/reports/2026-11-11/run-174400/summary.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-11/run-174400/evidence/01-vtv-tu-lieu-evidence.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-11/run-174400/bugs/BUG-01-01-retest.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-11/run-174400/bugs/BUG-01-02-retest.md`

### C. Website 02 — Sport Highlight (`websites/02-sport-highlight/reports/2026-11-11/run-174400/`)
- `websites/02-sport-highlight/reports/2026-11-11/run-174400/results.csv`
- `websites/02-sport-highlight/reports/2026-11-11/run-174400/summary.md`
- `websites/02-sport-highlight/reports/2026-11-11/run-174400/evidence/02-sport-highlight-evidence.md`
- `websites/02-sport-highlight/reports/2026-11-11/run-174400/bugs/BUG-02-01-retest.md`
- `websites/02-sport-highlight/reports/2026-11-11/run-174400/bugs/BUG-02-02.md`
- `websites/02-sport-highlight/reports/2026-11-11/run-174400/bugs/BUG-02-03.md`
- `websites/02-sport-highlight/reports/2026-11-11/run-174400/bugs/BUG-02-04-retest.md`

### D. Website 03 — Anti-Logo (`websites/03-anti-logo/reports/2026-11-11/run-174400/`)
- `websites/03-anti-logo/reports/2026-11-11/run-174400/results.csv`
- `websites/03-anti-logo/reports/2026-11-11/run-174400/summary.md`
- `websites/03-anti-logo/reports/2026-11-11/run-174400/evidence/03-anti-logo-evidence.md`
- `websites/03-anti-logo/reports/2026-11-11/run-174400/bugs/BUG-03-01-retest.md`
- `websites/03-anti-logo/reports/2026-11-11/run-174400/bugs/BUG-03-02-retest.md`
- `websites/03-anti-logo/reports/2026-11-11/run-174400/bugs/BUG-03-03-retest.md`
- `websites/03-anti-logo/reports/2026-11-11/run-174400/bugs/BUG-03-04-retest.md`

### E. Website 04 — SafeVision (`websites/04-safevision/reports/2026-11-11/run-174400/`)
- `websites/04-safevision/reports/2026-11-11/run-174400/results.csv`
- `websites/04-safevision/reports/2026-11-11/run-174400/summary.md`
- `websites/04-safevision/reports/2026-11-11/run-174400/evidence/04-safevision-evidence.md`
- `websites/04-safevision/reports/2026-11-11/run-174400/bugs/BUG-04-01-retest.md`
- `websites/04-safevision/reports/2026-11-11/run-174400/bugs/BUG-04-02-retest.md`
- `websites/04-safevision/reports/2026-11-11/run-174400/bugs/BUG-04-03.md`
- `websites/04-safevision/reports/2026-11-11/run-174400/bugs/BUG-04-04.md`

