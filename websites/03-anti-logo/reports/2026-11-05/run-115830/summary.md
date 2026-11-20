# BÁO CÁO TỔNG HỢP KIỂM THỬ — WEBSITE 03: ANTI-LOGO (VTV PCD CONTROL)

## 1. Thông tin chung
- **Website:** Anti-Logo — Hệ thống kiểm soát nội dung thông minh VTV (`VTV PCD CONTROL` / `CMC ATI - VTV`)
- **URL kiểm thử:** `https://anti-logo.cmcati.vn/`
- **Ngày giờ chạy:** `2026-11-05 14:13:30` → `2026-11-05 14:32:10` (UTC+7, `run-115830`)
- **Người thực hiện:** QA Agent (sử dụng `chrome-devtools` MCP) phối hợp cùng Tester (nhập thông tin đăng nhập thủ công)
- **Phạm vi kiểm thử:** Kiểm thử hồi quy chỉ đọc (Read-only Regression Test) 11 nhóm chức năng (`01-Dang-nhap` đến `11-Dang-xuat`, tổng 34 test case), kiểm tra chất lượng phát video bằng `check-video-lag.js`, kiểm tra từng ô Multiview trên `/channels` và kiểm tra lại 2 bug cũ (`BUG-03-01`, `BUG-03-02`).

---

## 2. Thống kê kết quả thực thi

| Chỉ số | Giá trị | Ghi chú |
| --- | ---: | --- |
| **Tổng số Test Case** | **34** | `PASS + FAIL + BLOCKED + NOT_RUN = 21 + 0 + 3 + 10 = 34` |
| **PASS** | **21** | Đạt 21/21 test case đã thực thi trong phạm vi chỉ đọc |
| **FAIL** | **0** | Không có test case FAIL |
| **BLOCKED** | **3** | `03-02-03`, `03-04-03`, `03-05-03` (cả 3 kênh đều đang phát `LIVE`; không được phép nhấn `Stop current stream` trong phạm vi chỉ đọc để kiểm tra trạng thái `IDLE`) |
| **NOT_RUN** | **10** | `03-07-03`, `03-08-01..03`, `03-09-01..03`, `03-10-01..03` (ngoài phạm vi chỉ đọc: không sửa/lưu BBox, không chạy Auto VLM+SAM, không xuất Zip CI/CD, không upload/chỉnh tham số kênh LIVE) |
| **Tỷ lệ PASS** | **100.00%** | `PASS / (PASS + FAIL) = 21 / 21` |

---

## 3. Kết quả kiểm tra lại Bug cũ (Retest)

| Mã Bug | Tiêu đề | Kết quả kiểm tra lại (`2026-11-05`) | Bằng chứng |
| --- | --- | --- | --- |
| **BUG-03-01** | Hộp thoại chi tiết frame hiển thị `(Flag=1)` trên tiêu đề dù dòng tương ứng trong bảng Detection Logs có `Flag = 0` | **Không còn tái hiện trong lượt này (Đã khắc phục)** | Mở hộp thoại `#thumbModal` trực tiếp từ dòng `Frame #19875` (`Flag = 0` trong bảng): tiêu đề `#thumbModalTitle` hiển thị `"Frame #19875 — FLAG 0 (Player: found, Logo: none)"`. Mở dòng `Frame #19480` (`Flag = 1` trong bảng): tiêu đề hiển thị `"Frame #19480 — FLAG 1 (Player: found, Logo: found)"`. Khớp hoàn toàn trên cùng frame. |
| **BUG-03-02** | Bộ đếm `Flag=1 count` không khớp với số dòng `Flag=1` đang hiển thị trong trang hiện tại của bảng Logs | **Không còn tái hiện / Đã xác minh đúng phạm vi dữ liệu** | Trên `Kênh 1` (`Semantic samples: 306`, `Flag=1 count: 19`), trang hiện tại 75 dòng (`Showing 22-96 of 306 frames`) có 5 dòng `Flag=1`. Khi bật checkbox `Show only flag=1`, bảng lọc trên toàn bộ 306 mẫu và hiển thị đúng `Showing 1-19 of 19 frames` (19 dòng `Flag=1`), khớp 100% với `Flag=1 count: 19`. |

