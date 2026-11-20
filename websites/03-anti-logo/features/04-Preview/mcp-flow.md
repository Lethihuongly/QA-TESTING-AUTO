# Quy trình MCP: Anti-Logo / Preview & Kiểm tra Giật Lag Video

Đây là hướng dẫn cho agent trong Antigravity khi thực hiện bằng `chrome-devtools` MCP.

## 1. Các bước chuẩn bị
1. Đọc `test-cases.md` cùng thư mục (`TC-03-04-01` đến `TC-03-04-04`).
2. Chọn đúng tab `https://anti-logo.cmcati.vn/channel/1` (hoặc `/channels`).
3. Lấy snapshot mới để xác nhận kênh đang ở trạng thái `LIVE` / `Active` (hay `IDLE`). Nếu kênh đang `IDLE`, ghi chú rõ kênh đang không phát luồng và không tự bấm `Start` nếu chưa được phép.

## 2. Cách kiểm tra Video có bị Giật / Lag / Đứng hình hay không (`TC-03-04-04`)
Khi có ít nhất 1 thẻ `<video>` đang hiển thị trên trang (`/channel/1..3` hoặc `/channels`), gọi công cụ `evaluate_script` của `chrome-devtools` MCP với nội dung từ file `scripts/check-video-lag.js` (đo trong 8 giây, lấy mẫu mỗi 500ms).

### Ngưỡng đánh giá kết quả (`verdict`):
- **`SMOOTH (Mượt - PASS)`**:
  - `playbackRatio` nằm trong khoảng `0.90` – `1.10`
  - `waitingEvents === 0` và `readyStateDrops === 0`
  - `dropRatePercent < 5%` và `effectiveFps >= 20`
  - `minBufferAheadSec >= 1.0`
- **`LAG_OR_STUTTER (Bị giật/khựng - FAIL)`**:
  - `playbackRatio < 0.90` (video chạy chậm hơn thời gian thực do khựng)
  - Hoặc `waitingEvents > 0` / `readyStateDrops > 0` (bị dừng chờ nạp buffer)
  - Hoặc `dropRatePercent >= 5%` (rớt khung hình nhiều)
- **`FROZEN (Đứng hình hoàn toàn - FAIL)`**:
  - `deltaVideoTime === 0` hoặc `decodedFrames === 0` sau 8 giây quan sát.

## 3. Ghi báo cáo
- Lưu đầy đủ JSON trả về từ `evaluate_script` (`playbackRatio`, `effectiveFps`, `droppedFrames`, `waitingEvents`, `minBufferAheadSec`, `verdict`) vào cột `Actual` và `Evidence` trong `reports/YYYY-MM-DD/run-HHMMSS/results.csv`.
