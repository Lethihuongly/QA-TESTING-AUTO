# 03-07 — BBox & Nhãn (`#thumbModal`)

## Thông tin chung

- **Mã chức năng:** `03-07`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channel/1`
- **Ưu tiên:** `P1`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh chức năng mở hộp thoại xem chi tiết frame / BBox (`#thumbModal`), đối chiếu tiêu đề trạng thái `FLAG` trên modal với bảng `Logs` và khảo sát các nút công cụ chỉnh sửa BBox/nhãn. Theo quy tắc an toàn lượt đầu, **không** thực thi chỉnh sửa BBox/nhãn hay lưu thay đổi (`NOT_RUN` cho thao tác ghi).

## Tiền điều kiện

- Đã đăng nhập và mở trang `/channel/1`.

---

## Danh sách Test Case

### TC `03-07-01` — Mở hộp thoại xem chi tiết Frame & BBox (`#thumbModal`) ở chế độ chỉ đọc

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Trong bảng `table.log-table`, nhấn vào ảnh thumbnail (`Mini-frame`) của một dòng để mở hộp thoại `#thumbModal`.
  2. Kiểm tra sự hiện diện của các nút điều khiển trong modal: `#thumbPrevBtn` (`◀ Prev`), `#thumbNextBtn` (`Next ▶`), `#thumbModeBlurBtn` (`Blur Normal`), `#thumbModeBboxBtn` (`BBox (Class + Conf / Sửa nhãn)`), `#thumbModeVlmBtn` (`🤖 Auto VLM + SAM BBox`), `#thumbModalClose` (`×`).
  3. Nhấn nút `#thumbModalClose` (`×`) để đóng modal mà không chỉnh sửa dữ liệu.
- **Dữ liệu kiểm thử:** Frame `#3526175` trên `/channel/1`.
- **Kết quả mong đợi (Expected):**
  - Hộp thoại `#thumbModal` mở thành công, hiển thị đầy đủ thanh công cụ xem frame/BBox và đóng lại bình thường khi nhấn `#thumbModalClose`.
- **Điểm cần chụp minh chứng:** `03-07-01-thumb-modal-open.png`

---

### TC `03-07-02` — Kiểm tra tính chính xác của nhãn `FLAG 0` / `FLAG 1` trên tiêu đề hộp thoại `#thumbModalTitle`

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Consistency`
- **Các bước thực hiện:**
  1. Chọn một dòng trong `table.log-table` có cột `Flag = 0` (`row.dataset.flag = "0"`, `Player = found`, `Logo = none`, ví dụ Frame `#3526175`).
  2. Mở `#thumbModal` của frame đó và kiểm tra nội dung tiêu đề `#thumbModalTitle`.
- **Dữ liệu kiểm thử:** Frame `#3526175` (`Flag = 0`, `Player = found`, `Logo = none`).
- **Kết quả mong đợi (Expected):**
  - Tiêu đề `#thumbModalTitle` phải hiển thị đúng `Frame #3526175 — FLAG 0 (Player: found, Logo: none)` khớp với giá trị `Flag = 0` trong bảng `Logs`.
- **Điểm cần chụp minh chứng:** `03-07-02-thumb-modal-flag-title.png`

---

### TC `03-07-03` — Vẽ Box mới, đổi nhãn Box, xóa Box và lưu BBox (`#bboxSaveBtn`)

- **Mức ưu tiên:** `P2`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Mở chế độ `BBox (Class + Conf / Sửa nhãn)` (`#thumbModeBboxBtn`).
  2. Sử dụng các nút `#bboxDrawModeBtn`, `#bboxApplyClassBtn`, `#bboxDeleteBoxBtn`, `#bboxVlmInferBtn` và `#bboxSaveBtn`.
- **Dữ liệu kiểm thử:** Frame mẫu (không chạy ở lượt đầu).
- **Kết quả mong đợi (Expected):**
  - Cho phép vẽ/đổi nhãn/xóa và lưu BBox thành công.
- **Ghi chú phạm vi:** `NOT_RUN — ngoài phạm vi lượt đầu` (không chạy chỉnh BBox/nhãn).
- **Điểm cần chụp minh chứng:** `03-07-03-edit-bbox.png`
