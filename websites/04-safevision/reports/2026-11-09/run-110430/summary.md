# Báo cáo Kiểm thử — Website 04: SafeVision (VTV Logo Detection)

## 1. Thông tin chung

| Hạng mục | Giá trị |
|---|---|
| **Website** | Website 04 — SafeVision (`VTV Logo Detection – AI Enterprise Platform`) |
| **URL** | `https://safevision.cmcati.vn/` & `https://safevision.cmcati.vn/channels/5d5a7da4-478e-40a3-be39-bef238c2772a` (`VTV3`) |
| **Ngày giờ chạy** | Lượt 1: `2026-11-09 11:06:02 — 11:45:16 (+07:00)` · Kiểm tra lại `VTV3` (2 luồng LIVE): `14:28:01 — 14:33:29 (+07:00)` |
| **Mã lần chạy (Run ID)** | `run-110430` |
| **Công cụ thực thi** | `chrome-devtools` MCP (`pageId: 4`, `pageId: 5`) |
| **Chế độ kiểm thử** | Chế độ chỉ đọc (`Read-Only`) |
| **Phiên bản bundle mới phát hiện** | `app/page-6955d29ebc027cce.js` & `app/channels/[id]/page-df88a2d11808968b.js` |

---

## 2. Thống kê kết quả

| Chỉ số | Số lượng | Tỷ lệ (%) | So với lần chạy trước (`2026-11-06/run-094700`) |
|---|---:|---:|---|
| **Tổng số Test Case** | **28** | `100.0%` | Không đổi (`28`) |
| **PASS** | **22** | `78.6%` (`95.7%` số TC trong phạm vi chỉ đọc, `100.0%` số TC thực thi) | **Đạt 100% PASS trên toàn bộ 22/22 TC thực thi** (`BUG-04-01` & `BUG-04-02` đều đã được fix) |
| **FAIL** | **0** | `0.0%` | `0 FAIL` |
| **BLOCKED** | **1** | `3.6%` | Chỉ còn `04-07-03` (`BUG-04-03` — ô tìm kiếm nhanh trên Header đã gỡ bỏ khỏi UI) |
| **NOT_RUN** | **5** | `17.9%` | `5` TC ghi/điều khiển stream ngoài phạm vi chỉ đọc |

### Thống kê theo Tính năng (9 Features)

| Mã Feature | Tên tính năng | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN |
|---|---|---:|---:|---:|---:|---:|
| `01-Dang-nhap` | Đăng nhập & Xác thực | 3 | 3 | 0 | 0 | 0 |
| `02-Bang-dieu-khien` | Bảng Điều Khiển Tổng Quan (`/`) | 3 | 3 | 0 | 0 | 0 |
| `03-Quan-ly-kenh-phat` | Quản lý Kênh phát (`/channels`) | 4 | 2 | 0 | 0 | 2 |
| `04-Chi-tiet-kenh-Giam-sat` | Chi tiết Kênh & Giám sát (`/channels/[id]`) | 3 | 3 | 0 | 0 | 0 |
| `05-Trinh-phat-Video-HLS-HUD` | Trình phát Video HLS, HUD Telemetry & Đo Giật/Lag | 4 | 4 | 0 | 0 | 0 |
| `06-Su-kien-Phat-hien-Logo` | Danh sách Phát hiện Logo & Xem Snapshot | 3 | 3 | 0 | 0 | 0 |
| `07-Tim-kiem-Loc-kenh` | Tìm kiếm & Lọc Kênh | 4 | 2 | 0 | 1 | 1 |
| `08-Cau-hinh-Giam-sat-AI` | Menu Cấu hình & Thiết lập AI | 3 | 1 | 0 | 0 | 2 |
| `09-Quan-ly-tai-khoan` | Quản lý Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | 0 |
| **Tổng cộng** | **9 Features** | **28** | **22** | **0** | **1** | **5** |

---

## 3. Kết quả kiểm tra chi tiết `https://safevision.cmcati.vn/` và Kênh `VTV3` (`14:28 — 14:33`)

