# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES — ĐỢT CHẠY `2026-11-05 / run-152048` (LƯỢT KIỂM THỬ KỸ LẦN 2)

- **Thời gian thực hiện**: `2026-11-05 15:20:48` – `2026-11-05 15:56:30` (Asia/Ho_Chi_Minh, UTC+7)
- **Công cụ thực thi**: `chrome-devtools` MCP (kiểm thử trực tiếp trên trình duyệt Chrome theo phạm vi **chỉ đọc / Read-Only Regression**)
- **Báo cáo đối chiếu gần nhất**:
  - Đợt liền trước cùng ngày: `reports/2026-11-05/run-115830/BAO-CAO-TONG-HOP-4-WEBSITES.md`
  - Đợt ngày hôm trước: `reports/2026-11-04/run-165752/BAO-CAO-TONG-HOP-4-WEBSITES.md`

---

## 1. Bảng tổng hợp kết quả 4 Websites (`run-152048`)

| Website | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | Bug mới | Bug cũ còn tái hiện |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1. VTV Tư liệu** (`01-vtv-tu-lieu`) | **33** | 31 | 0 | 0 | 2 | **100.00%** (31/31) | **0** | **0** (`BUG-01-01`, `BUG-01-02`, `BUG-01-04` đều không còn tái hiện; `BUG-01-03` đóng theo TK) |
| **2. Sport Highlight** (`02-sport-highlight`) | **24** | 21 | 0 | 0 | 3 | **100.00%** (21/21) | **0** | **1** (`BUG-02-02` mức Low/P3 UX; `BUG-02-01` không còn tái hiện) |
| **3. Anti-Logo** (`03-anti-logo`) | **34** | 21 | 0 | 3 | 10 | **100.00%** (21/21) | **0** | **0** (`BUG-03-01` & `BUG-03-02` không còn tái hiện) |
| **4. SafeVision** (`04-safevision`) | **28** | 22 | 0 | 3 | 3 | **100.00%** (22/22) | **0** | **0** (`BUG-04-01`, `BUG-04-03` & lỗi chính HLS 503/CORS của `BUG-04-02` đã sửa; còn warning phụ `[ChannelWS]` khi kênh `IDLE`) |
| **TỔNG CỘNG 4 WEBSITES** | **119** | **95** | **0** | **6** | **18** | **100.00%** (95/95) | **0** | **1** (+ 1 cảnh báo kỹ thuật phụ) |

> **Kiểm tra công thức**:
> - **Web 01**: `31 + 0 + 0 + 2 = 33` | Tỷ lệ PASS: `31 / (31 + 0) = 100.00%`
> - **Web 02**: `21 + 0 + 0 + 3 = 24` | Tỷ lệ PASS: `21 / (21 + 0) = 100.00%`
> - **Web 03**: `21 + 0 + 3 + 10 = 34` | Tỷ lệ PASS: `21 / (21 + 0) = 100.00%`
> - **Web 04**: `22 + 0 + 3 + 3 = 28` | Tỷ lệ PASS: `22 / (22 + 0) = 100.00%`
> - **Tổng 4 Web**: `95 + 0 + 6 + 18 = 119` | Tỷ lệ PASS chung: `95 / (95 + 0) = 100.00%`

---

## 2. So sánh với báo cáo gần nhất (`run-115830` ngày `2026-11-05` & `run-165752` ngày `2026-11-04`)

| Chỉ số | `2026-11-04 / run-165752` | `2026-11-05 / run-115830` (Lượt 1) | `2026-11-05 / run-152048` (Lượt 2) | Nhận xét & Giải thích chênh lệch |
| :--- | :---: | :---: | :---: | :--- |
| **Tổng TC** | 119 | 119 | **119** | Giữ nguyên 119 test case chuẩn. |
| **PASS / FAIL** | `92 PASS` / `8 FAIL` | `93 PASS` / `1 FAIL` | **`95 PASS` / `0 FAIL`** | Ở lượt 2 (`run-152048`), cả `01-03-03` (tìm kiếm từ khóa không tồn tại `xyznonexistent12345`) và `01-09-02` (Trợ lý hỏi đáp AI trên trang `/watch`, retest `BUG-01-02`) đều đã được kiểm thử thực tế và đạt `PASS` (`200 OK`). |
| **BLOCKED / NOT_RUN** | `0 BLOCKED` / `19 NOT_RUN` | `6 BLOCKED` / `19 NOT_RUN` | **`6 BLOCKED` / `18 NOT_RUN`** | Giảm 1 case `NOT_RUN` (`01-09-02` đã được chạy theo yêu cầu kiểm tra kỹ Chatbot VTV Tư liệu). Còn 6 case `BLOCKED` (3 case `IDLE` của Anti-Logo + 3 case tìm kiếm Header của SafeVision) và 18 case `NOT_RUN` (các thao tác thêm/sửa/xóa/upload). |
| **Tỷ lệ PASS** | `92.00%` (`92/100`) | `98.94%` (`93/94`) | **`100.00%` (`95/95`)** | Tăng `+8.00%` so với ngày `2026-11-04` và tăng `+1.06%` so với lượt 1 buổi trưa `run-115830`. |
| **Biến động dữ liệu thực tế ghi nhận ở Lượt 2** | — | — | — | • **Sport Highlight**: Hệ thống vừa tự động thêm các trận `"Lịch thi đấu"` mới (LaLiga & Cúp Châu Âu ngày 06–08/11), nâng tổng số trận từ `154` lên `165 trận đấu` (`14 trang`); khi lọc `"Đã kết thúc"` vẫn giữ đúng `154 trận đấu` (`13 trang`). Trận `Troyes vs Le Mans` tăng từ `124` lên `134 đoạn`.<br>• **Anti-Logo**: Kênh 1 chuyển sang phát nguồn live SDI `FULL MATCH ATALANTA vs BAYERN MUNICH... [Active]` ở `1920x1080 @ 53.9fps`. |

