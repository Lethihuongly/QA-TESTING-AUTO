# 03-05 — Multi-channel (`VTV PCD Command Center`)

## Thông tin chung

- **Mã chức năng:** `03-05`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channels`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh màn hình giám sát đa kênh `VTV PCD Command Center` (`/channels`) hiển thị đồng thời cả 3 kênh SDI (`Channel 01`, `Channel 02`, `Channel 03`), phát 3 luồng video LIVE cùng lúc và cung cấp thanh điều hướng nhanh về từng kênh.

## Tiền điều kiện

- Đã đăng nhập vào hệ thống Anti-Logo.

---

## Danh sách Test Case

### TC `03-05-01` — Truy cập và hiển thị giao diện `VTV PCD Command Center` (`/channels`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Từ thanh điều hướng, nhấn vào `📺 Multi-Channel (3 SDI)` (`a[href="/channels"]`) hoặc mở trực tiếp `https://anti-logo.cmcati.vn/channels`.
  2. Lấy snapshot và kiểm tra tiêu đề `h1` (`VTV PCD Command Center`), phụ đề `Multi-channel operator view` và 3 khung kênh.
- **Dữ liệu kiểm thử:** URL `https://anti-logo.cmcati.vn/channels`
- **Kết quả mong đợi (Expected):**
  - Hiển thị trang `VTV PCD Command Center` với đầy đủ 3 khung kênh:
    - `Channel 01`: `virtual-sdi-BONGDA_HD [LIVE]`
    - `Channel 02`: `virtual-sdi-THETHAO_TINTUC_HD [LIVE]`
    - `Channel 03`: `virtual-sdi-HAY_TV [LIVE]`
- **Điểm cần chụp minh chứng:** `03-05-01-multi-channel-view.png`

---

### TC `03-05-02` — Phát đồng thời 3 luồng video `1920x1080` trên màn hình Multi-Channel

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang `/channels`, dùng `evaluate_script` kiểm tra cả 3 phần tử `<video>` (`readyState`, `currentTime`, `paused`, `videoWidth`, `videoHeight`, `error`).
- **Dữ liệu kiểm thử:** 3 luồng video trên `/channels`.
- **Kết quả mong đợi (Expected):**
  - Cả 3 phần tử `<video>` đều có `readyState = 4`, `paused = false`, `videoWidth = 1920`, `videoHeight = 1080`, `error = null` và `currentTime > 0`.
- **Điểm cần chụp minh chứng:** `03-05-02-three-streams-playing.png`

---

### TC `03-05-03` — Kiểm tra các nút công cụ và điều hướng trên header Multi-Channel

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Kiểm tra các nút trên thanh `banner` của `/channels`: `button#ccChangedFramesBtn` (`Changed frames (0)`), `button#ccExportZipBtn` (`Export as Zip (0)`), `a[href="/"]` (`Home PCD`), `a[href="/channel/1"]`, `a[href="/channel/2"]`, `a[href="/channel/3"]` và `button#userMenuBtnCC`.
- **Dữ liệu kiểm thử:** Header của trang `/channels`.
- **Kết quả mong đợi (Expected):**
  - Tất cả các nút công cụ và liên kết chuyển kênh hiển thị đúng, cho phép điều hướng mượt về từng kênh đơn lẻ.
- **Điểm cần chụp minh chứng:** `03-05-03-multi-channel-header.png`
