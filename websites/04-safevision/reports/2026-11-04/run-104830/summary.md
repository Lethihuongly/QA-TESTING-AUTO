# Báo cáo Kiểm thử — Website 04: SafeVision (`2026-11-04`)

- **Run ID**: `run-104830` (đã kiểm tra bổ sung & đo độ mượt video lúc `11:45:00`)
- **Ngày giờ chạy**: `2026-11-04 10:43:20` – `11:45:20 (+07:00)`
- **URL**: `https://safevision.cmcati.vn/`
- **Công cụ**: `chrome-devtools` MCP

## 1. Thống kê Kết quả

| Trạng thái | Số lượng | Tỷ lệ |
| :--- | :---: | :---: |
| **Tổng số Test Case** | **27** | 100% |
| **PASS** | **23** | 85.2% (**95.8% số case đã chạy**) |
| **FAIL** | **1** | 3.7% (`04-02-03` — Thứ tự sắp xếp bảng `THỐNG KÊ PHÂN LOẠI LOGO`) |
| **BLOCKED** | **0** | 0% |
| **NOT_RUN** | **3** | 11.1% (`04-03-03`, `04-08-02`, `04-08-03` — Thêm kênh / đổi cấu hình ngoài phạm vi chỉ đọc) |

## 2. Điểm mới so với lượt chạy ngày `2026-11-03`

1. **Đã khắc phục hoàn toàn `BUG-04-03` (`04-07-03` chuyển từ `FAIL` → `PASS`)**:
   - Đã gỡ bỏ ô tìm kiếm toàn cục không có chức năng (`Tìm kiếm kênh, logo, kết quả... ⌘K`) khỏi thanh Header; việc tìm kiếm kênh được thực hiện trực tiếp tại `/channels`.
2. **Đã khắc phục `BUG-04-02` (`04-05-03` chuyển từ `FAIL` → `PASS`) & Kết quả đo độ mượt video (`check-video-lag.js`)**:
   - Kênh đang chạy (`a2884000-4624-4b57-b340-7b8c0e2cb657` — **`VTV6 - Kênh thể thao`**, trạng thái `RUNNING`) phát mượt đồng thời cả **2 luồng video** (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`) ở độ phân giải `1280x720`, không còn lỗi CORS hay HTTP `503`.
   - Dữ liệu sự kiện phát hiện được đồng bộ định kỳ qua API `/api/v1/detections/stream/ca4897aa-87a0-47df-be29-66449bfebfb6` (`HTTP 200 OK`).
   - **Kết quả đo định lượng giật/lag (`check-video-lag.js`)**:
     - **`LUỒNG STREAM GỐC`**: `verdict = "SMOOTH"` (Mượt) | `playbackRatio = 1.0` | `effectiveFps = 25.1 fps` | `decodedFrames = 151` | `droppedFrames = 0 (0%)` | `waitingEvents = 0` | `freezeTicks = 0` | `minBufferAhead = 5.85s` (`avg = 6.82s`).
     - **`LUỒNG DELAYED — ĐANG GIÁM SÁT`**: `verdict = "SMOOTH"` (Mượt) | `playbackRatio = 1.0` | `effectiveFps = 25.1 fps` | `decodedFrames = 151` | `droppedFrames = 0 (0%)` | `waitingEvents = 0` | `freezeTicks = 0` | `minBufferAhead = 2.43s` (`avg = 3.25s`).
3. **Vấn đề hiển thị còn tồn đọng (`BUG-04-01` — Mức độ `Low/Medium` — `04-02-03`)**:
   - Khối `THỐNG KÊ PHÂN LOẠI LOGO` tại trang tổng quan `/` gom `topLogos` vào Object JavaScript nên các nhãn tên là số nguyên (`"0"`, `"1"`, `"3"`, ...) tự động xếp lên đầu danh sách trước các nhãn chữ (`"chatgpt"`, `"kk"`, `"logo"`).
