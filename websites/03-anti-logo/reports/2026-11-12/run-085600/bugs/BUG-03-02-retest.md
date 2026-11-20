# Retest BUG-03-02: Bộ lọc "Show only flag=1" (#flag1OnlyToggle) trên bảng Frame Logs

- **Bug_ID:** BUG-03-02
- **Case_ID:** 03-06-02
- **Website:** 03 — Anti-Logo (`https://anti-logo.cmcati.vn/channel/1`)
- **Mức độ ưu tiên:** P1
- **Trạng thái kiểm tra lại (`2026-11-12/run-085600`):** **FIXED**
- **Thời điểm kiểm tra:** `2026-11-12T09:15:02+07:00`

## Kết quả thực tế
Khi checkbox `Show only flag=1` (`#flag1OnlyToggle`, `uid=41_420`) đang bật (`checked=true`), bảng `#logTableBody` hiển thị `Showing 1-75 of 168 frames` và toàn bộ 75/75 dòng trong bảng đều có `Flag=1` (`nonFlag1Count = 0`).

