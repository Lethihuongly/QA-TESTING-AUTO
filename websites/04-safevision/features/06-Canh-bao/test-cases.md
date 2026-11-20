# 04-06 — Cảnh báo & Danh sách phát hiện (`Danh sách các phát hiện`)

## Thông tin chung

- **Mã chức năng:** `04-06`
- **Website:** `SafeVision` (`04`)
- **URL liên quan:** `https://safevision.cmcati.vn/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh bảng `Danh sách các phát hiện` trong trang chi tiết kênh hiển thị lịch sử phát hiện logo (`PHIÊN`, `THỜI ĐIỂM PHÁT HIỆN`, `TÊN LOGO`, `THỜI ĐIỂM TRONG LUỒNG STREAM`, `HÌNH ẢNH`), mở được hộp thoại `XEM CHI TIẾT ẢNH SNAPSHOT` khi nhấn vào ảnh thu nhỏ và phân trang danh sách bản ghi.

## Tiền điều kiện

- Đã đăng nhập và mở trang chi tiết kênh `VTV3` (`/channels/5d5a7da4-478e-40a3-be39-bef238c2772a`).

---

## Danh sách Test Case

### TC `04-06-01` — Hiển thị bảng `Danh sách các phát hiện` của kênh

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang chi tiết kênh `VTV3`, cuộn xuống bảng `Danh sách các phát hiện` (`main table`).
  2. Kiểm tra tổng số bản ghi (`13459 bản ghi`), các cột `PHIÊN`, `THỜI ĐIỂM PHÁT HIỆN`, `TÊN LOGO`, `THỜI ĐIỂM TRONG LUỒNG STREAM`, `HÌNH ẢNH` và 10 dòng dữ liệu trên trang 1.
- **Dữ liệu kiểm thử:** Kênh `VTV3` (`GET /api/v1/detections/channel/5d5a7da4-478e-40a3-be39-bef238c2772a/with-snapshots?page=0&size=10&sort=createdAt,desc`).
- **Kết quả mong đợi (Expected):**
  - Hiển thị đầy đủ 10 bản ghi trên trang 1 (ví dụ phiên `4a86b3f4-3a89-48fa-b696-859a97b11536`, nhãn `3que`, `nippon-express`, `hyundai`) cùng ảnh snapshot thu nhỏ.
- **Điểm cần chụp minh chứng:** `04-06-01-detections-table.png`

---

### TC `04-06-02` — Mở hộp thoại `XEM CHI TIẾT ẢNH SNAPSHOT` từ bảng phát hiện

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Trong bảng `Danh sách các phát hiện`, nhấn vào nút ảnh thu nhỏ (`button[title="Xem ảnh lớn"]`) ở dòng đầu tiên (`3que`).
  2. Lấy snapshot kiểm tra hộp thoại `XEM CHI TIẾT ẢNH SNAPSHOT` và ảnh `img[alt="Detection Snapshot Detail"]`.
  3. Đóng hộp thoại xem ảnh.
- **Dữ liệu kiểm thử:** Dòng phát hiện đầu tiên trên `VTV3` (`3que`, `11:37:04 30/10/2026`).
- **Kết quả mong đợi (Expected):**
  - Mở hộp thoại `XEM CHI TIẾT ẢNH SNAPSHOT`, hiển thị rõ ảnh `img[alt="Detection Snapshot Detail"]` và đóng lại bình thường.
- **Điểm cần chụp minh chứng:** `04-06-02-snapshot-detail-modal.png`

---

### TC `04-06-03` — Phân trang bảng `Danh sách các phát hiện` (`Trang sau` / `Trang trước`)

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Ở `Trang 1 / 1346`, kiểm tra nút `Trang trước` (`button[title="Trang trước"]`) đang `disabled`.
  2. Nhấn nút `Trang sau` (`button[title="Trang sau"]`).
  3. Kiểm tra chỉ số trang và các dòng bản ghi mới tải.
- **Dữ liệu kiểm thử:** Chuyển từ trang 1 sang trang 2 trên kênh `VTV3`.
- **Kết quả mong đợi (Expected):**
  - Chỉ số trang cập nhật thành `Trang 2 / 1346`, nút `Trang trước` được bật và bảng hiển thị 10 bản ghi của trang 2 (`samsung`, `3que`, ...).
- **Điểm cần chụp minh chứng:** `04-06-03-detections-pagination.png`
