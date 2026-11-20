# Quy trình MCP: Anti-Logo / Công cụ gán nhãn nâng cao OBB, SAM, VLM (`03-14`)

Quy trình tự động hóa kiểm tra các công cụ gán nhãn nâng cao bằng `chrome-devtools` MCP.

## 1. Chuẩn bị
1. Mở trang `https://anti-logo.cmcati.vn/channel/1`.
2. Xác nhận phiên đăng nhập hợp lệ.
3. Đọc `test-cases.md` cùng thư mục.

## 2. Các bước thực thi MCP

1. **Kiểm tra Large Review toggle:**
   - Đọc `document.body.dataset.pcdReview`.
   - Bấm `button#singleLargeReviewToggle`, kiểm tra đổi sang `large`, sau đó bấm lại để hoàn nguyên `compact`.

2. **Kiểm tra bộ công cụ OBB trong modal:**
   - Mở `#thumbModal` (ví dụ thông qua nút `Tiếp tục` hoặc click thumbnail frame).
   - Kiểm tra các nút OBB: `#bboxRotateLeft`, `#bboxRotateRight`, `#bboxAngleReset`, `#bboxConvertObb`, `#bboxRotateMode`, `#bboxAngleInput`.
   - Kiểm tra hỗ trợ dữ liệu `obb_pts`.

3. **Kiểm tra Auto VLM & SAM Click:**
   - Xác nhận `#thumbModeVlmBtn` và `#bboxVlmInferBtn` tồn tại.
   - Thử click nút `#bboxSamClickMode` để kiểm tra toggle `BẬT` / `TẮT`.

4. **Kiểm tra Changed Frames & Export:**
   - Kiểm tra nút `#changedFramesBtn` và `#exportReportedZipBtn` trên thanh công cụ logs.
   - Đóng modal `#thumbModalClose`.

## 3. Lưu kết quả
- Chụp snapshot / screenshot minh chứng.
- Ghi kết quả vào `results.csv`.

