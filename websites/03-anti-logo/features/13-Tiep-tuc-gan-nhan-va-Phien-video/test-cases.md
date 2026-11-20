# 03-13 — Tiếp tục gán nhãn & Quản lý phiên video (`Curation Resume & Quick View`)

## Thông tin chung

- **Mã chức năng:** `03-13`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:**
  - `https://anti-logo.cmcati.vn/channel/1`
  - `https://anti-logo.cmcati.vn/channel/2`
  - `https://anti-logo.cmcati.vn/channel/3`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh tính năng thanh tiếp tục gán nhãn (`div[data-curation-resume="1"]`) và khung chọn phiên video nhanh (`section[data-curation-quick-view="1"]`) trên hệ thống **Anti-Logo**:
1. **Thanh tiến độ tiếp tục gán nhãn (`div[data-curation-resume="1"]`):**
   - Đọc checkpoint lưu trữ trên server từ endpoint `/v2/api/curation/resume?channel_id=1`.
   - Hiển thị thông báo trạng thái gồm kênh, frame checkpoint và thời gian lưu (`CH1 — Tiếp tục gán nhãn — Frame #<frame_index> — Đã lưu lúc <time>`).
   - 4 nút điều hướng: `Tiếp tục`, `Frame chỉnh sửa cuối`, `Đã review`, `Chưa review đầu tiên`.
2. **Khung chọn phiên video nhanh (`section[data-curation-quick-view="1"]`):**
   - Dropdown chọn phiên video theo kênh (`CH1 — Phiên video:`) liệt kê các thế hệ xử lý (`run_generation`, ví dụ: `gen 5 — LIVE`, `gen 4 — STOPPED`, `gen 3`, ...).
   - Kiểm tra API `/v2/api/curation/resume` trả về mã `HTTP 200` kèm thông tin `session_scope`, `checkpoint` và `annotations`.

## Tiền điều kiện

- Đã đăng nhập vào hệ thống `Anti-Logo` (`https://anti-logo.cmcati.vn/`).
- Mở kênh làm việc có dữ liệu session (ví dụ `/channel/1`).

---

## Danh sách Test Case

### TC `03-13-01` — Hiển thị thanh tiếp tục gán nhãn (`div[data-curation-resume="1"]`) và 4 nút điều hướng

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / UI Check`
- **Các bước thực hiện:**
  1. Mở trang `/channel/1`.
  2. Kiểm tra sự tồn tại của khối `div[data-curation-resume="1"]` ở đầu khu vực gán nhãn.
  3. Đọc nội dung thông báo tiến độ và kiểm tra 4 nút con: `Tiếp tục`, `Frame chỉnh sửa cuối`, `Đã review`, `Chưa review đầu tiên`.
- **Dữ liệu kiểm thử:** Trang `/channel/1` (phiên `gen 5`).
- **Kết quả mong đợi (Expected):**
  - Khối `div[data-curation-resume="1"]` hiển thị rõ ràng với nền màu đậm (`rgb(21, 50, 71)`), text thông báo chứa định dạng `CH1 — Tiếp tục gán nhãn — Frame #... — Đã lưu lúc ...`.
  - Cả 4 nút bấm điều hướng đều hiển thị đầy đủ và có gắn handler sự kiện.
- **Điểm cần chụp minh chứng:** `03-13-01-curation-resume-bar.png`

---

### TC `03-13-02` — Bấm nút `Tiếp tục` / `Frame chỉnh sửa cuối`: mở modal BBox tại checkpoint

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Navigation`
- **Các bước thực hiện:**
  1. Tại thanh `[data-curation-resume]`, nhấn nút `Tiếp tục` (hoặc `Frame chỉnh sửa cuối`).
  2. Quan sát hộp thoại review `#thumbModal` xuất hiện.
  3. Kiểm tra tiêu đề modal `#thumbModalTitle` và số hiệu frame hiển thị.
  4. Đóng modal an toàn qua nút `#thumbModalClose` (`×`).
- **Dữ liệu kiểm thử:** Checkpoint `Frame #52320`.
- **Kết quả mong đợi (Expected):**
  - Hộp thoại `#thumbModal` mở thành công (`display: flex`), tiêu đề hiển thị đúng `Frame #52320` khớp với checkpoint lưu trữ.
  - Đóng modal an toàn, giao diện trở lại bình thường.
- **Điểm cần chụp minh chứng:** `03-13-02-resume-modal-open.png`

---

### TC `03-13-03` — Bấm nút `Đã review` / `Chưa review đầu tiên`

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Workflow`
- **Các bước thực hiện:**
  1. Nhấn nút `Đã review`. Kiểm tra dòng trạng thái hiển thị danh sách các frame đã review trong phiên hoặc mở frame đã review đầu tiên.
  2. Nhấn nút `Chưa review đầu tiên`. Kiểm tra lệnh gọi điều hướng `/v2/api/curation/navigate?direction=first_unreviewed` hoặc hiển thị trạng thái `Không còn frame chưa review`.
- **Dữ liệu kiểm thử:** Phiên gán nhãn hiện tại.
- **Kết quả mong đợi (Expected):**
  - Thao tác thực thi êm thuận, không phát sinh ngoại lệ script hay lỗi mạng, trạng thái được cập nhật phản hồi người dùng.
- **Điểm cần chụp minh chứng:** `03-13-03-reviewed-navigate.png`

---

### TC `03-13-04` — Khung chọn phiên video nhanh (`section[data-curation-quick-view="1"]`) & API `/v2/api/curation/resume`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / API & Data`
- **Các bước thực hiện:**
  1. Quan sát khung `section[data-curation-quick-view="1"]` bên dưới thanh tiếp tục gán nhãn.
  2. Kiểm tra combobox `select` danh sách các phiên video (`gen 1` đến `gen 5`).
  3. Gửi request fetch đến `/v2/api/curation/resume?channel_id=1` và kiểm tra response JSON.
- **Dữ liệu kiểm thử:** Kênh 1 (`channel_id=1`).
- **Kết quả mong đợi (Expected):**
  - Combobox hiển thị đầy đủ danh sách các generation của video nguồn với trạng thái tương ứng (`LIVE`, `STOPPED`).
  - API `/v2/api/curation/resume?channel_id=1` trả về `HTTP 200`, `ok: true`, payload chứa `session_scope` chuẩn (`channel_id`, `task_id`, `run_generation`, `source_id`, `source_type`), `checkpoint` và mảng `annotations`.
- **Điểm cần chụp minh chứng:** `03-13-04-curation-quick-view-api.png`

