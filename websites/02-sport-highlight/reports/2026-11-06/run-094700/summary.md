# Báo Cáo Kiểm Thử — Website 02: Sport Highlight

## 1. Thông tin chung
- **Website**: Sport Highlight (`https://sport-highlight.cmcati.vn/matches`)
- **Ngày giờ chạy**: `2026-11-06 09:17:15 — 09:22:10` & kiểm tra bổ sung lỗi kéo segment lúc `09:40:55` (`Asia/Ho_Chi_Minh`)
- **Công cụ**: `chrome-devtools` MCP (chế độ chỉ đọc / Read-Only)

## 2. Thống kê kết quả

| Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | So sánh với lần chạy trước (`2026-11-05/run-152048`) |
| :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **24** | **20** | **1** | **0** | **3** | **95.24%** | `+3 PASS`, `-2 FAIL`, `-1 BLOCKED` (Lần trước: `17 PASS, 3 FAIL, 1 BLOCKED, 3 NOT_RUN` — `85.00%`) |

## 3. Kết quả kiểm tra lại lỗi cũ & Lỗi mới phát hiện
1. **BUG-02-01 (Các trận `Hoàn tất` hiển thị `0 phân đoạn` và `Chưa có lượt xử lý`)**: **ĐÃ KHẮC PHỤC (Fixed)**
   - **Bằng chứng**:
     - `Troyes vs Le Mans` (`775f9ccd-6933-422b-9b76-5cd13a553ba1`): `processing_run.status = "completed"`, có **815 phân đoạn**.
     - `Le Mans vs Toulouse` (`c26dae78-b6a5-466d-8538-c3d3f9045a7c`): `completed`, có **811 phân đoạn**.
     - `Ac Milan vs Ferencvaros` (`4518f115-fa02-4064-be9b-e7459514046e`): `completed`, có **475 phân đoạn**.
     - `Celtic vs Besiktas` (`859bee1b-9bf9-40bf-b5d4-d353348905dc`): `processing`, đã sinh **748 phân đoạn**.
     - `Sunderland vs Din. Zagreb` (`9aa98995-cf77-4b64-a35f-519bd1996a71`): `processing`, đã sinh **583 phân đoạn**.
2. **BUG-02-02 (Truy cập `matchId` không tồn tại `/matches/00000000-0000-0000-0000-000000000000` bị treo `"Đang tải..."` / `"Đang tải video..."` và mất thông báo lỗi)**: **CHƯA KHẮC PHỤC (Still FAIL — `TC 02-04-03`)**
   - **Bằng chứng**: API trả về `HTTP 404` (`reqid=1163, 1164, 1167`), nhưng vùng thông báo (`region "Notifications alt+T"`) rỗng (`""`), tiêu đề treo ở `"Đang tải..."`, badge `"Đang đồng bộ trực tiếp"` và khung video treo ở `"Đang tải video..."`.
3. **BUG-02-03 (Mới — Chuyển trang phân trang trên `/matches` làm mất bộ lọc trạng thái đang áp dụng)**:
   - **Bằng chứng**: Khi lọc `TRẠNG THÁI = Đã kết thúc` (`160 trận đấu`, `Trang 1 / 14`) rồi bấm `Tiếp`, ứng dụng gọi `GET /api/matches?page=2&page_size=12&sort_by=created_at&sort_order=desc&status=completed` (`reqid=904`) nhưng ngay lập tức điều hướng URL sang `/matches?page=2` (thiếu `&status=completed`), khiến trang remount và gọi lại `GET /api/matches?page=2&page_size=12&sort_by=created_at&sort_order=desc` (`reqid=911`), tự reset bộ lọc về `"Tất cả"` (`174 trận đấu`).
4. **BUG-02-04 (Mới — Kéo dài/ngắn segment trên Timeline báo lỗi `"Đã xảy ra lỗi: end_ms must be greater than start_ms."` và làm segment tự biến mất lúc mất lúc không)**:
   - **Bằng chứng**: Trong `/_next/static/chunks/0w4pskv~tngl~.js`:
     - **(1) Đảo biên làm `width < 0%` hoặc văng khỏi `viewRange` rồi tự hiện lại sau 5s polling**: Hàm `eM(allSegments, currentSegment, edge, durationMs)` tính `minStart` và `maxEnd` giả định các segment cùng `segment_type` không chồng lấp nhau. Trên thực tế, trong 200 segment đầu của trận `Troyes vs Le Mans` (`775f9ccd...`), có **52/200 segment (26%)** bị chồng lấp thời gian khiến `min > max` (ví dụ segment `f00360f5` `[4512000, 4544220]` chồng 60ms với `f2312a12` `[4374100, 4512060]`, làm `endBounds = { min: 4512100, max: 4374100 }`). Khi kéo cạnh phải, hàm `ej()` ép `end_ms = 4374100 < start_ms = 4512000`, khiến component `nt` tính `width = (end_ms - start_ms)/duration * 100 < 0` (hoặc nhảy ra ngoài bộ lọc `q = e.filter(e => e.start_ms < z.end && e.end_ms > z.start)`) làm **segment biến mất ngay dưới tay người dùng**; sau 800ms tự gọi `PATCH` trả lỗi `"end_ms must be greater than start_ms."`; đến chu kỳ polling 5 giây (`refetchInterval: 5000`), reducer `case "sync"` nạp lại dữ liệu gốc từ Server làm segment **tự xuất hiện lại**.
     - **(2) Thuật toán gom cụm `t9(q, z, 500)` ẩn bớt segment trên các trận `> 500` phân đoạn**: Khi số phân đoạn trong vùng nhìn `> 500` (trận `775f9ccd...` có 815 phân đoạn), hàm `t9` chia Timeline thành 500 bucket (`~21.6s / bucket` ở zoom `1x`) và chỉ giữ 1 segment mỗi bucket (trừ segment đang chọn `selectedId`). Khi kéo đổi `start_ms` sang bucket khác hoặc khi click sang segment khác, segment vừa kéo bị segment khác trong cùng bucket `21.6s` đè mất nên **tự biến mất khỏi Timeline**.

