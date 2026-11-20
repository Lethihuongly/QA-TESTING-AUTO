# Báo Cáo Kiểm Thử — Website 03: Anti-Logo (`VTV PCD`)

## 1. Thông tin chung
- **Website**: Anti-Logo (`https://anti-logo.cmcati.vn/`)
- **Ngày giờ chạy**: `2026-11-06 09:22:25 — 09:35:32` (`Asia/Ho_Chi_Minh`)
- **Công cụ**: `chrome-devtools` MCP (chế độ chỉ đọc / Read-Only)

## 2. Thống kê kết quả

| Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | So sánh với lần chạy trước (`2026-11-05/run-152048`) |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **34** | **24** | **0** | **0** | **10** | **100.00%** | `+3 PASS`, `-2 FAIL`, `-1 BLOCKED` (Lần trước: `21 PASS, 2 FAIL, 1 BLOCKED, 10 NOT_RUN` — `91.30%`) |

## 3. Kết quả kiểm tra lại lỗi cũ (Retest Bugs)
1. **BUG-03-01 (Tiêu đề hộp thoại `✏️ Sửa BBox` hiển thị `FLAG 1` trong khi cột `Flag` ngoài bảng Logs là `0`)**: **ĐÃ KHẮC PHỤC (Fixed — `TC 03-07-02`)**
   - **Bằng chứng**:
     - Dòng `Frame #27390` (`Flag = 0`, `Player = found`, `Logo = none`) -> Mở modal `✏️ Sửa BBox` hiển thị đúng `#thumbModalTitle`: `"Frame #27390 — FLAG 0 (Player: found, Logo: none)"`.
     - Dòng `Frame #26040` (`Flag = 0`, `Player = none`, `Logo = none`) -> Hiển thị đúng `"Frame #26040 — FLAG 0 (Player: none, Logo: none)"`.
     - Dòng `Frame #22410` (`Flag = 1`, `Player = found`, `Logo = found`) -> Hiển thị đúng `"Frame #22410 — FLAG 1 (Player: found, Logo: found)"`.
2. **BUG-03-02 (Bật bộ lọc `Show only flag=1` làm bảng Logs trống dù `Flag=1 count > 0`)**: **ĐÃ KHẮC PHỤC (Fixed — `TC 03-06-03`)**
   - **Bằng chứng**: Khi `Flag=1 count = 397`, bật checkbox `Show only flag=1` (`#flag1OnlyToggle`) hiển thị đúng 75 dòng có `Flag = 1` trên trang hiện tại (`Showing 2-76 of 302 frames`, ví dụ các frame `22410`, `22380`, `22350`, `22320`...).

## 4. Kết quả đo giật/lag luồng Video (`check-video-lag.js` — 8 giây)
1. **Đơn kênh (`https://anti-logo.cmcati.vn/` — Kênh 1, `TC 03-04-04`)**:
   - Điều kiện đo: Phần tử `<video id="vid_FULLMATCHATALANT_yzgwi0">` nằm trong vùng nhìn thấy (viewport), độ phân giải `1920x1080`, `readyState = 4`, khoảng đo `8.07s` (16 mẫu, chu kỳ 500ms).
   - Chỉ số: `mediaAdvancedSec = 8.07s`, `playbackRatio = 1.000`, `decodedFramesDelta = 485` (`~60.1 FPS`), `droppedFramesDelta = 6` (`dropRatePct = 1.24% < 5%`), `freezeTicks = 0`, `waiting = 0`, `stalled = 0`, `bufferAheadSec = 10.416s — 10.963s`.
   - *(Lưu ý kỹ thuật: Khi cuộn trang làm phần tử `<video>` bị khuất khỏi viewport ở tọa độ `top = 1458px`, trình tổng hợp hình ảnh của Chrome ngừng vẽ các frame khuất màn hình và ghi nhận 100% frame vào `droppedVideoFrames`; khi cuộn `<video>` vào trong viewport ở `top = 284px`, tỷ lệ drop frame thực tế chỉ là `1.24%`).*
2. **Đa kênh (`https://anti-logo.cmcati.vn/channels` — 3 kênh phát đồng thời, `TC 03-05-02`)**:
   - Điều kiện đo: 3 phần tử `<video>` (`Channel 01`, `Channel 02`, `Channel 03`) cùng phát trong `8.11s` (16 mẫu):
     - `Channel 01` (`1920x1080`, `60.0 FPS`): `readyState = 4`, `playbackRatio = 1.000`, `decoded = 487`, `dropped = 0 (0%)`, `freezeTicks = 0`, `waiting = 0`, `stalled = 0`, `bufferAhead = 6.018s — 6.616s` -> `SMOOTH`.
     - `Channel 02` (`1920x1080`, `49.7 FPS`): `readyState = 4`, `playbackRatio = 1.000`, `decoded = 403`, `dropped = 0 (0%)`, `freezeTicks = 0`, `waiting = 0`, `stalled = 0`, `bufferAhead = 6.085s — 6.683s` -> `SMOOTH`.
     - `Channel 03` (`1920x1080`, `50.3 FPS`): `readyState = 4`, `playbackRatio = 1.000`, `decoded = 408`, `dropped = 0 (0%)`, `freezeTicks = 0`, `waiting = 0`, `stalled = 0`, `bufferAhead = 6.178s — 6.776s` -> `SMOOTH`.
   - Kết luận trong khoảng đo 8 giây: Không xảy ra hiện tượng đen hình hay giật/đứng hình khi xem đồng thời 3 kênh trên `/channels`.