---

## 3. Tổng hợp kết quả kiểm tra lại toàn bộ Bug (Retest)

| Mã Bug | Website | Mô tả ngắn | Kết quả tại `run-152048` | Bằng chứng thực tế |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-01-01** | VTV Tư liệu | Nút số trang (`1`, `2`, `3`) bị `disabled` | **Không còn tái hiện (Đã khắc phục)** | Click trực tiếp nút số `2` (`uid=121_184`) và nút số `1` (`uid=123_170`) chuyển trang bình thường. |
| **BUG-01-02** | VTV Tư liệu | Trợ lý hỏi đáp AI trả lỗi `500` khi gửi câu hỏi | **Không còn tái hiện (Đã khắc phục)** | Đã test cả **câu hỏi đơn lượt** (`reqid=1353`, `history: []` -> `200 OK` sau ~28s, trả về tóm tắt + 8 mốc thời gian `12:09`, `5:48`...) và **câu hỏi nối tiếp đa lượt** (`reqid=1356`, `history` có dữ liệu -> `200 OK` sau ~45s, trả về danh sách nhân vật + 8 mốc thời gian); click mốc thời gian `5:48` (`uid=162_2`) tua đúng phân đoạn video; nút `Xóa cuộc trò chuyện` (`uid=164_3`) hoạt động tốt. |
| **BUG-01-03** | VTV Tư liệu | Tìm kiếm không hỗ trợ toán tử `""` | **Đã đóng theo thiết kế** | Hệ thống dùng tìm kiếm ngữ nghĩa/từ khóa thông thường. |
| **BUG-01-04** | VTV Tư liệu | Tìm kiếm từ khóa không khớp (`xyznonexistent12345`) bị timeout >10s & lỗi CORS (ghi nhận ở `run-115830`) | **Không còn tái hiện trong đợt `run-152048` (Chập chờn / Intermittent Timeout)** | Request `GET /api/v1/videos/search?keyword=xyznonexistent12345&page_id=1&page_size=20` (`reqid=222`) trả về `200 OK`, UI hiển thị `"Không tìm thấy kết quả nào!"` (`uid=131_12`). Tuy nhiên Dev vẫn nên kiểm tra cấu hình CORS trên Gateway khi trả về 504 để tránh treo UI khi backend quá tải. |
| **BUG-02-01** | Sport Highlight | Một số trận đấu mới bị lỗi xử lý AI (`ERROR` / `0 đoạn`) | **Không còn tái hiện (Đã khắc phục)** | Toàn bộ 154 trận `"Đã kết thúc"` trên trang 1 đều `completed` (trận `Troyes vs Le Mans` có `134 đoạn`, `Psv vs Club Brugge Kv` có `457 đoạn`). |
| **BUG-02-02** | Sport Highlight | Mở UUID trận không tồn tại hiện Toast 404 nhưng tiêu đề giữ `"Đang tải..."` | **Còn tái hiện (Low/P3 UX)** | Tại `/matches/00000000-0000-0000-0000-000000000000`, hiện đúng Toast `"Match was not found."` (`uid=110_73..110_80`) nhưng `uid=110_4` vẫn hiện `"Đang tải..."` và `uid=110_30` hiện `"Đang tải video..."`. |
| **BUG-03-01** | Anti-Logo | Tiêu đề `#thumbModal` luôn ghi `"FLAG 1"` cho cả dòng `Flag=0` | **Không còn tái hiện (Đã khắc phục)** | Dòng `Frame #15480` (`Flag=0`) hiện `"Frame #15480 — FLAG 0 (Player: found, Logo: none)"`; dòng `Frame #16020` (`Flag=1`) hiện `"Frame #16020 — FLAG 1 (Player: found, Logo: found)"`. |
| **BUG-03-02** | Anti-Logo | Bộ đếm `Flag=1 count` lệch với bảng | **Không còn tái hiện** | Khi bật `Show only flag=1`, bảng lọc hiển thị đúng `Showing 8-82 of 160 frames` (các dòng `Flag=1`). |
| **BUG-04-01** | SafeVision | Thống kê phân loại logo không sắp xếp giảm dần & hiện 216 mục `0%` | **Không còn tái hiện (Đã khắc phục)** | Chỉ hiển thị 6 mục có phát hiện và sắp xếp giảm dần: `3soc` (`16446`) > `3que` (`289`) > `ao3soc` (`279`) > `bản đồ 1` (`156`) > `bản đồ 3` (`32`) > `bản đồ 2` (`28`). |
| **BUG-04-02** | SafeVision | Luồng HLS gốc lỗi 503/CORS & Console báo `[ChannelWS] SockJS or Stomp not loaded` | **Lỗi chính HLS 503/CORS đã sửa / Còn warning phụ `[ChannelWS]`** | Video `VTV4` phát mượt `1280x720 @ 24.4fps` (`status: SMOOTH`). Console vẫn còn cảnh báo `[ChannelWS] SockJS or Stomp not loaded` khi kênh `IDLE`. |
| **BUG-04-03** | SafeVision | Ô tìm kiếm toàn cục trên Header không hoạt động | **Không còn tái hiện (Đã gỡ bỏ khỏi UI)** | Dev đã gỡ bỏ ô input thừa trên Header. |

