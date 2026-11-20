# Báo cáo Kiểm thử Hồi quy — Website 03: Anti-Logo (`VTV PCD Control`)

- **Run_ID:** `2026-11-10/run-090400`
- **Thời gian thực hiện:** `2026-11-10 09:56:00` → `2026-11-10 10:09:20 (+07:00)`
- **URL kiểm thử:** `https://anti-logo.cmcati.vn/` (`/channel/1`, `/channel/2`, `/channel/3`, `/channels`, `/login`)
- **Công cụ:** `chrome-devtools` MCP (`pageId: 1`)
- **Phạm vi:** Chỉ đọc (`Read-Only`) — kiểm tra Dashboard, 3 kênh đơn lẻ, Preview, Multi-Channel (`VTV PCD Command Center`), AI/Flag/Logs, lọc `Flag=1`, mở modal BBox chỉ đọc, kiểm tra nguồn `Videos` / `CMC S3 video` / `Live SDI inputs` và đăng xuất. Tuyệt đối không nhấn `Start`/`Stop`, không đổi nguồn đang chạy, không sửa/lưu BBox, không đổi cấu hình FPS/Blur/ROI, không upload file.

---

## 1. Thống kê Kết quả Thực thi

| Chỉ số | Giá trị |
|---|---|
| **Tổng số Test Case thiết kế (`features/*/test-cases.md`)** | **39** |
| **Đã thực thi (`PASS + FAIL`)** | **30** |
| **PASS** | **30** |
| **FAIL** | **0** |
| **BLOCKED** | **0** |
| **NOT_RUN (ngoài phạm vi chỉ đọc)** | **9** (`03-07-03`, `03-08-02..03`, `03-09-01..03`, `03-10-01..03`) |
| **Tỷ lệ PASS (trên số case đã chạy)** | **100.0% (30/30)** |

> **Ghi chú mâu thuẫn với báo cáo cũ (`2026-11-09/run-110430`):**
> 1. Báo cáo cũ `run-110430` gán sai nhãn các nhóm chức năng `08`, `09`, `10` trong `summary.md`/`results.csv`, đánh `PASS` cho `03-05-01` & `03-05-02` dù tại thời điểm đó Kênh 2 và Kênh 3 đang bị `UNAVAILABLE (502)`, và ở `03-06-03` lại kiểm tra nhảy frame thay vì kiểm tra tính nhất quán của `#aiFlagOneCount`. Trong đợt chạy `2026-11-10/run-090400` này, toàn bộ 39 `Case_ID` đã được đối chiếu đúng với từng `test-cases.md`.
> 2. Số lượng file video cục bộ trong `#defaultVideos` (`/v2/api/videos`) hiện tại là **11 file** (khác với con số 33 file ghi trong báo cáo cũ), ngoài ra còn có khung `CMC S3 video` với **522 file** (`Fullmatch: 242 · Highlight: 280`).

---

## 2. Kết quả Kiểm tra lại các Bug Đã Biết (`BUG-03-01` → `BUG-03-04`)

