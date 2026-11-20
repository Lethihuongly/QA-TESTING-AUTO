# VTV Tư liệu — Chi-tiet-video

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-05-01 | Truy cập trang Chi tiết video (`/watch`) | 1. Từ `/warehouse-management`, mở video ID `be08b277-678b-4b51-868e-10dd4d92d6b2` (`Thời sự toàn cảnh trưa 19-7- Huy động lực lượng khắc phục thiệt hại do lũ quét - VTV24.mp4`).<br>2. Lấy snapshot kiểm tra các thành phần trên trang `/watch`. | Điều hướng tới `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`, hiển thị cột trái `Danh sách phân đoạn` (19 phân đoạn), trình phát `<video>`, tiêu đề `h2` (`"Chủ tịch Quốc hội thăm thương binh, mưa lũ gây sạt lở nghiêm trọng tại Bắc Bộ"`), tên file gốc, vùng `Ghi chú video` và vùng `Phân tích clip`. |
| 01-05-02 | Luồng chính — Phát video & chọn phân đoạn | 1. Tại `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`, kiểm tra trạng thái phần tử `<video>` bằng `evaluate_script` và snapshot thời gian phát. | Trình phát tải luồng video từ S3 (`206 Partial Content`), `video.readyState === 4`, `video.duration === 1317.477` (`21:57`), `video.currentTime > 0`, `video.error === null`. |
| 01-05-03 | Trạng thái lỗi khi mở `video_id` không tồn tại | 1. Mở URL `https://vtvtulieu.cmcati.vn/watch?video_id=00000000-0000-0000-0000-000000000000`.<br>2. Lấy snapshot kiểm tra thông báo lỗi trên giao diện. | Hiển thị tiêu đề `"Không thể tải video"`, thông báo chi tiết `"Video not found: 00000000-0000-0000-0000-000000000000"`, nút `"Try Again"` và toast thông báo tương ứng; ứng dụng không bị crash trắng trang. |

Chọn dữ liệu có sẵn để kiểm tra; ghi ID dữ liệu đã dùng trong báo cáo.
