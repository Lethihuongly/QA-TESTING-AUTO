# VTV Tư liệu — Khuon-mat-dia-danh

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-08-01 | Truy cập Danh sách khuôn mặt & Danh sách địa danh | 1. Tại `/warehouse-management`, bấm tab `Danh sách khuôn mặt` (`?tab=face`).<br>2. Tiếp tục bấm tab `Danh sách địa danh` (`?tab=location`). | - Tiêu đề chung của trang `/warehouse-management` (`main h1`) giữ cố định là `"Lịch sử upload"` theo đúng thiết kế nghiệp vụ, trong khi huy hiệu số lượng (`564 mục` / `18 mục`) và nút hành động cập nhật theo từng tab.<br>- Tab `Danh sách khuôn mặt` (`?tab=face`): Hiển thị bảng khuôn mặt (`Khuôn mặt`, `Tên`, `Vai trò`, `Thời gian tạo`, `Thao tác`), nút `Đăng ký khuôn mặt`, dữ liệu thực tế (`Ronaldo Luís Nazário de Lima`, `Ronaldinho`, `Diego Maradona`... — `564 khuôn mặt, 94 trang`).<br>- Tab `Danh sách địa danh` (`?tab=location`): Hiển thị bảng địa danh (`Hình ảnh`, `Tên địa danh`, `Mô tả`, `Thời gian tạo`, `Thao tác`), nút `Đăng ký địa danh`, dữ liệu thực tế (`Nhà thờ đá Tam Đảo`, `Nhà hát Lớn Hà Nội`, `Phố cổ Hội An`... — `18 địa danh, 3 trang`). |
| 01-08-02 | Luồng chính — Lọc địa danh theo tên (`"Hội An"`) | 1. Tại `/warehouse-management?tab=location`, bấm nút `Bộ lọc`.<br>2. Nhập `"Hội An"` vào ô `Nhập tên địa danh...`.<br>3. Kiểm tra bảng kết quả. | URL cập nhật `&location_name=H%E1%BB%99i+An`, hiển thị thẻ `Đang lọc: Tên: Hội An`, kết quả trả về đúng `1 mục` (`Phố cổ Hội An` kèm hình ảnh và mô tả chi tiết). |
| 01-08-03 | Trạng thái rỗng khi lọc địa danh không tồn tại | 1. Tại `Bộ lọc` của tab `Danh sách địa danh`, nhập `"xyz_khong_ton_tai"` vào ô `Nhập tên địa danh...`.<br>2. Kiểm tra thông báo trạng thái rỗng. | Hiển thị `0 mục` / `0 địa danh`, tiêu đề `"Không có dữ liệu địa danh"` và dòng mô tả `"Danh sách địa danh đã đăng ký sẽ hiển thị ở đây."` |

Chọn dữ liệu có sẵn để kiểm tra; ghi ID dữ liệu đã dùng trong báo cáo.
