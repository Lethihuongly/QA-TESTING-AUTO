# BÁO CÁO KIỂM THỬ HỒI QUY — WEBSITE 04: SAFEVISION (VTV PCD)

## 1. Thông tin chung
- **Website**: SafeVision (`websites/04-safevision/`)
- **URL**: `https://safevision.cmcati.vn/`
- **Thời gian chạy**: `2026-11-05 14:24:30` – `2026-11-05 14:33:30` (Asia/Ho_Chi_Minh, UTC+7)
- **Mã đợt chạy**: `run-115830`
- **Công cụ**: `chrome-devtools` MCP (chỉ đọc, không tạo/xóa kênh, không sửa cấu hình hoặc nhấn "Bắt đầu giám sát")
- **Tài khoản kiểm thử**: `vtv` (`VTV`) — người dùng đăng nhập thủ công trên trình duyệt MCP

---

## 2. Tổng hợp kết quả
| Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | Bug mới | Bug cũ còn tái hiện |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **28** | **22** | **0** | **3** | **3** | **100.00% (22/22)** | **0** | **0 (1 lưu ý cảnh báo kỹ thuật phụ)** |

- **Kiểm tra công thức**: `Tổng TC = 22 + 0 + 3 + 3 = 28`.
- **Chi tiết các case `BLOCKED` (3 case)**:
  - `04-07-01`, `04-07-02`, `04-07-03` (`07-Tim-kiem-Su-kien`): Ở đợt kiểm thử trước (`2026-11-04`), ô tìm kiếm toàn cục trên Header (`header input[placeholder="Tìm kiếm kênh, cảnh báo..."]`) là UI tĩnh chưa gắn sự kiện (`BUG-04-03`). Trong phiên bản hiện tại, Dev đã xử lý `BUG-04-03` bằng cách **gỡ bỏ hoàn toàn ô input chưa hoàn thiện này khỏi Header** (`banner` `uid=72_16..72_22` và `uid=76_16..76_22`). Do phần tử mục tiêu trong `selectors.json` không còn trên giao diện, 3 test case này được ghi nhận `BLOCKED` (thiếu điều kiện giao diện) kèm đề xuất cập nhật bộ tài liệu. Chức năng tìm kiếm kênh thực tế tại `/channels` (`04-04-01..03`) hoạt động đầy đủ và đạt `PASS`.
- **Chi tiết các case `NOT_RUN` (3 case ngoài phạm vi chỉ đọc)**:
  - `04-03-03`: Mở modal Thêm kênh, tạo kênh mới hoặc xóa kênh.
  - `04-08-02`: Thay đổi cấu hình nguồn stream/tham số AI hoặc nhấn `Bắt đầu giám sát`.
  - `04-08-03`: Thêm hoặc xóa danh mục logo cần nhận diện.

---

## 3. Kết quả kiểm tra lại Bug cũ (Retest)
| Mã Bug | Tiêu đề | Trạng thái Retest | Bằng chứng xác minh thực tế |
| :--- | :--- | :--- | :--- |
| **BUG-04-01** | Khối "Thống kê phân loại logo" trên Dashboard không sắp xếp giảm dần theo số lượng và hiển thị hàng trăm mục `0 (0%)` | **Không còn tái hiện (Đã khắc phục)** | Kiểm tra DOM thực tế tại `/` (`uid=72_43..72_73` & `evaluate_script`): toàn bộ 216 mục `0` phát hiện đã được lọc bỏ (`domLogoItemCount: 6`), danh sách chỉ hiển thị 6 mục có dữ liệu và sắp xếp giảm dần tuyệt đối: `3soc` (`16446 - 8%`) > `3que` (`289 - 0%`) > `ao3soc` (`279 - 0%`) > `bản đồ 1` (`156 - 0%`) > `bản đồ 3` (`32 - 0%`) > `bản đồ 2` (`28 - 0%`). |
| **BUG-04-02** | Luồng Stream Gốc HLS trên trang Chi tiết kênh không phát được do lỗi `503 Service Unavailable` + CORS và lỗi `[ChannelWS] SockJS or Stomp not loaded` | **Lỗi chính (HLS 503/CORS) không còn tái hiện (Đã khắc phục) / Còn cảnh báo phụ `[ChannelWS]` khi kênh `IDLE`** | 1. **Luồng HLS gốc (Đã khắc phục hoàn toàn)**: Nguồn stream kênh `VTV4` đã được cập nhật sang `https://vtvgolive-vtv02.vtvdigital.vn/.../master.m3u8` (`uid=75_36`). Video phát mượt ở độ phân giải `1280x720`, `HLS Telemetry HUD` báo `State: PLAYING`, `ReadyState: 4/4`, không còn bất kỳ lỗi `503` hay CORS nào.<br>2. **Cảnh báo WebSocket phụ (Còn xuất hiện khi kênh `IDLE`)**: Console vẫn ghi nhận 1 warning `msgid=8 [warn] [ChannelWS] SockJS or Stomp not loaded` và badge `WS offline` (`uid=74_64`) khi mở trang chi tiết kênh đang ở trạng thái `IDLE`. |
| **BUG-04-03** | Ô tìm kiếm toàn cục `"Tìm kiếm kênh, cảnh báo..."` trên Header không hoạt động ở mọi trang | **Không còn tái hiện (Đã khắc phục bằng cách gỡ bỏ UI thừa)** | Dev đã gỡ bỏ ô input tĩnh `input[placeholder="Tìm kiếm kênh, cảnh báo..."]` khỏi thanh Header trên toàn bộ các trang (`/`, `/channels`, `/channels/:id`), tránh gây hiểu nhầm cho người dùng. |

