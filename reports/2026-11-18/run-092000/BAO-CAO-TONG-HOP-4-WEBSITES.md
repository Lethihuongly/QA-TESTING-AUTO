# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES (`CMC-QA-TESTING`)

- **Run_ID dùng chung:** `2026-11-18/run-092000`
- **Múi giờ:** `Asia/Ho_Chi_Minh (+07:00)`
- **Thời gian thực hiện đợt chạy:** `2026-11-18 09:14:00 (+07:00)` → `2026-11-18 09:22:00 (+07:00)`
- **Công cụ thực thi:** Trực tiếp qua server `chrome-devtools` MCP (không dùng Playwright/Selenium/Browser Agent khác).
- **Phạm vi kiểm thử:** Kiểm tra toàn diện 4 hệ thống theo thứ tự:
  `01-vtv-tu-lieu` → `02-sport-highlight` → `03-anti-logo` → `04-safevision`.
  Đặc biệt khảo sát bản cập nhật mới nhất của **Website 03 — Anti-Logo**, bổ sung và hoàn thiện 2 thư mục tính năng mới (`03-13` và `03-14`).

---

## 1. Bảng Tổng Hợp Kết Quả 4 Websites

| STT | Website | URL | Tổng TC (`test-cases.md`) | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` (Chờ đăng nhập lại) | `NOT_RUN` (Ngoài phạm vi chỉ đọc) | Tỷ lệ `PASS` (trên số TC đã chạy) |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| **01** | **VTV Tư liệu** (`01-vtv-tu-lieu`) | `https://vtvtulieu.cmcati.vn/` | **33** | 2 | **2** | **0** | **29** *(Chờ đăng nhập lại)* | 2 | **100.00% (2/2)** |
| **02** | **Sport Highlight** (`02-sport-highlight`) | `https://sport-highlight.cmcati.vn/matches` | **24** | 2 | **2** | **0** | **19** *(Chờ đăng nhập lại)* | 3 | **100.00% (2/2)** |
| **03** | **Anti-Logo** (`03-anti-logo`) | `https://anti-logo.cmcati.vn/` | **47** *(+8 mới)* | 38 | **38** | **0** | **0** | 9 | **100.00% (38/38)** |
| **04** | **SafeVision** (`04-safevision`) | `https://safevision.cmcati.vn/` | **28** | 2 | **2** | **0** | **23** *(Chờ đăng nhập lại)* | 3 | **100.00% (2/2)** |
| **TỔNG** | **Toàn bộ 4 Websites** | — | **132** | **44** | **44** | **0** | **71** | **17** | **100.00% (44/44)** |

> [!NOTE]
> **Điểm nổi bật trọng tâm trong đợt chạy hôm nay (2026-11-18):**
> 1. **Khảo sát bản cập nhật lớn của Website 03 — Anti-Logo (`https://anti-logo.cmcati.vn/`):**
>    - Phiên đăng nhập `vtv` vẫn đang hoạt động ổn định trên cả 3 kênh và command center.
>    - Bổ sung thành công **2 thư mục tính năng mới** vào cấu trúc dự án:
>      - `features/13-Tiep-tuc-gan-nhan-va-Phien-video/` (4 test cases: `03-13-01` .. `03-13-04` — **PASS 4/4**)
>      - `features/14-Cong-cu-gan-nhan-nang-cao-OBB-SAM-VLM/` (4 test cases: `03-14-01` .. `03-14-04` — **PASS 4/4**)
>    - Nâng tổng số test case của Anti-Logo từ **39 lên 47 test cases**, đạt tỷ lệ **PASS 100% (38/38 cases đã chạy)**.
> 2. **Tình trạng luồng trực tiếp Anti-Logo:** Hai kênh `Channel 02` (`virtual-sdi-THETHAO_TINTUC_HD`) và `Channel 03` (`virtual-sdi-HAY_TV`) đang phát luồng trực tiếp liên tục với hơn **25.7 triệu frames**, giải mã video 1080p @ 50 FPS mượt mà.
> 3. **Tình trạng phiên của Web 01, Web 02, Web 04:** Sau 5 ngày (từ 2026-11-13), phiên cookie của 3 website này đã hết hạn tự nhiên. Các case kiểm tra form đăng nhập và route guard đều **PASS**, 71 case nghiệp vụ sau đăng nhập tạm thời chuyển sang trạng thái **BLOCKED** chờ người dùng đăng nhập lại trên cửa sổ Chrome do MCP mở.

---

## 2. Chi Tiết Khảo Sát & Cập Nhật Mới Trên Website 03 — Anti-Logo

