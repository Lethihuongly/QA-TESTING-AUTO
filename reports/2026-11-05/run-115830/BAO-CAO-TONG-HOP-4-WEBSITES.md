# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES — ĐỢT CHẠY `2026-11-05 / run-115830`

- **Thời gian thực hiện**: `2026-11-05 11:58:30` – `2026-11-05 14:34:00` (Asia/Ho_Chi_Minh, UTC+7)
- **Công cụ thực thi**: `chrome-devtools` MCP (kiểm thử trực tiếp trên trình duyệt Chrome theo phạm vi **chỉ đọc / Read-Only Regression**)
- **Báo cáo đối chiếu gần nhất**: `reports/2026-11-04/run-165752/BAO-CAO-TONG-HOP-4-WEBSITES.md`

---

## 1. Bảng tổng hợp kết quả 4 Websites

| Website | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | Bug mới | Bug cũ còn tái hiện |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1. VTV Tư liệu** (`01-vtv-tu-lieu`) | **33** | 29 | 1 | 0 | 3 | **96.67%** (29/30) | **1** (`BUG-01-04`) | **0** (`BUG-01-01` đã sửa; `BUG-01-02` chưa đủ ĐK chỉ đọc; `BUG-01-03` đóng theo TK) |
| **2. Sport Highlight** (`02-sport-highlight`) | **24** | 21 | 0 | 0 | 3 | **100.00%** (21/21) | **0** | **1** (`BUG-02-02` mức Low/P3 UX; `BUG-02-01` không còn tái hiện) |
| **3. Anti-Logo** (`03-anti-logo`) | **34** | 21 | 0 | 3 | 10 | **100.00%** (21/21) | **0** | **0** (`BUG-03-01` đã sửa; `BUG-03-02` không còn tái hiện) |
| **4. SafeVision** (`04-safevision`) | **28** | 22 | 0 | 3 | 3 | **100.00%** (22/22) | **0** | **0** (`BUG-04-01`, `BUG-04-03` và lỗi chính HLS 503/CORS của `BUG-04-02` đã sửa; còn warning phụ `[ChannelWS]` khi kênh `IDLE`) |
| **TỔNG CỘNG** | **119** | **93** | **1** | **6** | **19** | **98.94%** (93/94) | **1** | **1** (+ 1 cảnh báo kỹ thuật phụ) |

> **Kiểm tra công thức**:
> - **Web 01**: `29 + 1 + 0 + 3 = 33` | Tỷ lệ PASS: `29 / (29 + 1) = 96.67%`
> - **Web 02**: `21 + 0 + 0 + 3 = 24` | Tỷ lệ PASS: `21 / (21 + 0) = 100.00%`
> - **Web 03**: `21 + 0 + 3 + 10 = 34` | Tỷ lệ PASS: `21 / (21 + 0) = 100.00%`
> - **Web 04**: `22 + 0 + 3 + 3 = 28` | Tỷ lệ PASS: `22 / (22 + 0) = 100.00%`
> - **Tổng 4 Web**: `93 + 1 + 6 + 19 = 119` | Tỷ lệ PASS chung: `93 / (93 + 1) = 98.94%`

---

## 2. So sánh với báo cáo gần nhất (`2026-11-04 / run-165752`)

