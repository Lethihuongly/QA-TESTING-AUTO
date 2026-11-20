# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES (`CMC-QA-TESTING`)

- **Run_ID dùng chung:** `2026-11-10/run-090400`
- **Múi giờ:** `Asia/Ho_Chi_Minh (+07:00)`
- **Thời gian thực hiện đợt chạy:** `2026-11-10 09:04:00 (+07:00)` → `2026-11-10 16:13:10 (+07:00)`
- **Công cụ thực thi:** Trực tiếp qua server `chrome-devtools` MCP (không dùng Playwright/Selenium/Browser Agent khác).
- **Phạm vi kiểm thử:** Chỉ đọc (`Read-Only`) — thực thi toàn bộ các test case chỉ đọc đủ điều kiện trên cả 4 hệ thống theo đúng thứ tự:
  `01-vtv-tu-lieu` → `02-sport-highlight` → `03-anti-logo` → `04-safevision`.

---

## 1. Bảng Tổng Hợp Kết Quả 4 Websites

> **Lưu ý đếm Test Case:** Tổng số test case được đếm chính xác từ từng `Case_ID` duy nhất trong `features/*/test-cases.md` của cả 4 website (**124 test cases**), không lấy số chức năng trong `checklist.csv`.

| STT | Website | URL | Tổng TC (`test-cases.md`) | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` | `NOT_RUN` (Ngoài phạm vi chỉ đọc) | Tỷ lệ `PASS` (trên số TC đã chạy) |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| **01** | **VTV Tư liệu** (`01-vtv-tu-lieu`) | `https://vtvtulieu.cmcati.vn/` | **33** | 31 | **31** | **0** | **0** | 2 | **100.00% (31/31)** |
| **02** | **Sport Highlight** (`02-sport-highlight`) | `https://sport-highlight.cmcati.vn/matches` | **24** | 21 | **19** | **2** | **0** | 3 | **90.48% (19/21)** |
| **03** | **Anti-Logo** (`03-anti-logo`) | `https://anti-logo.cmcati.vn/` | **39** | 30 | **30** | **0** | **0** | 9 | **100.00% (30/30)** |
| **04** | **SafeVision** (`04-safevision`) | `https://safevision.cmcati.vn/` | **28** | 24 | **24** | **0** | **1** | 3 | **100.00% (24/24)** |
| **TỔNG** | **Toàn bộ 4 Websites** | — | **124** | **106** | **104** | **2** | **1** | **17** | **98.11% (104/106)** |

### Ghi chú các mâu thuẫn trong báo cáo cũ (`2026-11-09/run-110430`) đã được phát hiện & chuẩn hóa:
1. **`03-anti-logo`:** Báo cáo cũ gán nhầm tên nhóm chức năng `08`, `09`, `10`; tự đánh `PASS` cho `03-05-01` & `03-05-02` dù lúc đó Kênh 2 & 3 bị `502 Bad Gateway`; và ở `03-06-03` lại kiểm tra nhảy frame thay vì kiểm tra `#aiFlagOneCount`. Đợt chạy này đã chuẩn hóa đúng toàn bộ 39 `Case_ID`.
2. **`04-safevision`:** Báo cáo cũ ghi tổng 28 case trong `summary.md` nhưng trong `results.csv` có 30 dòng do tự thêm `04-03-04` và `04-07-04` không có trong `test-cases.md`. Đợt chạy này đã chuẩn hóa đúng 28 `Case_ID`.
3. **Lỗi ghi file ảnh chụp màn hình của MCP (`take_screenshot`):** Công cụ `take_screenshot` của `chrome-devtools` MCP trả lỗi nguyên văn:
   `Error: Access denied: path "..." is not within any of the configured workspace roots.`
   Do đó chúng tôi lưu nguyên văn lỗi này và ghi đầy đủ bằng chứng DOM Snapshot, Network Request/Response, Console và kết quả chạy script vào thư mục `evidence/` của từng website (tuyệt đối không giả lập đường dẫn ảnh không tồn tại).

