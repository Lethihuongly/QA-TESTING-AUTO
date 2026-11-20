# Báo cáo Kiểm thử Hồi quy Website 02 — Sport Highlight (CMCATI Highlight)

- **Run_ID:** `run-090400`
- **Ngày giờ thực thi:** `2026-11-10T09:30:57+07:00` — `2026-11-10T09:53:00+07:00` (Asia/Ho_Chi_Minh)
- **URL kiểm thử:** `https://sport-highlight.cmcati.vn/matches`
- **Công cụ:** `chrome-devtools` MCP (Read-Only Regression)

---

## 1. Tổng hợp Kết quả Kiểm thử

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Tổng số Test Case (duy nhất từ `test-cases.md`)** | **24** | Đếm từ 8 file `features/*/test-cases.md` (mỗi feature 3 case) |
| **PASS** | **19** | Đã thực thi bằng MCP và đáp ứng đầy đủ Expected |
| **FAIL** | **2** | `02-03-03` (`BUG-02-03` OPEN), `02-04-03` (`BUG-02-02` PARTIALLY FIXED) |
| **BLOCKED** | **0** | Không có test case bị chặn |
| **NOT_RUN** | **3** | `02-07-01`, `02-07-02`, `02-07-03` (Ngoài phạm vi chỉ đọc — không tạo trận mới/ghi hình) |
| **Tỷ lệ PASS (`PASS / (PASS + FAIL)`)** | **90.48% (19/21)** | Chỉ tính trên các test case đã chạy ra kết quả PASS/FAIL |

### Mâu thuẫn phát hiện trong báo cáo cũ (`2026-11-09/run-110430`)
1. **Sai cấu trúc cột `results.csv`:** Báo cáo cũ không dùng header chuẩn của `templates/results.csv`.
2. **Đánh giá sai `02-03-03` là `PASS`:** Trong `run-110430`, `BUG-02-03` (chuyển sang trang 2 làm mất bộ lọc trạng thái) được ghi nhận là `OPEN`, nhưng test case `02-03-03` kiểm tra đúng luồng đó lại được chấm `PASS`. Ở lần chạy này, `02-03-03` được chấm đúng là **FAIL**.
3. **Sai nội dung `02-02-03` và tên Feature `07`:** Trong `run-110430/results.csv`, `02-02-03` kiểm tra nút `'Trước' disabled` thay vì nhấn vào thẻ trận đấu mở trang chi tiết; các mã `02-07-01..03` bị đổi tên thành `07-Chinh-sua-Phan-doan` thay vì `07-Upload-ghi-hinh`.
4. **Lịch sử tái sử dụng mã `BUG-02-01`:** Trong `CHANGELOG.md` ngày `2026-11-03`, `BUG-02-01` là lỗi `AI_HEARTBEAT_TIMEOUT`, nhưng từ `2026-11-05` trở đi được dùng cho lỗi `HLS stream.m3u8 404` trên trận `Troyes vs Le Mans`.

---

## 2. Kết quả Kiểm tra lại Bug cũ (Retest)

