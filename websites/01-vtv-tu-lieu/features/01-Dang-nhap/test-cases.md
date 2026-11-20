# VTV Tư liệu — Dang-nhap

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐANG CHẠY.
Ưu tiên dự kiến: P0. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-01-01 | Truy cập trang đăng nhập | 1. Chưa đăng nhập, mở `http://vtvtulieu.cmcati.vn/` trên trình duyệt MCP.<br>2. Lấy snapshot và kiểm tra URL, tiêu đề, các trường trong form. | Hệ thống tự động điều hướng về `https://vtvtulieu.cmcati.vn/login?next=%2F`, tiêu đề trang `CMC Video Miner`, hiển thị khối `Đăng nhập VTV Tư liệu`, ô `Tên đăng nhập` (`input#username`), ô `Mật khẩu` (`input#password`), nút `Hiện mật khẩu` và nút `Đăng nhập` (`button[type="submit"]`). Không có lỗi console/network. |
| 01-01-02 | Đăng nhập hợp lệ (luồng chính) | 1. Tại trang `/login`, người dùng nhập tài khoản và mật khẩu hợp lệ trên cửa sổ Chrome do MCP mở và bấm `Đăng nhập`.<br>2. Lấy snapshot sau khi đăng nhập. | Đăng nhập thành công, thoát khỏi URL `/login`, chuyển vào trang chính của hệ thống (`https://vtvtulieu.cmcati.vn/`), hiển thị giao diện làm việc và menu điều hướng mà không phát sinh lỗi tải dữ liệu. |
| 01-01-03 | Trạng thái rỗng khi bấm Đăng nhập | 1. Tại trang `/login`, để trống cả 2 trường `Tên đăng nhập` và `Mật khẩu`.<br>2. Bấm nút `Đăng nhập` (`form button[type="submit"]`).<br>3. Kiểm tra trạng thái form và thông báo validation. | Form không gửi request đăng nhập giả; kích hoạt ràng buộc `required` (`form.checkValidity() === false`, `username.validity.valueMissing === true`), hiển thị cảnh báo `Please fill out this field.` và giữ nguyên URL `/login?next=%2F`. |

Chọn dữ liệu có sẵn để kiểm tra; không lưu mật khẩu vào tài liệu hay báo cáo.
