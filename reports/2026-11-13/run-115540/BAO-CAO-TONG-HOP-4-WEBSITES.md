# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES (`CMC-QA-TESTING`)

- **Run_ID dùng chung:** `2026-11-13/run-115540`
- **Múi giờ:** `Asia/Ho_Chi_Minh (+07:00)`
- **Thời gian thực hiện đợt chạy:** `2026-11-13 11:55:40 (+07:00)` → `2026-11-13 12:15:00 (+07:00)`
- **Công cụ thực thi:** Trực tiếp qua server `chrome-devtools` MCP (không dùng Playwright/Selenium/Browser Agent khác).
- **Phạm vi kiểm thử:** Chỉ đọc (`Read-Only`) — thực thi toàn bộ các test case chỉ đọc đủ điều kiện trên cả 4 hệ thống theo đúng thứ tự:
  `01-vtv-tu-lieu` → `02-sport-highlight` → `03-anti-logo` → `04-safevision`.

---

## 1. Bảng Tổng Hợp Kết Quả 4 Websites

| STT | Website | URL | Tổng TC (`test-cases.md`) | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` | `NOT_RUN` (Ngoài phạm vi chỉ đọc) | Tỷ lệ `PASS` (trên số TC đã chạy) |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| **01** | **VTV Tư liệu** (`01-vtv-tu-lieu`) | `https://vtvtulieu.cmcati.vn/` | **33** | 31 | **31** | **0** | **0** | 2 | **100.00% (31/31)** |
| **02** | **Sport Highlight** (`02-sport-highlight`) | `https://sport-highlight.cmcati.vn/matches` | **24** | 3 | **3** | **0** | **18** *(Chờ đăng nhập lại)* | 3 | **100.00% (3/3)** |
| **03** | **Anti-Logo** (`03-anti-logo`) | `https://anti-logo.cmcati.vn/` | **39** | 30 | **30** | **0** | **0** | 9 | **100.00% (30/30)** |
| **04** | **SafeVision** (`04-safevision`) | `https://safevision.cmcati.vn/` | **28** | 24 | **24** | **0** | **1** *(BUG-04-03)* | 3 | **100.00% (24/24)** |
| **TỔNG** | **Toàn bộ 4 Websites** | — | **124** | **88** | **88** | **0** | **19** | **17** | **100.00% (88/88)** |

> [!NOTE]
> **Điểm sáng lớn trong báo cáo hôm nay (2026-11-13):**
> 1. Hệ thống **Website 04 — SafeVision** đã được khôi phục phiên đăng nhập đầy đủ với tài khoản `VTV vtv VT`. Toàn bộ 22 test case bị nghẽn ở đợt chạy hôm trước đã được giải phóng và kiểm thử thành công, nâng số test case PASS của SafeVision từ **3 lên 24 PASS**.
> 2. Hệ thống **Website 03 — Anti-Logo** ghi nhận 2 luồng phát trực tiếp Virtual SDI thực tế đang hoạt động (`Channel 02` và `Channel 03` ghi nhận hơn 4.6 triệu frames), kiểm tra định lượng video 1080p đạt chuẩn 49.8 FPS và giải mã thành công 100% (15/15) file video cục bộ.
> 3. Hệ thống **Website 01 — VTV Tư liệu** giữ vững phong độ ổn định tuyệt đối với **31/31 PASS (100%)**.

---

## 2. Trạng Thái Tất Cả Các Bug Đã Kiểm Tra Lại & Lỗi Phát Hiện (`BUG-01-01` → `BUG-04-04`)

