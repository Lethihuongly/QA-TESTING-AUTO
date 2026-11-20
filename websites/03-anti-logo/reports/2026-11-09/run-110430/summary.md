# Báo cáo Kiểm thử — Website 03: Anti-Logo (VTV PCD)

## 1. Thông tin chung

| Hạng mục | Giá trị |
|---|---|
| **Website** | Website 03 — Anti-Logo (`VTV PCD Control / VTV PCD Command Center`) |
| **URL** | `https://anti-logo.cmcati.vn/` |
| **Ngày giờ chạy** | Lượt 1: `2026-11-09 11:05:59 — 11:38:32 (+07:00)` · Kiểm tra bổ sung Nguồn `Videos`, `Live SDI inputs` & Luồng LIVE Kênh 1: `16:47:34 — 17:12:21 (+07:00)` |
| **Mã lần chạy (Run ID)** | `run-110430` |
| **Công cụ thực thi** | `chrome-devtools` MCP |
| **Chế độ kiểm thử** | Chế độ chỉ đọc (`Read-Only`) |

---

## 2. Thống kê kết quả

| Chỉ số | Số lượng | Tỷ lệ (%) | So với lần chạy trước (`2026-11-06/run-094700`) |
|---|---:|---:|---|
| **Tổng số Test Case** | **39** | `100.0%` | Tăng thêm 5 TC mới (`03-12-01` .. `03-12-05`) kiểm tra sâu nguồn `Videos` & `Live SDI inputs (auto-detected)` |
| **PASS** | **28** | `71.8%` (`93.3%` số TC thực thi) | Mở khóa toàn bộ 6 TC trước đó bị `BLOCKED` khi Kênh 1 phát trực tiếp + thêm 4 TC `PASS` ở nhóm `03-12` |
| **FAIL** | **2** | `5.1%` | `03-12-03` (Worker Kênh 2 & 3 cổng `17862`/`17863` lỗi `502`) và `03-04-04` (Luồng 60 FPS trên Kênh 1 bị rớt frame `32.86%` & `playbackRatio = 0.856` khi tải AI Blur nặng) |
| **BLOCKED** | **0** | `0.0%` | Giảm từ `6` về **`0 BLOCKED`** |
| **NOT_RUN** | **9** | `23.1%` | Không đổi (`9` TC ghi/điều khiển stream ngoài phạm vi chỉ đọc) |

### Thống kê theo Tính năng (12 Features)

| Mã Feature | Tên tính năng | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN |
|---|---|---:|---:|---:|---:|---:|
| `01-Dang-nhap` | Đăng nhập & Xác thực | 3 | 3 | 0 | 0 | 0 |
| `02-Nguon-vao-Logo-muc-tieu` | Nguồn vào (Video/SDI) & Logo mục tiêu | 3 | 3 | 0 | 0 | 0 |
| `03-Dieu-huong-Kenh` | Điều hướng Kênh (`Kênh 1..3`, `Multi-Channel`) | 3 | 3 | 0 | 0 | 0 |
| `04-Preview` | Xem trước Luồng Video & HLS Metrics | 4 | 3 | 1 | 0 | 0 |
| `05-Multi-Channel` | Trung tâm Điều hành Đa kênh (`/channels`) | 3 | 3 | 0 | 0 | 0 |
| `06-Logs-Semantic-Frames` | Bảng Logs Semantic Frames & Phân trang | 3 | 3 | 0 | 0 | 0 |
| `07-BBox-Editor-Mini-frame` | Hộp thoại `✏️ Sửa BBox` & Mini-frame | 3 | 2 | 0 | 0 | 1 |
| `08-Cau-hinh-Tham-so-ROI` | Cấu hình FPS, Độ mờ & Protect ROI | 3 | 1 | 0 | 0 | 2 |
| `09-Dieu-khien-Stream` | Điều khiển Start / Stop Stream | 3 | 0 | 0 | 0 | 3 |
| `10-Changed-Frames-Export-Zip` | Changed Frames & Export as Zip | 3 | 0 | 0 | 0 | 3 |
| `11-Quan-ly-tai-khoan` | Quản lý Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | 0 |
| `12-Kiem-tra-luong-SDI-Input` | Kiểm tra nguồn `Videos` & `Live SDI inputs (auto-detected)` | 5 | 4 | 1 | 0 | 0 |
| **Tổng cộng** | **12 Features** | **39** | **28** | **2** | **0** | **9** |

