# 03-14 — Công cụ gán nhãn nâng cao: OBB, MobileSAM, Auto VLM & Export (`Advanced Annotation Tools`)

## Thông tin chung

- **Mã chức năng:** `03-14`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:**
  - `https://anti-logo.cmcati.vn/channel/1`
  - `https://anti-logo.cmcati.vn/channel/2`
  - `https://anti-logo.cmcati.vn/channel/3`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh toàn bộ các công cụ gán nhãn nâng cao vừa được cập nhật trên **Anti-Logo**:
1. **Chế độ xem mở rộng Large Review (`#singleLargeReviewToggle`):**
   - Chuyển đổi giữa chế độ `compact` và `large` (`document.body.dataset.pcdReview`).
   - Phóng to thumbnail trong bảng Frame Logs và mở rộng không gian quan sát.
2. **Bộ công cụ hộp bao xoay góc Oriented Bounding Box (OBB):**
   - Các nút xoay góc: `#bboxRotateLeft` (−5°), `#bboxRotateRight` (+5°), `#bboxAngleReset` (0°).
   - Nút chuyển đổi định dạng: `#bboxConvertObb` (HBB → OBB).
   - Chế độ xoay trực tiếp: `#bboxRotateMode` (Rotate [R]) và trường nhập góc xoay `#bboxAngleInput`.
   - Lưu trữ tọa độ đa giác xoay `obb_pts` (4 đỉnh) và `n_obb_pts` (chuẩn hóa).
3. **Phân đoạn click MobileSAM & 1-Click Auto VLM Infer:**
   - Nút `🤖 Auto VLM + SAM BBox` (`#thumbModeVlmBtn`) và `🤖 Auto VLM + SAM` (`#bboxVlmInferBtn`) kết nối API `/v2/api/frame_annotations/vlm_infer`.
   - Nút chuyển đổi chế độ SAM click: `#bboxSamClickMode` (`🎯 Click SAM: TẮT / BẬT`).
4. **Quản lý thay đổi và xuất dữ liệu lên Server:**
   - Nút lọc frame đã sửa: `#changedFramesBtn` (`Changed frames (N)`).
   - Nút xuất dữ liệu: `#exportReportedZipBtn` (`Export to Server (N)`).
   - Lịch sử Undo/Redo (`#bboxUndo`, `#bboxRedo`) và phím tắt `#bboxShortcutHelp`.

## Tiền điều kiện

- Đã đăng nhập vào hệ thống `Anti-Logo` (`https://anti-logo.cmcati.vn/`).
- Mở kênh có dữ liệu frame (ví dụ `/channel/1`).

---

## Danh sách Test Case

### TC `03-14-01` — Chuyển đổi bố cục giao diện `Compact / Large Review` (`#singleLargeReviewToggle`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Layout`
- **Các bước thực hiện:**
  1. Tại trang `/channel/1`, tìm nút `Compact / Large Review` (`button#singleLargeReviewToggle`).
  2. Đọc giá trị ban đầu của thuộc tính `document.body.dataset.pcdReview`.
  3. Bấm nút `#singleLargeReviewToggle` và kiểm tra sự thay đổi của thuộc tính.
  4. Bấm lại nút `#singleLargeReviewToggle` để hoàn nguyên bố cục ban đầu.
- **Dữ liệu kiểm thử:** Nút `#singleLargeReviewToggle`.
- **Kết quả mong đợi (Expected):**
  - Thuộc tính `document.body.dataset.pcdReview` chuyển đổi chính xác giữa `compact` và `large`.
  - Không gây vỡ giao diện hoặc lỗi console.
- **Điểm cần chụp minh chứng:** `03-14-01-large-review-toggle.png`

---

### TC `03-14-02` — Bộ điều khiển Oriented Bounding Box (OBB) trên modal BBox

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Feature Verification`
- **Các bước thực hiện:**
  1. Mở modal review `#thumbModal` tại một frame có BBox (ví dụ qua nút `Tiếp tục`).
  2. Kiểm tra sự hiện diện của các nút điều khiển OBB:
     - `#bboxRotateLeft` (`↶ −5°`)
     - `#bboxRotateRight` (`↷ +5°`)
     - `#bboxAngleReset` (`0°`)
     - `#bboxConvertObb` (`HBB → OBB`)
     - `#bboxRotateMode` (`Rotate [R]`)
     - `#bboxAngleInput` (input góc độ)
  3. Kiểm tra dữ liệu annotations có hỗ trợ mảng tọa độ 4 điểm `obb_pts`.
  4. Đóng modal `#thumbModal`.
- **Dữ liệu kiểm thử:** Frame `#52320`.
- **Kết quả mong đợi (Expected):**
  - Tất cả các nút điều khiển OBB hiển thị đầy đủ, không bị disable bất thường.
  - Cấu trúc dữ liệu box hỗ trợ `obb_pts` (4 điểm `[x, y]`) cho các logo góc nghiêng.
- **Điểm cần chụp minh chứng:** `03-14-02-obb-controls.png`

---

### TC `03-14-03` — Công cụ 1-Click Auto VLM Infer & Chế độ click MobileSAM

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / AI Feature Check`
- **Các bước thực hiện:**
  1. Trong `#thumbModal`, kiểm tra nút `🤖 Auto VLM + SAM BBox` (`#thumbModeVlmBtn`) trên thanh công cụ chế độ xem.
  2. Kiểm tra nút `🤖 Auto VLM + SAM` (`#bboxVlmInferBtn`) trên thanh công cụ BBox.
  3. Kiểm tra nút `🎯 Click SAM: TẮT` (`#bboxSamClickMode`). Bấm thử để bật chế độ (`🎯 Click SAM: BẬT`) và bấm lại để tắt.
  4. Xác nhận sự sẵn sàng của endpoint `/v2/api/frame_annotations/vlm_infer`.
- **Dữ liệu kiểm thử:** Modal `#thumbModal`.
- **Kết quả mong đợi (Expected):**
  - Các nút VLM + SAM hiển thị với gradient màu nổi bật, tooltip mô tả rõ ràng.
  - Nút `#bboxSamClickMode` chuyển đổi trạng thái BẬT/TẮT chính xác khi click.
- **Điểm cần chụp minh chứng:** `03-14-03-vlm-sam-tools.png`

---

### TC `03-14-04` — Quản lý frame thay đổi (`#changedFramesBtn`), Undo/Redo & Export Server (`#exportReportedZipBtn`)

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Positive / Data Management`
- **Các bước thực hiện:**
  1. Kiểm tra sự hiện diện của nút `Changed frames (N)` (`#changedFramesBtn`) trên thanh điều khiển bảng Logs.
  2. Kiểm tra nút `Export to Server (N)` (`#exportReportedZipBtn`) kết nối API `/v2/api/frame_annotations/export_zip`.
  3. Trong modal `#thumbModal`, kiểm tra nút `Undo` (`#bboxUndo`), `Redo` (`#bboxRedo`) và nút `? Phím tắt` (`#bboxShortcutHelp`).
- **Dữ liệu kiểm thử:** Bảng Frame Logs & Modal BBox.
- **Kết quả mong đợi (Expected):**
  - Các nút `#changedFramesBtn` và `#exportReportedZipBtn` hiển thị đúng bộ đếm số frame thay đổi.
  - Nút Undo, Redo và Phím tắt khả dụng trong modal gán nhãn.
- **Điểm cần chụp minh chứng:** `03-14-04-export-undo-tools.png`

