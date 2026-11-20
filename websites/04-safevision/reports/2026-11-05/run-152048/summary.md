# BÁO CÁO KIỂM THỬ HỒI QUY (LƯỢT 2) — WEBSITE 04: SAFEVISION (VTV PCD)

## 1. Thông tin chung
- **Website**: SafeVision (`websites/04-safevision/`)
- **URL**: `https://safevision.cmcati.vn/`
- **Thời gian chạy**: `2026-11-05 15:50:07` – `2026-11-05 15:56:05` (Asia/Ho_Chi_Minh, UTC+7)
- **Mã đợt chạy**: `run-152048` (Lượt kiểm thử kỹ lần 2 trong ngày `2026-11-05`)
- **Công cụ**: `chrome-devtools` MCP (chỉ đọc)

---

## 2. Tổng hợp kết quả
| Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | Bug mới | Bug cũ còn tái hiện |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **28** | **22** | **0** | **3** | **3** | **100.00% (22/22)** | **0** | **0** (+ 1 cảnh báo kỹ thuật phụ `BUG-04-02`) |

- **Kiểm tra công thức**: `Tổng TC = 22 + 0 + 3 + 3 = 28`.
- **Chi tiết 3 case `BLOCKED`**: `04-07-01..03` (Dev đã gỡ bỏ ô tìm kiếm tĩnh trên Header để khắc phục `BUG-04-03`, nên không còn phần tử mục tiêu trên Header; tìm kiếm kênh thực tế tại `/channels` đạt `PASS` ở `04-04-01..03`).
- **Chi tiết 3 case `NOT_RUN`**: `04-03-03`, `04-08-02`, `04-08-03` (ngoài phạm vi chỉ đọc).

---

## 3. Kết quả kiểm tra lại Bug cũ (Retest)
| Mã Bug | Tiêu đề | Trạng thái trong đợt `run-152048` | Bằng chứng xác minh thực tế |
| :--- | :--- | :--- | :--- |
| **BUG-04-01** | Khối `"Thống kê phân loại logo"` không sắp xếp giảm dần và hiển thị hàng trăm mục `0 (0%)` | **Không còn tái hiện (Đã khắc phục)** | Khối `"THỐNG KÊ PHÂN LOẠI LOGO"` (`uid=147_41..147_71`) chỉ hiển thị 6 mục có phát hiện và sắp xếp giảm dần chính xác: `3soc` (`16446 - 8%`) > `3que` (`289 - 0%`) > `ao3soc` (`279 - 0%`) > `bản đồ 1` (`156 - 0%`) > `bản đồ 3` (`32 - 0%`) > `bản đồ 2` (`28 - 0%`). |
| **BUG-04-02** | Luồng Stream Gốc HLS lỗi `503 Service Unavailable` + CORS và Console báo `[ChannelWS] SockJS or Stomp not loaded` | **Lỗi chính (HLS 503/CORS) đã khắc phục / Còn cảnh báo phụ `[ChannelWS]` khi kênh `IDLE`** | Luồng HLS gốc trên kênh `VTV4` phát mượt ở `1280x720` (`24.4 fps`, `readyState: 4`). Cảnh báo kỹ thuật `[ChannelWS] SockJS or Stomp not loaded` và badge `WS offline` vẫn xuất hiện khi kênh ở trạng thái `IDLE`. |
| **BUG-04-03** | Ô tìm kiếm toàn cục trên Header không hoạt động | **Không còn tái hiện (Đã gỡ bỏ khỏi UI)** | Dev đã gỡ bỏ ô input thừa trên Header. |

---

## 4. Kết quả kiểm tra Video (`check-video-lag.js`) — Mục 6
- **Kênh đo**: `VTV4` (`/channels/fc3be0d7-0d57-4f0b-b7e4-d59995262336`), nguồn `LUỒNG STREAM GỐC` HLS (`1280x720`), thời gian đo `10.18s`:
  - **Verdict của script**: `status: "SMOOTH"` — *"Video phát mượt, không phát hiện giật/lag."*
  - **Số liệu trong khoảng đo (`10.18s`)**: `advancedMediaSec = 9.92s`, `playbackRatio = 0.97`, `effectiveFps = 24.4`, `decodedFrames = 248`, `droppedFrames = 2`, `dropRatePercent = 0.81%`, `waitingEvents = 0`, `stalledEvents = 0`, `freezeTicks = 0`, `minBufferedAheadSec = 12.03s`, `finalBufferedAheadSec = 13.26s`.
  - **Số liệu tích lũy**: `totalFrames: 1025 -> 1273`, `droppedFrames: 25 -> 27`.