### 3.1. Bảng Điều Khiển Tổng Quan (`https://safevision.cmcati.vn/`)
- **Bản build mới `app/page-6955d29ebc027cce.js`**:
  - **4 thẻ KPI**:
    - `TỔNG SỐ LUỒNG LIVE`: `265` (`1 đang chạy` — tương ứng phiên đang chạy trên `VTV3`).
    - `KÊNH TRUYỀN HÌNH`: `9` (`9 hoạt động phát sóng`).
    - `PHÁT HIỆN HÔM NAY`: `0` (`Tổng tích lũy: 218697`).
    - `HỆ THỐNG AI EDGE`: `Healthy` (`Hoạt động ổn định`).
  - **Widget `THỐNG KÊ PHÂN LOẠI LOGO` (`BUG-04-01` ĐÃ FIX)**:
    - Đã bỏ nhãn phần trăm làm tròn `0%` gây hiểu nhầm và hiển thị đúng thứ tự giảm dần từ API `GET /api/v1/dashboard/stats`:
      1. `3soc`: `16446 lần phát hiện`
      2. `3que`: `289 lần phát hiện`
      3. `ao3soc`: `279 lần phát hiện`
      4. `bản đồ 1`: `156 lần phát hiện`
      5. `bản đồ 3`: `32 lần phát hiện`
      6. `bản đồ 2`: `28 lần phát hiện`

### 3.2. Trang Chi tiết Kênh `VTV3` (`/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`)
- **Trạng thái phiên giám sát**: `GIÁM SÁT LIVE` / `RUNNING` (`Phiên 2a243be8-34d4-4940-a8c5-bb817486de72`, `Playout Delay Buffer: 20s (20s) Active`).
- **Thông số trong `MENU CẤU HÌNH & THIẾT LẬP`**:
  - Nguồn HLS: `https://vtvgolive-vtv02.vtvdigital.vn/nIR-bCbcB5FJNPRn8kdlPA/1794245235/hls/vtv/live/vtv3/free/master.m3u8`
  - `SAMPLE FPS = 1`, `TIMEOUT VLM = 20`, `DELAY BUFFER = 20`, `AI MODEL ENGINE = qwen36-vl`, chế độ che: `overlay_video` (`/app/uploads/overlay_videos/qc-cmc.mp4`).
  - `TERMINAL LOGS`:
    - `[000] [Playout] Restored shared running session 2a243be8-34d4-4940-a8c5-bb817486de72`
    - `[001] [HLS] Đang nạp luồng video: https://vtvgolive-vtv02.vtvdigital.vn/.../master.m3u8`
    - `[003] [HLS] Manifest sẵn sàng (lần thử 1)`
    - `[004] [HLS] Video preview đã kết nối thành công`
- **Thông số `HLS Telemetry HUD` trên giao diện (`uid=66_0..66_25`)**:
  - `State: PLAYING`, `Latency: 9.14s`, `Buffer: 9.13s`, `Resolution: 1280x720`, `ReadyState: 4/4`, `NetworkState: 2/3`, `Frames Decoded: 8276`, `Frames Dropped: 67`, `Buffer Count: 1`, `Reconnects: 0`.

---

## 4. Kết quả Đo Định lượng Giật / Lag Video Đồng thời 2 Luồng trên `VTV3` (`04-05-04` — 8 giây)

Thực thi `websites/04-safevision/features/05-Xem-truc-tiep/scripts/check-video-lag.js` (16 mẫu, chu kỳ 500ms = `8.03s`) khi cả 2 phần tử `<video>` đều nằm trong vùng nhìn thấy (`viewport`):