---

## 4. Kết quả kiểm tra Video Preview & Multiview (Mục 6)

### 4.1. Kiểm tra Video Preview đơn kênh (`03-04-04` — `check-video-lag.js`)
- **Kênh & nguồn đo:** `Kênh 1` (`https://anti-logo.cmcati.vn/`), nguồn `🟢 Live SDI Stream: virtual-sdi-BONGDA_HD [Active]`, chế độ xem `HLS`, độ phân giải `1920x1080`, thời gian đo `10.02 giây`.
- **Số liệu trong khoảng đo (Interval 10.02s):**
  - `advancedMediaSec`: `10.02s` (`currentTime` từ `314.47s` → `323.50s`)
  - `playbackRatio`: `1.0`
  - `effectiveFps`: `50.9 fps`
  - `decodedFrames`: `510` frames
  - `droppedFrames`: `12` frames (`dropRatePercent`: `2.35%`)
  - `waitingEvents`: `1`, `stalledEvents`: `0`, `errorEvents`: `0`, `freezeTicks`: `0`
  - `finalBufferedAheadSec`: `9.50s`
- **Số liệu tích lũy (Cumulative — tách riêng):**
  - `totalFrames`: `15669` → `16179`
  - `droppedFrames`: `32` → `44`
- **Đối chiếu verdict của script với hiện tượng giao diện:**
  - Verdict của script: `SMOOTH` (*"Video phát mượt, không phát hiện giật/lag."*).
  - Bảng `Chi tiết kỹ thuật / HLS metrics` trên UI ghi nhận `hls-playing`, `readyState: 4`, `playbackRate: 1.00`, `smoothStartOk: yes`, `rebuffering: no`, `Continuous buffer: 10.085s`. Tuy nhiên khối chẩn đoán Prerender ghi nhận `Prerender degraded: YES` (`prerender reason: ready_buffer_low`, `output_mode: clean_fallback`).

### 4.2. Kiểm tra Multiview tất cả kênh (`/channels` — `03-05-02`)
Đo đồng thời cả 3 ô `<video>` đang hiển thị trên `/channels` trong khoảng `5.0 giây` (chỉ đọc, không Start/Stop kênh):

| Ô kênh | Nguồn phát | Trạng thái | Độ phân giải | Tiến độ `currentTime` (5s) | Frames trong 5s (`decoded / dropped`) | Frames tích lũy (`total / dropped`) | Đánh giá hiển thị |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Channel 01** | `virtual-sdi-BONGDA_HD` | `LIVE` (`readyState=4`) | `1920x1080` | `368.60s → 373.60s` (`+5.00s`) | `249 / 9` | `984 / 59` | **Có hình, phát mượt** |
| **Channel 02** | `virtual-sdi-BONGDA_HD` | `LIVE` (`readyState=4`) | `1920x1080` | `368.63s → 373.60s` (`+4.97s`) | `248 / 10` | `985 / 61` | **Có hình, phát mượt** |
| **Channel 03** | `virtual-sdi-THETHAO_TINTUC_HD` | `LIVE` (`readyState=4`) | `1920x1080` | `368.00s → 373.00s` (`+5.00s`) | `249 / 9` | `955 / 52` | **Có hình, phát mượt** |

*(Lưu ý theo Mục 6: Kết quả đo ngắn 5s–10s xác nhận trạng thái phát tại thời điểm kiểm thử, không dùng để kết luận độ ổn định dài hạn).*

---

## 5. Ghi chú & Đề xuất cập nhật tài liệu
1. **Chênh lệch tài liệu:**
   - File `prompts/04-kiem-tra-giat-lag-video.md` dòng 7 ghi `https://antilogo.cmcati.vn/` (thiếu dấu gạch ngang), trong khi URL thực tế hoạt động là `https://anti-logo.cmcati.vn/`.
   - Trong DOM thực tế hiện tại, hộp thoại xem/sửa BBox sử dụng ID `#thumbModal` (`#thumbModalTitle`, `#thumbModalClose`) thay vì `#logFrameModal` như trong `selectors.json` cũ; đề xuất cập nhật `selectors.json` của feature `07-Detection-Result` và `08-Chinh-sua-BBox`.

