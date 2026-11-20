# 04-08 — Cấu hình (`MENU CẤU HÌNH & THIẾT LẬP`)

## Thông tin chung

- **Mã chức năng:** `04-08`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Khảo sát giao diện `MENU CẤU HÌNH & THIẾT LẬP` trên trang chi tiết kênh (`THAM SỐ CẤU HÌNH ĐẦU VÀO`, `DANH MỤC LOGO CẦN NHẬN DIỆN`, `TERMINAL LOGS`). Theo quy tắc an toàn lượt đầu, chỉ mở/đóng menu để khảo sát read-only, **không** thay đổi cấu hình, không upload/xóa logo và không bấm `Dừng lại` (`NOT_RUN`).

## Tiền điều kiện

- Đã đăng nhập và mở trang chi tiết kênh `VTV3` (`/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`).

---

## Danh sách Test Case

### TC `04-08-01` — Mở và đóng `MENU CẤU HÌNH & THIẾT LẬP` ở chế độ chỉ đọc

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang chi tiết kênh `VTV3`, nhấn nút `Mở Menu` trong khối `MENU CẤU HÌNH & THIẾT LẬP`.
  2. Lấy snapshot kiểm tra 3 phân vùng: `THAM SỐ CẤU HÌNH ĐẦU VÀO`, `DANH MỤC LOGO CẦN NHẬN DIỆN`, `TERMINAL LOGS`.
  3. Nhấn nút `Đóng Menu` để thu gọn lại mà không thay đổi bất kỳ giá trị nào.
- **Dữ liệu kiểm thử:** Kênh `VTV3` (`5d5a7da4-478e-40a3-be39-bef238c2772a`).
- **Kết quả mong đợi (Expected):**
  - Mở được đầy đủ 3 phân vùng cấu hình (`THAM SỐ CẤU HÌNH ĐẦU VÀO`, `DANH MỤC LOGO CẦN NHẬN DIỆN`, `TERMINAL LOGS`) và đóng lại bình thường.
- **Điểm cần chụp minh chứng:** `04-08-01-config-menu-readonly.png`

---

### TC `04-08-02` — Thay đổi tham số cấu hình đầu vào (`SAMPLE FPS`, `TIMEOUT VLM`, `DELAY BUFFER`, `AI MODEL ENGINE`, `HÀNH ĐỘNG TRÊN LOGO`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Điều chỉnh các tham số `SAMPLE FPS`, `TIMEOUT VLM`, `DELAY BUFFER`, `AI MODEL ENGINE` (`safevl-30b`/`safevl-35b`), `HÀNH ĐỘNG TRÊN LOGO` (`Làm mờ (blur)`/`Chèn video quảng cáo`).
- **Dữ liệu kiểm thử:** Tham số cấu hình kênh (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Lưu và áp dụng cấu hình thành công.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không thay đổi cấu hình).
- **Điểm cần chụp minh chứng:** `04-08-02-update-config.png`

---

### TC `04-08-03` — Thêm/xóa danh mục logo, upload video quảng cáo hoặc Dừng/Chạy lại kênh

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Sử dụng các nút `Thêm danh mục`, `Thêm logo`, `Xóa logo`, `Upload` video quảng cáo hoặc nút `Dừng lại`.
- **Dữ liệu kiểm thử:** File logo/video thử nghiệm (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Thực hiện thao tác thành công trên kênh thử nghiệm.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không upload, xóa, Start/Stop hoặc tác động kênh LIVE).
- **Điểm cần chụp minh chứng:** `04-08-03-manage-logos-stream.png`
