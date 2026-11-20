# Bằng chứng kiểm thử Website 03 — Anti-Logo (`run-085600`)

- **Run_ID:** `run-085600`
- **Ngày giờ thực thi:** `2026-11-12T09:13:16+07:00` — `2026-11-12T09:16:40+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://anti-logo.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Kết quả chạy `check-sdi-inputs.js` (`03-12-01` .. `03-12-05`)
- **Danh sách `Videos` (`#defaultVideos` & `/v2/api/videos`):**
  - `apiHttpStatus`: `200`, `videoDir`: `"/home/ttdat/pcd-4090-v3-staging/runtime/videos"`, `videoDirExists`: `true`.
  - Tổng số file video: `13` (`totalOptionsInUi=13`, `uniqueValuesInUi=13`).
  - Kiểm tra giải mã Frame 0 (`/v2/api/video_frame_preview?video=...&frame=0&max_width=320`): **13/13 file trả `HTTP 200` `image/jpeg`** (`decodablePassCount=13`, `decodableFailCount=0`, kích thước `2,332` – `19,052` bytes, độ trễ `13` – `369` ms).
- **Danh sách `Live SDI inputs (auto-detected)` (`#sdiInputs` & `/v2/api/sdi_inputs`):**
  - `Virtual SDI 01: VTVPrime BONGDA_HD (4 Levels -> Cap 1080p @ 50 FPS)` (`1920x1080`, `50/1 FPS`, `status=READY`, `channel_id=1`)
  - `Virtual SDI 02: VTVPrime THETHAO_TINTUC_HD (4 Levels -> Cap 1080p @ 50 FPS)` (`1920x1080`, `50/1 FPS`, `status=READY`, `channel_id=2`)
  - `Virtual SDI 03: VTVPrime HAY_TV (4 Levels -> Cap 1080p @ 50 FPS)` (`1920x1080`, `50/1 FPS`, `status=READY`, `channel_id=3`)
- **Trạng thái API SDI & Channel Workers (`BUG-03-03` FIXED):**
  - `/v2/api/sdi_inputs`: `200`
  - `/channels/api/1/sdi_inputs`: `200`
  - `/channels/api/2/sdi_inputs`: `200`
  - `/channels/api/3/sdi_inputs`: `200`
  - `/channels/api/state`: `200` (`Channel 01`, `Channel 02`, `Channel 03` đều `ok=true, status=200, state="IDLE", error=null`).

---

## 2. Kết quả kiểm tra Frame Logs & BBox Modal (`03-06-01..03`, `03-07-01..02`)
- **Bảng Frame Logs (`#logTableBody`):**
  - `AI lane: DONE`, `Semantic samples: 2409`, `Latest semantic frame: 72240`, `Flag=1 count: 1614`.
  - Khi `#flag1OnlyToggle` (`uid=41_420`) được bật (`checked=true`), hiển thị `Showing 1-75 of 168 frames`, toàn bộ `75/75` dòng trong bảng đều có `Flag=1` (`nonFlag1Count=0` — `BUG-03-02` FIXED).
- **Modal Sửa BBox (`#thumbModal` — `BUG-03-01` FIXED):**
  - Nhấn `✏️ Sửa BBox` (`uid=41_452`) trên Frame `72240`: `modalVisible=true`, `#thumbModalTitle` hiển thị `"Frame #72240 — FLAG 1 (Player: found, Logo: found)"`. Đóng an toàn qua `#thumbModalClose` (`modalClosedAfter=true`).

---

## 3. Kết quả kiểm tra Multi-Channel (`/channels`) & Tài khoản (`03-05-01..03`, `03-11-01..03`)
- Tại `https://anti-logo.cmcati.vn/channels`: hiển thị `h1 "VTV PCD Command Center"`, nút `Changed frames (7)`, `Export to Server (7)`, liên kết `Home PCD`, `Kênh 1..3`, menu tài khoản `vtv` (`uid=42_14` -> `link "Đăng xuất"` `uid=43_0`), và 3 khung kênh `Channel 01..03` ở trạng thái `IDLE / Ready`.