| Bug_ID | Case_ID | Mô tả | Trạng thái cũ | Trạng thái hiện tại | Bằng chứng & Ghi chú |
|---|---|---|---|---|---|
| **BUG-02-01** | `02-05-01` | Trình phát HLS lỗi `404` cho `stream.m3u8` / `index.m3u8` trên trận đã hoàn thành | FIXED | **FIXED** | Kiểm tra thực tế trên `Sevilla vs Alaves` (`28fa419c...`): `GET /api/matches/.../hls/index.m3u8` và `000.ts..014.ts` đều trả về `HTTP 200`; `<video>` có `readyState=4`, `paused=false`, `currentTime=50.98s`, `duration=9900s`, `1920x1080`, `error=null`. Kiểm tra thêm 3 trận đã hoàn thành khác (`Le Mans vs Monaco`, `Troyes vs Le Mans` — trận gốc của bug, `Le Mans vs Toulouse`) đều trả về `HTTP 200` cho `/hls/index.m3u8`. Xem `bugs/BUG-02-01-retest.md`. |
| **BUG-02-02** | `02-04-03` | Mở URL trận đấu không tồn tại bị kẹt `"Đang tải..."` / `"Đang tải video..."` và lặp request 404 | PARTIALLY FIXED | **PARTIALLY FIXED** *(Cần quay Jam xác minh UI)* | Mở `/matches/00000000-0000-0000-0000-000000000000` và theo dõi >55 giây: **(1) Phần polling lặp 404:** **ĐÃ SỬA** (dừng hẳn sau 6 request tải lần đầu tại `t=1.7s–2.6s`, không còn lặp mỗi 5s). **(2) Phần UI (`02-04-03`):** **CHƯA SỬA (`FAIL`)** — sau khi toast tự tắt, giao diện vẫn kẹt vĩnh viễn ở tiêu đề `"Đang tải..."` (`uid=68_4`), badge `"Đang đồng bộ trực tiếp"` (`uid=68_5`) và khung video `"Đang tải video..."` (`uid=68_30`). Xem `bugs/BUG-02-02.md`. |
| **BUG-02-03** | `02-03-03` | Chuyển sang trang 2 làm mất bộ lọc trạng thái (`TRẠNG THÁI`) và từ khóa tìm kiếm trên `/matches` | OPEN | **OPEN (`FAIL`)** *(Cần quay Jam xác minh UI)* | Đã tái hiện 2 lần: Lọc `TRẠNG THÁI = "Đã kết thúc"` (và kết hợp `TÌM KIẾM = "a"` + `TRẠNG THÁI = "Đã kết thúc"` -> `159 trận đấu`, `Trang 1 / 14`) rồi nhấn `"Tiếp"` sang `/matches?page=2`: URL không giữ tham số lọc làm route transition reset `TRẠNG THÁI` về `"Tất cả"` (`uid=57_19, 62_19`), xóa trắng ô `TÌM KIẾM` và gọi lại `reqid=599 GET /api/matches?page=2...` không có tham số lọc (`173 trận đấu`, `Trang 2 / 15`). Xem `bugs/BUG-02-03.md`. |
| **BUG-02-04** | `02-05-02` | Hiển thị phân đoạn trên Timeline khi chọn/bỏ chọn/zoom và giới hạn kéo biên segment | PARTIALLY FIXED | **Phần 2 (Timeline UI chỉ đọc): FIXED** / **Phần 1 (Kéo biên `PATCH`): CHƯA KIỂM CHỨNG (Read-Only Scope)** | **(1) Phần hiển thị Timeline (`02-05-02`):** Tại `1x` hiển thị đủ `599/599` khối phân đoạn; khi chọn phân đoạn 2 (`00:00:15 - 00:00:18`), toàn bộ `599` khối vẫn hiển thị đầy đủ; khi phóng to `2x`, Timeline virtualization hiển thị `375` khối trong khung nhìn (`00:00:00 - 01:23:44`). **(2) Phần kéo biên segment:** Không thực hiện trên dữ liệu thật vì tự động gửi `PATCH`; không kết luận đã `FIXED` chỉ từ việc đọc mã. Xem `bugs/BUG-02-04-retest.md`. |

---

## 3. Bảng Kết quả Chi tiết Từng Test Case (24 Cases)