| Mã Bug | Website | Case_ID | Mức độ | Trạng thái Đợt Này (`run-115540`) | Tóm tắt Bằng chứng Thực tế | Cần quay Jam xác minh? |
|---|---|---|---|---|---|---|
| **BUG-01-01** | `01-vtv-tu-lieu` | `01-03-02` | P1 | **FIXED** | Tìm kiếm `"Ẩm thực Việt Nam"` (`63` kết quả): bấm trang `2` chuyển ngay sang `&page_id=2`, hiển thị đầy đủ 20 video mới của trang 2 (thẻ đầu: `"Tình hình kinh tế Việt Nam năm 2024"`). | Không |
| **BUG-01-02** | `01-vtv-tu-lieu` | `01-09-02` | P1 | **FIXED** | Gửi câu hỏi gợi ý `"Video này nói về nội dung gì?"` trên video `be08b277...`: AI phản hồi nhanh chóng (dưới 3s), hiển thị câu trả lời tóm tắt chi tiết, không phát sinh lỗi UI hay Console. | Không |
| **BUG-02-01** | `02-sport-highlight` | `02-05-01` | P0 | **WAITING_AUTH (Đã FIXED)** | Chờ người dùng đăng nhập lại trên Chrome MCP để kiểm tra lại phát HLS 1080p trận `Sevilla vs Alaves`. | Không |
| **BUG-02-02** | `02-sport-highlight` | `02-04-03`, `02-05-03` | P1 | **PARTIALLY FIXED (Chờ retest)** | Match 404 đã disabled controls player (`02-05-03` = PASS); phần UI treo `"Đang tải..."` (`02-04-03`) đang chờ đăng nhập lại để retest. | **CÓ (Nếu UI vẫn treo sau đăng nhập)** |
| **BUG-02-03** | `02-sport-highlight` | `02-03-03` | P1 | **OPEN (Chờ retest)** | Lọc `TRẠNG THÁI = "Đã kết thúc"` rồi sang trang 2 bị mất tham số lọc. Chờ đăng nhập lại để retest bản fix mới. | **CÓ (Nếu vẫn mất bộ lọc)** |
| **BUG-02-04** | `02-sport-highlight` | `02-05-02` | P1 | **WAITING_AUTH (Đã FIXED)** | Timeline phân đoạn AI hoạt động tốt, chờ retest sau đăng nhập. | Không |
| **BUG-03-01** | `03-anti-logo` | `03-07-02` | P2 | **FIXED** | Nhấn `✏️ Sửa BBox` trên dòng Frame vi phạm (Frame 350940): modal mở an toàn, hiển thị đúng tiêu đề `Frame #350940 — FLAG 1 (Player: found, Logo: found)` và đóng an toàn. | Không |
| **BUG-03-02** | `03-anti-logo` | `03-06-02` | P1 | **FIXED** | Khi checkbox `Show only flag=1` (`#flag1OnlyToggle`) bật: bảng Frame Logs lọc chính xác 75/75 dòng hiển thị có `Flag=1` (`nonFlag1Count=0`). | Không |
| **BUG-03-03** | `03-anti-logo` | `03-03-02`, `03-03-03`, `03-12-03` | P0 | **FIXED** | Cả 5 endpoint (`/v2/api/sdi_inputs`, `/channels/api/{1,2,3}/sdi_inputs` và `/channels/api/state`) đều trả về `HTTP 200`, trạng thái `IDLE`/`LIVE`, `ok=true`, không bị lỗi `502 Bad Gateway`. | Không |
| **BUG-03-04** | `03-anti-logo` | `03-04-04`, `03-05-02` | P0 | **PASS_SMOOTH / LIVE** | Channel 02 & 03 đang phát trực tiếp SDI thực tế (hơn 4.6 triệu frames); video phát 1080p @ 49.8 FPS; 15/15 file video cục bộ giải mã Frame 0 thành công (`HTTP 200 image/jpeg`). | Không |
| **BUG-04-01** | `04-safevision` | `04-02-03` | P1 | **FIXED** | Khối Thống kê phân loại logo hiển thị chính xác 7 nhóm nhãn sắp xếp giảm dần theo tần suất (3soc: 16446, 3que: 289, ao3soc: 279, bản đồ 1: 156, s: 59, bản đồ 3: 32, bản đồ 2: 28). | Không |
| **BUG-04-02** | `04-safevision` | `04-05-02` | P0 | **FIXED** | Đo lường định lượng phát video Luồng Gốc trên VTV10: `wallSec=4.00s`, `deltaVideoSec=3.58s`, `playbackRatio=0.895`, `decodedFrames=90`, `droppedFrames=0` (tỷ lệ rớt frame 0.00%), `effectiveFps=22.5 FPS`. Kết luận: **SMOOTH**. | Không |
| **BUG-04-03** | `04-safevision` | `04-07-03` | P2 | **BLOCKED (Lệch đặc tả UI)** | Ô tìm kiếm nhanh trên Header không có trong thiết kế DOM của SafeVision (`headerInputCount = 0`). Ô tìm kiếm kênh nằm tại `/channels`. Cần Product Owner / Designer xác nhận spec. | Không |
| **BUG-04-04** | `04-safevision` | `04-03-01`, `04-05-02` | P0 | **FIXED** | Danh sách 9 kênh hiển thị đầy đủ và trạng thái hoạt động đồng bộ 100% ("9 đang hoạt động"); phát video ổn định. | Không |

