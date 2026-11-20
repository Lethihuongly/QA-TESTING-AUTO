# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES (MCP CHROME DEVTOOLS)

## 1. Thông tin Đợt Kiểm thử

| Hạng mục | Nội dung |
|---|---|
| **Mã đợt chạy (Run ID)** | `2026-11-09/run-110430` |
| **Thời gian thực thi** | Lượt 1: `2026-11-09 11:04:34 — 11:45:16 (+07:00)` · Kiểm tra bổ sung `SafeVision / VTV3` (2 luồng LIVE): `14:28:01 — 14:33:29 (+07:00)` · Kiểm tra bổ sung `Anti-Logo / Videos & Live SDI Inputs`: `16:47:34 — 17:12:21 (+07:00)` |
| **Công cụ kiểm thử** | `chrome-devtools` MCP Server (trình duyệt Chrome thật) |
| **Chế độ kiểm thử** | **Chế độ chỉ đọc (`Read-Only`)** — Không thêm/xóa dữ liệu, không lưu cấu hình đè lên kênh đang phát, không nhấn Start/Stop làm gián đoạn luồng AI/SDI đang chạy |
| **Đợt chạy đối chiếu gần nhất** | `2026-11-06/run-094700` |
| **Ghi chú kỹ thuật MCP Screenshot** | Công cụ `take_screenshot` trả lỗi sandbox `Access denied: path "..." is not within any of the configured workspace roots`. Toàn bộ bằng chứng được thu thập đầy đủ qua DOM Snapshot, `evaluate_script`, Network Requests (`reqid`) và Console Logs (`msgid`) đúng quy ước dự án. |

---

## 2. Bảng Tổng hợp Kết quả 4 Websites

| STT | Website | URL | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN (Read-only) | Tỷ lệ PASS / TC Thực thi | Thay đổi so với `2026-11-06/run-094700` |
|---:|---|---|---:|---:|---:|---:|---:|---:|---|
| **01** | **VTV Tư liệu** (`CMC Video Miner`) | `https://vtvtulieu.cmcati.vn/` | **33** | **31** | **0** | **0** | **2** | **100.0%** (`31/31`) | Giữ vững `31 PASS, 0 FAIL` (`BUG-01-01` & `BUG-01-02` ổn định) |
| **02** | **Sport Highlight** (`CMCATI Highlight`) | `https://sport-highlight.cmcati.vn/matches` | **24** | **20** | **1** | **0** | **3** | **95.2%** (`20/21`) | Build mới `02105~~nej92~.js`: **Đã fix Phần 2 của `BUG-02-04`** (hiển thị đủ 815 phân đoạn trên Timeline) và **cải thiện một phần `BUG-02-02`** (đã hiện toast `"Match was not found."`) |
| **03** | **Anti-Logo** (`VTV PCD`) | `https://anti-logo.cmcati.vn/` | **39** | **28** | **2** | **0** | **9** | **93.3%** (`28/30`) | **0 BLOCKED** — Thêm mới Feature `12-Kiem-tra-luong-SDI-Input` (`03-12-01..05`): **33/33 file `Videos` (`#defaultVideos`) giải mã tốt 100%**; Luồng `🟢 Live SDI Stream` trên Kênh 1 đang phát `ACTIVE_PLAYING` nhưng có hiện tượng rớt frame ở `60 FPS` (`03-04-04` FAIL); `Virtual SDI 01 (BONGDA_HD)` `READY`; `Virtual SDI 02` & `03` lỗi `502` do Worker Kênh 2/3 (`17862`/`17863`) dừng (`03-12-03` FAIL) |
| **04** | **SafeVision** (`VTV Logo Detection`) | `https://safevision.cmcati.vn/` | **28** | **22** | **0** | **1** | **5** | **100.0%** (`22/22`) | Build mới (`app/page-6955d29ebc027cce.js`): **100% PASS trên 22/22 TC thực thi** — Cả 2 luồng trên `VTV3` (`LUỒNG STREAM GỐC` & `LUỒNG DELAYED — ĐANG GIÁM SÁT`) đều phát trực tiếp `1280x720 @ 25.0 FPS`, `playbackRatio = 1.000`, `droppedFrames = 0`, `verdict = SMOOTH`! |
| **TỔNG** | **4 Websites** | — | **124** | **101** | **3** | **1** | **19** | **97.1%** (`101/104`) | **Đã thực thi 104/105 TC trong phạm vi Read-Only (chỉ còn 1 TC BLOCKED `04-07-03`)** |

---

## 3. Điểm nhấn Quan trọng: Các Thay Đổi & Kiểm Tra Chuyên Sâu Mới (`2026-11-09`)

