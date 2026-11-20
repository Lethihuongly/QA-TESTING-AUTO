# VTV Tư liệu — Lich-su-upload

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-07-01 | Truy cập trang Lịch sử upload | 1. Đã đăng nhập, bấm nút `Xem lịch sử upload` (`header button[title="Xem lịch sử upload"]`).<br>2. Lấy snapshot kiểm tra tiêu đề `Lịch sử upload`, các nút `Tải video lên`, `Bộ lọc` và bảng danh sách. | Điều hướng đến `https://vtvtulieu.cmcati.vn/warehouse-management`, hiển thị tiêu đề `h1` `"Lịch sử upload"`, tổng số mục (`151 mục`), các nút `Tải video lên`, `Bộ lọc`, 3 tab (`Người dùng tải`, `Danh sách khuôn mặt`, `Danh sách địa danh`) và bảng lịch sử video đã tải lên. |
| 01-07-02 | Luồng chính — Kiểm tra bộ lọc và phân trang lịch sử upload | 1. Tại `/warehouse-management`, mở `Bộ lọc`, kiểm tra các trường lọc (`Tên video`, `Chủ đề`, `Trạng thái`, `Giai đoạn`, `Ngày phát sóng`).<br>2. Nhập `"Thời sự"` vào `Tên video` và chuyển sang trang 2. | Lọc đúng danh sách video có tên chứa `"Thời sự"`, hiển thị thẻ lọc `Đang lọc: Tên: Thời sự` và nút `Bộ lọc 1`; chuyển trang 2 cập nhật URL `?source_filename=Th%E1%BB%9Di+s%E1%BB%B1&manual_page=2` và tải đúng danh sách trang 2. |
| 01-07-03 | Trạng thái rỗng khi lọc lịch sử upload không có kết quả | 1. Tại `Bộ lọc` trên `/warehouse-management`, nhập `"xyz_khong_ton_tai_9999"` vào ô `Nhập tên video...`.<br>2. Kiểm tra vùng hiển thị kết quả. | Hiển thị `0 mục` / `0 video`, tiêu đề `"Không có lịch sử upload"` và mô tả `"Các video bạn upload sẽ hiển thị ở đây"`. |

Chọn dữ liệu có sẵn để kiểm tra; ghi ID dữ liệu đã dùng trong báo cáo.