---

## 4. Kết quả kiểm tra Video (`check-video-lag.js`) — Mục 6
Đã đọc và thực thi phần hàm đo chỉ đọc của script `websites/04-safevision/scripts/check-video-lag.js` trên trang chi tiết kênh `VTV4` (`/channels/fc3be0d7-0d57-4f0b-b7e4-d59995262336`):
- **Thông tin nguồn phát**:
  - **Kênh**: `VTV4` (`fc3be0d7-0d57-4f0b-b7e4-d59995262336`)
  - **Nguồn**: `LUỒNG STREAM GỐC` (`LIVE` HLS — `https://vtvgolive-vtv02.vtvdigital.vn/.../master.m3u8`)
  - **Chế độ xem**: Single channel view (khung trái `LUỒNG STREAM GỐC`; khung phải ở trạng thái `IDLE - Output Stream Chưa Phát`)
  - **Độ phân giải**: `1280x720`
  - **Thời gian đo**: `10.01s` (`10010 ms`)
- **Số liệu trong khoảng đo (`10.01s`)**:
  - `advancedMediaSec`: `9.99s` (`currentTime`: `28.597s` -> `38.589s`)
  - `playbackRatio`: `1.0`
  - `effectiveFps`: `25`
  - `decodedFrames`: `250`
  - `droppedFrames`: `1`
  - `dropRatePercent`: `0.4%`
  - `waitingEvents`: `0` | `stalledEvents`: `0` | `errorEvents`: `0` | `freezeTicks`: `0`
  - `minBufferedAheadSec`: `10.13s` | `finalBufferedAheadSec`: `11.12s`
- **Số liệu tích lũy (từ lúc mở trang đến khi kết thúc đo)**:
  - `totalVideoFrames`: `777` -> `1027` (`1689` khi kiểm tra lại trên `HLS Telemetry HUD`)
  - `droppedVideoFrames`: `3` -> `4`
- **Đối chiếu verdict của script và giao diện**:
  - **Verdict của script**: `status: "SMOOTH"` — *"Video phát mượt, không phát hiện giật/lag."*
  - **Đối chiếu UI (`HLS Telemetry HUD` `uid=75_3..75_28`)**: Hiển thị `State: PLAYING`, `ReadyState: 4/4`, `Latency: 12.62s`, `Buffer: 12.6s`, `Resolution: 1280x720`, hoàn toàn khớp với kết quả đo của script.

---

## 5. Hạn chế & Đề xuất cập nhật tài liệu
1. **Lỗi công cụ khi lưu ảnh chụp màn hình (`take_screenshot`)**:
   - Lời gọi `take_screenshot` với tham số `filePath` trả về nguyên văn:
     `Error: Access denied: path "c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/04-safevision/reports/2026-11-05/run-115830/screenshots/..." is not within any of the configured workspace roots.`
   - Thư mục `screenshots/` được giữ trống, không tạo đường dẫn giả.
2. **Đề xuất cập nhật tài liệu kiểm thử (`04-safevision`)**:
   - Đề xuất đánh dấu `Deprecated` hoặc gỡ bỏ tính năng `07-Tim-kiem-Su-kien` (`04-07-01..03`) và selector `header.globalSearchInput` trong `features/07-Tim-kiem-Su-kien/selectors.json` nếu sản phẩm chính thức bỏ ô tìm kiếm trên Header và chỉ sử dụng bộ lọc tại `/channels` (`04-04-01..03`).