| Case_ID | Feature | Priority | Status | Tóm tắt kết quả thực tế (Actual) | Bug_ID |
|---|---|---|---|---|---|
| `02-01-01` | `01-Dang-nhap` | P0 | **PASS** | Khi đã đăng xuất truy cập `/matches` tự chuyển hướng về `/login?next=%2Fmatches`; hiển thị đủ form đăng nhập. | |
| `02-01-02` | `01-Dang-nhap` | P0 | **PASS** | `GET /api/auth/me` (`reqid=505`) và `GET /api/matches` (`reqid=507`) trả về `HTTP 200`; hiển thị `173 trận đấu` (`Trang 1 / 15`). | |
| `02-01-03` | `01-Dang-nhap` | P1 | **PASS** | `#username` và `#password` có `required=true`, `checkValidity()=false` khi trống, `type="password"`, có nút `Hiện mật khẩu`. | |
| `02-02-01` | `02-Danh-sach-tran` | P0 | **PASS** | Hiển thị `KẾT QUẢ 173 trận đấu`, `Trang 1 / 15` và lưới 12 thẻ trận đấu trên trang 1. | |
| `02-02-02` | `02-Danh-sach-tran` | P1 | **PASS** | Mỗi thẻ hiển thị đầy đủ thông tin; nhấn `Làm mới danh sách trận` (`uid=50_8`) gọi lại `GET /api/matches` (`reqid=555` HTTP 200). | |
| `02-02-03` | `02-Danh-sach-tran` | P1 | **PASS** | Nhấn thẻ `Sevilla – – Alaves` (`uid=64_36`) chuyển sang `/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a?fromPage=2`. | |
| `02-03-01` | `03-Tim-kiem-Loc-Phan-trang` | P0 | **PASS** | Tìm `"Real Madrid"` (`reqid=556`) trả về `11 trận đấu`; nhấn `"Đặt lại"` (`reqid=588`) khôi phục `173 trận đấu`. | |
| `02-03-02` | `03-Tim-kiem-Loc-Phan-trang` | P1 | **PASS** | Tìm `"xyz_khong_ton_tai_9999"` (`reqid=587`) hiển thị `0 trận đấu` và `"Không tìm thấy trận đấu"`. | |
| `02-03-03` | `03-Tim-kiem-Loc-Phan-trang` | P1 | **FAIL** | Chọn bộ lọc `TRẠNG THÁI = "Đã kết thúc"` (và `TÌM KIẾM = "a"`) rồi nhấn `"Tiếp"` sang trang 2 làm mất bộ lọc, reset về `"Tất cả"` (`173 trận đấu`). | `BUG-02-03` |
| `02-04-01` | `04-Chi-tiet-tran-Trang-thai-AI` | P0 | **PASS** | `/matches/28fa419c...` hiển thị đầy đủ 4 khu vực: Header, Sidebar lọc trái, Player + Timeline (`599` đoạn), Sidebar `HÀNG ĐỢI AI` (`599`). | |
| `02-04-02` | `04-Chi-tiet-tran-Trang-thai-AI` | P1 | **PASS** | Hiển thị `"Đang đồng bộ trực tiếp"`, không có lỗi `AI_HEARTBEAT_TIMEOUT`, tải đủ 599 phân đoạn AI. | |
| `02-04-03` | `04-Chi-tiet-tran-Trang-thai-AI` | P1 | **FAIL** | Mở `/matches/00000000-0000-0000-0000-000000000000`: đã dừng polling lặp 404 sau 6 request đầu, nhưng UI vẫn kẹt vĩnh viễn ở `"Đang tải..."` và `"Đang tải video..."`. | `BUG-02-02` |
| `02-05-01` | `05-Phat-video-Chon-phan-doan` | P0 | **PASS** | HLS `/hls/index.m3u8` và `000.ts..014.ts` trả về `HTTP 200`; `<video>` phát mượt (`readyState=4`, `currentTime=50.98s`, `1920x1080`, `error=null`). | `BUG-02-01` |
| `02-05-02` | `05-Phat-video-Chon-phan-doan` | P1 | **PASS** | Chọn phân đoạn 2 tua đến `15.36s`; Timeline hiển thị đủ `599/599` khối ở `1x` và `375` khối trong vùng nhìn ở `2x`. | `BUG-02-04` |
| `02-05-03` | `05-Phat-video-Chon-phan-doan` | P2 | **PASS** | Trên trận không có dữ liệu (`00000000...`), toàn bộ nút điều khiển Player và chỉnh sửa phân đoạn đều `disabled`. | |
| `02-06-01` | `06-Tao-Xem-Highlight` | P1 | **PASS** | Trên trận `Benfica vs Celtic` (`35304664...`), dialog `Danh sách Highlight` hiển thị đủ 9 cột và 2 bản ghi highlight hoàn tất. | |
| `02-06-02` | `06-Tao-Xem-Highlight` | P1 | **PASS** | Cả 2 bản ghi có link `YouTube` hợp lệ (`watch?v=jYK60p629fc`, `watch?v=GId1iQIqHC8`) và nút `Tải highlight`. | |
| `02-06-03` | `06-Tao-Xem-Highlight` | P2 | **PASS** | Trên trận chưa xuất highlight (`Sevilla vs Alaves`), dialog hiển thị `"Trận này chưa có highlight được export."`. | |
| `02-07-01` | `07-Upload-ghi-hinh` | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc — không tạo trận mới/ghi hình (đã kiểm tra mở/đóng an toàn dialog `Tạo trận đấu` `uid=63_0`). | |
| `02-07-02` | `07-Upload-ghi-hinh` | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc — không tạo trận đấu/ghi hình trên hệ thống đang hoạt động. | |
| `02-07-03` | `07-Upload-ghi-hinh` | P2 | **NOT_RUN** | Ngoài phạm vi chỉ đọc — không gửi request POST tạo trận đấu lên server thật. | |
| `02-08-01` | `08-Dang-xuat` | P1 | **PASS** | Mở menu tài khoản (`uid=74_11`) hiển thị mục `Đăng xuất` (`uid=75_1`). | |
| `02-08-02` | `08-Dang-xuat` | P0 | **PASS** | Nhấn `Đăng xuất` gọi `POST /api/auth/logout [303]` (`reqid=1148`), xóa phiên (`GET /api/auth/me` -> `401`) và chuyển về `/login`. | |
| `02-08-03` | `08-Dang-xuat` | P0 | **PASS** | Khi phiên đã bị xóa (`401`), truy cập `/matches` bị chặn và chuyển hướng về `/login?next=%2Fmatches`. | |

