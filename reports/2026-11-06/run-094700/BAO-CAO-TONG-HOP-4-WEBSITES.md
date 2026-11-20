# BÁO CÁO TỔNG HỢP KIỂM THỬ HỒI QUY 4 WEBSITES

- **Thời gian thực hiện**: `2026-11-06 09:07:32 — 09:47:09` (`Asia/Ho_Chi_Minh`)
- **Người thực hiện**: QA Tester (`chrome-devtools` MCP — Chế độ chỉ đọc / Read-Only)
- **Phạm vi**:
  1. **VTV Tư liệu**: `https://vtvtulieu.cmcati.vn/`
  2. **Sport Highlight**: `https://sport-highlight.cmcati.vn/matches`
  3. **Anti-Logo**: `https://anti-logo.cmcati.vn/`
  4. **SafeVision**: `https://safevision.cmcati.vn/`

---

## A. Bảng tổng hợp kết quả

| STT | Website | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | So sánh lần trước (`2026-11-05/run-152048`) |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 1 | **VTV Tư liệu** (`01-vtv-tu-lieu`) | 33 | 31 | 0 | 0 | 2 | **100.00%** | `+5 PASS, -2 FAIL, -3 BLOCKED` (Trước: `26P / 2F / 3B / 2NR` — `92.86%`) |
| 2 | **Sport Highlight** (`02-sport-highlight`) | 24 | 20 | 1 | 0 | 3 | **95.24%** | `+3 PASS, -2 FAIL, -1 BLOCKED` (Trước: `17P / 3F / 1B / 3NR` — `85.00%`) |
| 3 | **Anti-Logo** (`03-anti-logo`) | 34 | 24 | 0 | 0 | 10 | **100.00%** | `+3 PASS, -2 FAIL, -1 BLOCKED` (Trước: `21P / 2F / 1B / 10NR` — `91.30%`) |
| 4 | **SafeVision** (`04-safevision`) | 28 | 24 | 0 | 1 | 3 | **100.00%** | `+5 PASS, -3 FAIL, -2 BLOCKED` (Trước: `19P / 3F / 3B / 3NR` — `86.36%`) |
| **Tổng** | **4 Websites** | **119** | **99** | **1** | **1** | **18** | **99.00%** | **`+16 PASS, -9 FAIL, -7 BLOCKED`** (Trước: `83P / 10F / 8B / 18NR` — `89.25%`) |

---

## B. Bảng lỗi và đối chiếu lỗi cũ

### B.1. Các lỗi đang tồn tại / mới phát hiện trong lần chạy hiện tại

| Mã lỗi | Website | Chức năng | Expected | Actual | Ảnh hưởng | Lỗi mới/cũ | Bằng chứng | Cần quay Jam |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :---: |
| **BUG-02-02** | Sport Highlight | Chi tiết trận đấu (`02-04-03`) | Truy cập `/matches/00000000-0000-0000-0000-000000000000` hiển thị thông báo lỗi `"Match was not found."` và kết thúc trạng thái loading | API trả `404` (`reqid=1163, 1164, 1167`) nhưng vùng toast rỗng (`""`), giao diện bị treo vô hạn ở `"Đang tải..."` / `"Đang đồng bộ trực tiếp"` / `"Đang tải video..."` | Medium | **Lỗi cũ (Chưa khắc phục)** | `reqid=1163,1164,1167 [404]`; Snapshot `uid=258_4, 258_5, 258_30` (Chưa lưu được ảnh do Access denied) | **Có** |
| **BUG-02-03** | Sport Highlight | Tìm kiếm & Lọc + Phân trang (`02-03-03`) | Khi đang lọc `TRẠNG THÁI = Đã kết thúc` (`160 trận đấu`, `Trang 1 / 14`), bấm `Tiếp` phải chuyển sang `Trang 2 / 14` của tập đã lọc | Bấm `Tiếp` gọi `reqid=904` có `&status=completed` nhưng URL chuyển sang `/matches?page=2` làm mất query lọc, tự gọi lại `reqid=911` không có `status` và reset bộ lọc về `"Tất cả"` (`174 trận đấu`) | Medium | **Lỗi mới** | `reqid=904` vs `reqid=911` trên `/matches?page=2` (Chưa lưu được ảnh do Access denied) | **Có** |
| **BUG-02-04** | Sport Highlight | Kéo dài/ngắn Segment trên Timeline (`02-04-02`) | Kéo cạnh trái (`start`) hoặc cạnh phải (`end`) của segment trên Timeline cập nhật `start_ms < end_ms` hợp lệ, giữ nguyên hiển thị khối segment và lưu `PATCH` thành công | **(1)** Với các segment cùng loại chồng lấp thời gian (52/200 segment đầu của trận `775f9ccd...`), hàm `eM()` trong `0w4pskv~tngl~.js` tính `min > max` làm `ej()` ép `end_ms < start_ms` -> `width` âm hoặc nhảy khỏi `viewRange` (`q`) làm **segment biến mất ngay khi kéo**, sau 800ms gọi `PATCH` báo lỗi `"end_ms must be greater than start_ms."`, rồi 1–5s sau polling `refetchInterval: 5000` đồng bộ lại làm segment hiện lại. **(2)** Với trận `> 500` segment (vd 815 segment), hàm gom cụm `t9(q, z, 500)` chỉ giữ 1 segment mỗi bucket `21.6s` (trừ `selectedId`), làm segment **tự biến mất khi kéo đổi vị trí hoặc khi bỏ chọn** | High | **Lỗi mới** | Ảnh đính kèm của Tester; `0w4pskv~tngl~.js` (`eM`, `t9`, `nt`, `eB`); API `/api/matches/775f9ccd.../segments` | **Có** |

