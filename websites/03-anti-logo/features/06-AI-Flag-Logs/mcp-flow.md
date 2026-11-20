# Quy trình MCP: Anti-Logo / AI-Flag-Logs

Đây là hướng dẫn cho agent trong Antigravity, không phải chương trình tự chạy.
1. Đọc test-cases.md cùng thư mục. Nếu bước hoặc expected còn chung chung, khảo sát UI và hoàn thiện thiết kế trước.
2. Chọn đúng tab https://anti-logo.cmcati.vn/; không dùng UID của tab khác.
3. Lấy snapshot mới; dùng UID hiện tại để thao tác. Sau chuyển trang hoặc DOM thay đổi, lấy lại snapshot.
4. Thực hiện từng case đã đủ dữ liệu. Dùng dữ liệu mẫu đã xác nhận.
5. Kiểm tra kết quả hiển thị, URL, trạng thái dữ liệu; khi lỗi, xem console và network liên quan, che thông tin xác thực.
6. Ghi từng case vào reports/YYYY-MM-DD/run-HHMMSS/results.csv; không sửa kết quả lịch sử.
7. PASS chỉ khi mọi expected của case được quan sát; FAIL khi sai expected; BLOCKED khi không thể thực hiện; NOT_RUN khi chưa chạy.
8. Nếu có bug, dùng templates/bug-report.md. Không tự kết luận nguyên nhân từ phỏng đoán.
