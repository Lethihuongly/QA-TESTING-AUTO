# Quy trình MCP: Anti-Logo / Tiếp tục gán nhãn & Quản lý phiên video (`03-13`)

Quy trình tự động hóa kiểm tra tính năng Curation Resume và Video Session Quick View bằng `chrome-devtools` MCP.

## 1. Chuẩn bị
1. Mở trang `https://anti-logo.cmcati.vn/channel/1`.
2. Xác nhận phiên đăng nhập hợp lệ (user `vtv`).
3. Đọc `test-cases.md` cùng thư mục.

## 2. Các bước thực thi MCP

1. **Khảo sát UI thanh tiếp tục gán nhãn:**
   - Sử dụng `evaluate_script` kiểm tra `document.querySelector('[data-curation-resume]')`.
   - Đọc các nút bấm con: `Tiếp tục`, `Frame chỉnh sửa cuối`, `Đã review`, `Chưa review đầu tiên`.

2. **Kiểm tra mở modal checkpoint:**
   - Kích hoạt nút `Tiếp tục` thông qua `evaluate_script` hoặc `click`.
   - Xác nhận `#thumbModal` hiển thị với `display: flex` và tiêu đề chứa đúng frame checkpoint.
   - Đóng modal bằng `#thumbModalClose`.

3. **Kiểm tra combobox chọn phiên và API backend:**
   - Đọc danh sách phiên trong `section[data-curation-quick-view] select`.
   - Gọi fetch `/v2/api/curation/resume?channel_id=1` và đối chiếu `checkpoint.last_saved_frame` với text trên giao diện.

## 3. Lưu kết quả
- Chụp snapshot / screenshot minh chứng.
- Ghi kết quả vào `results.csv`.

