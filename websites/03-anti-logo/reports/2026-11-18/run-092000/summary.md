# Báo Cáo Kiểm Thử Anti-Logo (`03-anti-logo`) — Run `2026-11-18/run-092000`

- **Ngày giờ:** `2026-11-18 09:20:00 (+07:00)`
- **URL kiểm thử:** `https://anti-logo.cmcati.vn/` (`/channel/1`, `/channel/2`, `/channel/3`, `/channels`)
- **Tài khoản:** `vtv` (phiên hoạt động sẵn)
- **Công cụ:** `chrome-devtools` MCP
- **Phạm vi kiểm thử:** Chỉ đọc (`Read-Only`) toàn bộ tính năng cốt lõi và 2 tính năng nâng cao mới (`03-13` và `03-14`).

---

## 1. Kết Quả Tổng Thể

| Tổng số TC | Đã chạy (`PASS + FAIL`) | `PASS` | `FAIL` | `BLOCKED` | `NOT_RUN` (Ngoài phạm vi) | Tỷ lệ PASS |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **47** | **38** | **38** | **0** | **0** | **9** | **100.00% (38/38)** |

---

## 2. Chi Tiết Hai Tính Năng Mới Cập Nhật

### A. Tính năng `03-13` — Tiếp tục gán nhãn & Quản lý phiên video (`Curation Resume & Quick View`)
- **4/4 Test Cases PASS:**
  - `03-13-01`: Thanh `div[data-curation-resume="1"]` hiển thị đầy đủ thông tin checkpoint gần nhất `Frame #52320` và 4 nút điều hướng (`Tiếp tục`, `Frame chỉnh sửa cuối`, `Đã review`, `Chưa review đầu tiên`).
  - `03-13-02`: Bấm nút `Tiếp tục` mở ngay hộp thoại `#thumbModal` tại `Frame #52320`, nạp đầy đủ 23 annotation BBox và đóng modal an toàn.
  - `03-13-03`: Nút `Đã review` và `Chưa review đầu tiên` gọi hàm điều hướng `curationNavigate` ổn định, không phát sinh lỗi script.
  - `03-13-04`: Khung `section[data-curation-quick-view="1"]` cho phép chọn linh hoạt 5 phiên thế hệ (`gen 1` đến `gen 5`); API `/v2/api/curation/resume?channel_id=1` trả về mã `HTTP 200` với đầy đủ `session_scope` và `checkpoint`.

### B. Tính năng `03-14` — Công cụ gán nhãn nâng cao OBB, MobileSAM, Auto VLM & Export
- **4/4 Test Cases PASS:**
  - `03-14-01`: Nút `Compact / Large Review` (`#singleLargeReviewToggle`) chuyển đổi thuộc tính `document.body.dataset.pcdReview` từ `compact` sang `large` và ngược lại, phóng to thumbnail trực quan cho tester.
  - `03-14-02`: Bộ công cụ Oriented Bounding Box (OBB) hoạt động chuẩn: các nút xoay góc `↶ −5°`, `↷ +5°`, `0°`, nút `HBB → OBB`, `Rotate [R]`, input góc độ (`-9.6°`) và cấu trúc dữ liệu lưu tọa độ 4 điểm `obb_pts`.
  - `03-14-03`: Nút 1-click `🤖 Auto VLM + SAM BBox` (`#thumbModeVlmBtn`) và `🤖 Auto VLM + SAM` (`#bboxVlmInferBtn`) hiển thị gradient màu tím nổi bật; nút `🎯 Click SAM: TẮT` chuyển đổi trạng thái click mượt mà; endpoint `/v2/api/frame_annotations/vlm_infer` sẵn sàng.
  - `03-14-04`: Nút `Changed frames (0)`, `Export to Server (0)`, các nút `Undo`, `Redo` và bảng phím tắt `? Phím tắt` (`#bboxShortcutHelp`) đều khả dụng và an toàn.

---

## 3. Tình Trạng Kênh Phát & SDI Input Thực Tế
- **Channel 01:** Trạng thái `IDLE` (sẵn sàng khởi chạy luồng).
- **Channel 02:** Trạng thái `LIVE` phát luồng `virtual-sdi-THETHAO_TINTUC_HD` (`25,749,463` frames), video HLS 1080p @ 50 FPS mượt mà.
- **Channel 03:** Trạng thái `LIVE` phát luồng `virtual-sdi-HAY_TV` (`25,749,407` frames), video HLS 1080p @ 50 FPS mượt mà.
- Cả 5 endpoint quản trị kênh (`/channels/api/state`, `/v2/api/sdi_inputs`, `/channels/api/{1,2,3}/sdi_inputs`) đều trả về `HTTP 200 OK`.