### B.2. Kết quả kiểm tra lại các lỗi cũ từ báo cáo `2026-11-05/run-152048`

| Mã lỗi cũ | Website | Mô tả ngắn | Trạng thái hiện tại | Bằng chứng xác minh |
| :---: | :--- | :--- | :---: | :--- |
| **BUG-01-01** | VTV Tư liệu | Phân trang trên `/results` không chuyển sang trang 2 | **Đã khắc phục** | Tìm `"thời sự"` (38 kết quả), bấm trang `2` cập nhật URL `&page_id=2` và gọi `GET /api/v1/search/text?...&page_id=2 [200]` (`reqid=89`). |
| **BUG-01-02** | VTV Tư liệu | Trợ lý hỏi đáp video báo lỗi hệ thống sau 30s | **Đã khắc phục** | Gửi `"Video này nói về nội dung gì?"` trên video `be08b277...`, `POST /api/v1/videos/.../chat [200]` (`reqid=484`, ~24s) trả về bản tóm tắt đầy đủ kèm 8 nút mốc thời gian; bấm `5:48` tua video tới `350s`. |
| **BUG-02-01** | Sport Highlight | Các trận `Hoàn tất` hiển thị `0 phân đoạn` | **Đã khắc phục** | `Troyes vs Le Mans` (`775f9ccd...`) có **815 phân đoạn** (`completed`); `Le Mans vs Toulouse` (`c26dae78...`) có **811 phân đoạn**; `Ac Milan vs Ferencvaros` (`4518f115...`) có **475 phân đoạn**. |
| **BUG-03-01** | Anti-Logo | Cột `Flag=0` nhưng modal `✏️ Sửa BBox` hiển thị `FLAG 1` | **Đã khắc phục** | Dòng `Frame #27390` (`Flag=0, Player=found, Logo=none`) hiển thị đúng `#thumbModalTitle`: `"Frame #27390 — FLAG 0 (Player: found, Logo: none)"`. |
| **BUG-03-02** | Anti-Logo | Bật `Show only flag=1` làm bảng Logs trống dù `Flag=1 count > 0` | **Đã khắc phục** | Bật `Show only flag=1` khi `Flag=1 count = 397` hiển thị đúng 75 dòng `Flag=1` (`Showing 2-76 of 302 frames`). |
| **BUG-04-01** | SafeVision | Thứ tự `bản đồ 3` đứng trước `bản đồ 2` trong thống kê logo | **Cần xác nhận (Không tính lỗi)** | API `GET /api/v1/dashboard/stats` (`reqid=7359`) trả `topLogos` sắp xếp giảm dần theo `count` (`bản đồ 3: 32` > `bản đồ 2: 28`), UI hiển thị đúng theo `count`. |
| **BUG-04-02** | SafeVision | Luồng stream gốc HLS trên `VTV1`/`VTV3` bị chặn CORS & HTTP 503 | **Đã khắc phục** | Luồng gốc trên `VTV3` và `VTV1` đều phát mượt ở `1280x720 @ 25 FPS`, `readyState = 4`, `playbackRatio = 1.000`, `droppedFrames = 0%`. |
| **BUG-04-03** | SafeVision | Ô `Tìm kiếm nhanh...` trên `<header>` không hoạt động | **Đã gỡ bỏ khỏi UI (Cần xác nhận đặc tả)** | Dev đã xóa bỏ `input[placeholder="Tìm kiếm nhanh..."]` khỏi `<header>` (`headerInputCount = 0`); `TC 04-07-03` chuyển sang `BLOCKED` chờ cập nhật tài liệu TC. |

