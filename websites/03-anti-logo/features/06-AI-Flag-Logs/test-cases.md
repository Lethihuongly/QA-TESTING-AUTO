# 03-06 — AI Flag & Logs

## Thông tin chung

- **Mã chức năng:** `03-06`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channel/1`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh bảng `Logs` hiển thị danh sách các frame đã qua xử lý AI (`Frame`, `Flag`, `Player`, `Logo`, `Chọn CI/CD`, `Control E2E`, `Mini-frame`), chức năng phân trang frame (`Older frames`, `Newer frames`, `Latest`) và bộ lọc `Show only flag=1` (`input#flag1OnlyToggle`) cùng tính nhất quán của bộ đếm `Flag=1 count`.

## Tiền điều kiện

- Đã đăng nhập và mở trang `/channel/1`.

---

## Danh sách Test Case

### TC `03-06-01` — Hiển thị bảng `Logs` và phân trang danh sách frame (`v` / `Latest`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tại trang `/channel/1`, kiểm tra bảng `table.log-table` và nhãn phân trang (`Showing 1-75 of ... frames`).
  2. Nhấn nút `v` (`button#frameLogDownBtn` — `Older frames (Page Down)`) và kiểm tra nhãn phân trang cập nhật.
  3. Nhấn nút `Latest` (`button#frameLogLatestBtn` — `Jump to latest frames`) để quay về trang đầu.
- **Dữ liệu kiểm thử:** Danh sách frame trên `/channel/1` (`Showing 1-75 of 216 frames`).
- **Kết quả mong đợi (Expected):**
  - Bảng `table.log-table` hiển thị 75 dòng mỗi trang với đầy đủ cột `Frame`, `Flag`, `Player`, `Logo`, `Chọn CI/CD`, `Control E2E`, `Mini-frame`.
  - Khi nhấn `v` (`#frameLogDownBtn`), danh sách chuyển sang `Showing 76-150 of 216 frames` và nút `Latest` được bật; khi nhấn `Latest`, danh sách quay về `Showing 1-75 of 216 frames`.
- **Điểm cần chụp minh chứng:** `03-06-01-frame-logs-pagination.png`

---

### TC `03-06-02` — Lọc danh sách frame theo `Show only flag=1` (`input#flag1OnlyToggle`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Tích chọn checkbox `Show only flag=1` (`input#flag1OnlyToggle`).
  2. Kiểm tra các dòng hiển thị trong `table.log-table` và nhãn `Showing ... frames`.
  3. Bỏ tích `input#flag1OnlyToggle` để khôi phục danh sách mặc định.
- **Dữ liệu kiểm thử:** 73 frame có `Flag = 1` trên `/channel/1` (`3521054`, `3521026`, `3521005`, ...).
- **Kết quả mong đợi (Expected):**
  - Khi bật `Show only flag=1`, bảng lọc còn `Showing 1-73 of 73 frames` và tất cả các dòng hiển thị đều có `Flag = 1` (`Player = found`, `Logo = found`).
  - Khi tắt `Show only flag=1`, bảng khôi phục toàn bộ danh sách frame.
- **Điểm cần chụp minh chứng:** `03-06-02-filter-flag1.png`

---

### TC `03-06-03` — Kiểm tra tính nhất quán giữa bộ đếm `Flag=1 count` (`#aiFlagOneCount`) và số lượng frame `Flag=1` thực tế

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Negative / Consistency`
- **Các bước thực hiện:**
  1. Quan sát chỉ số `Flag=1 count:` (`span#aiFlagOneCount`) trên thanh trạng thái `AI lane` của bảng `Logs`.
  2. Đối chiếu với số lượng frame `Flag=1` thực tế trong phiên làm việc khi bật `Show only flag=1` (`Showing 1-73 of 73 frames`).
- **Dữ liệu kiểm thử:** Phiên đang chạy trên `/channel/1` (`73` frames có `Flag=1`).
- **Kết quả mong đợi (Expected):**
  - Bộ đếm `Flag=1 count` (`#aiFlagOneCount`) phản ánh đúng số frame có `Flag=1` trong phiên hoặc khớp với dữ liệu lịch sử đã tải, không hiển thị `0` khi có `73` frame `Flag=1`.
- **Điểm cần chụp minh chứng:** `03-06-03-flag1-counter-mismatch.png`
