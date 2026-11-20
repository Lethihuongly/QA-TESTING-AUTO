# VTV Tư liệu — Danh-sach-tu-lieu

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P0. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

> Ghi chú khảo sát UI: Trên giao diện thực tế, danh sách kho tư liệu video được tích hợp tại trang `/warehouse-management` (mở qua nút `Xem lịch sử upload` trên Header, tab mặc định `Người dùng tải`).

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-04-01 | Truy cập Danh sách tư liệu (`/warehouse-management`) | 1. Đã đăng nhập, bấm nút `Xem lịch sử upload` (`header button[title="Xem lịch sử upload"]`).<br>2. Lấy snapshot và kiểm tra bảng danh sách video, tổng số mục và thanh phân trang. | Điều hướng đến `https://vtvtulieu.cmcati.vn/warehouse-management`, gọi API `GET /api/v1/videos?manual_upload=true&page_id=1&page_size=6` trả về `200`, hiển thị bảng gồm các cột: `Tên video`, `Chủ đề`, `Giai đoạn`, `Thời lượng`, `Thời gian phát sóng`, `Thời gian tạo`, `Trạng thái`, `Thao tác` và thanh phân trang `nav[aria-label="pagination"]`. |
| 01-04-02 | Luồng chính — Lọc theo tên video và chuyển trang | 1. Tại `/warehouse-management`, bấm nút `Bộ lọc`, nhập `"Thời sự"` vào ô `Nhập tên video...`.<br>2. Kiểm tra danh sách kết quả lọc và bấm trang `2` trên thanh phân trang.<br>3. Bấm vào dòng video `"Thời sự toàn cảnh trưa 19-7- Huy động lực lượng khắc phục thiệt hại do lũ quét - VTV24.mp4"` (`id=be08b277-678b-4b51-868e-10dd4d92d6b2`). | Lọc `"Thời sự"` cập nhật URL `?source_filename=Th%E1%BB%9Di+s%E1%BB%B1`, hiển thị các video có tên khớp (17 video, 3 trang) kèm nhãn `Đang lọc: Tên: Thời sự`. Chuyển trang 2 cập nhật URL `&manual_page=2`. Bấm vào dòng video điều hướng sang `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`. |
| 01-04-03 | Trạng thái rỗng khi lọc tên tư liệu không tồn tại | 1. Tại `Bộ lọc` trên `/warehouse-management`, nhập `"xyz_khong_ton_tai_9999"` vào ô `Nhập tên video...`.<br>2. Kiểm tra thông báo trạng thái rỗng. | URL cập nhật `?source_filename=xyz_khong_ton_tai_9999`, tổng số hiển thị `0 mục` / `0 video`, hiển thị tiêu đề `"Không có lịch sử upload"` và mô tả `"Các video bạn upload sẽ hiển thị ở đây"`. |

Chọn dữ liệu có sẵn để kiểm tra; ghi ID dữ liệu đã dùng trong báo cáo.
