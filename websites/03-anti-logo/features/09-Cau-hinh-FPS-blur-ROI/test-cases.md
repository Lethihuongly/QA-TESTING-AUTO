# 03-09 — Cấu hình FPS, Độ mờ (Blur) & Protect ROI

## Thông tin chung

- **Mã chức năng:** `03-09`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channel/1`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Khảo sát các thanh trượt cấu hình `Tăng - giảm FPS` (`input#targetFps`), `Độ mờ` (`input#blurKernel`) và vùng bảo vệ tỉ số/đồng hồ `Protect ROI` (`#protectRoiEnable`, `#protectRoiX`, `#protectRoiY`, `#protectRoiW`, `#protectRoiH`, `#protectRoiShowOverlay`). Theo quy tắc an toàn lượt đầu, **không** thay đổi cấu hình trên hệ thống đang chạy (`NOT_RUN`).

## Tiền điều kiện

- Đã đăng nhập vào `https://anti-logo.cmcati.vn/channel/1`.

---

## Danh sách Test Case

### TC `03-09-01` — Thay đổi tốc độ xử lý `Tăng - giảm FPS` (`input#targetFps`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Điều chỉnh thanh trượt `input#targetFps` (giá trị hiện tại `10 FPS`, dải `0.2` – `20`).
- **Dữ liệu kiểm thử:** `input#targetFps`
- **Kết quả mong đợi (Expected):**
  - Cập nhật thông số Target FPS thành công.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không thay đổi cấu hình).
- **Điểm cần chụp minh chứng:** `03-09-01-fps-slider.png`

---

### TC `03-09-02` — Thay đổi mức `Độ mờ` (`input#blurKernel`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Điều chỉnh thanh trượt `input#blurKernel` (giá trị hiện tại `21 px`, dải `3` – `51`).
- **Dữ liệu kiểm thử:** `input#blurKernel`
- **Kết quả mong đợi (Expected):**
  - Cập nhật bán kính làm mờ thành công.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không thay đổi cấu hình).
- **Điểm cần chụp minh chứng:** `03-09-02-blur-slider.png`

---

### TC `03-09-03` — Cấu hình vùng `Protect ROI` (`#protectRoiEnable`, `X/Y/W/H`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Bật/tắt `#protectRoiEnable`, `#protectRoiShowOverlay` và điều chỉnh các thanh trượt `#protectRoiX` (`47`), `#protectRoiY` (`71`), `#protectRoiW` (`266`), `#protectRoiH` (`60`).
- **Dữ liệu kiểm thử:** Tọa độ ROI (`X=47, Y=71, W=266, H=60`).
- **Kết quả mong đợi (Expected):**
  - Cập nhật vùng không làm mờ (Protect ROI) trên khung preview frame 0.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không thay đổi cấu hình).
- **Điểm cần chụp minh chứng:** `03-09-03-protect-roi.png`