| Chỉ số | Đợt `2026-11-04` (`run-165752`) | Đợt `2026-11-05` (`run-115830`) | Chênh lệch & Lý do thay đổi |
| :--- | :---: | :---: | :--- |
| **Tổng số TC** | 119 | **119** | Không đổi (`33 + 24 + 34 + 28 = 119`). |
| **Số TC đã chạy (`PASS + FAIL`)** | 100 (`92 PASS`, `8 FAIL`) | **94** (`93 PASS`, `1 FAIL`) | Giảm 6 case thực thi và chuyển sang `BLOCKED` do điều kiện môi trường/giao diện:<br>• **Web 03 (`+3 BLOCKED`)**: Ở đợt `2026-11-04`, kênh `Channel 03` đang `IDLE` nên đo được 3 case `IDLE` (`03-02-03`, `03-04-03`, `03-05-03`). Ở đợt `2026-11-05`, cả 3 kênh `Channel 01..03` đều đang `LIVE`, trong phạm vi chỉ đọc không được phép `Stop` kênh nên 3 case `IDLE` chuyển sang `BLOCKED`.<br>• **Web 04 (`+3 BLOCKED`)**: Dev đã sửa `BUG-04-03` bằng cách gỡ bỏ ô tìm kiếm toàn cục chưa hoàn thiện trên Header, khiến 3 case `04-07-01..03` chuyển từ `FAIL` sang `BLOCKED` (thiếu phần tử mục tiêu). |
| **Tỷ lệ PASS chung** | `92.00%` (`92/100`) | **98.94%** (`93/94`) | **Tăng `+6.94%`** nhờ Dev đã khắc phục hàng loạt lỗi lớn từ đợt trước (`BUG-01-01`, `BUG-02-01`, `BUG-03-01`, `BUG-04-01`, `BUG-04-02`, `BUG-04-03`). |
| **Web 01 — VTV Tư liệu** | `29 PASS`, `1 FAIL` (`96.67%`) | `29 PASS`, `1 FAIL` (`96.67%`) | • `BUG-01-01` (nút phân trang Số trang bị disabled): **Đã khắc phục**, case `01-06-02` chuyển từ `FAIL` -> `PASS`.<br>• Phát sinh **1 bug mới `BUG-01-04`** ở case `01-03-03`: tìm kiếm từ khóa không khớp (`xyznonexistent12345`) bị treo API >10s và trả lỗi `ERR_FAILED` / CORS (`504 Gateway Timeout`), UI kẹt skeleton không hiện thông báo rỗng. |
| **Web 02 — Sport Highlight** | `20 PASS`, `1 FAIL` (`95.24%`) | `21 PASS`, `0 FAIL` (`100.00%`) | • `BUG-02-01` (trận `Troyes vs Le Mans` lỗi AI pipeline): **Đã khắc phục**, trận `Troyes vs Le Mans` đã xử lý xong (`124 đoạn`), 12 trận mới nhất trang 1 (như `Psv vs Club Brugge Kv` — `457 đoạn`) đều `completed`, case `02-02-02` chuyển từ `FAIL` -> `PASS`.<br>• `BUG-02-02` (UX chữ `"Đang tải..."` khi mở UUID không tồn tại): **Còn tái hiện** mức Low/P3 (nhưng TC `02-04-03` vẫn đạt expected `PASS` vì hiển thị đúng 4 Toast 404 và khóa nút phát). |
| **Web 03 — Anti-Logo** | `24 PASS`, `0 FAIL`, `0 BLOCKED` (`100.00%`) | `21 PASS`, `0 FAIL`, `3 BLOCKED` (`100.00%`) | • `BUG-03-01` (tiêu đề `#thumbModal` luôn ghi `FLAG 1`): **Đã khắc phục**, tiêu đề modal hiển thị đúng `FLAG 0 (Player: found, Logo: none)` hoặc `FLAG 1 (Player: found, Logo: found)` khớp với dòng dữ liệu.<br>• `BUG-03-02` (bộ đếm `Flag=1 count`): **Không còn tái hiện** (`Flag=1 count: 19` khớp 100% với 19 dòng khi bật bộ lọc `Show only flag=1`).<br>• Cả 3 kênh trên Multiview (`/channels`) phát mượt `1920x1080` ~50fps. |
| **Web 04 — SafeVision** | `19 PASS`, `6 FAIL`, `0 BLOCKED` (`76.00%`) | `22 PASS`, `0 FAIL`, `3 BLOCKED` (`100.00%`) | • `BUG-04-01` (thống kê phân loại logo không sắp xếp & hiện 216 mục `0%`): **Đã khắc phục**, case `04-02-03` chuyển từ `FAIL` -> `PASS`.<br>• `BUG-04-02` (luồng HLS gốc lỗi 503/CORS): **Đã khắc phục phần phát video**, URL stream cập nhật sang `vtvgolive-vtv02.vtvdigital.vn`, phát mượt `1280x720` (`25 fps`), 2 case `04-05-02` và `04-05-04` chuyển từ `FAIL` -> `PASS`.<br>• `BUG-04-03` (ô tìm kiếm Header): **Đã gỡ bỏ khỏi UI**, 3 case `04-07-01..03` chuyển sang `BLOCKED`. |

---

## 3. Tổng hợp kết quả kiểm tra lại 10 Bug cũ (Retest)