---

## C. Danh sách Test Case chưa chạy (`NOT_RUN`) hoặc bị chặn (`BLOCKED`) và lý do

### 1. Bị chặn (`BLOCKED` — 1 TC)
- **`04-07-03`** (SafeVision — *Tìm kiếm nhanh trên thanh Header toàn cục*): Ô `Tìm kiếm nhanh...` trên `<header>` đã được gỡ bỏ khỏi giao diện (`document.querySelectorAll('header input').length === 0`), cần xác nhận với PO/Dev để cập nhật lại tài liệu Test Case.

### 2. Chưa chạy do ngoài phạm vi chỉ đọc (`NOT_RUN` — 18 TC)
- **VTV Tư liệu (2 TC)**:
  - `01-10-02`: Thực hiện tải video mới lên hệ thống (Ngoài phạm vi chỉ đọc).
  - `01-10-03`: Kiểm tra giới hạn định dạng/dung lượng file khi tải lên và Đăng ký khuôn mặt / địa danh (Ngoài phạm vi chỉ đọc).
- **Sport Highlight (3 TC)**:
  - `02-07-01`, `02-07-02`, `02-07-03`: Mở/tạo/submit form Tạo trận đấu mới (Ngoài phạm vi chỉ đọc — đã kiểm tra nhanh mở/đóng modal không lưu).
- **Anti-Logo (10 TC)**:
  - `03-07-03`: Vẽ mới, đổi nhãn, xóa Box và Lưu BBox (Ngoài phạm vi chỉ đọc).
  - `03-08-01`, `03-08-02`, `03-08-03`: Chọn frame và Export gói dữ liệu CI/CD (Ngoài phạm vi chỉ đọc).
  - `03-09-01`, `03-09-02`, `03-09-03`: Thay đổi cấu hình FPS, Độ mờ, Select all / Clear all lớp nhãn YOLO trên kênh LIVE (Ngoài phạm vi chỉ đọc — đã ghi nhận chỉ số hiện tại `10 FPS`, `21 px`, `106/106 enabled`).
  - `03-10-01`, `03-10-02`, `03-10-03`: Thay đổi tọa độ vùng bảo vệ Protect ROI trên kênh LIVE (Ngoài phạm vi chỉ đọc — đã ghi nhận chỉ số hiện tại `X=47, Y=71, W=266, H=60`).
- **SafeVision (3 TC)**:
  - `04-03-03`: Thêm kênh truyền hình mới (Ngoài phạm vi chỉ đọc).
  - `04-08-02`: Thay đổi nguồn phát, danh mục logo và cập nhật AI Prompt (Ngoài phạm vi chỉ đọc).
  - `04-08-03`: Bắt đầu / Dừng phiên giám sát AI trên kênh (Ngoài phạm vi chỉ đọc).

---

## D. Nội dung Task soạn sẵn để đưa lên Notion cho Dev