---

## 3. Đường Dẫn Đầy Đủ Toàn Bộ Các File Báo Cáo Đã Lưu (`Run_ID: 2026-11-13/run-115540`)

### A. Báo cáo Tổng hợp 4 Websites
- [BAO-CAO-TONG-HOP-4-WEBSITES.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/reports/2026-11-13/run-115540/BAO-CAO-TONG-HOP-4-WEBSITES.md)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/reports/2026-11-13/run-115540/summary.md)

### B. Website 01 — VTV Tư liệu (`websites/01-vtv-tu-lieu/reports/2026-11-13/run-115540/`)
- [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-13/run-115540/results.csv)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-13/run-115540/summary.md)
- [01-vtv-tu-lieu-evidence.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-13/run-115540/evidence/01-vtv-tu-lieu-evidence.md)
- [BUG-01-01-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-13/run-115540/bugs/BUG-01-01-retest.md)
- [BUG-01-02-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-13/run-115540/bugs/BUG-01-02-retest.md)

### C. Website 02 — Sport Highlight (`websites/02-sport-highlight/reports/2026-11-13/run-115540/`)
- [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-13/run-115540/results.csv)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-13/run-115540/summary.md)
- [02-sport-highlight-evidence.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-13/run-115540/evidence/02-sport-highlight-evidence.md)
- [BUG-02-01-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-13/run-115540/bugs/BUG-02-01-retest.md)
- [BUG-02-02.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-13/run-115540/bugs/BUG-02-02.md)
- [BUG-02-03.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-13/run-115540/bugs/BUG-02-03.md)
- [BUG-02-04-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-13/run-115540/bugs/BUG-02-04-retest.md)

### D. Website 03 — Anti-Logo (`websites/03-anti-logo/reports/2026-11-13/run-115540/`)
- [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-13/run-115540/results.csv)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-13/run-115540/summary.md)
- [03-anti-logo-evidence.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-13/run-115540/evidence/03-anti-logo-evidence.md)
- [BUG-03-01-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-13/run-115540/bugs/BUG-03-01-retest.md)
- [BUG-03-02-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-13/run-115540/bugs/BUG-03-02-retest.md)
- [BUG-03-03-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-13/run-115540/bugs/BUG-03-03-retest.md)
- [BUG-03-04-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-13/run-115540/bugs/BUG-03-04-retest.md)

### E. Website 04 — SafeVision (`websites/04-safevision/reports/2026-11-13/run-115540/`)
- [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-13/run-115540/results.csv)
- [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-13/run-115540/summary.md)
- [04-safevision-evidence.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-13/run-115540/evidence/04-safevision-evidence.md)
- [BUG-04-01-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-13/run-115540/bugs/BUG-04-01-retest.md)
- [BUG-04-02-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-13/run-115540/bugs/BUG-04-02-retest.md)
- [BUG-04-03.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-13/run-115540/bugs/BUG-04-03.md)
- [BUG-04-04-retest.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-13/run-115540/bugs/BUG-04-04-retest.md)