### A. Tính năng mới `03-13`: Tiếp tục gán nhãn & Quản lý phiên video (`Curation Resume & Quick View`)
- **Thư mục tạo mới:** `websites/03-anti-logo/features/13-Tiep-tuc-gan-nhan-va-Phien-video/`
- **Bộ tài liệu kèm theo:** `test-cases.md`, `mcp-flow.md`, `selectors.json`, `scripts/check-curation-resume.js`.
- **Nghiệp vụ đã kiểm chứng:**
  - `03-13-01`: Thanh trạng thái `div[data-curation-resume="1"]` hiển thị thông báo tiến độ lưu trữ: `CH1 — Tiếp tục gán nhãn — Frame #52320 — Đã lưu lúc 9:11:07 AM` và 4 nút điều hướng con.
  - `03-13-02`: Bấm nút `Tiếp tục` mở ngay hộp thoại `#thumbModal` tại `Frame #52320`, nạp đầy đủ 23 annotation BBox và đóng modal an toàn.
  - `03-13-03`: Nút `Đã review` và `Chưa review đầu tiên` gọi hàm điều hướng `curationNavigate` ổn định, không phát sinh lỗi script.
  - `03-13-04`: Khung `section[data-curation-quick-view="1"]` cho phép chọn linh hoạt 5 thế hệ phiên video (`gen 1` đến `gen 5`); API `/v2/api/curation/resume?channel_id=1` trả về mã `HTTP 200` với đầy đủ `session_scope` và `checkpoint`.

### B. Tính năng mới `03-14`: Công cụ gán nhãn nâng cao OBB, MobileSAM, Auto VLM & Export
- **Thư mục tạo mới:** `websites/03-anti-logo/features/14-Cong-cu-gan-nhan-nang-cao-OBB-SAM-VLM/`
- **Bộ tài liệu kèm theo:** `test-cases.md`, `mcp-flow.md`, `selectors.json`, `scripts/check-advanced-annotations.js`.
- **Nghiệp vụ đã kiểm chứng:**
  - `03-14-01`: Nút `Compact / Large Review` (`#singleLargeReviewToggle`) chuyển đổi thuộc tính `document.body.dataset.pcdReview` từ `compact` sang `large` và ngược lại, phóng to thumbnail trực quan cho tester.
  - `03-14-02`: Bộ công cụ Oriented Bounding Box (OBB) hoạt động chuẩn: các nút xoay góc `↶ −5°`, `↷ +5°`, `0°`, nút `HBB → OBB`, `Rotate [R]`, input góc độ (`-9.6°`) và cấu trúc dữ liệu lưu tọa độ 4 điểm `obb_pts`.
  - `03-14-03`: Nút 1-click `🤖 Auto VLM + SAM BBox` (`#thumbModeVlmBtn`) và `🤖 Auto VLM + SAM` (`#bboxVlmInferBtn`) hiển thị gradient màu tím nổi bật; nút `🎯 Click SAM: TẮT` chuyển đổi trạng thái click mượt mà; endpoint `/v2/api/frame_annotations/vlm_infer` sẵn sàng.
  - `03-14-04`: Nút `Changed frames (0)`, `Export to Server (0)`, các nút `Undo`, `Redo` và bảng phím tắt `? Phím tắt` (`#bboxShortcutHelp`) đều khả dụng và an toàn.

---

## 3. Trạng Thái Tất Cả Các Bug Đã Kiểm Tra Lại & Lỗi Phát Hiện (`BUG-01-01` → `BUG-04-04`)

