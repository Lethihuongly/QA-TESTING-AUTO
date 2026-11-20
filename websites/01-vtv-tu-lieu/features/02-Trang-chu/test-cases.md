# VTV Tư liệu — Trang-chu

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-02-01 | Truy cập Trang chủ | 1. Đã đăng nhập hợp lệ, mở `https://vtvtulieu.cmcati.vn/`.<br>2. Lấy snapshot kiểm tra Header và khối nội dung chính. | Hiển thị Header (`TRUNG TÂM TRUY XUẤT ĐA PHƯƠNG TIỆN`, nút `Toggle theme`, `Notifications`, `Xem lịch sử upload`, `Tài khoản người dùng`) và vùng chính (`CMC VIDEO MINER`, ô `Search input`, nút `Initiate search`, nút `Upload content`, khối `Gợi ý tìm kiếm:`). API `/api/v1/auth/me` trả về `200`. |
| 01-02-02 | Luồng chính — Chọn gợi ý tìm kiếm trên Trang chủ | 1. Tại Trang chủ `/`, bấm vào một nút gợi ý tìm kiếm dưới mục `Gợi ý tìm kiếm:` (ví dụ: `"An ninh quốc gia"`).<br>2. Lấy snapshot sau khi chuyển trang. | Hệ thống điều hướng sang trang kết quả tìm kiếm `/results?q=An+ninh+qu%E1%BB%91c+gia` và tự động điền từ khóa `"An ninh quốc gia"` vào ô `Search input` trên Header. |
| 01-02-03 | Trạng thái rỗng của thanh tìm kiếm trên Trang chủ | 1. Tại Trang chủ `/`, để trống ô `Search input` (`value=""`).<br>2. Kiểm tra trạng thái nút `Initiate search` (`main button[aria-label="Initiate search"]`). | Nút `Initiate search` ở trạng thái `disabled` (`disabled=true`), không cho phép bấm tìm kiếm khi chưa nhập từ khóa; nút `Upload content` hiển thị bên phải ô tìm kiếm. |

Chọn dữ liệu có sẵn để kiểm tra; ghi ID dữ liệu đã dùng trong báo cáo.