### Task 1 — `[Sport Highlight][FE] Lỗi "end_ms must be greater than start_ms." và hiện tượng Segment tự biến mất (lúc mất lúc không) khi kéo dài/ngắn trên Timeline (BUG-02-04)`
- **Mức độ ưu tiên**: High (P1)
- **Môi trường**: `https://sport-highlight.cmcati.vn/matches/775f9ccd-6933-422b-9b76-5cd13a553ba1`
- **Mô tả lỗi**:
  1. Khi nắm kéo dài/ngắn cạnh phải (`end`) hoặc cạnh trái (`start`) của một phân đoạn (segment) trên thanh Timeline có chồng lấp thời gian với một segment khác cùng `segment_type` (chiếm 52/200 segment đầu của trận `Troyes vs Le Mans`), ứng dụng tự động ép `end_ms < start_ms`, làm khối segment **biến mất ngay dưới tay người dùng**, sau 800ms gửi `PATCH /api/matches/{matchId}/segments/{segmentId}` gây lỗi toast đỏ `"Đã xảy ra lỗi: end_ms must be greater than start_ms."`, rồi 1–5 giây sau lại tự hiện ra.
  2. Ngoài ra, trên các trận có tổng số segment trong vùng nhìn `> 500` (ví dụ `Troyes vs Le Mans` có `815` segment), khi kéo dài/ngắn hoặc khi chọn sang segment khác, các segment lân cận hoặc chính segment vừa kéo **tự biến mất lúc mất lúc không**.
- **Nguyên nhân kỹ thuật xác định từ bundle `/_next/static/chunks/0w4pskv~tngl~.js`**:
  1. **Lỗi đảo biên trong `function eM()` làm `width < 0%` hoặc văng khỏi `viewRange` (`q`) rồi hồi sinh sau 5s polling**:
     ```js
     minStart: s.filter(e => e.start_ms < t.end_ms).reduce((e, t) => Math.max(e, t.end_ms), 0),
     maxEnd:   s.filter(e => e.end_ms > t.start_ms).reduce((e, t) => Math.min(e, t.start_ms), r)
     ```
     - Khi segment `s_i` cùng loại chồng lấp với `t` (ví dụ `s_i = [4374100, 4512060]` và `t = [4512000, 4544220]`), `maxEnd` bị gán bằng `4374100 < t.start_ms`. Khi kéo cạnh `"end"`, `eM` trả về `{ min: 4512100, max: 4374100 }` (`min > max`) và hàm `ej(val, min, max)` luôn trả về `max = 4374100`, làm `end_ms < start_ms`.
     - Khi `end_ms < start_ms`:
       - Component `nt` tính `h = (e.end_ms - e.start_ms) / t.duration * 100 < 0` (`style={{ width: "${h}%" }}` âm nên không hợp lệ).
       - Nếu `end_ms` nhảy lùi qua `viewRange.start` (hoặc `start_ms` nhảy vượt qua `viewRange.end`), bộ lọc `q = e.filter(e => e.start_ms < z.end && e.end_ms > z.start)` loại thẳng segment khỏi DOM -> **biến mất ngay lập tức**.
       - Sau 800ms, `PATCH` trả lỗi `400/422` nên segment ID bị xóa khỏi `preserveIds` (`a.current.delete(e)`). Đến chu kỳ `refetchInterval: 5000` (5 giây) của `useMatchSegments`, reducer `case "sync"` nạp lại `start_ms / end_ms` cũ từ Server làm segment **tự hiện lại**.
  2. **Lỗi gom cụm `function t9(q, z, 500, ...)` ẩn mất segment khi trận đấu có `> 500` segment**:
     ```js
     W = useMemo(() => t9(q, z, 500, e => ea[e.segment_type], r), [q, z, r]);
     ```
     - Khi `q.length > 500` (như trận `775f9ccd...` có 815 segment), `t9` chia `viewRange` thành 500 bucket (`~21.6s / bucket` ở zoom `1x`) và **chỉ vẽ 1 segment duy nhất trong mỗi bucket**, ngoại trừ segment đang chọn (`n.id === selectedId`) được ưu tiên giữ lại.
     - Do đó khi đang chọn/kéo một segment thì nó hiện, nhưng khi kéo làm `start_ms` nhảy sang bucket khác, hoặc khi auto-pan dịch `viewRange`, hoặc ngay khi bỏ chọn (`selectedId` đổi sang segment khác), nó bị segment khác trong cùng bucket `21.6s` đè mất và **biến mất khỏi Timeline**.