---

## 2. Trạng Thái Tất Cả Các Bug Đã Kiểm Tra Lại & Lỗi Phát Hiện (`BUG-01-01` → `BUG-04-04`)

| Mã Bug | Website | Case_ID | Mức độ | Trạng thái Đợt Này (`run-090400`) | Tóm tắt Bằng chứng Thực tế | Cần quay Jam xác minh? |
|---|---|---|---|---|---|---|
| **BUG-01-01** | `01-vtv-tu-lieu` | `01-05-03` | P1 | **FIXED** *(Kèm ghi chú hạ tầng)* | Khi tìm kiếm `"Công nghệ thực tế ảo VR"` rồi bấm trang `2`: lần click đầu tiên gặp lỗi tạm thời `504 Gateway Time-out` (`reqid=59`, `29969 ms`), nhưng thử lại lần 2 (`reqid=77`) và thử với từ khóa `"thời sự"` (`reqid=94`) đều trả `HTTP 200`, chuyển sang trang `2` thành công (`6/6` video hoàn toàn mới). | Không (đã hoạt động) |
| **BUG-01-02** | `01-vtv-tu-lieu` | `01-10-02` | P1 | **FIXED** | Gửi câu hỏi `"Nội dung chính của video này là gì?"` trên video `be08b277...`: `POST /api/v1/videos/be08b277.../chat` (`reqid=382`) trả `HTTP 200` sau **`3060 ms` (`3.06s`)**, hiển thị câu trả lời chi tiết kèm 8 nút mốc thời gian (`01:12`..`00:34`). | Không |
| **BUG-02-01** | `02-sport-highlight` | `02-05-01` | P0 | **FIXED** | Kiểm tra trên 4 trận `COMPLETED` (`Sevilla vs Alaves` `28fa419c...`, `Le Mans vs Monaco` `aee37683...`, `Troyes vs Le Mans` `775f9ccd...`, `Le Mans vs Toulouse` `c26dae78...`): `/api/matches/{id}/hls/index.m3u8` và các phân đoạn `.ts` đều trả `HTTP 200`, video phát mượt `1920x1080` (`readyState=4`, `currentTime=50.98s`). | Không |
| **BUG-02-02** | `02-sport-highlight` | `02-04-03`, `02-05-03` | P1 | **PARTIALLY FIXED (SỬA MỘT PHẦN)** | Mở `/matches/00000000-0000-0000-0000-000000000000` và quan sát >55 giây (`t0` → `t11` → `t55`):<br>- **Phần đã sửa:** Vòng lặp gọi API `404` mỗi 5s đã dừng (chỉ gọi 6 request lúc mở trang `reqid=844..853`, không phát sinh thêm request mới); các nút player đều `disabled` (`02-05-03` = `PASS`).<br>- **Phần chưa sửa (`02-04-03` = `FAIL`):** Sau khi toast lỗi tự tắt, giao diện vẫn treo vĩnh viễn ở chữ `"Đang tải..."` (`uid=68_4`), `"Đang đồng bộ trực tiếp"` (`uid=68_5`) và `"Đang tải video..."` (`uid=68_30`), không có Empty/Error State hay nút quay lại. | **CÓ (Cần quay Jam xác minh UI treo `"Đang tải..."`)** |
| **BUG-02-03** | `02-sport-highlight` | `02-03-03` | P1 | **OPEN (CHƯA SỬA)** | Đã tái hiện 2 lần: Lọc `TRẠNG THÁI = "Đã kết thúc"` (hoặc kèm `TÌM KIẾM = "a"` → `159 trận đấu`, `Trang 1 / 14`) rồi nhấn `"Tiếp"` sang `/matches?page=2`: URL bị mất tham số lọc, khiến route transition (`reqid=593`) reset `TRẠNG THÁI` về `"Tất cả"` (`uid=57_19, 62_19`), xóa trắng ô `TÌM KIẾM` (`uid=62_15`) và gọi `GET /api/matches?page=2...` không lọc (`173 trận đấu`, `Trang 2 / 15`). | **CÓ (Cần quay Jam xác minh mất bộ lọc khi sang trang 2)** |
| **BUG-02-04** | `02-sport-highlight` | `02-05-02`, `02-06-03` | P1 | **Phần 2 (UI Timeline): FIXED / Phần 1 (Kéo biên segment `PATCH`): CHƯA KIỂM CHỨNG DO PHẠM VI CHỈ ĐỌC** | - **Phần 2 (Hiển thị phân đoạn khi chọn/zoom Timeline):** Trên trận `Sevilla vs Alaves` (`599` phân đoạn), ở mức zoom `1x` hiển thị đủ `599/599` block; khi chọn phân đoạn 2 (`00:00:15 - 00:00:18`, `uid=65_703`), video tua đến `15.36s` và 598 block còn lại không bị ẩn; khi zoom `2x` hiển thị `375` block trong vùng nhìn (`00:00:00 - 01:23:44`).<br>- **Phần 1 (Kéo biên segment gửi `PATCH`):** Không thực hiện trên dữ liệu thật theo quy tắc chỉ đọc; không kết luận đã FIXED chỉ từ việc đọc mã. | Không |
| **BUG-03-01** | `03-anti-logo` | `03-07-02` | P2 | **FIXED** | Mở modal `✏️ Sửa BBox` chỉ đọc trên dòng `Flag=1` (`Frame 4292851`) → `#thumbModalTitle` hiện `"Frame #4292851 — FLAG 1..."`. Mở trên dòng `Flag=0` (`Frame 4302977`) → `#thumbModalTitle` hiện `"Frame #4302977 — FLAG 0..."`. | Không |
| **BUG-03-02** | `03-anti-logo` | `03-06-02` | P1 | **FIXED** | Bật checkbox `Show only flag=1` (`#flag1OnlyToggle`) → bảng `#logTableBody` lọc còn đúng `11` dòng (`Showing 1-11 of 11 frames`), `flag1Count = 11`, `flag0Count = 0`. | Không |
| **BUG-03-03** | `03-anti-logo` | `03-03-02`, `03-03-03`, `03-12-03` | P0 | **FIXED / RESOLVED** | Cả 3 kênh (`/channels/api/{1,2,3}/sdi_inputs` và `/channels/api/state`) đều trả **`HTTP 200`** và ở trạng thái **`LIVE`** (`Channel 01: virtual-sdi-BONGDA_HD`, `Channel 02: virtual-sdi-THETHAO_TINTUC_HD`, `Channel 03: virtual-sdi-HAY_TV`), phát trực tiếp `1920x1080 @ 50 FPS`. | Không |
| **BUG-03-04** | `03-anti-logo` | `03-04-04`, `03-05-02` | P0 | **SMOOTH KHI TRONG VIEWPORT (`PASS_SMOOTH`)** | Khi thẻ `<video>` nằm trong khung nhìn (`inViewport=true`), luồng Kênh 1 đạt `playbackRatio=0.998`, `effectiveFps=50.2 FPS`, `droppedFrames=0` (`0%`), `freezeTicks=0` (`SMOOTH`); trên `/channels` cả 3 luồng đồng thời đạt `playbackRatio=1.000`, `49.6–50.0 FPS`, `dropRate=0.49%–0.50%` (`SMOOTH`). *(Khi `<video>` cuộn ra ngoài khung nhìn ở Lần đo 1, Chromium compositor bỏ qua vẽ hình off-screen nên `droppedVideoFrames` tăng `100.5%` dù `playbackRatio=1.000`).* | Không |
| **BUG-04-01** | `04-safevision` | `04-02-03` | P1 | **FIXED** | Bảng `THỐNG KÊ PHÂN LOẠI LOGO` hiển thị đúng nhãn và sắp xếp giảm dần khớp 100% với `GET /api/v1/dashboard/stats`: `3soc (16446) > 3que (289) > ao3soc (279) > bản đồ 1 (156) > bản đồ 3 (32) > bản đồ 2 (28)`. | Không |
| **BUG-04-02** | `04-safevision` | `04-05-02`, `04-05-03` | P0 | **FIXED TRÊN KÊNH ĐANG RUNNING (`VTV10`)** | Trên kênh đang chạy phiên AI `VTV10` (`Phiên bef9dc85`, `RUNNING`), cả `LUỒNG STREAM GỐC` (`1280x720`, `25.0 FPS`) và `LUỒNG DELAYED — ĐANG GIÁM SÁT` (`1280x720`, `24.5 FPS`) đều phát mượt (`readyState=4`, `droppedFrames=0`). Trên 8 kênh còn lại (như `VTV3`), Luồng gốc phát bình thường còn khung Output ở trạng thái `IDLE ("Output Stream Chưa Phát")` vì chưa bật phiên AI. | Không |
| **BUG-04-03** | `04-safevision` | `04-07-03` | P2 | **CẦN XÁC NHẬN YÊU CẦU (`BLOCKED`)** | Không có `<input>` tìm kiếm trên thanh `<header>` (`headerInputCount=0`; ô tìm kiếm nằm ở trang `/channels`). Ghi `"Cần xác nhận yêu cầu"` theo mục 4D. | Không (cần xác nhận PO/BA) |
| **BUG-04-04** | `04-safevision` | `04-03-01`, `04-04-02`, `04-05-04` | P1 | **Phần 1: CẦN XÁC NHẬN YÊU CẦU / Phần 2: SMOOTH / Phần 3: `0.59s – 1.14s`** | - **Phần 1:** Hiện có 9 kênh (`VTV10, VTV2, VTV8, VTV3, VTV5, VTV4, VTV1, VTV7, VTV9`); việc không có `VTV6`/`VTV Cần Thơ` cần đối chiếu danh sách kênh yêu cầu.<br>- **Phần 2:** Cả 2 luồng trên `VTV10` đạt `0%` rớt frame, `freezeTicks=0` (`SMOOTH`).<br>- **Phần 3:** Quay lại `/channels` rồi mở lại `VTV10`: phân đoạn `.ts` đầu tiên của Luồng gốc xong ở `509 ms`, của Luồng Output xong ở `590 ms`, cả 2 video phát thực tế sau **`0.59s – 1.14s`**. | Không |

