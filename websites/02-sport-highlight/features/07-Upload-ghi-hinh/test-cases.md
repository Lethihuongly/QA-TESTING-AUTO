# 02-07 — Upload / Ghi hình trận đấu

## Thông tin chung

- **Mã chức năng:** `02-07`
- **Website:** `Sport Highlight` (`02`)
- **URL liên quan:** `https://sport-highlight.cmcati.vn/matches`
- **Ưu tiên:** `P2`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh giao diện hộp thoại `Tạo trận đấu` (`Đăng ký nguồn ghi hình theo lịch để phân tích.`) khi nhấn nút `Trận mới` trên trang `/matches`. Theo quy tắc an toàn lượt đầu, **không** thực thi tạo trận mới, ghi hình hoặc thay đổi kênh phát (`NOT_RUN`).

## Tiền điều kiện

- Đã đăng nhập vào `https://sport-highlight.cmcati.vn/matches`.

---

## Danh sách Test Case

### TC `02-07-01` — Tạo trận đấu và đăng ký lịch ghi hình mới

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang `/matches`, nhấn nút `Trận mới` để mở `dialog "Tạo trận đấu"`.
  2. Điền `Đội A` (`input[name="team_a"]`), `Đội B` (`input[name="team_b"]`), chọn `Kênh phát`, `Giải đấu`, `Giờ bắt đầu`, `Giờ kết thúc`.
  3. Nhấn nút `Tạo trận đấu`.
- **Dữ liệu kiểm thử:** Trận đấu thử nghiệm (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Tạo trận đấu mới và lên lịch ghi hình thành công.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không chạy ghi hình / tạo trận mới).
- **Điểm cần chụp minh chứng:** `02-07-01-create-match.png`

---

### TC `02-07-02` — Kiểm tra ràng buộc dữ liệu khi tạo trận đấu ghi hình

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative`
- **Các bước thực hiện:**
  1. Mở `dialog "Tạo trận đấu"`.
  2. Thử gửi form với thông tin thiếu hoặc giờ kết thúc nhỏ hơn giờ bắt đầu.
- **Dữ liệu kiểm thử:** Dữ liệu không hợp lệ (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Hệ thống chặn gửi form và báo lỗi hợp lệ.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu`.
- **Điểm cần chụp minh chứng:** `02-07-02-create-match-validation.png`

---

### TC `02-07-03` — Tạo kênh phát mới từ hộp thoại Tạo trận đấu

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Trong `dialog "Tạo trận đấu"`, nhấn nút `Tạo kênh phát mới`.
  2. Nhập thông tin kênh phát và lưu.
- **Dữ liệu kiểm thử:** Kênh phát thử nghiệm (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Kênh phát mới được thêm vào danh sách chọn.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu`.
- **Điểm cần chụp minh chứng:** `02-07-03-create-channel.png`
