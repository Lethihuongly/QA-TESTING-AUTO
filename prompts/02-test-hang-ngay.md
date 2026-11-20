Chỉ chạy web: [điền đường dẫn websites/...]. Đọc checklist.csv và các test-cases.md, mcp-flow.md.
Chỉ dùng chrome-devtools MCP đã kết nối. Tạo thư mục reports/[ngày địa phương]/run-[giờ-phút-giây].
Chạy các case P0 và P1 đã hoàn thiện, chỉ đọc dữ liệu; đăng xuất cuối nếu có case này. Không đổi cấu hình, upload, xóa, Start/Stop hoặc tác động kênh LIVE.
Nếu case còn DRAFT/thiếu expected thì BLOCKED, không tự đánh PASS. Lấy snapshot mới khi UI thay đổi; chờ điều kiện hiển thị thay vì thời gian cố định.
Ghi results.csv theo mẫu, summary.md với số PASS/FAIL/BLOCKED/NOT_RUN, thời gian, môi trường và phạm vi. Tổng các trạng thái phải bằng tổng case được chọn. Tách lỗi app khỏi lỗi công cụ/mạng; lỗi công cụ có thể khiến case BLOCKED.
Ghi bug có bước tái hiện, expected/actual và bằng chứng. Không lưu credential/token/cookie. Nếu screenshot filePath bị Access denied, ghi lỗi nguyên văn và đánh dấu thiếu file minh chứng, không báo đã lưu ảnh.
Nếu MCP ngắt, dừng phần thao tác, lưu phần kết quả đã có. Không tự đổi công cụ.