---

## 3. Kết quả kiểm tra chi tiết Nguồn `Videos` và `Live SDI inputs (auto-detected)` (`Feature 12`)

### 3.1. Kiểm tra danh sách 33 file nguồn `Videos` (`select#defaultVideos` & `/v2/api/videos` — `TC-03-12-05`: **PASS**)
- **Thư mục nguồn trên server:** `/home/team_cv/tdkien/vtv-pcd/soccer_data/vtv-cab-60fps` (`video_dir_exists: true`).
- **Tổng số file video:** **33 file `.mp4` duy nhất** (`uniqueVideoValues = 33`).
  - *Giải thích hiện tượng hiển thị giống nhau trên UI:* Trong ảnh chụp cột trái, 7 dòng đầu tiên của hộp `Videos` đều hiển thị `FULL MATCH ATALANTA vs BAYERN MUNICH Hum Xem...` là do có 1 file gốc và 6 file cắt phần (`_part_001.mp4` đến `_part_006.mp4`) có phần tên đầu dài hơn chiều rộng của `select#defaultVideos`. Tương tự với các bộ `NAPOLI vs FRANKFURT` (`_part_001..006`), `LEVERKUSEN vs PSG` (`_part_001..006`) và `NEWCASTLE vs BENFICA` (`_part_001..005`).
- **Kiểm tra giải mã Frame 0 thực tế (`GET /v2/api/video_frame_preview?video=<name>&frame=0&max_width=320`):**
  - Đã kiểm tra tự động toàn bộ **33/33 file video**: **100% (`33/33`) trả về `HTTP 200 OK`**, định dạng `image/jpeg` hợp lệ (dung lượng `5,493 bytes – 13,632 bytes`, thời gian phản hồi `66 ms – 279 ms`). Không có bất kỳ file video nào bị hỏng hoặc lỗi đọc file.

### 3.2. Kiểm tra 4 luồng trong `Live SDI inputs (auto-detected)` (`select#sdiInputs` & `/v2/api/sdi_inputs` — `TC-03-12-01..04`)

| # | Tên hiển thị trên `select#sdiInputs` | Mã `device` | Kênh đích | Độ phân giải & FPS | Trạng thái API & Worker | Kết luận hoạt động |
|---:|---|---|---:|---|---|---|
| **1** | `🟢 Live SDI Stream: FULL MATCH ATALANTA vs BAYERN MUNICH ... [Active]` | `sdi_channel:1` (`sdi_stream:true60-...`) | **Kênh 1** (`17861`) | `1920x1080 @ 50/60 FPS` | API `200 OK` · Worker Kênh 1 `LIVE` · HLS `/v2/api/hls/.../index.m3u8` `200 OK` (`360` phân đoạn `.ts`, `seq=364`) · `AI lane: ACTIVE` | **🟢 ĐANG PHÁT TRỰC TIẾP (`ACTIVE_PLAYING`)** (`TC-03-12-04` **PASS**, lưu ý có rớt frame ở `TC-03-04-04` bên dưới) |
| **2** | `🔒 Virtual SDI 01: VTVPrime BONGDA_HD (4 Levels -> Cap 1080p @ 50 FPS)` | `virtual_sdi:BONGDA_HD` | **Kênh 1** (`17861`) | `1920x1080 @ 50 FPS` | API `200 OK` (`status: READY`) · Worker Kênh 1 `LIVE (200)` · Upstream `livesct.vtvprime.vn/cmcpoc/BONGDA_HD/index.m3u8` | **🔒 SẴN SÀNG (`READY_LOCKED_BY_ACTIVE_STREAM`)** — Tạm khóa chọn (`disabled=true`) để bảo vệ luồng số 1 đang chạy |
| **3** | `🔒 Virtual SDI 02: VTVPrime THETHAO_TINTUC_HD (4 Levels -> Cap 1080p @ 50 FPS)` | `virtual_sdi:THETHAO_TINTUC_HD` | **Kênh 2** (`17862`) | `1920x1080 @ 50 FPS` | `/channels/api/2/sdi_inputs` trả về **`HTTP 502 Bad Gateway`** (`Cannot connect to 127.0.0.1:17862`) | **🔴 LỖI WORKER KÊNH 2 (`CHANNEL_WORKER_DOWN` — FAIL `03-12-03`)** — Không thể khởi chạy trên Kênh 2 do worker port `17862` đang tắt |
| **4** | `🔒 Virtual SDI 03: VTVPrime HAY_TV (4 Levels -> Cap 1080p @ 50 FPS)` | `virtual_sdi:HAY_TV` | **Kênh 3** (`17863`) | `1920x1080 @ 50 FPS` | `/channels/api/3/sdi_inputs` trả về **`HTTP 502 Bad Gateway`** (`Cannot connect to 127.0.0.1:17863`) | **🔴 LỖI WORKER KÊNH 3 (`CHANNEL_WORKER_DOWN` — FAIL `03-12-03`)** — Không thể khởi chạy trên Kênh 3 do worker port `17863` đang tắt |

