# VTV Tư liệu — Phan-tich-video

Trạng thái thiết kế: ĐÃ CẬP NHẬT TỪ UI THỰC TẾ. Trạng thái thực thi: ĐÃ CHẠY.
Ưu tiên dự kiến: P1. Mỗi case ghi riêng ID, tiền điều kiện, dữ liệu, bước, kết quả mong đợi.

| ID | Kiểm tra | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| 01-06-01 | Truy cập khối Phân tích clip | 1. Mở trang chi tiết video đã phân tích xong (`/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`).<br>2. Kiểm tra vùng `region "Phân tích clip"` (`[aria-label="Phân tích clip"]`). | Hiển thị tiêu đề phân đoạn hiện tại (`Phân đoạn 1/19`, `0:00 - 1:42`), nút `Phân đoạn trước` / `Phân đoạn sau`, và 5 tab: `Tóm tắt`, `Cảnh`, `Khuôn mặt`, `OCR`, `Lời thoại`. |
| 01-06-02 | Luồng chính — Chuyển đổi 5 tab phân tích AI | 1. Trên `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`, bấm lần lượt qua các tab `Tóm tắt`, `Cảnh`, `Khuôn mặt`, `OCR`, `Lời thoại`.<br>2. Lấy snapshot đối chiếu dữ liệu từng tab. | - `Tóm tắt`: Hiển thị `Mô tả`, `Nhân vật` (`Chủ tịch Quốc hội Trần Thanh Mẫn`), `Tổ chức`, `Địa điểm`, `Thời gian`, `Sự kiện`.<br>- `Cảnh`: Hiển thị danh sách các Scene kèm mốc thời gian (`Scene 1`..`Scene 12`...).<br>- `Khuôn mặt` (`active_tab=face`): Hiển thị khuôn mặt nhận diện (`Trần Thanh Mẫn`, `Đỗ Thanh Bình`, `Hà Thị Nga`) kèm ảnh crop và mốc thời gian.<br>- `OCR` (`active_tab=ocr`): Hiển thị văn bản trích xuất theo từng khung hình (`Khung hình 173`, `Khung hình 498`...).<br>- `Lời thoại` (`active_tab=speech`): Hiển thị transcript theo người nói (`MC Vân Anh`, `Trần Thanh Mẫn`) và mốc thời gian. |
| 01-06-03 | Trạng thái rỗng khi phân đoạn không có khuôn mặt/lời thoại | 1. Mở video `sample-30s.mp4` (`/watch?video_id=26940e61-7661-440e-a1d1-4081a2cc5774`).<br>2. Kiểm tra tab `Tóm tắt`, `Khuôn mặt`, `Lời thoại`. | - Tab `Tóm tắt`: Các mục không có thông tin hiển thị `(Trống)`.<br>- Tab `Khuôn mặt`: Hiển thị `"Chưa có dữ liệu khuôn mặt"` — `"Phân đoạn này chưa phát hiện khuôn mặt nào để gắn nhãn."`<br>- Tab `Lời thoại`: Hiển thị `"Chưa có lời thoại"` — `"Phân đoạn này chưa có transcript để xem hoặc đối chiếu."` |

Chọn dữ liệu có sẵn để kiểm tra; ghi ID dữ liệu đã dùng trong báo cáo.
