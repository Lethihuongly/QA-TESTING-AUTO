# [VTV Tư liệu] [Trợ lý hỏi đáp] Gửi câu hỏi mẫu trong "Hỏi đáp về video" trả về lỗi HTTP 503 ("AI video chat request failed")

- **Thời gian / URL / phiên bản build**: `2026-11-03 09:43:18 +07:00` | `https://vtvtulieu.cmcati.vn/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`
- **Môi trường / trình duyệt / tài khoản (không ghi mật khẩu)**: Windows / Google Chrome (qua `chrome-devtools` MCP) / Tài khoản `VTV`
- **Mức độ ảnh hưởng / ưu tiên**: Cao (High) / P1 (Chức năng Trợ lý hỏi đáp video không sử dụng được)
- **Tiền điều kiện / ID dữ liệu test**:
  - Đã đăng nhập hợp lệ.
  - Mở video đã hoàn tất phân tích dữ liệu (`status="COMPLETED"`, `statusData="COMPLETED"`, 19 phân đoạn có đầy đủ Tóm tắt/Cảnh/Khuôn mặt/OCR/Lời thoại): `video_id = be08b277-678b-4b51-868e-10dd4d92d6b2`.
- **Các bước tái hiện**:
  1. Truy cập `https://vtvtulieu.cmcati.vn/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`.
  2. Bấm nút `Mở trợ lý hỏi đáp video` (`button[aria-label="Mở trợ lý hỏi đáp video"]`).
  3. Bấm vào nút câu hỏi gợi ý mẫu: `"Video này nói về nội dung gì?"`.
- **Kết quả mong đợi**:
  - Hệ thống xử lý câu hỏi và hiển thị câu trả lời dựa trên nội dung các phân đoạn của video.
- **Kết quả thực tế**:
  - Sau trạng thái `"Đang tìm trong video…"`, giao diện báo lỗi: `"Không thể hoàn tất yêu cầu: AI video chat request failed"` kèm nút `"Thử gửi lại câu hỏi"`.
  - API `POST /api/v1/videos/be08b277-678b-4b51-868e-10dd4d92d6b2/chat` trả về mã lỗi HTTP `503 Service Unavailable`.
- **Tần suất tái hiện**: 100%.
- **Console / request liên quan (đã loại token, cookie, mật khẩu)**:
  - Console (`msgid=13`): `[error] Failed to load resource: the server responded with a status of 503 ()`
  - Request (`reqid=452`): `POST https://vtvtulieu-api.cmcati.vn/api/v1/videos/be08b277-678b-4b51-868e-10dd4d92d6b2/chat`
  - Request Body:
    ```json
    {"question":"Video này nói về nội dung gì?","history":[],"top_k":8,"focus_segment_ids":[]}
    ```
  - Response (`503 Service Unavailable`):
    ```json
    {"duration":0,"message":"AI video chat request failed","page":0,"pageSize":0,"status":503,"timestamp":1793673798513,"totalRows":0}
    ```
- **Minh chứng**: Snapshot `uid=34_0`, `uid=34_1`; Network `reqid=452`; Console `msgid=13`. (Thiếu file ảnh chụp màn hình do `take_screenshot` với `filePath` bị chặn bởi cấu hình workspace roots của MCP).
- **Case liên quan / kết quả retest**: `01-09-02` — **FAIL**.