---

## 4. Kết quả đo định lượng Chất lượng Phát Video trên Kênh 1 (`TC-03-04-04`: **FAIL — `LAG_OR_STUTTER`**)

Khi đo trực tiếp phần tử `<video id="vid_FULLMATCHATALANT_gwsrky">` đang hiển thị trong khung `Video Stream đa luồng` trên Kênh 1 trong cửa sổ **8.16 giây** (lấy mẫu mỗi `500ms`):
- **Độ phân giải & Nguồn:** `1920x1080`, `Source FPS: 60.00`, `readyState = 4`, `paused = false`.
- **Tốc độ tiến thời gian (`playbackRatio`):** Trong `8.16s` thực tế, thời gian video chỉ tiến thêm `6.98s` -> **`playbackRatio = 0.856`** (thấp hơn ngưỡng mượt `0.90`).
- **Khung hình giải mã & Rớt frame:** Giải mã `420` frames (`effectiveFps = 51.5 FPS`), bị rớt **`138` frames (`dropRatePercent = 32.86%`**, vượt ngưỡng `< 5%`).
- **Sự kiện khựng (`waitingEvents` / `readyStateDrops`):** Ghi nhận `waitingEvents = 7` và `readyStateDrops = 2`.
- **Nguyên nhân kỹ thuật từ bảng `HLS metrics`:** Luồng nguồn có tốc độ khung hình rất cao (`60.00 FPS`) và số lượng frame phát hiện logo lớn (`Flag=1 count: 2149 / 3089 samples`), khiến `Worker lag = 1792 ms` và thời gian xử lý `Control E2E` có lúc vọt lên `103.9 ms – 165.7 ms`, dẫn tới hiện tượng khựng nhẹ và rớt frame trên trình phát HLS.

---

## 5. Kết quả kiểm tra lại các Bug cũ (Regression Verification)

| Mã Bug | Mô tả | Trạng thái lần này | Bằng chứng xác nhận |
|---|---|---|---|
| **BUG-03-01** | Modal `✏️ Sửa BBox` hiển thị sai nhãn `FLAG 1` cho các frame có `Flag = 0` | **ĐÃ FIX (PASS `03-07-02`)** | Dòng `Frame 35877` (`Flag = 0`) mở `#thumbModalTitle = "Frame #35877 — FLAG 0 (Player: found, Logo: none)"`. |
| **BUG-03-02** | Checkbox `Show only flag=1` không lọc bỏ các dòng `Flag = 0` đang hiển thị trong bảng | **ĐÃ FIX (PASS `03-06-02`)** | Tích chọn `#flag1OnlyToggle` lọc bảng chỉ còn các dòng `Flag = 1`. |
