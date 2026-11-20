# VTV Tư liệu — Tai-khoan-dang-xuat

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-11-01 | Mở menu Tài khoản người dùng | 1. Đã đăng nhập, bấm nút `Tài khoản người dùng` (`header button[aria-label="Tài khoản người dùng"]`) ở góc phải Header.<br>2. Lấy snapshot kiểm tra menu xổ xuống. | Hiển thị `[role="menu"]` gồm 2 `[role="menuitem"]`: tên tài khoản hiện tại (`VTV`, trạng thái `disabled`) và nút `Đăng xuất`. |
| 01-11-02 | Luồng chính — Đăng xuất khỏi hệ thống | 1. Trong menu `Tài khoản người dùng`, bấm `menuitem "Đăng xuất"`.<br>2. Lấy snapshot kiểm tra URL và giao diện sau khi đăng xuất. | Hệ thống kết thúc phiên làm việc và điều hướng về trang đăng nhập `https://vtvtulieu.cmcati.vn/login`, hiển thị form `Đăng nhập VTV Tư liệu`. |
| 01-11-03 | Kiểm tra bảo vệ phiên sau khi đăng xuất | 1. Sau khi đã đăng xuất ở `01-11-02`, điều hướng trực tiếp tới URL nội bộ `https://vtvtulieu.cmcati.vn/warehouse-management`.<br>2. Lấy snapshot kiểm tra URL thực tế. | Hệ thống không cho phép truy cập trang nội bộ khi chưa đăng nhập, tự động chuyển hướng về `https://vtvtulieu.cmcati.vn/login?next=%2Fwarehouse-management`. |

Chọn dữ liệu có sẵn để kiểm tra; không lưu mật khẩu hoặc cookie vào báo cáo.
