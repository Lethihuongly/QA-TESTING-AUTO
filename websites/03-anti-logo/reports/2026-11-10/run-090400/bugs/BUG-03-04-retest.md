# Retest `BUG-03-04` — Đo lường chất lượng luồng video đang phát trên Anti-Logo (`check-video-lag.js`)

- **Mã Bug:** `BUG-03-04`
- **Case_ID liên quan:** `03-04-04`, `03-05-02`
- **Run_ID:** `2026-11-10/run-090400`
- **Thời điểm kiểm tra:** `2026-11-10T10:00:30+07:00` → `2026-11-10T10:07:31+07:00`
- **URL:** `https://anti-logo.cmcati.vn/channel/1` và `https://anti-logo.cmcati.vn/channels`
- **Trạng thái hiện tại:** **SMOOTH KHI HIỂN THỊ TRONG KHUNG NHÌN (`PASS_SMOOTH`)**

## 1. Phương pháp & Điều kiện Đo
- Sử dụng script `websites/03-anti-logo/features/04-Preview/scripts/check-video-lag.js` với `durationMs = 8000`, `intervalMs = 500`.
- Theo đúng hướng dẫn mục 5: khi Lần đo 1 trên `/channel/1` ghi nhận `dropRatePercent = 100.5%` do thẻ `<video>` đang nằm ngoài vùng nhìn thấy (off-screen), chúng tôi cuộn thẻ `<video>` vào chính giữa khung nhìn (`scrollIntoView`, `inViewport = true`) và thực hiện **Lần đo 2**, đồng thời giữ nguyên cả hai kết quả. Ngoài ra thực hiện thêm **Lần đo 3** trên trang Multi-Channel (`/channels`) với 3 luồng phát đồng thời.

## 2. Bảng Dữ liệu Đo Đầy Đủ

| Lần đo | Trang / Luồng | `inViewport` | `wallSec` | `deltaVideoSec` | `playbackRatio` | `decodedFrames` | `droppedFrames` | `dropRatePercent` | `effectiveFps` | `waiting` / `stalled` | `freezeTicks` | `readyState` | `Buffer (min/avg)` | Kết luận Script |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Đo 1** (`03:00:30Z`) | `/channel/1` — `virtual-sdi-BONGDA_HD` (`1920x1080`) | `false` (off-screen) | `8.09s` | `8.09s` | `1.000` | `403` | `405` | `100.50%` | `49.8` | `0 / 0` | `0` | `4` | `44.11s / 44.38s` | `LAG_OR_STUTTER` |
| **Đo 2** (`03:01:14Z`) | `/channel/1` — `virtual-sdi-BONGDA_HD` (`1920x1080`) | `true` (`top=259..625`) | `8.09s` | `8.07s` | `0.998` | `406` | **`0`** | **`0.00%`** | **`50.2`** | `0 / 0` | `0` | `4` | `44.32s / 44.62s` | **`SMOOTH`** |
| **Đo 3a** (`03:07:31Z`) | `/channels` — `Channel_01` (`virtual-sdi-BONGDA_HD`) | `true` | `8.12s` | `8.12s` | `1.000` | `406` | `2` | `0.49%` | `50.0` | `0 / 0` | `0` | `4` | `5.42s / 5.74s` | **`SMOOTH`** |
| **Đo 3b** (`03:07:31Z`) | `/channels` — `Channel_02` (`virtual-sdi-THETHAO_TINTUC_HD`) | `true` | `8.12s` | `8.12s` | `1.000` | `406` | `2` | `0.49%` | `50.0` | `0 / 0` | `0` | `4` | `5.50s / 5.82s` | **`SMOOTH`** |
| **Đo 3c** (`03:07:31Z`) | `/channels` — `Channel_03` (`virtual-sdi-HAY_TV`) | `true` | `8.12s` | `8.12s` | `1.000` | `403` | `2` | `0.50%` | `49.6` | `0 / 0` | `0` | `4` | `5.57s / 5.89s` | **`SMOOTH`** |

## 3. Phân tách Kết luận Script và Kết luận QA
- **Kết luận của Script:** Lần đo 1 báo `LAG_OR_STUTTER` vì `dropRatePercent = 100.5% >= 5%`; Lần đo 2 và Lần đo 3 (cả 3 luồng) báo **`SMOOTH` (`PASS_SMOOTH`)**.
- **Kết luận của QA:**
  - Ở Lần đo 1, `playbackRatio = 1.000`, `effectiveFps = 49.8 FPS` và `freezeTicks = 0`, nhưng do thẻ `<video>` nằm ngoài vùng cuộn của trang nên bộ compositor của trình duyệt Chromium chủ động bỏ qua bước vẽ frame ra màn hình và cộng vào `droppedVideoFrames`. Đây là cơ chế tối ưu hiển thị của trình duyệt, **không phải** lỗi giật/đứng hình của luồng video.
  - Khi thẻ `<video>` nằm trong khung nhìn người dùng (Lần đo 2 trên `/channel/1` và Lần đo 3 trên `/channels`), luồng phát hoàn toàn mượt ở **50 FPS** với tỷ lệ rớt frame **`0.00% – 0.50%`**, không có bất kỳ chu kỳ đứng hình nào (`freezeTicks = 0`, `waitingEvents = 0`).

