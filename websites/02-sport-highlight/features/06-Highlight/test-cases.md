# 02-06 — Highlight

## Thông tin chung

- **Mã chức năng:** `02-06`
- **Website:** `Sport Highlight` (`02`)
- **URL liên quan:** `https://sport-highlight.cmcati.vn/matches/{id}`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh chức năng xem danh sách Highlight đã xuất (`dialog "Danh sách Highlight"`), kiểm tra thông tin bản xuất (thời lượng, ngưỡng điểm, tiến độ, link YouTube, nút tải về) và trạng thái khi trận đấu chưa có highlight được export. Không thực hiện tạo/xuất highlight mới trong lượt khảo sát đầu.

## Tiền điều kiện

- Đã đăng nhập và truy cập trang chi tiết trận đấu.

---

## Danh sách Test Case

### TC `02-06-01` — Mở hộp thoại Danh sách Highlight của trận đấu đã có bản xuất

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Mở trang chi tiết trận `Benfica vs Celtic` tại `https://sport-highlight.cmcati.vn/matches/35304664-801d-41a0-9d8f-2f301329e066`.
  2. Nhấn nút `Highlight` trên thanh công cụ phía trên bên phải.
  3. Lấy snapshot và kiểm tra bảng dữ liệu trong `dialog "Danh sách Highlight"`.
- **Dữ liệu kiểm thử:** Trận `Benfica vs Celtic` (`id=35304664-801d-41a0-9d8f-2f301329e066`).
- **Kết quả mong đợi (Expected):**
  - Mở `dialog "Danh sách Highlight"` (`Theo dõi tiến độ xuất và tải về highlight hoàn tất.`).
  - Hiển thị bảng `[role="dialog"] table` với các cột: `#`, `Highlight`, `Thời lượng`, `Ngưỡng điểm`, `Tiến độ`, `Chi tiết`, `Hành động`.
  - Hiển thị 2 bản xuất hoàn tất (`9df2e355` và `9f0181fa`, thời lượng `00:35:51`, `Mức 3`, tiến độ `100%`, `Hoàn tất.`).
- **Điểm cần chụp minh chứng:** `02-06-01-highlight-dialog-list.png`

---

### TC `02-06-02` — Kiểm tra liên kết YouTube và nút Tải highlight trong Danh sách Highlight

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Trong `dialog "Danh sách Highlight"` của trận `Benfica vs Celtic` (`35304664-801d-41a0-9d8f-2f301329e066`), kiểm tra các phần tử trong cột `Hành động`.
  2. Kiểm tra link `YouTube` (`[role="dialog"] table a[href*="youtube.com/watch"]`) và nút `Tải highlight` (`[role="dialog"] table button[aria-label="Tải highlight"]`).
- **Dữ liệu kiểm thử:** Bản xuất `9df2e355` (`https://www.youtube.com/watch?v=GId1iQIqHC8`) và `9f0181fa` (`https://www.youtube.com/watch?v=jYK60p629fc`).
- **Kết quả mong đợi (Expected):**
  - Mỗi dòng highlight hoàn tất có link mở YouTube hợp lệ và nút `Tải highlight` đang bật.
- **Điểm cần chụp minh chứng:** `02-06-02-highlight-actions.png`

---

### TC `02-06-03` — Trạng thái hộp thoại Danh sách Highlight khi trận chưa có bản xuất (và không chạy Tạo Highlight mới)

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative / Boundary`
- **Các bước thực hiện:**
  1. Mở trang chi tiết trận `Le Mans vs Toulouse` (`/matches/c26dae78-ff86-433a-9d15-173c6b062f87`).
  2. Nhấn nút `Highlight` để mở `dialog "Danh sách Highlight"`.
  3. Quan sát thông báo hiển thị khi chưa có bản export (không nhấn nút `Xuất Highlight` để tránh tạo job mới theo quy tắc lượt đầu).
- **Dữ liệu kiểm thử:** Trận `Le Mans vs Toulouse` (`id=c26dae78-ff86-433a-9d15-173c6b062f87`).
- **Kết quả mong đợi (Expected):**
  - Hộp thoại `Danh sách Highlight` hiển thị thông báo rõ ràng: `"Trận này chưa có highlight được export."` cùng nút `Làm mới` và `Đóng`.
- **Điểm cần chụp minh chứng:** `02-06-03-highlight-empty.png`
