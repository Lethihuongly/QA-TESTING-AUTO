# Retest BUG-01-02: Trợ lý hỏi đáp AI trên trang Xem video (/watch)

- **Bug_ID:** BUG-01-02
- **Case_ID:** 01-09-02
- **Website:** 01 — VTV Tư liệu (`https://vtvtulieu.cmcati.vn/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`)
- **Mức độ ưu tiên:** P1 (High)
- **Trạng thái báo cáo cũ (`2026-11-09/run-110430`):** FIXED
- **Trạng thái kiểm tra lại (`2026-11-10/run-090400`):** **FIXED**
- **Thời điểm kiểm tra:** `2026-11-10T09:24:40+07:00` — `2026-11-10T09:25:41+07:00`

## 1. Các bước kiểm tra thực tế
1. Mở trang chi tiết video `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2` (`"Chủ tịch Quốc hội thăm thương binh, mưa lũ gây sạt lở nghiêm trọng tại Bắc Bộ"`).
2. Nhấn nút `"Mở trợ lý hỏi đáp video"` (`uid=36_104`) để mở khung `"Hỏi đáp về video"` (`uid=44_0`).
3. Gửi duy nhất 01 câu hỏi kiểm thử ngắn bằng cách nhấn vào nút gợi ý `"Video này nói về nội dung gì?"` (`uid=44_6`).

## 2. Kết quả đo đạc & Bằng chứng
- **Network Request:** `reqid=382 POST https://vtvtulieu-api.cmcati.vn/api/v1/videos/be08b277-678b-4b51-868e-10dd4d92d6b2/chat` trả về `HTTP 200 OK`.
- **Thời gian phản hồi (`PerformanceResourceTiming.duration`):** `3060 ms` (~3.06 giây).
- **Hiển thị UI:** Trợ lý hiển thị đầy đủ đoạn văn bản tóm tắt nội dung video (`uid=45_2`) kèm 8 nút mốc thời gian có thể nhấn (`12:09`, `5:48`, `6:39`, `9:20`, `9:51`, `19:10`, `5:00`, `8:20` — `uid=45_3..45_10`).
- **Console / UI Errors:** Không có lỗi Console hay lỗi hiển thị UI (`msgid=19, 20` chỉ có log kết nối STOMP và cảnh báo HTML attribute thông thường).

