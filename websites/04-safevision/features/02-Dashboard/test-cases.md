# 04-02 — Dashboard (`Bảng Điều Khiển Tổng Quan`)

## Thông tin chung

- **Mã chức năng:** `04-02`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang `Bảng Điều Khiển Tổng Quan` (`/`) hiển thị đúng 4 thẻ chỉ số tổng hợp (`TỔNG SỐ LUỒNG LIVE`, `KÊNH TRUYỀN HÌNH`, `PHÁT HIỆN HÔM NAY`, `HỆ THỐNG AI EDGE`), khối `THỐNG KÊ PHÂN LOẠI LOGO`, khối `SỰ KIỆN PHÁT HIỆN GẦN ĐÂY` và bảng `TÌNH TRẠNG CHI TIẾT KÊNH TRUYỀN HÌNH`.

## Tiền điều kiện

- Đã đăng nhập thành công vào SafeVision.

---

## Danh sách Test Case

### TC `04-02-01` — Truy cập `Bảng Điều Khiển Tổng Quan` và hiển thị 4 thẻ chỉ số chính

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Nhấn vào logo `a[aria-label="Mở dashboard SafeVision"]` ở góc trên bên trái sidebar hoặc truy cập `https://safevision.cmcati.vn/`.
  2. Chờ API `GET /api/v1/dashboard/stats` hoàn tất và lấy snapshot.
  3. Kiểm tra tiêu đề `main h1` (`Bảng Điều Khiển Tổng Quan`) và 4 thẻ thống kê tổng quan.
- **Dữ liệu kiểm thử:** Dữ liệu từ `GET /api/v1/dashboard/stats`.
- **Kết quả mong đợi (Expected):**
  - Hiển thị tiêu đề `Bảng Điều Khiển Tổng Quan`, nút `Làm mới dữ liệu`, `Xuất báo cáo`.
  - Hiển thị đầy đủ 4 thẻ chỉ số khớp với API: `TỔNG SỐ LUỒNG LIVE` (`241`, `5 đang chạy`), `KÊNH TRUYỀN HÌNH` (`9`, `9 hoạt động phát sóng`), `PHÁT HIỆN HÔM NAY` (`0`, `Tổng tích lũy: 218697`), `HỆ THỐNG AI EDGE` (`Healthy`).
- **Điểm cần chụp minh chứng:** `04-02-01-dashboard-overview.png`

---

### TC `04-02-02` — Kiểm tra bảng `TÌNH TRẠNG CHI TIẾT KÊNH TRUYỀN HÌNH` và điều hướng `Cấu hình & Giám sát`

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Cuộn xuống bảng `TÌNH TRẠNG CHI TIẾT KÊNH TRUYỀN HÌNH` (`main table`) trên trang `/`.
  2. Kiểm tra 9 dòng kênh truyền hình (`VTV10`, `VTV8`, `VTV2`, `VTV5`, `VTV1`, `VTV7`, `VTV4`, `VTV3`, `VTV9`).
  3. Nhấn nút `Cấu hình & Giám sát` của dòng đầu tiên (`VTV10`).
- **Dữ liệu kiểm thử:** Dòng `VTV10` (`a2884000-4624-4b57-b340-7b8c0e2cb657`).
- **Kết quả mong đợi (Expected):**
  - Bảng hiển thị đủ các cột: `TÊN KÊNH`, `MÃ ĐỊNH DANH`, `TRẠNG THÁI PHÁT SÓNG`, `SỐ LƯỢNG PHÁT HIỆN`, `THỜI GIAN CẬP NHẬT`, `HÀNH ĐỘNG`.
  - Khi nhấn `Cấu hình & Giám sát`, hệ thống điều hướng sang trang chi tiết kênh tương ứng (`/channels/a2884000-4624-4b57-b340-7b8c0e2cb657`).
- **Điểm cần chụp minh chứng:** `04-02-02-dashboard-channel-table.png`

---

### TC `04-02-03` — Kiểm tra thứ tự sắp xếp và hiệu năng hiển thị khối `THỐNG KÊ PHÂN LOẠI LOGO`

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative / Performance & Data Integrity`
- **Các bước thực hiện:**
  1. Quan sát khối `THỐNG KÊ PHÂN LOẠI LOGO` trên trang `/` và đối chiếu với mảng `topLogos` từ `GET /api/v1/dashboard/stats`.
  2. Kiểm tra các mục hiển thị đầu tiên và số lượng phần tử DOM được tạo ra.
- **Dữ liệu kiểm thử:** `topLogos` từ `/api/v1/dashboard/stats` (`logo: 121919`, `VTV6: 17391`, `3soc: 16446`, ...).
- **Kết quả mong đợi (Expected):**
  - Khối `THỐNG KÊ PHÂN LOẠI LOGO` hiển thị đúng thứ tự giảm dần theo số lần phát hiện (`logo` 56%, `VTV6` 8%, `3soc` 8%, ...) và giới hạn số lượng hiển thị hợp lý, không đẩy các nhãn số rác (`"0"`, `"1"`, `"3"`, ... với `1 lần phát hiện 0%`) lên đầu hoặc render toàn bộ `6,120` mục (`48,965` DOM nodes) gây nặng trang.
- **Điểm cần chụp minh chứng:** `04-02-03-logo-stats-order.png`