| Mã Bug | Website | Case_ID | Mức độ | Trạng thái Đợt Này (`run-092000`) | Tóm tắt Bằng chứng Thực tế | Cần quay Jam xác minh? |
|---|---|---|---|---|---|---|
| **BUG-01-01** | `01-vtv-tu-lieu` | `01-03-02` | P1 | **BLOCKED (Đã FIXED)** | Phiên cookie hết hạn; chuyển sang trạng thái chờ đăng nhập lại để retest. | Không |
| **BUG-01-02** | `01-vtv-tu-lieu` | `01-09-02` | P1 | **BLOCKED (Đã FIXED)** | Trợ lý hỏi đáp AI (đã xác nhận chạy dưới 3s ngày 13/11); chờ đăng nhập lại. | Không |
| **BUG-02-01** | `02-sport-highlight` | `02-05-01` | P0 | **WAITING_AUTH (Đã FIXED)** | Phát HLS 1080p trận `Sevilla vs Alaves`; chờ đăng nhập lại. | Không |
| **BUG-02-02** | `02-sport-highlight` | `02-04-03`, `02-05-03` | P1 | **WAITING_AUTH (PARTIALLY FIXED)** | Match 404 đã disabled player controls (`02-05-03` = PASS); phần UI treo `"Đang tải..."` (`02-04-03`) chờ đăng nhập lại để retest. | **CÓ (Nếu UI vẫn treo sau đăng nhập)** |
| **BUG-02-03** | `02-sport-highlight` | `02-03-03` | P1 | **WAITING_AUTH (OPEN)** | Lọc trạng thái sang trang 2 mất tham số lọc. Chờ đăng nhập lại để retest. | **CÓ (Nếu vẫn mất bộ lọc)** |
| **BUG-02-04** | `02-sport-highlight` | `02-05-02` | P1 | **WAITING_AUTH (Đã FIXED)** | Timeline phân đoạn AI hoạt động tốt, chờ retest sau đăng nhập. | Không |
| **BUG-03-01** | `03-anti-logo` | `03-07-02` | P2 | **FIXED** | Nhấn `✏️ Sửa BBox` / `Tiếp tục`: modal mở an toàn tại `Frame #52320`, hiển thị đúng checkpoint lưu trữ. | Không |
| **BUG-03-02** | `03-anti-logo` | `03-06-02` | P1 | **FIXED** | Khi bật `Show only flag=1` (`#flag1OnlyToggle`): bảng Frame Logs lọc chính xác 100% dòng vi phạm. | Không |
| **BUG-03-03** | `03-anti-logo` | `03-03-02`, `03-03-03`, `03-12-03` | P0 | **FIXED** | Cả 5 endpoint quản lý kênh đều trả về `HTTP 200 OK`, không bị lỗi `502 Bad Gateway`. | Không |
| **BUG-03-04** | `03-anti-logo` | `03-04-04`, `03-05-02` | P0 | **PASS_SMOOTH / LIVE** | Channel 02 & 03 đang phát trực tiếp SDI thực tế (hơn 25.7 triệu frames); video phát 1080p @ 50 FPS. | Không |
| **BUG-04-01** | `04-safevision` | `04-02-03` | P1 | **BLOCKED (Đã FIXED)** | Thống kê phân loại logo; chờ đăng nhập lại trên Chrome MCP để giải phóng. | Không |
| **BUG-04-02** | `04-safevision` | `04-05-02` | P0 | **BLOCKED (Đã FIXED)** | Phát video Luồng Gốc mượt mà (đã xác nhận ngày 13/11 đạt 22.5 FPS, 0 drop); chờ đăng nhập lại. | Không |
| **BUG-04-03** | `04-safevision` | `04-07-03` | P2 | **BLOCKED (Lệch đặc tả UI)** | Ô tìm kiếm nhanh trên Header không có trong DOM SafeVision. Chờ PO xác nhận spec. | Không |
| **BUG-04-04** | `04-safevision` | `04-03-01`, `04-05-02` | P0 | **BLOCKED (Đã FIXED)** | Danh sách 9 kênh hoạt động đồng bộ 100%; chờ đăng nhập lại. | Không |

---

## 4. Đường Dẫn Đầy Đủ Toàn Bộ Các File Báo Cáo Đã Lưu (`Run_ID: 2026-11-18/run-092000`)

### A. Báo cáo Tổng hợp 4 Websites
- [BAO-CAO-TONG-HOP-4-WEBSITES.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/reports/2026-11-18/run-092000/BAO-CAO-TONG-HOP-4-WEBSITES.md)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/reports/2026-11-18/run-092000/summary.md)

### B. Website 01 — VTV Tư liệu (`websites/01-vtv-tu-lieu/reports/2026-11-18/run-092000/`)
- [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-18/run-092000/results.csv)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-18/run-092000/summary.md)
- [01-vtv-tu-lieu-evidence.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-18/run-092000/evidence/01-vtv-tu-lieu-evidence.md)

### C. Website 02 — Sport Highlight (`websites/02-sport-highlight/reports/2026-11-18/run-092000/`)
- [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-18/run-092000/results.csv)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-18/run-092000/summary.md)
- [02-sport-highlight-evidence.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-18/run-092000/evidence/02-sport-highlight-evidence.md)

### D. Website 03 — Anti-Logo (`websites/03-anti-logo/reports/2026-11-18/run-092000/`)
- [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-18/run-092000/results.csv)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-18/run-092000/summary.md)
- [03-anti-logo-evidence.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-18/run-092000/evidence/03-anti-logo-evidence.md)
- [checklist.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/checklist.csv)
- [CHANGELOG.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/CHANGELOG.md)
- [Tính năng 13 — Tiếp tục gán nhãn](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/features/13-Tiep-tuc-gan-nhan-va-Phien-video/test-cases.md)
- [Tính năng 14 — Công cụ gán nhãn nâng cao OBB, SAM, VLM](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/features/14-Cong-cu-gan-nhan-nang-cao-OBB-SAM-VLM/test-cases.md)

### E. Website 04 — SafeVision (`websites/04-safevision/reports/2026-11-18/run-092000/`)
- [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-18/run-092000/results.csv)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-18/run-092000/summary.md)
- [04-safevision-evidence.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-18/run-092000/evidence/04-safevision-evidence.md)