| Mã Bug | Mô tả | Trạng thái Đợt Này | Bằng chứng thực tế (`2026-11-10/run-090400`) |
|---|---|---|---|
| **BUG-03-01** | Nhãn `FLAG` trong modal `✏️ Sửa BBox` (`#thumbModalTitle`) bị lệch so với dòng log đã chọn | **FIXED (ĐÃ KHẮC PHỤC)** | Mở modal trên dòng `Flag=1` (`Frame 4292851`) → `#thumbModalTitle` hiển thị `"Frame #4292851 — FLAG 1 (Player: found, Logo: found)"`. Mở modal trên dòng `Flag=0` (`Frame 4302977`) → `#thumbModalTitle` hiển thị `"Frame #4302977 — FLAG 0 (Player: found, Logo: none)"`. Khớp 100% với dòng đã chọn. |
| **BUG-03-02** | Bộ lọc `Show only flag=1` (`#flag1OnlyToggle`) không loại bỏ các dòng `Flag=0` | **FIXED (ĐÃ KHẮC PHỤC)** | Khi bật `#flag1OnlyToggle` (`checked=true`), nhãn chuyển thành `"Showing 1-11 of 11 frames"`, bảng `#logTableBody` chỉ hiển thị `11` dòng `Flag=1` (`flag1Count=11`, `flag0Count=0`, `nonFlag1Rows=[]`). |
| **BUG-03-03** | API `/channels/api/2/sdi_inputs` và `/channels/api/3/sdi_inputs` trả `502 Bad Gateway` khiến Kênh 2 & 3 không hoạt động | **FIXED / RESOLVED (ĐÃ KHẮC PHỤC)** | Cả 3 kênh (`/channels/api/{1,2,3}/sdi_inputs` và `/channels/api/state`) đều trả **`HTTP 200`**. Cả 3 worker (`Channel 01: virtual-sdi-BONGDA_HD`, `Channel 02: virtual-sdi-THETHAO_TINTUC_HD`, `Channel 03: virtual-sdi-HAY_TV`) đều ở trạng thái **`LIVE`** và phát video `1920x1080 @ 50 FPS` trên cả trang đơn kênh lẫn `/channels`. |
| **BUG-03-04** | Hiện tượng giật/lag/rớt frame trên luồng video đang phát | **SMOOTH KHI TRONG VIEWPORT (Đã đo 2 lần trên `/channel/1` + đo 3 luồng trên `/channels`)** | - **Lần đo 1 (`/channel/1`, khi `<video>` nằm ngoài vùng nhìn thấy off-screen):** `playbackRatio=1.000`, `decodedFrames=403`, `droppedFrames=405` (`100.5%` do Chromium compositor bỏ qua vẽ hình off-screen), `freezeTicks=0`, `waitingEvents=0`.<br>- **Lần đo 2 (`/channel/1`, sau khi cuộn `<video>` vào giữa khung nhìn `inViewport=true`):** `playbackRatio=0.998`, `decodedFrames=406`, **`droppedFrames=0` (`0%`)**, **`effectiveFps=50.2 FPS`**, `waitingEvents=0`, `freezeTicks=0`, `buffer=44.32s–44.62s` → **`SMOOTH`**.<br>- **Đo đồng thời 3 luồng trên `/channels`:** Cả 3 luồng đạt `playbackRatio=1.000`, `effectiveFps=49.6–50.0 FPS`, `dropRatePercent=0.49%–0.50%`, `freezeTicks=0` → **`PASS_SMOOTH`**. |

---

## 3. Bảng Kết quả Chi tiết Từng Test Case (39 Cases)

