# BÁO CÁO TỔNG HỢP KẾT QUẢ KIỂM THỬ 4 WEBSITE — NGÀY `2026-11-04` (BẢN CHUẨN ĐÃ RÀ SOÁT TOÀN DIỆN)

- **Ngày giờ thực hiện & rà soát**: `2026-11-04 10:23:00` – `12:02:00 (+07:00)`
- **Công cụ kiểm thử**: `chrome-devtools` MCP (Google Chrome)
- **Phạm vi thực hiện**: Kiểm thử hồi quy & chỉ đọc (Smoke / Read-only Regression) toàn bộ 4 website, kiểm tra mở rộng các màn hình phụ (`/manage`, hộp thoại `Sửa thông tin video`, toàn bộ các kênh `VTV1..VTV9`), đo định lượng chất lượng phát video trực tiếp (`check-video-lag.js`), và rà soát toàn bộ các vấn đề phát hiện ngày `2026-11-03`.

---

## 1. BẢNG TỔNG HỢP KẾT QUẢ 4 WEBSITE (NGÀY `2026-11-04` SO VỚI `2026-11-03`)

| STT | Website | URL | Tổng TC | PASS (04/11) | FAIL (04/11) | BLOCKED | NOT_RUN | Tỷ lệ PASS / Đã chạy | So sánh với ngày 03/11 | Báo cáo chi tiết (04/11) |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| 1 | **01 — VTV Tư liệu** | `https://vtvtulieu.cmcati.vn/` | **33** | **30** | **0** | 0 | 3 | **`100%` (30/30)** | Tăng `+2 PASS` (`28` → `30`), giảm `-2 FAIL` (`2` → `0`) — **0 Bug tồn đọng** | [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-04/run-103430/summary.md) · [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-04/run-103430/results.csv) |
| 2 | **02 — Sport Highlight** | `https://sport-highlight.cmcati.vn/matches` | **24** | **21** | **0** | 0 | 3 | **`100%` (21/21)** | Tăng `+2 PASS` (`19` → `21`), giảm `-2 FAIL` (`2` → `0`) — **0 Bug tồn đọng** | [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-04/run-104040/summary.md) · [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-04/run-104040/results.csv) |
| 3 | **03 — Anti-Logo** | `https://anti-logo.cmcati.vn/` | **33** | **23** | **0** | 0 | 10 | **`100%` (23/23)** | Tăng `+2 PASS` (`21` → `23`), giảm `-2 FAIL` (`2` → `0`) — **0 Bug tồn đọng** | [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-04/run-104320/summary.md) · [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-04/run-104320/results.csv) |
| 4 | **04 — SafeVision** | `https://safevision.cmcati.vn/` | **27** | **23** | **1** | 0 | 3 | **`95.8%` (23/24)** | Tăng `+2 PASS` (`21` → `23`), giảm `-2 FAIL` (`3` → `1`) — Đã hết sạch lỗi CORS/503 trên cả `VTV1`, `VTV6`, `VTV7`, `VTV9` | [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-04/run-104830/summary.md) · [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-04/run-104830/results.csv) |
| **TỔNG** | **Toàn bộ 4 Website** | — | **117** | **97** | **1** | **0** | **19** | **`99.0%` (97/98)** | **Tăng `+8 PASS` (`89` → `97`), giảm `-8 FAIL` (`9` → `1`)** | **3/4 Website đạt 100% PASS (0 Bug)** |

---

## 2. KẾT QUẢ RÀ SOÁT CHI TIẾT TỪNG WEBSITE (ĐẾN `12:02` NGÀY `2026-11-04`)

### 2.1. Website 01 — VTV Tư liệu (`https://vtvtulieu.cmcati.vn/`) — **100% PASS (0 Bug mới)**
- **Tìm kiếm & Phân trang (`/results`)**: Tìm kiếm từ khóa `"thời sự"` trả về **38 kết quả** (`2` trang), chuyển trang 1 ↔ 2 và mở video hoạt động mượt mà (`BUG-01-01` đã khắc phục).
- **Chi tiết video, Phân tích 5 tab & Hỏi đáp AI (`/watch`)**:
  - Video MP4 phát mượt; 5 tab (`Tóm tắt`, `Cảnh`, `Khuôn mặt`, `OCR`, `Lời thoại`) hiển thị đầy đủ.
  - Trợ lý hỏi đáp AI (`POST /api/v1/videos/{id}/chat`) trả về HTTP `200 OK` kèm tóm tắt nội dung và 5 mốc thời gian (`BUG-01-02` đã khắc phục).
- **Quản lý kho (`/warehouse-management`)**:
  - Cả 3 tab (`Người dùng tải`: `151 mục`, `Danh sách khuôn mặt`: `564 mục`, `Danh sách địa danh`: `18 mục`), hộp thoại `Bộ lọc` và hộp thoại `Sửa thông tin video` (`21 chủ đề`, `Tiền kỳ / Hậu kỳ`, `Thời gian phát sóng`) hoạt động bình thường, không phát sinh lỗi Console hay Network.

---

### 2.2. Website 02 — Sport Highlight (`https://sport-highlight.cmcati.vn/matches`) — **100% PASS (0 Bug mới)**
- **Trang mở đầu (`/`) & Quản lý trận đấu (`/matches`)**:
  - Hiển thị `213 trận đấu` (`18 trang`), lọc từ khóa `"Real Madrid"` (`12 trận`), lọc từ khóa rỗng (`0 trận`), nút `Đặt lại` và phân trang hoạt động chính xác.
  - Các trận thuộc `Lịch thi đấu` (`U19 Borussia Dortmund vs U19 Real Betis`) được khóa bằng nút `"Chưa sẵn sàng"`.
