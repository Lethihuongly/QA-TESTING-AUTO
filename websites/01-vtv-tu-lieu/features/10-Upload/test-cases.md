# VTV Tư liệu — Upload

Trạng thái thiết kế: ĐÃ KHẢO SÁT UI. Trạng thái thực thi: NOT_RUN (ngoài phạm vi lượt đầu).
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-10-01 | Mở giao diện Tải video lên / Đăng ký khuôn mặt / Đăng ký địa danh | 1. Tại `/warehouse-management`, kiểm tra nút `Tải video lên` (tab `Người dùng tải`), `Đăng ký khuôn mặt` (tab `Danh sách khuôn mặt`), `Đăng ký địa danh` (tab `Danh sách địa danh`). | Hiển thị đúng nút tải lên/đăng ký tương ứng theo từng tab; mở được modal nhập liệu mà không lỗi giao diện. |
| 01-10-02 | Luồng chính — Upload video tư liệu mới | 1. Mở modal `Tải video lên`, chọn file video test hợp lệ, điền metadata và xác nhận tải lên. | Tải lên thành công, xuất hiện bản ghi mới trong bảng `Lịch sử upload`. *(Ngoài phạm vi lượt đầu — NOT_RUN)*. |
| 01-10-03 | Trạng thái rỗng/lỗi khi upload file không hợp lệ | 1. Thử bấm tải lên khi chưa chọn file hoặc chọn định dạng không hỗ trợ. | Hiển thị cảnh báo lỗi hợp lệ, không tạo bản ghi rác. *(Ngoài phạm vi lượt đầu — NOT_RUN)*. |

Chỉ khảo sát giao diện trong lượt hằng ngày. Các thao tác thay đổi cấu hình, upload hoặc xóa được đánh dấu `NOT_RUN` theo yêu cầu.
