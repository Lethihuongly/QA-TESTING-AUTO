# Retest BUG-01-01: Phân trang trang kết quả tìm kiếm (/results)

- **Bug_ID:** BUG-01-01
- **Case_ID:** 01-03-02
- **Website:** 01 — VTV Tư liệu (`https://vtvtulieu.cmcati.vn/`)
- **Mức độ ưu tiên:** P1 (Medium)
- **Trạng thái báo cáo cũ (`2026-11-09/run-110430`):** FIXED
- **Trạng thái kiểm tra lại (`2026-11-10/run-090400`):** **FIXED (Logic phân trang hoạt động đúng; ghi nhận hiện tượng chập chờn timeout API tìm kiếm ở lần gọi đầu tiên)**
- **Thời điểm kiểm tra:** `2026-11-10T09:10:03+07:00` — `2026-11-10T09:13:08+07:00`

## 1. Các bước tái hiện & Kiểm chứng thực tế
1. Tìm kiếm thông qua thẻ gợi ý `"Công nghệ thực tế ảo VR"` (`87` kết quả, 5 trang):
   - Trang 1 (`page_id=1&page_size=20`, `reqid=39` HTTP 200, thời gian phản hồi `11277 ms`): Hiển thị 20 thẻ video, thẻ đầu tiên là `"Thực tập sinh và nghiên cứu đông trùng hạ thảo tại Viện Khoa học và Công nghệ Việt Nam"`, nút trang `"1"` active (`aria-current="page"`).
   - Nhấn sang trang `2` (`uid=5_203`) lần 1: URL đổi sang `&page_id=2`, nhưng request `reqid=59 GET /api/v1/videos/search?...&page_id=2&page_size=20` bị lỗi mạng `net::ERR_FAILED` (Console `msgid=6`: thiếu header CORS trên phản hồi lỗi gateway timeout), UI hiển thị `h3 "Something went wrong"` (`uid=9_0`).
   - Nhấn lại nút trang `2` (`uid=10_200`) ngay sau đó: Request `reqid=77 GET /api/v1/videos/search?...&page_id=2&page_size=20` trả về `HTTP 200 OK`, URL giữ `&page_id=2`, nút trang `"2"` active (`activePage="2"`), hiển thị 20 video mới của trang 2 (thẻ đầu tiên: `"Doanh nghiệp ứng dụng công nghệ tái chế và năng lượng mặt trời trong sản xuất tã trẻ em"`).
2. Tìm kiếm với từ khóa `"thời sự"` (`38` kết quả, 2 trang):
   - Trang 1 (`reqid=94` HTTP 200): Hiển thị 20 thẻ video (thẻ đầu tiên: `"Thời sự"`), `activePage="1"`.
   - Nhấn nút trang `2` (`uid=12_197`): URL chuyển sang `https://vtvtulieu.cmcati.vn/results?q=th%E1%BB%9Di+s%E1%BB%B1&search_ocr=true&search_caption=true&search_asr=true&search_face=true&page_id=2`, `activePage="2"`, hiển thị đúng 18 thẻ video còn lại (`20 + 18 = 38`, thẻ đầu tiên: `"Biên tập viên Nguyễn Văn A đưa tin về sự kiện bão số 5 đổ bộ vào miền Trung"`).

## 2. Kết luận QA
- Lỗi logic phân trang (`BUG-01-01` — không chuyển được sang trang 2) **đã được khắc phục (FIXED)**: URL cập nhật `page_id=2`, nút trang 2 được đánh dấu active và danh sách video thay đổi đúng theo trang.
- **Lưu ý môi trường/hiệu năng:** API `/api/v1/videos/search` có thời gian phản hồi khá chậm khi truy vấn rộng (11.2 giây ở trang 1 của từ khóa `"Công nghệ thực tế ảo VR"`) và có thể gặp timeout tạm thời ở tầng gateway (`reqid=59`).

