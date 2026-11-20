# Retest BUG-02-01: Phát video HLS trên trang chi tiết trận đấu

- **Bug_ID:** BUG-02-01
- **Case_ID:** 02-05-01
- **Website:** 02 — Sport Highlight (`https://sport-highlight.cmcati.vn/`)
- **Mức độ ưu tiên:** P0 (Critical)
- **Trạng thái kiểm tra lại (`2026-11-12/run-085600`):** **FIXED**
- **Thời điểm kiểm tra:** `2026-11-12T09:11:40+07:00`

## Kết quả thực tế
Trên trận `Sevilla vs Alaves` (`/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a`), thẻ `<video>` tải và phát luồng HLS 1080p mượt mà (`readyState=4`, `duration=9900s`, `videoWidth=1920`, `videoHeight=1080`, `paused=false`, `currentTime=12.01s`, `error=null`).