| Mã Bug | Website | Mô tả ngắn | Trạng thái trong đợt `2026-11-05` | Chi tiết xác minh |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01-01** | VTV Tư liệu | Các nút số trang (`1`, `2`, `3`) trong thanh phân trang tìm kiếm luôn bị `disabled` | **Không còn tái hiện (Đã khắc phục)** | Tìm kiếm `"thời sự"` trả về 2 trang; click trực tiếp nút số `2` (`uid=16_58`) chuyển sang trang `2 / 2`, click nút số `1` (`uid=17_11`) quay về trang `1 / 2`. |
| **BUG-01-02** | VTV Tư liệu | Trợ lý hỏi đáp AI (`/chat`) trả lỗi `500 Internal Server Error` khi gửi câu hỏi | **Chưa đủ điều kiện xác minh (trong phạm vi chỉ đọc)** | Theo quy tắc Mục 3 & Mục 5, không tự gửi câu hỏi AI mới nếu chưa được phép. Đã kiểm tra mở lịch sử cuộc trò chuyện cũ (`29/4/2026`) hiển thị bình thường (`01-09-01` PASS), không có lỗi 500 khi tải lịch sử. |
| **BUG-01-03** | VTV Tư liệu | Tìm kiếm không hỗ trợ toán tử dấu ngoặc kép `""` | **Đã đóng theo thiết kế** | Hệ thống sử dụng semantic/keyword search thông thường, không yêu cầu hỗ trợ toán tử `""`. |
| **BUG-02-01** | Sport Highlight | Một số trận đấu mới upload bị lỗi xử lý AI (`ERROR` / `0 đoạn`) | **Không còn tái hiện (Đã khắc phục)** | Trận `Troyes vs Le Mans` (`775f9ccd-...`) đã được xử lý xong (`124 đoạn`, phát bình thường). Toàn bộ 12 trận mới nhất trên trang 1 đều `completed` (ví dụ `Psv vs Club Brugge Kv` có `457 đoạn`). |
| **BUG-02-02** | Sport Highlight | Truy cập `/matches/<uuid-không-tồn-tại>` hiện 4 Toast 404 nhưng tiêu đề vẫn treo `"Đang tải..."` | **Còn tái hiện (Mức Low/P3 UX)** | Truy cập `/matches/00000000-0000-0000-0000-000000000000` hiện đúng 4 Toast `Không tìm thấy trận đấu` và khóa các nút điều khiển (`02-04-03` PASS), nhưng tiêu đề `uid=64_4` vẫn giữ `"Đang tải..."` và overlay `uid=64_30` vẫn giữ `"Đang tải video..."`. |
| **BUG-03-01** | Anti-Logo | Tiêu đề `#thumbModal` luôn hiển thị cứng `"FLAG 1"` ngay cả khi mở từ dòng `Flag=0` | **Không còn tái hiện (Đã khắc phục)** | Mở `#thumbModal` từ dòng `Frame #19875` (`Flag=0`) hiển thị đúng `"Frame #19875 — FLAG 0 (Player: found, Logo: none)"`; mở từ dòng `Frame #19480` (`Flag=1`) hiển thị đúng `"Frame #19480 — FLAG 1 (Player: found, Logo: found)"`. |
| **BUG-03-02** | Anti-Logo | Bộ đếm `Flag=1 count` trên thanh trạng thái lệch so với số dòng hiển thị ở trang 1 | **Không còn tái hiện** | Xác minh trên cùng phạm vi dữ liệu `306` semantic samples (`Showing 1-100 of 306 frames`): `Flag=1 count: 19`, khi tích `Show only flag=1` bảng lọc hiển thị đúng `Showing 1-19 of 19 frames` (19 dòng `Flag=1`). |
| **BUG-04-01** | SafeVision | Khối `"Thống kê phân loại logo"` không sắp xếp giảm dần và hiển thị hàng trăm mục `0 (0%)` | **Không còn tái hiện (Đã khắc phục)** | Đã lọc bỏ 216 mục `0` phát hiện khỏi DOM (`domLogoItemCount: 6`) và sắp xếp giảm dần chính xác: `3soc` (`16446`) > `3que` (`289`) > `ao3soc` (`279`) > `bản đồ 1` (`156`) > `bản đồ 3` (`32`) > `bản đồ 2` (`28`). |
| **BUG-04-02** | SafeVision | Luồng Stream Gốc HLS lỗi `503 Service Unavailable` + CORS và Console báo `[ChannelWS] SockJS or Stomp not loaded` | **Đã khắc phục lỗi phát HLS / Còn cảnh báo phụ `[ChannelWS]` khi kênh `IDLE`** | Luồng HLS gốc kênh `VTV4` đã đổi sang `vtvgolive-vtv02.vtvdigital.vn/.../master.m3u8`, phát mượt `1280x720` (`State: PLAYING`, `ReadyState: 4/4`). Tuy nhiên khi kênh đang `IDLE`, Console vẫn có 1 warning `[ChannelWS] SockJS or Stomp not loaded` (`msgid=8`). |
| **BUG-04-03** | SafeVision | Ô tìm kiếm toàn cục `"Tìm kiếm kênh, cảnh báo..."` trên Header không hoạt động | **Không còn tái hiện (Đã gỡ bỏ phần tử lỗi)** | Dev đã gỡ bỏ ô input tĩnh khỏi Header trên mọi trang; việc tìm kiếm kênh được thực hiện tại `/channels` (`04-04-01..03` PASS). |