- **Chi tiết trận đấu & Pipeline AI (`/matches/{id}`)**:
  - Toàn bộ các trận mới ghi hình ngày `04/11/2026` (`Feyenoord vs Inter Milan`: **`148 phân đoạn`**, `Bodo/Glimt vs Lille`: **`102 phân đoạn`**, `Barcelona vs Aston Villa`, `Shakhtar Donetsk vs Sporting Cp`, ...) đều được AI xử lý sinh phân đoạn đầy đủ và phát video `1920x1080` mượt mà (`BUG-02-01` đã khắc phục).
  - Truy cập mã trận không tồn tại (`/matches/00000000-0000-0000-0000-000000000000`) hiển thị đúng thông báo Toast **`"Đã xảy ra lỗi — Match was not found."`** và khóa các nút điều khiển (`BUG-02-02` đã đóng).
- **Quản lý danh mục (`/manage`)**:
  - Đã kiểm tra mở rộng trang `/manage`: Hiển thị đầy đủ **`Kênh phát` (`40 kênh`, 4 trang)**, **`Giải đấu` (`29 giải đấu`, 3 trang)** và **`Kênh YouTube` (`3 kênh` đã kết nối)**; tìm kiếm giải đấu `"Champions League"` lọc chính xác còn `6 giải đấu`, không có lỗi Console/Network.

---

### 2.3. Website 03 — Anti-Logo (`https://anti-logo.cmcati.vn/`) — **100% PASS (0 Bug mới)**
- **Bàn điều khiển đơn kênh (`/`, `/channel/1..3`) & Đa kênh (`/channels`)**:
  - Hiển thị đầy đủ `33` video mẫu, `3` nguồn `Virtual SDI 01..03 (1080p @ 50 FPS)`, `106` nhãn `YOLO banner classes`, cấu hình `FPS / Độ mờ / Protect ROI` và `3` phương thức Preview (`HLS`, `WebRTC`, `MJPEG`).
- **Bảng Logs & Modal BBox (`#thumbModal`)**:
  - Phân trang bảng Logs (`1-75`, `76-150` trên `200 frames`), lọc `Show only flag=1` (`191 frames`) và mở/đóng `#thumbModal` hoạt động chính xác.
  - Tiêu đề `#thumbModalTitle` hiển thị đúng `"FLAG 0 (Player: found, Logo: none)"` cho các dòng `Flag = 0` (`BUG-03-01` đã khắc phục).

---

### 2.4. Website 04 — SafeVision (`https://safevision.cmcati.vn/`) — **95.8% PASS (`23/24` case đã chạy)**
- **Đã khắc phục hoàn toàn lỗi CORS & HTTP 503 trên toàn bộ các kênh truyền hình (`VTV1`, `VTV3`, `VTV6`, `VTV7`, `VTV9`)**:
  - Kiểm tra mở rộng trên các kênh từng bị lỗi CORS hôm qua (`VTV7` `/channels/ca912663-bd6e-4522-8965-9adcffc0595b`, `VTV9` `/channels/26d010ea-346e-4247-80e6-a23a27d043a2`, `VTV1` `/channels/d0094380-35f5-4d28-8e1c-045b6e39eef5`): Tất cả đều tải manifest HLS từ `vtvgolive-vtv02.vtvdigital.vn` thành công và phát `LUỒNG STREAM GỐC` (`1280x720`, `readyState = 4`, `paused = false`, `error = null`) mượt mà, không còn lỗi CORS hay trạng thái treo `RUNNING` giả.
  - Trên kênh đang bật giám sát AI (`VTV6 - Kênh thể thao` `/channels/a2884000-4624-4b57-b340-7b8c0e2cb657`), cả **2 luồng** (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`) đều phát trực tiếp đồng thời ở `1280x720`.
- **Kết quả theo dõi dài hạn (16 phút — `24,862 frames`) & đo định lượng 10 giây bằng `check-video-lag.js` trên `VTV6`**:
  - **`LUỒNG STREAM GỐC`**: `verdict = "SMOOTH"` | `playbackRatio = 1.000` (`10.13s / 10.12s`) | `effectiveFps = 25.0 fps` | `droppedFrames = 0` trong 10s đo (tích lũy `92 / 24,713 frames = 0.37%`) | `minBufferAhead = 5.21s` (`avg = 6.56s`).
  - **`LUỒNG DELAYED — ĐANG GIÁM SÁT`**: `verdict = "SMOOTH"` | `playbackRatio = 0.999` (`10.12s / 10.13s`) | `effectiveFps = 25.0 fps` | `droppedFrames = 0` trong 10s đo (tích lũy `70 / 24,862 frames = 0.28%`) | `minBufferAhead = 9.57s` (`avg = 11.48s`).
  - *Ghi chú kỹ thuật (Observability)*: Khi treo tab xem liên tục trên 10 phút, Console của `LUỒNG DELAYED` đôi lúc xuất hiện cảnh báo `[HLS] Low buffer warning` / `bufferStalledError (fatal: false)` và cơ chế tự hồi phục (`recovery timer / nudging load`) của player đã tự động nạp lại buffer lên `9.57s – 13.41s` nên luồng không bị đứng hình.
- **Điểm cần lưu ý duy nhất còn lại trên SafeVision (`BUG-04-01` — `04-02-03`)**:
  - Trên trang Dashboard `/`, khối `THỐNG KÊ PHÂN LOẠI LOGO` gom dữ liệu `topLogos` vào Object JavaScript khiến các nhãn tên là số nguyên (`"0"`, `"1"`, `"3"`, ...) tự động xếp lên đầu danh sách trước các nhãn chữ (`"chatgpt"`, `"kk"`, `"logo"`).
