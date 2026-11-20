# 02-05 — Phát video

## Thông tin chung

- **Mã chức năng:** `02-05`
- **Website:** `Sport Highlight` (`02`)
- **URL liên quan:** `https://sport-highlight.cmcati.vn/matches/{id}`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trình phát video HLS/MP4 trong trang chi tiết trận đấu phát được luồng video, điều khiển Play/Pause, chọn phân đoạn AI để tua đến đúng thời điểm và xử lý khi video không khả dụng.

## Tiền điều kiện

- Đã đăng nhập và mở trang chi tiết trận đấu có bản ghi sẵn sàng (`recording.status = "ready"`).

---

## Danh sách Test Case

### TC `02-05-01` — Tải và phát video trận đấu thành công

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở trang chi tiết trận `Troyes vs Le Mans` (`/matches/775f9ccd-6933-422b-9b76-5cd13a553ba1`) hoặc `Le Mans vs Toulouse` (`/matches/c26dae78-ff86-433a-9d15-173c6b062f87`).
  2. Kiểm tra trạng thái phần tử `<video>` bằng `evaluate_script` (`readyState`, `duration`, `currentTime`, `paused`, `error`, `videoWidth`, `videoHeight`).
- **Dữ liệu kiểm thử:**
  - Trận `Troyes vs Le Mans` (`duration = 10804s` ~ `03:00:04`, `1920x1080`)
  - Trận `Le Mans vs Toulouse` (`duration = 9904.64s` ~ `02:45:04`, `1920x1080`)
- **Kết quả mong đợi (Expected):**
  - Phần tử `<video>` tải thành công (`readyState = 4`, `error = null`, độ phân giải `1920x1080`).
  - Video phát bình thường (`currentTime > 0`) và hiển thị thanh thời gian thực tế (`00:00:17 / 03:00:04`).
- **Điểm cần chụp minh chứng:** `02-05-01-video-playing.png`

---

### TC `02-05-02` — Điều khiển Tạm dừng / Phát lại đoạn và chọn phân đoạn AI

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang chi tiết trận `Le Mans vs Toulouse` (`/matches/c26dae78-ff86-433a-9d15-173c6b062f87`), kiểm tra nút `Tạm dừng` / `Phát` (`button[aria-label="Tạm dừng"], button[aria-label="Phát"]`), `Phát lại đoạn` (`button[aria-label="Phát lại đoạn"]`) và `Toàn màn hình` (`button[aria-label="Toàn màn hình"]`).
  2. Chọn một phân đoạn trong `HÀNG ĐỢI AI` (ví dụ phân đoạn `#1 00:00:00 - 00:00:11`).
- **Dữ liệu kiểm thử:** Trận `Le Mans vs Toulouse` (`c26dae78-ff86-433a-9d15-173c6b062f87`).
- **Kết quả mong đợi (Expected):**
  - Các nút điều khiển trình phát (`Tạm dừng`/`Phát`, `Phát lại đoạn`, `Toàn màn hình`, thanh trượt `Vị trí phát`) hiển thị đầy đủ và phản hồi khi thao tác.
  - Khi chọn phân đoạn trong `HÀNG ĐỢI AI`, khung chi tiết sự kiện hiển thị khoảng thời gian phân đoạn (`00:00:00 -> 00:00:11`, `Thời lượng: 00:00:11`) và phát đúng đoạn được chọn.
- **Điểm cần chụp minh chứng:** `02-05-02-video-controls-segment.png`

---

### TC `02-05-03` — Trạng thái trình phát khi trận đấu không tồn tại

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative`
- **Các bước thực hiện:**
  1. Truy cập `/matches/00000000-0000-0000-0000-000000000000`.
  2. Kiểm tra trạng thái các nút điều khiển trình phát (`Phát`, `Phát lại đoạn`, `Toàn màn hình`, `Vị trí phát`).
- **Dữ liệu kiểm thử:** Match ID `00000000-0000-0000-0000-000000000000`
- **Kết quả mong đợi (Expected):**
  - Các nút điều khiển trình phát và thanh trượt `Vị trí phát` đều ở trạng thái `disabled`, không phát sinh lỗi uncaught exception khi người dùng tương tác.
- **Điểm cần chụp minh chứng:** `02-05-03-video-disabled-on-404.png`