---

## 4. Tổng hợp kiểm tra chất lượng Video & Multiview (Mục 6)

| Website & Chế độ xem | Kênh / Nguồn phát | Thời gian đo | Số liệu trong khoảng đo (Interval) | Số liệu tích lũy (Cumulative) | Đánh giá & Đối chiếu giao diện |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Anti-Logo** — Single Channel (`/`) | `Kênh 1` (`virtual-sdi-BONGDA_HD`, HLS `1920x1080`) | `10.02s` (`check-video-lag.js`) | `advancedMediaSec=10.02s`, `playbackRatio=1.0`, `effectiveFps=50.9`, `decodedFrames=510`, `droppedFrames=12`, `dropRatePercent=2.35%`, `waiting=1`, `stalled=0`, `freezeTicks=0`, `buffer=9.5s` | `totalFrames: 15669 -> 16179`, `droppedFrames: 32 -> 44` | Script trả `status: "SMOOTH"`. Video phát mượt, có hình. Khối `HLS metrics` trên UI báo `hls-playing`, `smoothStartOk=yes`, kèm cảnh báo kỹ thuật `Prerender degraded: YES (ready_buffer_low, clean_fallback)`. |
| **Anti-Logo** — Multiview (`/channels`) | **Ô 1**: `Channel 01` (`BONGDA_HD`, `1920x1080`) | `5.00s` | `deltaSec=5.00s`, `decoded=249`, `dropped=9` (`3.61%`), `readyState=4` | `totalFrames=984`, `droppedFrames=59` | **Có hình, phát mượt**, không đen hình/đứng hình. |
| **Anti-Logo** — Multiview (`/channels`) | **Ô 2**: `Channel 02` (`BONGDA_HD`, `1920x1080`) | `5.00s` | `deltaSec=4.97s`, `decoded=248`, `dropped=10` (`4.03%`), `readyState=4` | `totalFrames=985`, `droppedFrames=61` | **Có hình, phát mượt**, không đen hình/đứng hình. |
| **Anti-Logo** — Multiview (`/channels`) | **Ô 3**: `Channel 03` (`BONGDA_HD`, `1920x1080`) | `5.00s` | `deltaSec=5.00s`, `decoded=249`, `dropped=9` (`3.61%`), `readyState=4` | `totalFrames=955`, `droppedFrames=52` | **Có hình, phát mượt**, không đen hình/đứng hình. |
| **SafeVision** — Chi tiết kênh (`/channels/:id`) | `VTV4` (`LUỒNG STREAM GỐC` HLS `1280x720`) | `10.01s` (`check-video-lag.js`) | `advancedMediaSec=9.99s`, `playbackRatio=1.0`, `effectiveFps=25`, `decodedFrames=250`, `droppedFrames=1`, `dropRatePercent=0.4%`, `waiting=0`, `stalled=0`, `freezeTicks=0`, `buffer=11.12s` | `totalFrames: 777 -> 1027`, `droppedFrames: 3 -> 4` | Script trả `status: "SMOOTH"`. Đối chiếu `HLS Telemetry HUD` trên UI báo `State: PLAYING`, `ReadyState: 4/4`, `Latency: 12.62s`, `Buffer: 12.6s`, phát mượt. |

---

## 5. Danh sách lỗi cần Dev xử lý & Việc Tester cần xác minh thủ công

