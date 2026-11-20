# VTV Tư liệu — Tro-ly-hoi-dap

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-09-01 | Truy cập giao diện Trợ lý hỏi đáp video | 1. Mở trang chi tiết video `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`.<br>2. Bấm nút `Mở trợ lý hỏi đáp video` (`button[aria-label="Mở trợ lý hỏi đáp video"]`).<br>3. Lấy snapshot kiểm tra khung chat. | Mở khung `Hỏi đáp về video` hiển thị tiêu đề video, các nút câu hỏi mẫu (`"Video này nói về nội dung gì?"`, `"Những nhân vật nào xuất hiện?"`, `"Các sự kiện chính trong video là gì?"`, `"Tạo cho tôi một video short"`), ô nhập `textarea[aria-label="Câu hỏi về video"]`, nút `Gửi câu hỏi` và nút `Đóng trợ lý hỏi đáp`. |
| 01-09-02 | Luồng chính — Gửi câu hỏi mẫu về nội dung video | 1. Trong khung `Hỏi đáp về video` của video `be08b277-678b-4b51-868e-10dd4d92d6b2`, bấm nút câu hỏi mẫu `"Video này nói về nội dung gì?"`.<br>2. Chờ API `POST /api/v1/videos/be08b277-678b-4b51-868e-10dd4d92d6b2/chat` phản hồi. | API trả về HTTP `200` kèm câu trả lời tổng hợp nội dung dựa trên các phân đoạn của video. |
| 01-09-03 | Trạng thái rỗng & xử lý thông báo khi lỗi dịch vụ hỏi đáp | 1. Kiểm tra trạng thái nút `Gửi câu hỏi` khi ô `Câu hỏi về video` đang trống.<br>2. Kiểm tra thông báo hiển thị trên UI khi dịch vụ chat trả về lỗi. | Khi ô nhập trống, nút `button[aria-label="Gửi câu hỏi"]` ở trạng thái `disabled` (`disabled=true`). Khi request lỗi, UI hiển thị rõ thông báo `"Không thể hoàn tất yêu cầu: AI video chat request failed"` và nút `"Thử gửi lại câu hỏi"`, không làm treo trình phát video. |

Chọn dữ liệu có sẵn để kiểm tra; ghi ID dữ liệu đã dùng trong báo cáo.