- **Đề xuất hướng xử lý**:
  1. Trong `eM()`, chỉ chặn biên bởi các segment không chồng lấp (`e.end_ms <= t.start_ms` cho `minStart`, và `e.start_ms >= t.end_ms` cho `maxEnd`), đồng thời đảm bảo `max >= min`.
  2. Trong `scheduleTimeUpdate` / `flushSegmentTimeUpdate`, kiểm tra `end_ms > start_ms` trước khi gọi `PATCH`, và thêm `onError` trong `f.mutate(...)` để rollback state local ngay lập tức thay vì chờ 5s polling.
  3. Trong `t9(q, z, 500, ...)`, nâng ngưỡng render hoặc gom bucket riêng theo từng `lane` / giữ nguyên các segment đã từng được người dùng chỉnh sửa để không bị ẩn mất ở mức zoom `1x`.

### Task 2 — `[Sport Highlight][FE] Trang chi tiết trận đấu treo "Đang tải..." vô hạn khi truy cập matchId không tồn tại (BUG-02-02)`
- **Mức độ ưu tiên**: Medium (P2)
- **Môi trường**: `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000`
- **Mô tả lỗi**:
  - Khi `GET /api/matches/{matchId}` trả về `HTTP 404`, giao diện không hiển thị toast lỗi `"Match was not found."` và giữ nguyên trạng thái `"Đang tải..."`, `"Đang đồng bộ trực tiếp"`, `"Đang tải video..."` vô hạn.
- **Đề xuất hướng xử lý**:
  - Bắt trạng thái `404` từ `GET /api/matches/{matchId}` để dừng loading/polling và hiển thị Empty/Error State `"Không tìm thấy trận đấu"` kèm nút quay lại `/matches`.

### Task 3 — `[Sport Highlight][FE] Chuyển trang phân trang trên /matches làm mất bộ lọc đang áp dụng (BUG-02-03)`
- **Mức độ ưu tiên**: Medium (P2)
- **Môi trường**: `https://sport-highlight.cmcati.vn/matches`
- **Mô tả lỗi**:
  - Khi chọn bộ lọc (ví dụ `TRẠNG THÁI = Đã kết thúc` -> `160 trận đấu, Trang 1 / 14`) rồi bấm `Tiếp`, link phân trang điều hướng tới `/matches?page=2` mà không giữ các query params của bộ lọc (`status`, `search`, `tournament_id`...), làm bộ lọc tự reset về `"Tất cả"` (`174 trận đấu`).
- **Đề xuất hướng xử lý**:
  - Đồng bộ state bộ lọc với URL searchParams khi tạo href/router push cho nút `Trước` / `Tiếp`.

---

## E. Đường dẫn báo cáo thực tế đã lưu

1. **Báo cáo tổng hợp 4 Websites**:
   - `reports/2026-11-06/run-094700/BAO-CAO-TONG-HOP-4-WEBSITES.md`
2. **Website 01 — VTV Tư liệu**:
   - `websites/01-vtv-tu-lieu/reports/2026-11-06/run-094700/results.csv`
   - `websites/01-vtv-tu-lieu/reports/2026-11-06/run-094700/summary.md`
3. **Website 02 — Sport Highlight**:
   - `websites/02-sport-highlight/reports/2026-11-06/run-094700/results.csv`
   - `websites/02-sport-highlight/reports/2026-11-06/run-094700/summary.md`
   - `websites/02-sport-highlight/reports/2026-11-06/run-094700/bugs/BUG-02-02.md`
   - `websites/02-sport-highlight/reports/2026-11-06/run-094700/bugs/BUG-02-03.md`
   - `websites/02-sport-highlight/reports/2026-11-06/run-094700/bugs/BUG-02-04.md`
4. **Website 03 — Anti-Logo**:
   - `websites/03-anti-logo/reports/2026-11-06/run-094700/results.csv`
   - `websites/03-anti-logo/reports/2026-11-06/run-094700/summary.md`
5. **Website 04 — SafeVision**:
   - `websites/04-safevision/reports/2026-11-06/run-094700/results.csv`
   - `websites/04-safevision/reports/2026-11-06/run-094700/summary.md`

