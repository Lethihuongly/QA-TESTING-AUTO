# Báo cáo Kiểm thử — Website 02: Sport Highlight (`2026-11-04`)

- **Run ID**: `run-104040` (đã kiểm tra bổ sung lúc `11:44:00`)
- **Ngày giờ chạy**: `2026-11-04 10:34:35` – `11:44:20 (+07:00)`
- **URL**: `https://sport-highlight.cmcati.vn/matches`
- **Công cụ**: `chrome-devtools` MCP

## 1. Thống kê Kết quả

| Trạng thái | Số lượng | Tỷ lệ |
| :--- | :---: | :---: |
| **Tổng số Test Case** | **24** | 100% |
| **PASS** | **21** | 87.5% (**100% số case đã chạy — 0 Bug tồn đọng**) |
| **FAIL** | **0** | 0% |
| **BLOCKED** | **0** | 0% |
| **NOT_RUN** | **3** | 12.5% (`02-07-01..03` — Tạo trận/ghi hình mới ngoài phạm vi chỉ đọc) |

## 2. Điểm mới so với lượt chạy ngày `2026-11-03`

1. **Đã khắc phục hoàn toàn `BUG-02-01` (`02-04-02` chuyển từ `FAIL` → `PASS`)**:
   - Tổng số trận đấu tăng từ `207` lên **`213 trận đấu`**.
   - Tất cả các trận đấu mới ghi hình ngày `04/11/2026` đều được Pipeline AI xử lý và sinh phân đoạn đầy đủ:
     - `Feyenoord vs Inter Milan` (`/matches/2eeaa036-9f3c-40c4-a6d0-736840320252`): **`148 phân đoạn`** (`Trong trận 145`, `Ngoài trận 3`, nhận diện rõ `Bàn thắng`, `Hai đội ra sân`), video `02:27:28` (`1920x1080`) phát mượt mà.
     - `Bodo/Glimt vs Lille` (`/matches/346d546c-4315-46a0-8371-ff30702d65d3`): **`102 phân đoạn`** (`Trong trận 101`, `Ngoài trận 1`), video `02:27:24` phát mượt mà.
   - Khi lọc vào hiệp chưa có phân đoạn (ví dụ bấm nút `Giờ nghỉ 0`), giao diện hiển thị đúng `"0 đoạn đang hiển thị"`, `"Hiện chưa có phân đoạn nào"`, `"Không có đề xuất trong bộ lọc hiện tại."` và tự động khóa (`disabled`) các nút `Tách`, `Gộp trước`, `Gộp sau`, `Xóa`.
2. **Làm rõ & Đóng `BUG-02-02` (`02-04-03` chuyển từ `FAIL` → `PASS`)**:
   - Trên trang `/matches`, các trận thuộc `Lịch thi đấu` (chưa diễn ra, ví dụ `U19 Borussia Dortmund vs U19 Real Betis`) đều hiển thị nút khóa **`"Chưa sẵn sàng"`**, ngăn người dùng bấm vào khi chưa có video.
   - Khi cố tình gõ tay một mã UUID không tồn tại lên thanh địa chỉ (`/matches/00000000-0000-0000-0000-000000000000`), hệ thống trả về HTTP `404` và **hiển thị rõ thông báo lỗi Toast Notification**: **`"Đã xảy ra lỗi — Match was not found."`** (`uid=58_75..58_76`), đồng thời khóa (`disabled`) toàn bộ thanh trượt và nút điều khiển trình phát video, hiển thị nút `"Back to matches"` để quay về danh sách. (Ở lượt chụp trước, do Toast tự động ẩn sau vài giây nên snapshot chụp muộn không ghi nhận được thông báo này).