| Case_ID | Chức năng | Tiêu đề | Ưu tiên | Trạng thái | Tóm tắt Kết quả Thực tế |
|---|---|---|---|---|---|
| `03-01-01` | Đăng nhập | Hiển thị giao diện trang Đăng nhập (`/login`) | P0 | **PASS** | Hiển thị `VTV PCD CONTROL`, `Tên đăng nhập`, `Mật khẩu`, `Hiện mật khẩu`, `Đăng nhập`. |
| `03-01-02` | Đăng nhập | Xác thực phiên đã đăng nhập trên hệ thống Anti-Logo | P0 | **PASS** | Đã đăng nhập tài khoản `vtv`, truy cập đầy đủ `/channel/1..3` và `/channels`. |
| `03-01-03` | Đăng nhập | Kiểm tra validation rỗng và nút ẩn/hiện mật khẩu tại `/login` | P1 | **PASS** | `validWhenEmpty=false` (`"Please fill out this field."`), nút `Hiện mật khẩu` đổi `type` `password <-> text`. |
| `03-02-01` | Dashboard | Hiển thị thanh điều hướng và bố cục tổng quan trên `/channel/1` | P1 | **PASS** | Đầy đủ liên kết `Kênh 1..3`, `Multi-Channel (3 SDI)`, tài khoản `vtv` và bố cục 2 cột. |
| `03-02-02` | Dashboard | Hiển thị danh sách nguồn `Videos`, `CMC S3 video` và `Live SDI inputs` | P1 | **PASS** | `Videos`: 11 file; `CMC S3 video`: 522 file (`Fullmatch: 242 · Highlight: 280`); `Live SDI inputs`: 4 mục. |
| `03-02-03` | Dashboard | Tìm kiếm và lọc danh sách YOLO banner classes (`#yoloClassSearch`) | P2 | **PASS** | `"bet"` → `31` class; `"xyz_none_999"` → `0` class; `""` → `106 / 106 enabled`. |
| `03-03-01` | Danh sách kênh | Kiểm tra trạng thái hoạt động của Kênh 1 (`/channel/1`) | P0 | **PASS** | HTTP 200, `LIVE`, phát `virtual-sdi-BONGDA_HD` (`1920x1080 @ 50 FPS`), `AI lane: ACTIVE`. |
| `03-03-02` | Danh sách kênh | Chuyển sang Kênh 2 (`/channel/2`) và đối chiếu trạng thái API với UI | P0 | **PASS** | HTTP 200, `LIVE`, phát `virtual-sdi-THETHAO_TINTUC_HD` (`1920x1080`, `readyState=4`), `aiFlagOneCount=28253`. |
| `03-03-03` | Danh sách kênh | Chuyển sang Kênh 3 (`/channel/3`) và đối chiếu trạng thái API với UI | P0 | **PASS** | HTTP 200, `LIVE`, phát `virtual-sdi-HAY_TV` (`1920x1080`, `readyState=4`), `aiFlagOneCount=23715`. |
| `03-04-01` | Preview | Hiển thị khung Preview video và thông số kỹ thuật trên kênh đang phát | P0 | **PASS** | Hiển thị `virtual-sdi-BONGDA_HD`, `hls-playing`, `readyState: 4`, `playbackRate: 1.00`, `Source FPS: 50.00`. |
| `03-04-02` | Preview | Xác minh nạp manifest HLS và phân đoạn video trên luồng Preview | P0 | **PASS** | Master & variant playlist trả `HTTP 200`, `60` segment `.mp4`, `mediaSequence=85713`. |
| `03-04-03` | Preview | Xác minh phần tử `<video>` giải mã và tiến thời gian thực tế | P0 | **PASS** | `1920x1080`, `paused=false`, `readyState=4`, tiến `8.07s` trong `8.09s` (`playbackRatio=0.998`). |
| `03-04-04` | Preview | Đo lường định lượng hiện tượng giật/lag/rớt frame bằng `check-video-lag.js` | P0 | **PASS** | Trong viewport đạt `0%` drop (`50.2 FPS`, `freezeTicks=0`, `SMOOTH`); trên `/channels` 3 luồng đạt `0.49%–0.50%` drop (`SMOOTH`). |
| `03-05-01` | Multi-channel | Truy cập và hiển thị giao diện `VTV PCD Command Center` (`/channels`) | P1 | **PASS** | Hiển thị đủ 3 khung `Channel 01`, `Channel 02`, `Channel 03` đều ở trạng thái `LIVE`. |
| `03-05-02` | Multi-channel | Phát đồng thời 3 luồng video `1920x1080` trên màn hình Multi-Channel | P1 | **PASS** | Cả 3 thẻ `<video>` phát đồng thời `1920x1080 @ 50 FPS`, `readyState=4`, `paused=false`. |
| `03-05-03` | Multi-channel | Kiểm tra các nút công cụ và điều hướng trên header Multi-Channel | P2 | **PASS** | Hiển thị đủ `#ccChangedFramesBtn`, `#ccExportZipBtn`, `Home PCD`, `Kênh 1..3`, `#userMenuBtnCC`. |
| `03-06-01` | AI / Flag / Logs | Hiển thị bảng Frame Logs, trạng thái AI lane và điều hướng phân trang log | P1 | **PASS** | `75` dòng/trang; nhấn `v` chuyển sang `Showing 76-150 of 500 frames`; nhấn `Latest` về `1-75`. |
| `03-06-02` | AI / Flag / Logs | Lọc bảng Frame Logs theo checkbox `Show only flag=1` (`BUG-03-02`) | P1 | **PASS** | Hiển thị `Showing 1-11 of 11 frames`, toàn bộ 11 dòng có `Flag=1` (`flag0Count=0`). |
| `03-06-03` | AI / Flag / Logs | Kiểm tra tính nhất quán giữa bộ đếm `#aiFlagOneCount` và bảng Frame Logs | P2 | **PASS** | `#aiFlagOneCount = 50783` (tích lũy phiên live) nhất quán với cửa sổ trượt 500 frame. |
| `03-07-01` | BBox & Nhãn | Mở và đóng modal chỉnh sửa BBox (`#thumbModal`) ở chế độ chỉ đọc | P2 | **PASS** | Mở `#thumbModal` và đóng qua `#thumbModalClose` an toàn, không lưu thay đổi. |
| `03-07-02` | BBox & Nhãn | Đối chiếu thông tin Frame và nhãn `FLAG` trong `#thumbModalTitle` (`BUG-03-01`) | P2 | **PASS** | Dòng `Flag=1` hiện `FLAG 1`; dòng `Flag=0` hiện `FLAG 0` khớp tuyệt đối. |
| `03-07-03` | BBox & Nhãn | Vẽ mới / chỉnh sửa BBox và nhấn `Lưu BBox` (`#bboxSaveBtn`) | P2 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không sửa/lưu BBox). |
| `03-08-01` | Start / Stop | Khảo sát hiển thị nút `Watch Active Live Stream` (`#runBtn`) và `Stop current stream` (`#stopBtn`) | P1 | **PASS** | Hiển thị đủ `#runBtn` và `#stopBtn` (`disabled=false`). |
| `03-08-02` | Start / Stop | Dừng luồng xử lý đang chạy (`Stop current stream`) | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không nhấn Stop trên kênh đang LIVE). |
| `03-08-03` | Start / Stop | Khởi chạy luồng xử lý mới (`Start`) | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không nhấn Start/đổi nguồn). |
| `03-09-01` | Cấu hình FPS/Blur/ROI | Thay đổi tốc độ xử lý `Tăng - giảm FPS` (`input#targetFps`) | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không đổi cấu hình đang chạy). |
| `03-09-02` | Cấu hình FPS/Blur/ROI | Thay đổi mức `Độ mờ` (`input#blurKernel`) | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không đổi cấu hình đang chạy). |
| `03-09-03` | Cấu hình FPS/Blur/ROI | Cấu hình vùng `Protect ROI` (`#protectRoiEnable`, `X/Y/W/H`) | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không đổi cấu hình đang chạy). |
| `03-10-01` | Upload Video & Logo | Tải lên video kiểm thử mới (`input#videoUpload`) | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không upload file). |
| `03-10-02` | Upload Video & Logo | Tải lên ảnh logo bổ sung (`input#logoUpload`) | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không upload file). |
| `03-10-03` | Upload Video & Logo | Kiểm tra từ chối định dạng file không hợp lệ khi upload | P2 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không upload file). |
| `03-11-01` | Tài khoản & Đăng xuất | Hiển thị thông tin tài khoản và mở menu tài khoản | P1 | **PASS** | Menu `vtv` hiển thị nút `Đăng xuất` (`/logout`). |
| `03-11-02` | Tài khoản & Đăng xuất | Thực hiện đăng xuất khỏi hệ thống Anti-Logo | P1 | **PASS** | Nhấn `Đăng xuất` chuyển về `https://anti-logo.cmcati.vn/login`. |
| `03-11-03` | Tài khoản & Đăng xuất | Kiểm tra chặn truy cập trang nội bộ (`/channel/1`) sau khi đã đăng xuất | P1 | **PASS** | Tự động chuyển hướng về `/login?next=/channel/1`. |
| `03-12-01` | Kiểm tra SDI & Videos | Kiểm tra danh sách `Live SDI inputs (auto-detected)` (`select#sdiInputs`) | P0 | **PASS** | Hiển thị 1 mục `🟢 Live SDI Stream [Active]` và 3 mục `Virtual SDI 01..03`. |
| `03-12-02` | Kiểm tra SDI & Videos | Cơ chế khóa liên động (`Stream Lock`) giữa `Videos` và `Live SDI inputs` | P1 | **PASS** | `#defaultVideos.disabled=true`, thông báo khóa hiển thị, 3 mục `Virtual SDI` có `disabled=true`. |
| `03-12-03` | Kiểm tra SDI & Videos | Kiểm tra API trạng thái SDI Input trên cả 3 kênh | P0 | **PASS** | Cả 3 kênh trả `HTTP 200`, worker `LIVE`, `publisherReadiness=true`. |
| `03-12-04` | Kiểm tra SDI & Videos | Kiểm tra luồng HLS nội bộ và chất lượng phát của `🟢 Live SDI Stream [Active]` | P0 | **PASS** | Master & variant playlist cả 3 kênh trả `HTTP 200` (`60` segment), phát thực tế `1920x1080 @ 50 FPS`. |
| `03-12-05` | Kiểm tra SDI & Videos | Kiểm tra danh sách `Videos` (`#defaultVideos`) và giải mã Frame 0 | P0 | **PASS** | 11/11 file trong `#defaultVideos` trả `HTTP 200` (`image/jpeg`, `5.4–13.6 KB`) ở Frame 0. |