---

## 3. Kết Quả Đo Chất Lượng Video (`check-video-lag.js`) Và Kiểm Tra Nguồn SDI / Videos

### 3.1. Bảng Tổng Hợp Đo Chất Lượng Video (`check-video-lag.js`)

| Website / Trang | Tên luồng (Xác định từ UI) | Điều kiện đo | `wallSec` | `deltaVideoSec` | `playbackRatio` | `Frame Counters (start→end / decoded)` | `droppedFrames` | `dropRatePercent` | `FPS` | `waiting / stalled` | `freezeTicks` | `readyState` | `Buffer (min / avg)` | Kết luận Script | Kết luận QA |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **03 — Anti-Logo** (`/channel/1` — **Đo 1**) | `virtual-sdi-BONGDA_HD` (`1920x1080`) | `<video>` nằm ngoài vùng nhìn (`inViewport=false`) | `8.09s` | `8.09s` | `1.000` | `173984 → 174387` (`403`) | `405` (`171176→171581`) | `100.50%` | `49.8` | `0 / 0` | `0` | `4` | `44.11s / 44.38s` | `LAG_OR_STUTTER` | Do thẻ `<video>` nằm ngoài khung nhìn nên Chromium compositor không vẽ frame ra màn hình; luồng vẫn giải mã đủ `49.8 FPS`, `playbackRatio=1.000`. |
| **03 — Anti-Logo** (`/channel/1` — **Đo 2**) | `virtual-sdi-BONGDA_HD` (`1920x1080`) | Đã cuộn `<video>` vào giữa khung nhìn (`inViewport=true`) | `8.09s` | `8.07s` | **`0.998`** | `176194 → 176600` (`406`) | **`0`** (`173375→173375`) | **`0.00%`** | **`50.2`** | `0 / 0` | `0` | `4` | `44.32s / 44.62s` | **`SMOOTH`** | **Phát mượt hoàn toàn ở 50 FPS (`0%` rớt frame).** |
| **03 — Anti-Logo** (`/channels` — **Multi-Channel**) | `Channel 01: virtual-sdi-BONGDA_HD` (`1920x1080`) | `inViewport=true` (3 luồng cùng lúc) | `8.12s` | `8.12s` | **`1.000`** | `decoded = 406` | `2` | **`0.49%`** | **`50.0`** | `0 / 0` | `0` | `4` | `5.42s / 5.74s` | **`SMOOTH`** | **Phát mượt đồng thời 3 luồng 1080p@50fps.** |
| **03 — Anti-Logo** (`/channels` — **Multi-Channel**) | `Channel 02: virtual-sdi-THETHAO_TINTUC_HD` (`1920x1080`) | `inViewport=true` (3 luồng cùng lúc) | `8.12s` | `8.12s` | **`1.000`** | `decoded = 406` | `2` | **`0.49%`** | **`50.0`** | `0 / 0` | `0` | `4` | `5.50s / 5.82s` | **`SMOOTH`** | **Phát mượt đồng thời 3 luồng 1080p@50fps.** |
| **03 — Anti-Logo** (`/channels` — **Multi-Channel**) | `Channel 03: virtual-sdi-HAY_TV` (`1920x1080`) | `inViewport=true` (3 luồng cùng lúc) | `8.12s` | `8.12s` | **`1.000`** | `decoded = 403` | `2` | **`0.50%`** | **`49.6`** | `0 / 0` | `0` | `4` | `5.57s / 5.89s` | **`SMOOTH`** | **Phát mượt đồng thời 3 luồng 1080p@50fps.** |
| **04 — SafeVision** (`/channels/a2884000...` — `VTV10`) | `LUỒNG STREAM GỐC` (`1280x720`) | `inViewport=true` | `8.12s` | `8.12s` | **`1.000`** | `780 → 983` (`203`) | **`0`** (`4→4`) | **`0.00%`** | **`25.0`** | `0 / 0` | `0` | `4` | `10.39s / 12.16s` | **`SMOOTH`** | **Luồng gốc phát mượt 25 FPS (`0%` rớt frame).** |
| **04 — SafeVision** (`/channels/a2884000...` — `VTV10`) | `LUỒNG DELAYED — ĐANG GIÁM SÁT` (`1280x720`) | `inViewport=true` (`Playout Delay 20s Active`) | `8.12s` | `8.10s` | **`0.998`** | `792 → 991` (`199`) | **`0`** (`0→0`) | **`0.00%`** | **`24.5`** | `0 / 0` | `0` | `4` | `2.74s / 3.64s` | **`SMOOTH`** | **Luồng Output AI phát mượt 24.5 FPS (`0%` rớt frame).** |