---

## 4. Tổng hợp kiểm tra Video & Multiview (Mục 6 — Đợt `run-152048`)

| Website & Chế độ xem | Kênh / Nguồn phát | Thời gian đo | Số liệu trong khoảng đo (Interval) | Số liệu tích lũy (Cumulative) | Verdict & Quan sát giao diện |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Anti-Logo** — Single Channel (`/`) | `Kênh 1` (`ATALANTA vs BAYERN MUNICH [Active]`, HLS `1920x1080`) | `11.73s` (`check-video-lag.js`) | `advancedMediaSec=10.50s`, `playbackRatio=0.89`, `effectiveFps=53.9`, `decoded=632`, `dropped=16` (`2.53%`), `waiting=0`, `stalled=0`, `freezeTicks=0`, `buffer=12.39s` | `totalFrames: 4 -> 636`, `droppedFrames: 0 -> 16` | `status: "SMOOTH"` — Video phát mượt, có hình rõ nét. |
| **Anti-Logo** — Multiview (`/channels`) | **Ô 1**: `Channel 01` (`1920x1080`) | `5.00s` | `deltaSec=5.03s`, `decoded=301`, `dropped=50` (`16.61%`), `readyState=4` | `totalFrames=5014`, `droppedFrames=594` | **Có hình, đang phát** (vừa chuyển từ `STARTING` sang `LIVE`). |
| **Anti-Logo** — Multiview (`/channels`) | **Ô 2**: `Channel 02` (`1920x1080`) | `5.00s` | `deltaSec=4.97s`, `decoded=247`, `dropped=37` (`14.98%`), `readyState=4` | `totalFrames=179179`, `droppedFrames=16860` | **Có hình, đang phát**, không đen/đứng hình. |
| **Anti-Logo** — Multiview (`/channels`) | **Ô 3**: `Channel 03` (`1920x1080`) | `5.00s` | `deltaSec=4.97s`, `decoded=246`, `dropped=39` (`15.85%`), `readyState=4` | `totalFrames=178631`, `droppedFrames=16739` | **Có hình, đang phát**, không đen/đứng hình. |
| **SafeVision** — Chi tiết kênh (`/channels/:id`) | `VTV4` (`LUỒNG STREAM GỐC` HLS `1280x720`) | `10.18s` (`check-video-lag.js`) | `advancedMediaSec=9.92s`, `playbackRatio=0.97`, `effectiveFps=24.4`, `decoded=248`, `dropped=2` (`0.81%`), `waiting=0`, `stalled=0`, `freezeTicks=0`, `buffer=13.26s` | `totalFrames: 1025 -> 1273`, `droppedFrames: 25 -> 27` | `status: "SMOOTH"` — Video phát mượt, không giật/lag. |

---

## 5. Đường dẫn các file báo cáo đã lưu thực tế (`run-152048`)
- **Báo cáo tổng hợp 4 Websites**:
  - `reports/2026-11-05/run-152048/BAO-CAO-TONG-HOP-4-WEBSITES.md`
- **Website 01 — VTV Tư liệu**:
  - `websites/01-vtv-tu-lieu/reports/2026-11-05/run-152048/results.csv`
  - `websites/01-vtv-tu-lieu/reports/2026-11-05/run-152048/summary.md`
- **Website 02 — Sport Highlight**:
  - `websites/02-sport-highlight/reports/2026-11-05/run-152048/results.csv`
  - `websites/02-sport-highlight/reports/2026-11-05/run-152048/summary.md`
  - `websites/02-sport-highlight/reports/2026-11-05/run-152048/bugs/BUG-02-02-nonexistent-match-stuck-loading-text.md`
- **Website 03 — Anti-Logo**:
  - `websites/03-anti-logo/reports/2026-11-05/run-152048/results.csv`
  - `websites/03-anti-logo/reports/2026-11-05/run-152048/summary.md`
- **Website 04 — SafeVision**:
  - `websites/04-safevision/reports/2026-11-05/run-152048/results.csv`
  - `websites/04-safevision/reports/2026-11-05/run-152048/summary.md`
  - `websites/04-safevision/reports/2026-11-05/run-152048/bugs/BUG-04-02-channelws-sockjs-stomp-warning.md`

