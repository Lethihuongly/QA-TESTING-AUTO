# Báo Cáo Kiểm Thử — Website 04: SafeVision (`VTV Logo Detection`)

## 1. Thông tin chung
- **Website**: SafeVision (`https://safevision.cmcati.vn/`)
- **Ngày giờ chạy**: `2026-11-06 09:35:48 — 09:47:09` (`Asia/Ho_Chi_Minh`)
- **Công cụ**: `chrome-devtools` MCP (chế độ chỉ đọc / Read-Only)

## 2. Thống kê kết quả

| Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | So sánh với lần chạy trước (`2026-11-05/run-152048`) |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **28** | **24** | **0** | **1** | **3** | **100.00%** | `+5 PASS`, `-3 FAIL`, `-2 BLOCKED` (Lần trước: `19 PASS, 3 FAIL, 3 BLOCKED, 3 NOT_RUN` — `86.36%`) |

## 3. Kết quả kiểm tra lại lỗi cũ & Vấn đề cần xác nhận
1. **BUG-04-02 (Luồng stream gốc HLS trên `VTV1` / `VTV3` báo lỗi CORS & HTTP 503 Service Unavailable)**: **ĐÃ KHẮC PHỤC (Fixed — `TC 04-05-01`, `TC 04-05-04`)**
   - **Bằng chứng**:
     - Trên kênh **VTV3** (`/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`): Terminal Logs ghi nhận `[001] [HLS] Manifest sẵn sàng (lần thử 1)`, `[002] [HLS] Video preview đã kết nối thành công`. Đo `check-video-lag.js` trong `8.09s` đạt `readyState = 4`, `1280x720 @ 25 FPS`, `playbackRatio = 1.000`, `decoded = 202`, `dropped = 0 (0%)`, `freezeTicks = 0`, `waiting = 0`, `stalled = 0`, `bufferAhead = 8.407s — 11.958s`, `verdict = SMOOTH`.
     - Trên kênh **VTV1** (`/channels/d0094380-35f5-4d28-8e1c-045b6e39eef5`): `<video>` phát trực tiếp ở `readyState = 4`, `paused = false`, `1280x720`, `errorText = null`.
2. **BUG-04-01 (Thứ tự nhãn trong `THỐNG KÊ PHÂN LOẠI LOGO` hiển thị `bản đồ 3` trước `bản đồ 2`)**: **CẦN XÁC NHẬN ĐẶC TẢ (Không tính là lỗi)**
   - **Bằng chứng**: API `GET https://safevision-api.cmcati.vn/api/v1/dashboard/stats` (`reqid=7359 [200]`) trả về mảng `topLogos` được sắp xếp **giảm dần theo số lần phát hiện (`count`)**: `3soc (16446)` > `3que (289)` > `ao3soc (279)` > `bản đồ 1 (156)` > `bản đồ 3 (32)` > `bản đồ 2 (28)`. Giao diện hiển thị khớp 100% với thứ tự giảm dần theo `count` từ Backend.
3. **BUG-04-03 (Ô `Tìm kiếm nhanh...` trên `<header>` không hoạt động)**: **ĐÃ GỠ BỎ KHỎI UI — CẦN CẬP NHẬT ĐẶC TẢ (`TC 04-07-03` = `BLOCKED`)**
   - **Bằng chứng**: Ô `input[placeholder="Tìm kiếm nhanh..."]` trên `<header>` đã được Dev gỡ bỏ hoàn toàn khỏi DOM (`document.querySelectorAll('header input').length === 0`). Do đó `TC 04-07-03` được ghi nhận là `BLOCKED` (cần cập nhật tài liệu test case để bỏ bước tìm kiếm trên Header).
4. **Console Warning**:
   - `[warn] [ChannelWS] SockJS or Stomp not loaded` (`msgid=84`) khi mở trang chi tiết kênh ở trạng thái `IDLE` (`WS offline`). Theo quy tắc kiểm thử, warning đơn lẻ khi chưa bật phiên giám sát không tính là bug người dùng nhưng được ghi nhận để Dev lưu ý.

