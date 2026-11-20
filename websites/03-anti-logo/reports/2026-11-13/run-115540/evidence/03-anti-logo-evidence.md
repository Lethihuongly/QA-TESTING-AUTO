# Bằng chứng kiểm thử Website 03 — Anti-Logo (`run-115540`)

- **Run_ID:** `run-115540`
- **Ngày giờ thực thi:** `2026-11-13T12:00:50+07:00` — `2026-11-13T12:02:55+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://anti-logo.cmcati.vn/channel/1`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` & `11-Tai-khoan-Dang-xuat` (`03-01-01..03`, `03-11-01..03`)
- Người dùng đã đăng nhập tài khoản: `vtv` (`uid=51_13` trên `/channel/1`, `uid=52_14` trên `/channels`).
- URL truy cập hợp lệ: `/channel/1`, `/channel/2`, `/channel/3`, `/channels`.
- Điều hướng `/login` tự động chuyển về `/channel/1` khi phiên còn hiệu lực.
- Menu tài khoản hiển thị đầy đủ liên kết `/logout`.

---

## 2. Feature `02-Tong-quan-Dieu-khien`, `03-Danh-sach-kenh` & `05-Multi-Channel` (`03-02-01..03`, `03-03-01..03`, `03-05-01..03`)
- **Điều khiển kênh (`/channel/1`):**
  - Header: Kênh 1, Kênh 2, Kênh 3, 📺 Multi-Channel (3 SDI), tài khoản `vtv`.
  - Nguồn Video cục bộ: `select#defaultVideos` hiển thị 15 file video.
  - CMC S3 video: 522 kết quả (Fullmatch 242, Highlight 280).
  - YOLO Classes: 106 lớp nhãn nhận diện.
- **Trạng thái Kênh (`GET /channels/api/state`):**
  - Channel 01: `IDLE`, `error=null`.
  - Channel 02: `LIVE`, source: `virtual-sdi-THETHAO_TINTUC_HD`, frames_written: > 4,643,000 frames.
  - Channel 03: `LIVE`, source: `virtual-sdi-HAY_TV`, frames_written: > 4,643,000 frames.
- **Trang Multi-Channel (`/channels`):**
  - Header: `VTV PCD Command Center`, Changed frames (3), Export to Server (3), Home PCD, Kênh 1..3.
  - 3 Thẻ kênh: Channel 01 (`IDLE`), Channel 02 (`LIVE`), Channel 03 (`LIVE`).

---

## 3. Feature `04-Chi-tiet-Preview` & Kiểm tra giật lag (`03-04-01..04`)
- **Đo lường định lượng trên Channel 02 (`LIVE`):**
  - Resolution: `1920x1080` (Full HD).
  - `wallSec`: 4.01s, `deltaVideoSec`: 4.01s.
  - `playbackRatio`: 1.000 (đồng bộ hoàn hảo).
  - `decodedFrames`: 200 frames.
  - `effectiveFps`: 49.8 FPS (chuẩn 50 FPS).
  - `readyState`: 4 (HAVE_ENOUGH_DATA), `paused`: false.

---

## 4. Feature `06-AI-Flag-Logs` & `07-Bounding-Box` (`03-06-01..03`, `03-07-01..03`)
- **Bảng Frame Logs:** Hiển thị 75 dòng/trang kèm cột Frame, Flag, Player, Logo, Sửa BBox.
- **Lọc Flag 1 (`BUG-03-02` Retest):**
  - Bật `#flag1OnlyToggle`: Toàn bộ 75/75 dòng trong bảng đều có `Flag=1` (`nonFlag1Count = 0`).
  - Các frame tiêu biểu: 350940, 350880, 350700, 350580, 350550.
- **Modal Sửa BBox (`BUG-03-01` Retest):**
  - Nhấn `✏️ Sửa BBox` trên dòng Frame 350940.
  - Modal `#thumbModal` mở thành công (`isOpenBefore=true`), tiêu đề:
    `Frame #350940 — FLAG 1 (Player: found, Logo: found)`.
  - Đóng an toàn qua `#thumbModalClose` (`isOpenAfter=false`).

---

## 5. Feature `12-Kiem-tra-luong-SDI-Input` (`03-12-01..05`)
- `check-sdi-inputs.js` thực thi trực tiếp qua MCP:
  - 5 API endpoints (`/v2/api/videos`, `/v2/api/sdi_inputs`, `/channels/api/{1..3}/sdi_inputs`, `/channels/api/state`) đều trả về `HTTP 200 OK`.
  - 15/15 file video cục bộ giải mã Frame 0 thành công (`allVideosOk=true`, HTTP 200 image/jpeg).
  - 3 nguồn Virtual SDI (BONGDA_HD, THETHAO_TINTUC_HD, HAY_TV) sẵn sàng @ 1080p 50 FPS.
  - 2 luồng Active SDI đang phát mượt mà trên Channel 02 & 03.