| Chỉ số | Luồng 1: `LUỒNG STREAM GỐC` (`index: 0`) | Luồng 2: `LUỒNG DELAYED — ĐANG GIÁM SÁT` (`index: 1`) | Ngưỡng chuẩn |
|---|---|---|---|
| **Nguồn HLS (`200 OK`)** | `vtvgolive-vtv02.vtvdigital.vn/.../vtv3__vtv720p-h264/index.m3u8` | `safevision-ai.cmcati.vn/api/output_stream/2a243be8-.../playlist.m3u8` | `200 OK` |
| **Độ phân giải (`resolution`)** | `1280x720` (`HD 720p`) | `1280x720` (`HD 720p`) | `1280x720` |
| **Thời gian đo (`elapsedWallSec`)** | `8.03s` | `8.03s` | `~8.0s` |
| **Thời gian video tiến (`deltaVideoSec`)** | `8.03s` | `8.03s` | `~8.0s` |
| **Tỷ lệ tốc độ phát (`playbackRatio`)** | **`1.000`** | **`1.000`** | `0.90 — 1.10` |
| **Số khung hình giải mã (`decodedFrames`)** | `201 frames` | `201 frames` | `> 0` |
| **Số khung hình rớt (`droppedFrames` / `dropRatePercent`)** | **`0 frames` (`0.00%`)** | **`0 frames` (`0.00%`)** | `< 5.0%` |
| **FPS thực tế (`effectiveFps`)** | **`25.0 FPS`** | **`25.0 FPS`** | `>= 20 FPS` |
| **Sự kiện hụt buffer (`waitingEvents` / `stalledEvents`)** | `0` / `0` | `0` / `0` | `0` |
| **Rớt trạng thái sẵn sàng (`readyStateDrops`)** | `0` | `0` | `0` |
| **Số chu kỳ khựng hình (`freezeTicks`)** | `0 / 16` | `0 / 16` | `<= 1` |
| **Bộ đệm phía trước (`minBufferAheadSec` / `avgBufferAheadSec`)** | `10.88s` / `12.64s` | `5.86s` / `6.67s` | `>= 1.5s` |
| **Kết luận (`verdict`)** | **`SMOOTH` (Mượt - PASS)** | **`SMOOTH` (Mượt - PASS)** | **`SMOOTH`** |

---

## 5. Tổng hợp các Bug và Ghi nhận Thực tế từ Tester trên SafeVision (`2026-11-09`)

| Mã Bug | Mức độ | Mô tả chi tiết | Trạng thái | Bằng chứng / Link Jam |
|---|---|---|---|---|
| **BUG-04-01** | Low (`P3`) | Widget `THỐNG KÊ PHÂN LOẠI LOGO` trên Dashboard hiển thị thứ tự & nhãn phần trăm làm tròn `0%` | **ĐÃ FIX (PASS `04-02-01`)** | Hiển thị đúng thứ tự giảm dần (`3soc: 16446 -> 3que: 289 -> ao3soc: 279 -> ...`), đã bỏ nhãn `0%`. |
| **BUG-04-02** | High (`P1`) | Luồng HLS trên `VTV3` lỗi 404 / 503 | **ĐÃ FIX TRÊN VTV3 (`PASS 04-05-01`)** | Cả 2 luồng `LUỒNG STREAM GỐC` & `LUỒNG DELAYED` trên `VTV3` phát `1280x720 @ 25.0 FPS`. |
| **BUG-04-03** | Low (`P3`) | Ô tìm kiếm nhanh trên thanh Header toàn cục (`Tìm nhanh kênh phát...`) bị lược bỏ khỏi UI | **OPEN (`BLOCKED 04-07-03`)** | [BUG-04-03.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-09/run-110430/bugs/BUG-04-03.md) |
| **BUG-04-04** | High (`P1`) | **Ghi nhận kiểm thử thực tế trên dải kênh `VTV1 -> VTV10`**:<br>1. `VTV1 -> VTV10` đều có luồng input (`9` kênh), nhưng **thiếu kênh `VTV6`**.<br>2. **Luồng Output bị đen, giật lag** ở một số thời điểm/kênh.<br>3. **Thoát ra quay lại kênh phát thì đang tải lại video rất lâu**. | **OPEN (New — 2026-11-09)** | [BUG-04-04.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-09/run-110430/bugs/BUG-04-04.md) · Jam: https://jam.dev/c/1831a1dc-e260-4103-951c-ee43c5174fbb |