### 3.2. Kết Quả Kiểm Tra Nguồn `Videos` và `Live SDI inputs` trên Anti-Logo (`Feature 12`)
1. **Nguồn `Videos` cục bộ (`select#defaultVideos`, `/v2/api/videos`):**
   - Hiện có **11 file video** (`video_dir_exists = true`, `defaultVideos.disabled = true` do đang có luồng Live SDI chạy; ngoài ra có 522 video trong `CMC S3 video`).
   - Kiểm tra giải mã **Frame 0** (`/v2/api/video_frame_preview?video=...&frame=0&max_width=320`) theo từng nhóm 3 file: **11/11 file trả `HTTP 200` (`image/jpeg`, `5493 – 13669 bytes`, độ trễ `32 – 220 ms`)**.
   - *Lưu ý QA:* Frame 0 trả ảnh hợp lệ chỉ chứng minh đọc được frame đầu tiên, không chứng minh toàn bộ thời lượng video không hỏng.
2. **Nguồn `Live SDI inputs (auto-detected)` (`select#sdiInputs`, `/v2/api/sdi_inputs`, `/channels/api/{1..3}/sdi_inputs`):**
   - **3 luồng đang `ACTIVE_PLAYING`** (đã giải quyết URL tương đối từ master playlist và xác minh cả `#EXT-X-STREAM-INF` lẫn `#EXTINF` media playlist + phát thực tế trên `<video>`):
     - `sdi_channel:1` (`virtual-sdi-BONGDA_HD`): `HTTP 200`, `video1_stream.m3u8` (`seq=85713`, `60` segment), phát thực tế `1920x1080 @ 50 FPS`.
     - `sdi_channel:2` (`virtual-sdi-THETHAO_TINTUC_HD`): `HTTP 200`, `video1_stream.m3u8` (`seq=85723`, `60` segment), phát thực tế `1920x1080 @ 50 FPS`.
     - `sdi_channel:3` (`virtual-sdi-HAY_TV`): `HTTP 200`, `video1_stream.m3u8` (`seq=85717`, `60` segment), phát thực tế `1920x1080 @ 50 FPS`.
   - **3 cấu hình nguồn ở trạng thái `READY_LOCKED_BY_ACTIVE_STREAM`** (`virtual_sdi:BONGDA_HD`, `virtual_sdi:THETHAO_TINTUC_HD`, `virtual_sdi:HAY_TV`): `apiStatus = "READY"`, đang khóa (`disabled = true`) trên UI để bảo vệ luồng đang phát.