1. **[MỚI — KIỂM TRA NGUỒN `Videos` & `Live SDI inputs (auto-detected)`] Anti-Logo (`https://anti-logo.cmcati.vn/`, `16:47 — 17:12`)**:
   - **Nguồn `Videos` (`select#defaultVideos` & `/v2/api/videos` — `TC-03-12-05`: PASS 100%)**:
     - Thư mục `/home/team_cv/tdkien/vtv-pcd/soccer_data/vtv-cab-60fps` chứa **33 file `.mp4` duy nhất**. Sở dĩ trên UI nhìn thấy nhiều dòng đầu giống nhau (`FULL MATCH ATALANTA vs BAYERN MUNICH Hum Xem...`) là do có 1 file gốc và 6 file cắt phần (`_part_001.mp4` .. `_part_006.mp4`) bị khuất phần đuôi do chiều rộng hộp chọn hẹp.
     - Đã chạy kiểm tra giải mã Frame 0 (`/v2/api/video_frame_preview?video=<name>&frame=0&max_width=320`) cho **toàn bộ 33/33 file video**: **cả 33/33 file (`100%`) đều hoạt động tốt**, trả về `HTTP 200 OK` (`image/jpeg`, `5.5 KB – 13.6 KB`, độ trễ `66–279 ms`).
   - **Nguồn `Live SDI inputs (auto-detected)` (`select#sdiInputs` & `/v2/api/sdi_inputs` — `TC-03-12-01..04`)**:
     - **`🟢 Live SDI Stream: FULL MATCH ATALANTA vs BAYERN MUNICH ... [Active]` (`sdi_channel:1`)**: **ĐANG HOẠT ĐỘNG (`ACTIVE_PLAYING`)** trên **Kênh 1** (`1920x1080 @ 50/60 FPS`, RTSP `127.0.0.1:18556`, HLS `/v2/api/hls/.../index.m3u8` `200 OK` với `360` phân đoạn `.ts`, `AI lane: ACTIVE`, đã xử lý `> 92,400` frames). Tuy nhiên khi đo 8.16s trên `<video>`, luồng 60 FPS bị rớt frame `32.86%` và `playbackRatio = 0.856` (`LAG_OR_STUTTER` — `TC-03-04-04` FAIL) do tải AI blur nặng (`Worker lag: 1792 ms`).
     - **`🔒 Virtual SDI 01: VTVPrime BONGDA_HD (4 Levels -> Cap 1080p @ 50 FPS)` (`virtual_sdi:BONGDA_HD`)**: **SẴN SÀNG (`READY_LOCKED_BY_ACTIVE_STREAM`)** trên **Kênh 1** (`17861`, `HTTP 200`), hiện đang khóa chọn tạm thời (`disabled = true`) vì Kênh 1 đang chạy luồng số 1.
     - **`🔒 Virtual SDI 02: VTVPrime THETHAO_TINTUC_HD` (`virtual_sdi:THETHAO_TINTUC_HD`)**: **KHÔNG HOẠT ĐỘNG TRÊN KÊNH 2 (`CHANNEL_WORKER_DOWN` — `TC-03-12-03` FAIL)** do API `/channels/api/2/sdi_inputs` trả về `HTTP 502 Bad Gateway` (`Cannot connect to host 127.0.0.1:17862`).
     - **`🔒 Virtual SDI 03: VTVPrime HAY_TV` (`virtual_sdi:HAY_TV`)**: **KHÔNG HOẠT ĐỘNG TRÊN KÊNH 3 (`CHANNEL_WORKER_DOWN` — `TC-03-12-03` FAIL)** do API `/channels/api/3/sdi_inputs` trả về `HTTP 502 Bad Gateway` (`Cannot connect to host 127.0.0.1:17863`).