### 5.1. Lỗi cần Dev xử lý
1. **[MỚI - High/P1] `BUG-01-04` (VTV Tư liệu — `01-03-03`)**:
   - **Hiện tượng**: Tìm kiếm với từ khóa không khớp dữ liệu (ví dụ `xyznonexistent12345`) khiến request `GET /api/v1/Search/search?...` bị treo >10 giây rồi thất bại với `net::ERR_FAILED` kèm lỗi CORS (`No 'Access-Control-Allow-Origin' header` do Gateway timeout/504 không đính kèm CORS header). Giao diện bị kẹt ở trạng thái skeleton loading, không hiển thị thông báo *"Không tìm thấy kết quả phù hợp"*.
   - **File bug chi tiết (kèm hướng dẫn quay Jam & nội dung copy sang Notion)**: `websites/01-vtv-tu-lieu/reports/2026-11-05/run-115830/bugs/BUG-01-04-search-nonexistent-keyword-timeout-cors.md`.
2. **[CŨ CÒN TÁI HIỆN - Low/P3] `BUG-02-02` (Sport Highlight — `02-04-03`)**:
   - **Hiện tượng**: Khi truy cập URL mã trận đấu không tồn tại (`/matches/00000000-0000-0000-0000-000000000000`), sau khi API trả về `404 Not Found` và hiện Toast lỗi, tiêu đề trang vẫn giữ chữ `"Đang tải..."` và khung video vẫn hiển thị `"Đang tải video..."` thay vì chuyển sang trạng tháiEmpty/Error (`"Không tìm thấy trận đấu"`).
3. **[CẢNH BÁO KỸ THUẬT PHỤ - Low/P3] `BUG-04-02` phần WebSocket (SafeVision)**:
   - **Hiện tượng**: Khi mở trang chi tiết kênh ở trạng thái `IDLE`, Console xuất hiện cảnh báo `[ChannelWS] SockJS or Stomp not loaded` và badge `WS offline`.

### 5.2. Hạng mục cần Tester xác minh thủ công (ngoài phạm vi chỉ đọc)
1. **VTV Tư liệu (`01-vtv-tu-lieu`)**:
   - Thử gửi 1 câu hỏi mới trong `Trợ lý hỏi đáp` (`/chat` — `01-09-02`) trên môi trường test để xác nhận triệt để `BUG-01-02` (API chat AI có còn trả lỗi `500` hay không).
   - Kiểm thử luồng Upload video (`01-10-02`, `01-10-03`) với file mẫu hợp lệ/không hợp lệ.
2. **Sport Highlight (`02-sport-highlight`)**:
   - Kiểm thử thêm/xóa đoạn highlight và bấm tạo video tổng hợp (`02-07-01..03`).
3. **Anti-Logo (`03-anti-logo`)**:
   - Khi có cửa sổ bảo trì hoặc kênh thử nghiệm được phép `Stop`, kiểm tra 3 case trạng thái `IDLE` (`03-02-03`, `03-04-03`, `03-05-03`) và các thao tác `Start/Stop`, sửa BBox/nhãn, thêm/sửa/xóa logo (`03-07-03`, `03-08-01..03`, `03-09-01..03`, `03-10-01..03`).
4. **SafeVision (`04-safevision`)**:
   - Kiểm thử tạo/xóa kênh thử nghiệm (`04-03-03`), bật `Bắt đầu giám sát` (`04-08-02`) để kiểm tra luồng `Output Stream (đã blur / chèn QC trễ 20s)` và thêm/xóa danh mục logo (`04-08-03`).

---

## 6. Đường dẫn các file báo cáo đã lưu thực tế
- **Báo cáo tổng hợp 4 Websites**:
  - `reports/2026-11-05/run-115830/BAO-CAO-TONG-HOP-4-WEBSITES.md`
- **Website 01 — VTV Tư liệu**:
  - `websites/01-vtv-tu-lieu/reports/2026-11-05/run-115830/results.csv`
  - `websites/01-vtv-tu-lieu/reports/2026-11-05/run-115830/summary.md`
  - `websites/01-vtv-tu-lieu/reports/2026-11-05/run-115830/bugs/BUG-01-04-search-nonexistent-keyword-timeout-cors.md`
- **Website 02 — Sport Highlight**:
  - `websites/02-sport-highlight/reports/2026-11-05/run-115830/results.csv`
  - `websites/02-sport-highlight/reports/2026-11-05/run-115830/summary.md`
- **Website 03 — Anti-Logo**:
  - `websites/03-anti-logo/reports/2026-11-05/run-115830/results.csv`
  - `websites/03-anti-logo/reports/2026-11-05/run-115830/summary.md`
- **Website 04 — SafeVision**:
  - `websites/04-safevision/reports/2026-11-05/run-115830/results.csv`
  - `websites/04-safevision/reports/2026-11-05/run-115830/summary.md`
