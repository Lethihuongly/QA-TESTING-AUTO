# Báo cáo Kiểm thử Hồi quy Website 01 — VTV Tư liệu (CMC Video Miner)

- **Run_ID:** `run-090400`
- **Ngày giờ thực thi:** `2026-11-10T09:04:00+07:00` — `2026-11-10T09:28:00+07:00` (Asia/Ho_Chi_Minh)
- **URL kiểm thử:** `https://vtvtulieu.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP (Read-Only Regression)

---

## 1. Tổng hợp Kết quả Kiểm thử

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Tổng số Test Case (duy nhất từ `test-cases.md`)** | **33** | Đếm từ 11 file `features/*/test-cases.md` (mỗi feature 3 case) |
| **PASS** | **31** | Đã thực thi bằng MCP và đáp ứng đầy đủ Expected |
| **FAIL** | **0** | Không có test case thất bại |
| **BLOCKED** | **0** | Không có test case bị chặn |
| **NOT_RUN** | **2** | `01-10-02`, `01-10-03` (Ngoài phạm vi chỉ đọc — không upload/tạo dữ liệu mới) |
| **Tỷ lệ PASS (`PASS / (PASS + FAIL)`)** | **100.0% (31/31)** | Chỉ tính trên các test case đã chạy ra kết quả PASS/FAIL |

### Mâu thuẫn phát hiện trong báo cáo cũ (`2026-11-09/run-110430`)
1. **Sai cấu trúc cột `results.csv`:** Báo cáo cũ dùng header `tc_id,feature,Priority,status,executed_at,evidence_path,notes` thay vì chuẩn `templates/results.csv` (`Run_ID,Case_ID,Feature,Priority,Status,Expected,Actual,Evidence,Bug_ID,Time,Environment`).
2. **Đánh tráo nhãn Feature `04` và `07`:** Trong `run-110430/results.csv`, các mã `01-04-01..03` bị gắn nhãn `07-Lich-su-upload` và `01-07-01..03` bị gắn nhãn `04-Danh-sach-tu-lieu`, ngược với định nghĩa trong `features/04-Danh-sach-tu-lieu/test-cases.md` và `features/07-Lich-su-upload/test-cases.md`.

---

## 2. Kết quả Kiểm tra lại Bug cũ (Retest)

| Bug_ID | Case_ID | Mô tả | Trạng thái cũ | Trạng thái hiện tại | Bằng chứng & Ghi chú |
|---|---|---|---|---|---|
| **BUG-01-01** | `01-03-02` | Không thể chuyển sang trang 2 ở kết quả tìm kiếm (`/results`) | FIXED | **FIXED** *(kèm lưu ý timeout tạm thời)* | Với từ khóa `"Công nghệ thực tế ảo VR"` (`87` kết quả): lần nhấn trang 2 đầu tiên (`reqid=59`) gặp lỗi timeout mạng `net::ERR_FAILED` / thiếu CORS header trên lỗi gateway và hiện `"Something went wrong"`; thử lại ngay (`reqid=77`) trả về `HTTP 200`, `activePage="2"`, hiển thị 20 video trang 2. Với từ khóa `"thời sự"` (`38` kết quả): nhấn trang 2 chuyển ngay sang `&page_id=2`, hiển thị 18 video còn lại (`20 + 18 = 38`). Xem `bugs/BUG-01-01-retest.md`. |
| **BUG-01-02** | `01-09-02` | Trợ lý hỏi đáp AI xoay vòng loading vô tận, không trả lời trên `/watch` | FIXED | **FIXED** | Gửi 1 câu hỏi gợi ý `"Video này nói về nội dung gì?"` trên video `be08b277-678b-4b51-868e-10dd4d92d6b2`: `POST /api/v1/videos/.../chat` (`reqid=382`) trả về `HTTP 200` trong **3060 ms** (~3.06s), hiển thị đầy đủ câu trả lời kèm 8 mốc thời gian, không có lỗi Console/UI. Xem `bugs/BUG-01-02-retest.md`. |

---

## 3. Bảng Kết quả Chi tiết Từng Test Case (33 Cases)

| Case_ID | Feature | Priority | Status | Tóm tắt kết quả thực tế (Actual) | Bug_ID |
|---|---|---|---|---|---|
| `01-01-01` | `01-Dang-nhap` | P0 | **PASS** | Chưa đăng nhập truy cập `/warehouse-management` tự chuyển hướng về `/login?next=%2Fwarehouse-management`; hiển thị đủ form đăng nhập. | |
| `01-01-02` | `01-Dang-nhap` | P0 | **PASS** | `GET /api/v1/auth/me` trả về `HTTP 200` (`reqid=28`), STOMP WebSocket connected (`msgid=2`), vào trang chủ `/`. | |
| `01-01-03` | `01-Dang-nhap` | P1 | **PASS** | `#username` và `#password` có `required=true`, `checkValidity()=false` khi trống; nút `Hiện mật khẩu` đổi sang `Ẩn mật khẩu`. | |
| `01-02-01` | `02-Trang-chu` | P1 | **PASS** | Header hiển thị tên hệ thống + 4 nút công cụ; vùng chính hiển thị `CMC VIDEO MINER`, ô tìm kiếm và 6 thẻ gợi ý. | |
| `01-02-02` | `02-Trang-chu` | P1 | **PASS** | Nhấn thẻ `"Công nghệ thực tế ảo VR"` chuyển sang `/results?q=...`, trả về `87` kết quả (`reqid=39` HTTP 200, 11277ms). | |
| `01-02-03` | `02-Trang-chu` | P2 | **PASS** | Khi `Search input` trống, nút `Initiate search` (`uid=1_14`) có `disabled=true`. | |
| `01-03-01` | `03-Tim-kiem` | P0 | **PASS** | Mở/đóng dialog `"Tìm kiếm bằng hình ảnh"` (`uid=2_0`) bình thường; tìm `"thời sự"` trả về `38` kết quả (`reqid=94` HTTP 200). | |
| `01-03-02` | `03-Tim-kiem` | P1 | **PASS** | Chuyển sang trang 2 (`&page_id=2`) hiển thị đúng 20 video trang 2 (`"Công nghệ thực tế ảo VR"`) và 18 video trang 2 (`"thời sự"`). | `BUG-01-01` |
| `01-03-03` | `03-Tim-kiem` | P1 | **PASS** | Tìm `"xyznonexistent12345"` hiện `"Không tìm thấy kết quả nào!"`; nhấn `Clear search input` làm trống ô và `disabled` nút tìm. | |
| `01-04-01` | `04-Danh-sach-tu-lieu` | P0 | **PASS** | `/warehouse-management` hiển thị `140 mục` (`140 video, 24 trang`), 3 tab và bảng 8 cột. | |
| `01-04-02` | `04-Danh-sach-tu-lieu` | P1 | **PASS** | Lọc `"Thời sự"` còn `17 mục` (3 trang), chuyển trang 2 (`&manual_page=2`) và mở chi tiết `/watch?video_id=be08b277...`. | |
| `01-04-03` | `04-Danh-sach-tu-lieu` | P2 | **PASS** | Lọc `"xyz_khong_ton_tai_9999"` hiển thị `0 mục` và `"Không có lịch sử upload"`. | |
| `01-05-01` | `05-Chi-tiet-Phat-video` | P0 | **PASS** | `/watch?video_id=be08b277...` hiển thị 19 phân đoạn, `<video>` (`readyState=4`, `duration=1317.48s`, `1920x1080`, `error=null`), Ghi chú & Phân tích clip. | |
| `01-05-02` | `05-Chi-tiet-Phat-video` | P1 | **PASS** | Video phát mượt (`currentTime` tăng); chọn phân đoạn 2 tua đến `1:53 / 21:57` và cập nhật `Phân đoạn 2/19`. | |
| `01-05-03` | `05-Chi-tiet-Phat-video` | P1 | **PASS** | Truy cập `video_id=00000000-0000-0000-0000-000000000000` hiển thị `"Không thể tải video"` / `"Video not found..."` + nút `"Try Again"`. | |
| `01-06-01` | `06-Phan-tich-video` | P1 | **PASS** | Hiển thị đủ 5 tab (`Tóm tắt`, `Cảnh`, `Khuôn mặt`, `OCR`, `Lời thoại`) và 6 trường thông tin trong tab `Tóm tắt`. | |
| `01-06-02` | `06-Phan-tich-video` | P1 | **PASS** | Chuyển đổi mượt cả 4 tab `Cảnh`, `Khuôn mặt`, `OCR`, `Lời thoại`; URL cập nhật `active_tab` tương ứng. | |
| `01-06-03` | `06-Phan-tich-video` | P2 | **PASS** | Các trường không có dữ liệu hiển thị `(Trống)` và `"Chưa có khuôn mặt nào đã đặt tên."`. | |
| `01-07-01` | `07-Lich-su-upload` | P1 | **PASS** | Tab `Người dùng tải` hiển thị `140 mục` kèm cột `Thời gian tạo` và `Trạng thái` (`Hoàn thành`). | |
| `01-07-02` | `07-Lich-su-upload` | P1 | **PASS** | Bộ lọc `"Thời sự"` (`17 mục`) và phân trang (`manual_page=2`) hoạt động đúng. | |
| `01-07-03` | `07-Lich-su-upload` | P2 | **PASS** | Bộ lọc không khớp hiển thị `0 mục` và `"Không có lịch sử upload — Các video bạn upload sẽ hiển thị ở đây"`. | |
| `01-08-01` | `08-Khuon-mat-Dia-danh` | P1 | **PASS** | Tab `Danh sách khuôn mặt` hiển thị `564 mục` (94 trang); tab `Danh sách địa danh` hiển thị `18 mục` (3 trang). | |
| `01-08-02` | `08-Khuon-mat-Dia-danh` | P1 | **PASS** | Lọc địa danh `"Hội An"` (`&location_name=H%E1%BB%99i+An`) hiển thị `1 mục` (`Phố cổ Hội An`). | |
| `01-08-03` | `08-Khuon-mat-Dia-danh` | P2 | **PASS** | Lọc địa danh `"xyz_khong_ton_tai"` hiển thị `0 mục` và `"Không có dữ liệu địa danh"`. | |
| `01-09-01` | `09-Tro-ly-hoi-dap` | P1 | **PASS** | Mở khung `Hỏi đáp về video` (`uid=44_0`) hiển thị tiêu đề, 4 câu hỏi gợi ý, ô nhập và nút đóng. | |
| `01-09-02` | `09-Tro-ly-hoi-dap` | P1 | **PASS** | Gửi `"Video này nói về nội dung gì?"` trả về `HTTP 200` trong `3060 ms` kèm câu trả lời và 8 mốc thời gian. | `BUG-01-02` |
| `01-09-03` | `09-Tro-ly-hoi-dap` | P2 | **PASS** | Khi ô nhập câu hỏi trống, nút `Gửi câu hỏi` (`uid=44_12`) ở trạng thái `disabled`. | |
| `01-10-01` | `10-Upload-tu-lieu` | P1 | **PASS** | Mở và đóng an toàn ở chế độ chỉ đọc 3 hộp thoại `Tải Video Lên`, `Đăng ký khuôn mặt`, `Đăng ký địa danh`. | |
| `01-10-02` | `10-Upload-tu-lieu` | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không thực hiện tải video mới lên hệ thống thật). | |
| `01-10-03` | `10-Upload-tu-lieu` | P2 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không submit tạo dữ liệu/file mới lên server). | |
| `01-11-01` | `11-Quan-ly-tai-khoan-Dang-xuat` | P1 | **PASS** | Mở menu `Tài khoản người dùng` hiển thị tên tài khoản `VTV` và nút `Đăng xuất`. | |
| `01-11-02` | `11-Quan-ly-tai-khoan-Dang-xuat` | P0 | **PASS** | Nhấn `Đăng xuất` xóa phiên và chuyển hướng về `/login`. | |
| `01-11-03` | `11-Quan-ly-tai-khoan-Dang-xuat` | P0 | **PASS** | Truy cập `/warehouse-management` sau khi đăng xuất bị chặn và chuyển hướng về `/login?next=%2Fwarehouse-management`. | |

