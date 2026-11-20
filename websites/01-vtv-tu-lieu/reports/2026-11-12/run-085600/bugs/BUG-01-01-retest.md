# Retest BUG-01-01: Phân trang trang kết quả tìm kiếm (/results)

- **Bug_ID:** BUG-01-01
- **Case_ID:** 01-03-02
- **Website:** 01 — VTV Tư liệu (`https://vtvtulieu.cmcati.vn/`)
- **Mức độ ưu tiên:** P1 (Medium)
- **Trạng thái kiểm tra lại (`2026-11-12/run-085600`):** **FIXED**
- **Thời điểm kiểm tra:** `2026-11-12T09:05:34+07:00`

## 1. Các bước thực hiện & Kết quả
1. Tìm kiếm `"Ẩm thực Việt Nam"` (`73` kết quả, 4 trang).
2. Nhấn nút chuyển trang `"2"` (`uid=18_211`):
   - URL cập nhật ngay sang `https://vtvtulieu.cmcati.vn/results?q=%E1%BA%A8m+th%E1%BB%B1c+Vi%E1%BB%87t+Nam&page_id=2`.
   - Nút `"2"` được đánh dấu active (`activePage="2"`).
   - Hiển thị đầy đủ 20 thẻ video của trang 2 (thẻ đầu tiên: `"Tình hình kinh tế Việt Nam năm 2024"`).
   - Không phát sinh lỗi timeout hay lỗi giao diện.

## 2. Kết luận QA
Lỗi phân trang sang trang 2 đã được sửa hoàn toàn (**FIXED**).

