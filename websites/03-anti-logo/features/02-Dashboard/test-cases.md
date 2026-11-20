# 03-02 — Dashboard (Bàn điều khiển chính)

## Thông tin chung

- **Mã chức năng:** `03-02`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang chủ bàn điều khiển (`https://anti-logo.cmcati.vn/`) hiển thị đầy đủ thanh điều hướng kênh, bảng điều khiển nguồn phát/logo/cấu hình bên trái, khung preview stream và bảng `Logs` bên phải, cũng như thông báo khóa an toàn khi có luồng LIVE đang chạy.

## Tiền điều kiện

- Đã đăng nhập thành công vào `https://anti-logo.cmcati.vn/`.

---

## Danh sách Test Case

### TC `03-02-01` — Hiển thị bố cục tổng thể bàn điều khiển `VTV PCD`

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Truy cập `https://anti-logo.cmcati.vn/`.
  2. Lấy snapshot và kiểm tra các vùng giao diện: thanh header (`VTV PCD`, `Kênh 1`, `Kênh 2`, `Kênh 3`, `📺 Multi-Channel (3 SDI)`, `button#userMenuBtn`), cột trái (`Videos`, `Live SDI inputs`, `Target Logos`, `Tăng - giảm FPS`, `Độ mờ`, `Protect ROI`), cột phải (`Video Stream đa luồng` và `Logs`).
- **Dữ liệu kiểm thử:** URL `https://anti-logo.cmcati.vn/`
- **Kết quả mong đợi (Expected):**
  - Toàn bộ các khối giao diện hiển thị đầy đủ, không bị vỡ bố cục hoặc lỗi runtime JS.
- **Điểm cần chụp minh chứng:** `03-02-01-dashboard-layout.png`

---

### TC `03-02-02` — Hiển thị trạng thái khóa nguồn phát khi kênh đang chạy luồng LIVE

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Quan sát thông báo trạng thái phía trên cột trái khi kênh đang phát luồng SDI trực tiếp (`virtual-sdi-BONGDA_HD`).
  2. Kiểm tra thuộc tính `disabled` của danh sách `#defaultVideos` và nút upload `#videoUpload`.
- **Dữ liệu kiểm thử:** Kênh 1 đang chạy `virtual-sdi-BONGDA_HD [Active]`.
- **Kết quả mong đợi (Expected):**
  - Hiển thị cảnh báo: `"🔒 An active stream is currently running. Other Video and SDI selections are locked — select 🟢 Live SDI Stream [Active] below to watch live, or click "Stop current stream" to stop it."`
  - Phần tử `select#defaultVideos` (33 video mẫu) và `input#videoUpload` đều ở trạng thái `disabled=true` để bảo vệ luồng LIVE.
- **Điểm cần chụp minh chứng:** `03-02-02-active-stream-lock.png`

---

### TC `03-02-03` — Kiểm tra danh sách 106 nhãn `YOLO banner classes` và ô tìm kiếm nhãn

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Quan sát khu vực `Target Logos (click to toggle)` / `YOLO banner classes` trên cột trái (chỉ đọc, không bấm thay đổi checkbox của kênh LIVE).
  2. Kiểm tra ô tìm kiếm `input#yoloClassSearch` (`placeholder="Search classes"`), bộ đếm `"106 / 106 enabled"` và các checkbox `input[id^="yolo-banner-class-"]`.
- **Dữ liệu kiểm thử:** Danh sách 106 class (`0: 188bet` .. `105: corner_flag`).
- **Kết quả mong đợi (Expected):**
  - Hiển thị ô tìm kiếm `input#yoloClassSearch`, hai nút `#yoloClassSelectAll` / `#yoloClassClearAll`, bộ đếm `"106 / 106 enabled"` và 106 checkbox nhãn.
- **Điểm cần chụp minh chứng:** `03-02-03-yolo-classes-list.png`
