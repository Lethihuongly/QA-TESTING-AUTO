# BÁO CÁO KIỂM THỬ HỒI QUY (LƯỢT 2) — WEBSITE 03: ANTI-LOGO (VTV PCD)

## 1. Thông tin chung
- **Website**: Anti-Logo (`websites/03-anti-logo/`)
- **URL**: `https://anti-logo.cmcati.vn/`
- **Thời gian chạy**: `2026-11-05 15:43:52` – `2026-11-05 15:50:00` (Asia/Ho_Chi_Minh, UTC+7)
- **Mã đợt chạy**: `run-152048` (Lượt kiểm thử kỹ lần 2 trong ngày `2026-11-05`)
- **Công cụ**: `chrome-devtools` MCP (chỉ đọc, không Start/Stop kênh, không sửa BBox/ROI/cấu hình)

---

## 2. Tổng hợp kết quả
| Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | Bug mới | Bug cũ còn tái hiện |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **34** | **21** | **0** | **3** | **10** | **100.00% (21/21)** | **0** | **0** |

- **Kiểm tra công thức**: `Tổng TC = 21 + 0 + 3 + 10 = 34`.
- **Chi tiết 3 case `BLOCKED`**: `03-02-03`, `03-04-03`, `03-05-03` (Cả 3 kênh `Channel 01..03` đều đang `LIVE`; trong phạm vi chỉ đọc không được phép `Stop` kênh để kiểm tra giao diện `IDLE`).
- **Chi tiết 10 case `NOT_RUN`**: `03-07-03`, `03-08-01..03`, `03-09-01..03`, `03-10-01..03` (các thao tác sửa BBox, thêm/xóa logo, chỉnh ROI/cấu hình, Start/Stop kênh).

---

## 3. Kết quả kiểm tra lại Bug cũ (Retest)
| Mã Bug | Tiêu đề | Trạng thái trong đợt `run-152048` | Bằng chứng xác minh thực tế |
| :--- | :--- | :--- | :--- |
| **BUG-03-01** | Tiêu đề `#thumbModal` luôn hiển thị cứng `"FLAG 1"` ngay cả khi mở từ dòng `Flag=0` | **Không còn tái hiện (Đã khắc phục)** | Mở `#thumbModal` từ dòng `Frame #15480` (`Flag=0`) hiển thị: `"Frame #15480 — FLAG 0 (Player: found, Logo: none)"`. Mở từ dòng `Frame #16020` (`Flag=1`) hiển thị: `"Frame #16020 — FLAG 1 (Player: found, Logo: found)"`. |
| **BUG-03-02** | Bộ đếm `Flag=1 count` lệch với số dòng trên bảng | **Không còn tái hiện** | Bảng khóa tự động tại `Frame #15690 (Showing 5-79 of 440 frames)`; khi tích `Show only flag=1`, bảng lọc hiển thị đúng `Showing 8-82 of 160 frames` (75 dòng/trang đều có `Flag=1`). |

---

## 4. Kết quả kiểm tra Video & Multiview (Mục 6)
1. **Đo Single Channel (`/` — `Kênh 1`, nguồn `FULL MATCH ATALANTA vs BAYERN MUNICH... [Active]`, HLS `1920x1080`, đo `11.73s` bằng `check-video-lag.js`)**:
   - **Verdict của script**: `status: "SMOOTH"` — *"Video phát mượt, không phát hiện giật/lag."*
   - **Số liệu trong khoảng đo (`11.73s`)**: `advancedMediaSec = 10.50s`, `playbackRatio = 0.89`, `effectiveFps = 53.9`, `decodedFrames = 632`, `droppedFrames = 16`, `dropRatePercent = 2.53%`, `waitingEvents = 0`, `stalledEvents = 0`, `freezeTicks = 0`, `minBufferedAheadSec = 4.89s`, `finalBufferedAheadSec = 12.39s`.
   - **Số liệu tích lũy**: `totalFrames: 4 -> 636`, `droppedFrames: 0 -> 16`.
2. **Đo Multiview 3 kênh (`/channels`, đo `5.00s` đồng thời trên 3 ô đang `LIVE`)**:
   - **Ô 1 (`Channel 01`)**: `1920x1080`, `readyState = 4`, `deltaSec = 5.03s`, trong 5s giải mã `301` frames / rớt `50` frames (`16.61%` do vừa chuyển từ `STARTING` sang `LIVE`), tích lũy `5014 / 594` — **Có hình, đang phát**.
   - **Ô 2 (`Channel 02`)**: `1920x1080`, `readyState = 4`, `deltaSec = 4.97s`, trong 5s giải mã `247` frames / rớt `37` frames (`14.98%`), tích lũy `179179 / 16860` — **Có hình, đang phát**.
   - **Ô 3 (`Channel 03`)**: `1920x1080`, `readyState = 4`, `deltaSec = 4.97s`, trong 5s giải mã `246` frames / rớt `39` frames (`15.85%`), tích lũy `178631 / 16739` — **Có hình, đang phát**.
   *(Ghi chú kỹ thuật: Khi mở đồng thời 3 luồng Full HD `1920x1080 @ 50-60fps` trên cùng một trình duyệt ở trang Multiview, tỷ lệ frame drop phần cứng trình duyệt dao động `14.98% - 16.61%`, trong khi xem đơn kênh chỉ `2.53%`).*

