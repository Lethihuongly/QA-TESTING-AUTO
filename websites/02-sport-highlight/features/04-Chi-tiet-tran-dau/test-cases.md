# 02-04 — Chi tiết trận đấu

## Thông tin chung

- **Mã chức năng:** `02-04`
- **Website:** `Sport Highlight` (`02`)
- **URL liên quan:** `https://sport-highlight.cmcati.vn/matches/{id}`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh trang chi tiết trận đấu hiển thị đầy đủ thông tin trận đấu, bộ lọc phân đoạn, danh sách đề xuất AI (`HÀNG ĐỢI AI`), timeline phân đoạn và xử lý khi truy cập ID không tồn tại.

## Tiền điều kiện

- Đã đăng nhập thành công vào Sport Highlight.

---

## Danh sách Test Case

### TC `02-04-01` — Hiển thị trang chi tiết trận đấu đã xử lý xong AI (`processing_run = completed`)

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Mở trang chi tiết trận `Le Mans vs Toulouse` tại `https://sport-highlight.cmcati.vn/matches/c26dae78-ff86-433a-9d15-173c6b062f87`.
  2. Lấy snapshot và kiểm tra các thành phần: nút `Back to matches`, tên trận đấu, giải đấu (`Hạng Nhất Pháp Ligue 1 26/27`), các bộ lọc phân đoạn (`Trong trận`, `Ngoài trận`, `Mức 0..3`, `Trước trận`, `Hiệp 1`, `Giờ nghỉ`, `Hiệp 2`, `Sau trận`) và cột `HÀNG ĐỢI AI`.
- **Dữ liệu kiểm thử:** Match ID `c26dae78-ff86-433a-9d15-173c6b062f87` (`Le Mans vs Toulouse`, `811` phân đoạn).
- **Kết quả mong đợi (Expected):**
  - API `GET /api/matches/c26dae78-ff86-433a-9d15-173c6b062f87` và `/segments` trả HTTP `200`.
  - Hiển thị đầy đủ bộ lọc phân đoạn (`Tất cả 811`, `Trong trận 555`, `Ngoài trận 256`, `Hiệp 1 260`, `Hiệp 2 296`, ...), timeline phân đoạn và danh sách đề xuất trong `HÀNG ĐỢI AI` (`Hiện 1-50 / 811`).
- **Điểm cần chụp minh chứng:** `02-04-01-match-detail-completed.png`

---

### TC `02-04-02` — Kiểm tra trạng thái xử lý AI trên các trận đấu mới (`pending` / `failed`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Integration`
- **Các bước thực hiện:**
  1. Kiểm tra chi tiết trận `Troyes vs Le Mans` (`id=775f9ccd-6933-422b-9b76-5cd13a553ba1`) và đối chiếu dữ liệu `processing_run` của các trận mới nhất từ `GET /api/matches`.
  2. Quan sát khu vực phân đoạn và `HÀNG ĐỢI AI`.
- **Dữ liệu kiểm thử:**
  - Trận `sev vs ray` (`id=37315ce4-6a25-4ce4-985c-066e228c6f41`)
  - Trận `Troyes vs Le Mans` (`id=775f9ccd-6933-422b-9b76-5cd13a553ba1`)
- **Kết quả mong đợi (Expected):**
  - Các trận đã kết thúc ghi hình (`recording.status = "ready"`) hoàn tất xử lý AI hoặc hiển thị rõ trạng thái/lỗi xử lý AI trên giao diện thay vì chỉ báo `"Hiện chưa có phân đoạn nào"` không rõ nguyên nhân khi worker AI bị lỗi `AI_HEARTBEAT_TIMEOUT` hoặc kẹt `pending`.
- **Điểm cần chụp minh chứng:** `02-04-02-match-ai-processing-status.png`

---

### TC `02-04-03` — Truy cập URL chi tiết trận đấu với ID không tồn tại

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative`
- **Các bước thực hiện:**
  1. Mở trực tiếp URL `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000`.
  2. Lấy snapshot và kiểm tra thông báo lỗi cũng như trạng thái loading trên trang.
- **Dữ liệu kiểm thử:** Match ID `00000000-0000-0000-0000-000000000000`
- **Kết quả mong đợi (Expected):**
  - API trả `404 Not Found` (`"Match was not found."`), giao diện hiển thị thông báo lỗi và thoát khỏi trạng thái `"Đang tải..."` / `"Đang tải video..."`.
- **Điểm cần chụp minh chứng:** `02-04-03-invalid-match-id.png`