2. **[ĐÃ XÁC MINH 2 LUỒNG LIVE MƯỢT 100%] SafeVision (`https://safevision.cmcati.vn/`) & Kênh `VTV3` (`14:28 — 14:33`)**:
   - **Dashboard (`/`, bản build mới `app/page-6955d29ebc027cce.js`)**:
     - Hiển thị `TỔNG SỐ LUỒNG LIVE = 265 (1 đang chạy)`, `KÊNH TRUYỀN HÌNH = 9 (9 hoạt động phát sóng)`, `PHÁT HIỆN HÔM NAY = 0 (Tổng tích lũy: 218697)`, `HỆ THỐNG AI EDGE = Healthy`.
     - Widget `THỐNG KÊ PHÂN LOẠI LOGO` đã bỏ nhãn phần trăm làm tròn `0%` và hiển thị đúng thứ tự giảm dần theo số lần phát hiện: `3soc (16446) -> 3que (289) -> ao3soc (279) -> bản đồ 1 (156) -> bản đồ 3 (32) -> bản đồ 2 (28)`.
   - **Kênh `VTV3` (`/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`, phiên `2a243be8-34d4-4940-a8c5-bb817486de72`)**:
     - Cả **2 luồng video trực tiếp** (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`) đều phát đồng thời ở độ phân giải `1280x720 @ 25.0 FPS`, `playbackRatio = 1.000`, `droppedFrames = 0 (0.00%)`, `waitingEvents = 0`, `freezeTicks = 0` -> **`SMOOTH` (`PASS`)**.
3. **[ĐÃ FIX PHẦN 2] `BUG-02-04` — Sport Highlight Timeline Culling (`> 500` phân đoạn)**:
   - Trong bản build mới `/_next/static/chunks/02105~~nej92~.js`, dev đã gỡ bỏ hàm cắt 500 bucket `t9(q, z, 500)` khỏi `renderedBlocks`. Toàn bộ `815` phân đoạn trên `Troyes vs Le Mans` hiển thị đầy đủ trên Timeline. (Phần 1 trong hàm `eE` khi hai phân đoạn cùng loại chồng lấp thời gian vẫn cần sửa nốt).
4. **[ĐÃ FIX MỘT PHẦN] `BUG-02-02` — Sport Highlight `/matches/{uuid-không-tồn-tại}`**:
   - Đã hiển thị toast cảnh báo `"Đã xảy ra lỗi / Match was not found."` (`uid=55_75, 55_76`), nhưng trang vẫn chưa dừng vòng lặp polling 5 giây và chưa tắt trạng thái `"Đang tải..."` / `"Đang tải video..."`.

---

## 4. Tổng hợp Trạng thái Toàn bộ Bug Qua Các Đợt Kiểm thử

| Mã Bug | Website | Mức độ | Mô tả tóm tắt | Trạng thái (`run-110430`) |
|---|---|---|---|---|
| **BUG-01-01** | `01-vtv-tu-lieu` | High (`P1`) | Phân trang tìm kiếm `/results` không chuyển sang trang 2 | **FIXED** (Ổn định) |
| **BUG-01-02** | `01-vtv-tu-lieu` | High (`P1`) | Chatbot AI `POST /api/v1/videos/{id}/chat` lỗi 502 / timeout | **FIXED** (Ổn định, phản hồi `200 OK` sau `9.06s`) |
| **BUG-02-01** | `02-sport-highlight` | Critical (`P0`) | HLS `stream.m3u8` trả về 404 trên trận đấu đã hoàn thành | **FIXED** (Ổn định trên `Troyes vs Le Mans`) |
| **BUG-02-02** | `02-sport-highlight` | Medium (`P2`) | `/matches/{invalid-uuid}` treo `"Đang tải..."` & lặp polling 404 mỗi 5s | **PARTIALLY FIXED / OPEN** (Đã có toast `"Match was not found."`, cần dừng polling & ẩn skeleton) |
| **BUG-02-03** | `02-sport-highlight` | Medium (`P2`) | Nhấn `Tiếp` sang `/matches?page=2` làm mất bộ lọc `TRẠNG THÁI` (`status`) | **OPEN** |
| **BUG-02-04** | `02-sport-highlight` | Low (`P2`) | (1) `eE` đảo ngược `min > max` khi segment trùng lắp; (2) Ẩn block khi `> 500` segment | **PARTIALLY FIXED** (**Phần 2 ĐÃ FIX** trong `02105~~nej92~.js`; còn Phần 1) |
| **BUG-03-01** | `03-anti-logo` | Medium (`P2`) | Modal `✏️ Sửa BBox` hiển thị sai `FLAG 1` cho dòng `Flag = 0` | **FIXED** (Ổn định: `Frame #35877 — FLAG 0`) |
| **BUG-03-02** | `03-anti-logo` | Medium (`P2`) | Checkbox `Show only flag=1` không lọc các dòng `Flag = 0` hiện có | **FIXED** (Ổn định: lọc còn đúng 2 dòng `Flag = 1`) |
| **BUG-04-01** | `04-safevision` | Low (`P3`) | `THỐNG KÊ PHÂN LOẠI LOGO` trên Dashboard hiển thị thứ tự & nhãn `%` | **FIXED** (`3soc 16446 -> 3que 289 -> ao3soc 279 -> ...`, đã bỏ nhãn `0%` gây hiểu nhầm) |
| **BUG-04-02** | `04-safevision` | High (`P1`) | Luồng HLS trên `VTV3` lỗi 404 / 503 | **FIXED** (Cả 2 luồng `LUỒNG STREAM GỐC` & `LUỒNG DELAYED` phát mượt `25.0 FPS`, `SMOOTH`) |
| **BUG-04-03** | `04-safevision` | Low (`P3`) | Ô tìm kiếm nhanh trên thanh Header toàn cục bị lược bỏ khỏi UI | **OPEN** (`BLOCKED 04-07-03`) |

---

## 5. Kết quả Kiểm tra Định lượng Giật / Lag Video (8 giây) & Luồng SDI

| Website & Luồng | Nguồn phát | Độ phân giải | `playbackRatio` | `effectiveFps` | `decoded` / `dropped` (`dropRate`) | `waiting` / `stalled` / `freezeTicks` | Buffer (`min` / `avg`) | Kết luận |
|---|---|---|---:|---:|---|---|---|---:|
| **04 — SafeVision** (`VTV3` — `LUỒNG STREAM GỐC`) | `vtvgolive-vtv02.vtvdigital.vn/.../vtv3__vtv720p-h264/index.m3u8` | `1280x720` | **`1.000`** | **`25.0 FPS`** | `201` / `0` (`0.00%`) | `0` / `0` / `0` | `10.88s` / `12.64s` | **`SMOOTH` (PASS)** |
| **04 — SafeVision** (`VTV3` — `LUỒNG DELAYED — ĐANG GIÁM SÁT`) | `safevision-ai.cmcati.vn/api/output_stream/2a243be8-.../playlist.m3u8` | `1280x720` | **`1.000`** | **`25.0 FPS`** | `201` / `0` (`0.00%`) | `0` / `0` / `0` | `5.86s` / `6.67s` | **`SMOOTH` (PASS)** |
| **03 — Anti-Logo** (`Kênh 1` — `🟢 Live SDI Stream [Active]`, 60 FPS source) | `/v2/api/hls/true60-32373635.../index.m3u8` (`video1_stream.m3u8`, `360` phân đoạn `.ts`) | `1920x1080` | **`0.856`** (`6.98s / 8.16s`) | **`51.5 FPS`** (Source `60.0 FPS`) | `420` / `138` (**`32.86%`**) | `7` / `0` / `0` (`readyStateDrops=2`) | `17.02s` / `17.99s` (`Worker lag: 1792 ms`) | **`LAG_OR_STUTTER` (FAIL `03-04-04`)** |
| **03 — Anti-Logo** (`Kênh 1` — `Virtual SDI 01: BONGDA_HD`) | `livesct.vtvprime.vn/cmcpoc/BONGDA_HD/index.m3u8` (Worker `17861` `HTTP 200`) | `1920x1080` | — | `50.0 FPS` (Cap) | — | — | `status: READY` (Khóa bảo vệ khi luồng 1 đang chạy) | **`READY_LOCKED` (PASS)** |
| **03 — Anti-Logo** (`Kênh 2 & 3` — `Virtual SDI 02 & 03`) | `THETHAO_TINTUC_HD` (port `17862`) & `HAY_TV` (port `17863`) | `1920x1080` | — | `50.0 FPS` (Cap) | — | — | Worker `HTTP 502` (`ClientConnectorError`) | **`CHANNEL_WORKER_DOWN` (FAIL `03-12-03`)** |
| **03 — Anti-Logo** (`Videos` — `select#defaultVideos`, 33 files) | `/v2/api/videos` & `/v2/api/video_frame_preview?frame=0` | `1920x1080` | — | — | Giải mã Frame 0: **33/33 PASS (`100%`)** | — | `5.5 KB – 13.6 KB` JPEG (`66–279 ms`) | **`ALL_VIDEOS_HEALTHY` (PASS `03-12-05`)** |

---

## 6. Liên kết Báo cáo Chi tiết Từng Website

1. **Website 01 — VTV Tư liệu**:
   - [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-09/run-110430/summary.md)
   - [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-09/run-110430/results.csv)
2. **Website 02 — Sport Highlight**:
   - [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-09/run-110430/summary.md)
   - [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-09/run-110430/results.csv)
   - Bugs: [BUG-02-02.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-09/run-110430/bugs/BUG-02-02.md), [BUG-02-03.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-09/run-110430/bugs/BUG-02-03.md), [BUG-02-04.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-09/run-110430/bugs/BUG-02-04.md)
3. **Website 03 — Anti-Logo**:
   - [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-09/run-110430/summary.md)
   - [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/reports/2026-11-09/run-110430/results.csv)
   - Bộ kiểm thử `Videos` & `Live SDI inputs`: [test-cases.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/features/12-Kiem-tra-luong-SDI-Input/test-cases.md), [check-sdi-inputs.js](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/features/12-Kiem-tra-luong-SDI-Input/scripts/check-sdi-inputs.js)
4. **Website 04 — SafeVision**:
   - [summary.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-09/run-110430/summary.md)
   - [results.csv](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-09/run-110430/results.csv)
   - Bugs: [BUG-04-03.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-09/run-110430/bugs/BUG-04-03.md)
