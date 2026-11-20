# Retest BUG-02-01: Trình phát HLS trên trận đã hoàn thành

- **Bug_ID:** BUG-02-01
- **Case_ID:** 02-05-01
- **Website:** 02 — Sport Highlight (`https://sport-highlight.cmcati.vn/matches`)
- **Mức độ ưu tiên:** P0 (Critical)
- **Trạng thái báo cáo cũ (`2026-11-09/run-110430`):** FIXED
- **Trạng thái kiểm tra lại (`2026-11-10/run-090400`):** **FIXED**
- **Thời điểm kiểm tra:** `2026-11-10T09:39:11+07:00` — `2026-11-10T09:40:46+07:00`

*(Ghi chú lịch sử mã lỗi: Trong `CHANGELOG.md` ngày `2026-11-03`, mã `BUG-02-01` ban đầu được dùng cho lỗi `AI_HEARTBEAT_TIMEOUT`, sau đó từ ngày `2026-11-05` trở đi được dùng cho lỗi `HLS stream.m3u8 404` trên trận `Troyes vs Le Mans`. Ở đợt chạy này chúng tôi kiểm tra lại cả hai khía cạnh: cả trạng thái đồng bộ AI và khả năng phát HLS thực tế).*

## 1. Các bước kiểm tra thực tế
1. Mở trang chi tiết trận đã hoàn thành `Sevilla vs Alaves` (`/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a`).
2. Kiểm tra trạng thái thẻ `<video>`, các request HLS playlist (`/api/matches/{id}/hls/index.m3u8`) và các phân đoạn `.ts`.
3. Kiểm tra thêm playlist HLS (`/api/matches/{id}/hls/index.m3u8`) của 3 trận đã hoàn thành khác, bao gồm cả trận gốc từng bị lỗi `BUG-02-01` (`Troyes vs Le Mans` — `775f9ccd-6933-422b-9b76-5cd13a553ba1`), `Le Mans vs Monaco` (`aee37683-8bfb-4d90-9b9a-5d5163384998`) và `Le Mans vs Toulouse` (`c26dae78-ff86-433a-9d15-173c6b062f87`).

## 2. Kết quả đo đạc & Bằng chứng
- **Trạng thái phát thực tế trên `Sevilla vs Alaves` (`28fa419c-d6be-480a-a15d-9dd01f14cf9a`):**
  - `GET /api/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a/hls/index.m3u8?v=...` -> `HTTP 200 OK`
  - Các segment `000.ts` .. `014.ts` -> `HTTP 200 OK` (`duration: 274ms – 572ms`)
  - Thuộc tính `<video>`: `readyState: 4`, `networkState: 2`, `paused: false`, `currentTime: 50.978954`, `duration: 9900`, `videoWidth: 1920`, `videoHeight: 1080`, `error: null`.
- **Kiểm tra playlist HLS trên 4 trận đã hoàn thành:**
  - `Sevilla vs Alaves` (`28fa419c...`): `HTTP 200` (`#EXTM3U #EXT-X-VERSION:3 #EXT-X-TARGETDURATION:4 #EXT-X-PLAYLIST-TYPE:VOD`)
  - `Le Mans vs Monaco` (`aee37683...`): `HTTP 200` (`#EXTM3U ...`)
  - `Troyes vs Le Mans` (`775f9ccd...`): `HTTP 200` (`#EXTM3U ...`)
  - `Le Mans vs Toulouse` (`c26dae78...`): `HTTP 200` (`#EXTM3U ...`)
- **Trạng thái AI (`02-04-02`):** Hiển thị `"Đang đồng bộ trực tiếp"` (`uid=65_3`), không có cảnh báo `AI_HEARTBEAT_TIMEOUT`.