---

## 4. Danh Sách Các Case `BLOCKED` / `NOT_RUN` Và Lý Do

| Website | Case_ID | Trạng thái | Lý do cụ thể |
|---|---|---|---|
| `01-vtv-tu-lieu` | `01-08-02`, `01-08-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc (mục 3): không thực thi upload video mới hoặc hủy/xóa tiến trình upload (đã kiểm tra mở/đóng dialog upload chỉ đọc ở `01-08-01`). |
| `02-sport-highlight` | `02-07-01`, `02-07-02`, `02-07-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc (mục 3): không tạo trận đấu mới, không khởi chạy ghi hình luồng live, không xuất/tạo highlight mới (đã kiểm tra mở/đóng dialog `Tạo trận đấu` chỉ đọc). |
| `03-anti-logo` | `03-07-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc (mục 3): không vẽ/sửa BBox và không nhấn `Lưu BBox` (`#bboxSaveBtn`) trên hệ thống đang chạy. |
| `03-anti-logo` | `03-08-02`, `03-08-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc (mục 3 & 4C): không nhấn `Stop current stream` hoặc `Start` luồng mới trên kênh đang LIVE. |
| `03-anti-logo` | `03-09-01`, `03-09-02`, `03-09-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc (mục 3): không thay đổi thanh trượt FPS (`#targetFps`), Độ mờ (`#blurKernel`) và tọa độ Protect ROI trên hệ thống đang hoạt động. |
| `03-anti-logo` | `03-10-01`, `03-10-02`, `03-10-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc (mục 3): không upload file video (`#videoUpload`) hoặc file logo (`#logoUpload`) lên server. |
| `04-safevision` | `04-03-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc (mục 3): không thêm kênh truyền hình mới. |
| `04-safevision` | `04-07-03` | `BLOCKED` | `BUG-04-03`: Ô tìm kiếm nhanh trên thanh `<header>` không tồn tại trong DOM (`headerInputCount = 0`). Ghi `"Cần xác nhận yêu cầu"` (cần xác nhận đã bỏ theo thiết kế hay bị thiếu). |
| `04-safevision` | `04-08-02`, `04-08-03` | `NOT_RUN` | Ngoài phạm vi chỉ đọc (mục 3): không lưu thay đổi cấu hình kênh và không nhấn `Bắt đầu giám sát` / `Dừng lại` luồng AI. |

---

## 5. Đường Dẫn Đầy Đủ Toàn Bộ Các File Báo Cáo Đã Lưu (`Run_ID: 2026-11-10/run-090400`)

### A. Báo cáo Tổng hợp 4 Websites
- `reports/2026-11-10/run-090400/BAO-CAO-TONG-HOP-4-WEBSITES.md`

### B. Website 01 — VTV Tư liệu (`websites/01-vtv-tu-lieu/reports/2026-11-10/run-090400/`)
- `websites/01-vtv-tu-lieu/reports/2026-11-10/run-090400/results.csv`
- `websites/01-vtv-tu-lieu/reports/2026-11-10/run-090400/summary.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-10/run-090400/bugs/BUG-01-01-retest.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-10/run-090400/bugs/BUG-01-02-retest.md`
- `websites/01-vtv-tu-lieu/reports/2026-11-10/run-090400/evidence/01-vtv-tu-lieu-evidence.md`

### C. Website 02 — Sport Highlight (`websites/02-sport-highlight/reports/2026-11-10/run-090400/`)
- `websites/02-sport-highlight/reports/2026-11-10/run-090400/results.csv`
- `websites/02-sport-highlight/reports/2026-11-10/run-090400/summary.md`
- `websites/02-sport-highlight/reports/2026-11-10/run-090400/bugs/BUG-02-01-retest.md`
- `websites/02-sport-highlight/reports/2026-11-10/run-090400/bugs/BUG-02-02.md`
- `websites/02-sport-highlight/reports/2026-11-10/run-090400/bugs/BUG-02-03.md`
- `websites/02-sport-highlight/reports/2026-11-10/run-090400/bugs/BUG-02-04-retest.md`
- `websites/02-sport-highlight/reports/2026-11-10/run-090400/evidence/02-sport-highlight-evidence.md`

### D. Website 03 — Anti-Logo (`websites/03-anti-logo/reports/2026-11-10/run-090400/`)
- `websites/03-anti-logo/reports/2026-11-10/run-090400/results.csv`
- `websites/03-anti-logo/reports/2026-11-10/run-090400/summary.md`
- `websites/03-anti-logo/reports/2026-11-10/run-090400/bugs/BUG-03-01-retest.md`
- `websites/03-anti-logo/reports/2026-11-10/run-090400/bugs/BUG-03-02-retest.md`
- `websites/03-anti-logo/reports/2026-11-10/run-090400/bugs/BUG-03-03-retest.md`
- `websites/03-anti-logo/reports/2026-11-10/run-090400/bugs/BUG-03-04-retest.md`
- `websites/03-anti-logo/reports/2026-11-10/run-090400/evidence/03-anti-logo-evidence.md`

### E. Website 04 — SafeVision (`websites/04-safevision/reports/2026-11-10/run-090400/`)
- `websites/04-safevision/reports/2026-11-10/run-090400/results.csv`
- `websites/04-safevision/reports/2026-11-10/run-090400/summary.md`
- `websites/04-safevision/reports/2026-11-10/run-090400/bugs/BUG-04-01-retest.md`
- `websites/04-safevision/reports/2026-11-10/run-090400/bugs/BUG-04-02-retest.md`
- `websites/04-safevision/reports/2026-11-10/run-090400/bugs/BUG-04-03.md`
- `websites/04-safevision/reports/2026-11-10/run-090400/bugs/BUG-04-04.md`
- `websites/04-safevision/reports/2026-11-10/run-090400/evidence/04-safevision-evidence.md`

