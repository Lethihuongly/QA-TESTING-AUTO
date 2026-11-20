# Báo cáo Kiểm thử — Website 03: Anti-Logo (`2026-11-04`)

- **Run ID**: `run-104320` (đã kiểm tra bổ sung lúc `11:45:00`)
- **Ngày giờ chạy**: `2026-11-04 10:40:40` – `11:45:00 (+07:00)`
- **URL**: `https://anti-logo.cmcati.vn/`
- **Công cụ**: `chrome-devtools` MCP

## 1. Thống kê Kết quả

| Trạng thái | Số lượng | Tỷ lệ |
| :--- | :---: | :---: |
| **Tổng số Test Case** | **33** | 100% |
| **PASS** | **23** | 69.7% (**100% số case đã chạy — 0 Bug tồn đọng**) |
| **FAIL** | **0** | 0% |
| **BLOCKED** | **0** | 0% |
| **NOT_RUN** | **10** | 30.3% (Các tác vụ Start/Stop, sửa BBox, đổi cấu hình, upload ngoài phạm vi chỉ đọc) |

## 2. Điểm mới so với lượt chạy ngày `2026-11-03`

1. **Đã khắc phục hoàn toàn `BUG-03-01` (`03-07-02` chuyển từ `FAIL` → `PASS`)**:
   - Khi bấm mở modal phóng to ảnh (`#thumbModal`) của dòng có `Flag = 0` (`Frame #71520`), tiêu đề `#thumbModalTitle` đã hiển thị chính xác **`"Frame #71520 — FLAG 0 (Player: found, Logo: none)"`** thay vì bị hiển thị nhầm thành `"FLAG 1"` như ngày `2026-11-03`.
2. **Làm rõ & Đóng `BUG-03-02` (`03-06-03` — `CLOSED / NOT A BUG`)**:
   - Qua kiểm tra mã nguồn hàm `updateAiLaneStatus(data)` và `appendFrameStatusRow(data)` trên `/channel/1`, cụm chỉ số `AI lane` (`Semantic samples`, `Latest semantic frame`, `Latest semantic age`, `Flag=1 count`) là bộ đếm thời gian thực chỉ tính các frame mới đẩy về qua luồng live kể từ thời điểm mở tab trình duyệt; trong khi bảng bên dưới (`Showing 1-75 of 191 frames`) truy vấn toàn bộ lịch sử phiên từ Database (`/v2/api/frame_logs`). Do đó khi kênh đang ở trạng thái `IDLE` hoặc các mẫu live mới nhận đều có `Flag = 0`, giá trị `Flag=1 count: 0` trên thanh `AI lane` là đúng thiết kế.
