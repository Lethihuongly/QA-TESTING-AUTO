# VTV Tư liệu — Tim-kiem

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-03-01 | Truy cập giao diện Tìm kiếm (văn bản & hình ảnh) | 1. Đã đăng nhập, tại Trang chủ `/` kiểm tra thanh tìm kiếm và bấm nút `Upload content` (`main button[aria-label="Upload content"]`).<br>2. Lấy snapshot kiểm tra modal `Tìm kiếm bằng hình ảnh`, sau đó bấm `Close`. | Hiển thị thanh tìm kiếm văn bản và mở được dialog `Tìm kiếm bằng hình ảnh` gồm 2 chế độ: `Tìm kiếm sử dụng khuôn mặt` và `Tìm kiếm theo cảnh chụp (thử nghiệm)`, cùng nút `tải tệp lên`. Đóng dialog bình thường. |
| 01-03-02 | Luồng chính — Tìm kiếm từ khóa có dữ liệu trong kho (`"thời sự"`) | 1. Nhập từ khóa `"thời sự"` vào ô `Search input` và bấm nút tìm kiếm (`Initiate search` / `Search current query`).<br>2. Chờ API `/api/v1/videos/search` phản hồi và kiểm tra danh sách kết quả trên `/results`.<br>*(Tiền điều kiện dữ liệu: Kho tư liệu hiện có 17 video chứa `"Thời sự"` và ít nhất 36 video `statusData="COMPLETED"`, ví dụ ID `d6395178-fd4b-486c-84a6-8aec70670098` và `be08b277-678b-4b51-868e-10dd4d92d6b2`)*. | URL chuyển sang `/results?q=th%E1%BB%9Di+s%E1%BB%B1&search_ocr=true&search_caption=true&search_asr=true&search_face=true`; hệ thống trả về danh sách các video/phân đoạn khớp từ khóa `"thời sự"` đã xử lý hoàn tất trong kho tư liệu. |
| 01-03-03 | Trạng thái rỗng & xóa từ khóa tìm kiếm | 1. Tìm kiếm với từ khóa không tồn tại hoặc kiểm tra khi không có kết quả trả về trên `/results`.<br>2. Bấm nút `Clear search input` (`button[aria-label="Clear search input"]`). | Khi `total=0`, màn hình `/results` hiển thị thông báo rõ ràng `"Không tìm thấy kết quả nào!"`, không treo trang. Khi bấm `Clear search input`, ô tìm kiếm được xóa trắng (`value=""`). |

Chọn dữ liệu có sẵn để kiểm tra; ghi ID dữ liệu đã dùng trong báo cáo.
