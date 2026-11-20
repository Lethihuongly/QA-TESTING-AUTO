# BÁO CÁO TỔNG HỢP KẾT QUẢ KIỂM THỬ 4 WEBSITE (LƯỢT ĐẦU)

- **Ngày thực hiện**: `2026-11-03`
- **Công cụ kiểm thử**: `chrome-devtools` MCP (Google Chrome)
- **Phạm vi thực hiện**: Khảo sát UI, chuẩn hóa toàn bộ Test Cases (`DRAFT` → `READY`) & CSS Selectors (`selectors.json`), kiểm thử đọc/tra cứu/xem chi tiết/phát video (Read-only & Smoke/Functional lượt đầu), đăng xuất cuối mỗi website.
- **Quy tắc an toàn đã tuân thủ**:
  - Không thực hiện các thao tác ghi/xóa/tác động luồng LIVE (Upload, Xóa dữ liệu, Tạo Highlight, Sửa BBox/nhãn, Start/Stop AI/Stream, Lưu cấu hình) — đánh dấu `NOT_RUN` (ngoài phạm vi lượt đầu).
  - Không lưu mật khẩu, token hoặc cookie vào bất kỳ file báo cáo hay cấu hình nào.

---

## 1. BẢNG TỔNG HỢP KẾT QUẢ 4 WEBSITE

| STT | Website | URL | Tổng số TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS / Đã chạy | Số Bug phát hiện |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | **01 — VTV Tư liệu** | `http://vtvtulieu.cmcati.vn/` | **33** | 28 | 2 | 0 | 3 | `93.3%` (28/30) | **3** (`2 High`, `1 Low`) |
| 2 | **02 — Sport Highlight** | `https://sport-highlight.cmcati.vn/matches` | **24** | 19 | 2 | 0 | 3 | `90.5%` (19/21) | **2** (`1 Medium`, `1 Low`) |
| 3 | **03 — Anti-Logo** | `https://anti-logo.cmcati.vn/` | **33** | 21 | 2 | 0 | 10 | `91.3%` (21/23) | **2** (`1 Medium`, `1 Low`) |
| 4 | **04 — SafeVision** | `https://safevision.cmcati.vn/` | **27** | 21 | 3 | 0 | 3 | `87.5%` (21/24) | **3** (`1 High`, `1 Medium`, `1 Low`) |
| **TỔNG** | **Toàn bộ 4 Website** | — | **117** | **89** | **9** | **0** | **19** | **`90.8%` (89/98)** | **10 Bugs** (`3 High`, `3 Medium`, `4 Low`) |

---

## 2. DANH SÁCH 10 BUG PHÁT HIỆN TRONG HÔM NAY

### Mức độ Nghiêm trọng Cao (`High` — 3 Bugs)

1. **[BUG-01-01] Tìm kiếm tư liệu trả về 0 kết quả cho mọi từ khóa có trong kho video**
   - **Website**: `01-vtv-tu-lieu` (`http://vtvtulieu.cmcati.vn/`)
   - **Test Case**: `TC-01-02-01`
   - **Hiện tượng**: Nhập từ khóa có thật trong tiêu đề/nội dung của hơn 36 video đã xử lý xong (`"thời sự"`, `"Hà Nội"`, `"Quốc hội"`) tại trang tìm kiếm chính, API `GET /api/v1/videos/search?q=...` trả về HTTP `200` nhưng `total: 0`, UI báo `"Không tìm thấy kết quả nào cho từ khóa..."`.
   - **File báo cáo**: `websites/01-vtv-tu-lieu/reports/2026-11-03/run-092745/bugs/BUG-01-01-search-returns-empty.md`

2. **[BUG-01-02] Trợ lý AI hỏi đáp trong chi tiết video trả về lỗi HTTP 503**
   - **Website**: `01-vtv-tu-lieu` (`http://vtvtulieu.cmcati.vn/videos/{id}`)
   - **Test Case**: `TC-01-04-02`
   - **Hiện tượng**: Khi gửi câu hỏi trong khung `Trợ lý AI` của video đã `Hoàn thành` (`39a54a66-92fd-4c73-9de9-bd3c94cdba33`), API `POST /api/v1/videos/{id}/chat` trả về HTTP `503 Service Unavailable` (`{"detail":"AI video chat request failed"}`).
   - **File báo cáo**: `websites/01-vtv-tu-lieu/reports/2026-11-03/run-092745/bugs/BUG-01-02-ai-video-chat-503.md`

3. **[BUG-04-02] 4/5 kênh truyền hình đang báo RUNNING bị kẹt LOADING (lỗi CORS + HTTP 503) và toàn bộ kênh báo WS offline**
   - **Website**: `04-safevision` (`https://safevision.cmcati.vn/live` & `/channels`)
   - **Test Case**: `TC-04-04-01`
   - **Hiện tượng**:
     - Chỉ `1/5` kênh `RUNNING` (`VTV1`) phát được luồng HLS. `4/5` kênh còn lại (`VTV10`, `VTV7`, `VTV8`, `VTV9`) bị kẹt ở `"LOADING"` do lỗi CORS từ `vtvgolive-vtv02.vtvdigital.vn` và lỗi HTTP `503` liên tiếp từ `safevision-ai.cmcati.vn/api/output_stream/{id}/playlist.m3u8`.
     - Cả `5/5` kênh đều hiển thị `"WS offline"` do lỗi console `[ChannelWS] SockJS or Stomp not loaded`.
   - **File báo cáo**: `websites/04-safevision/reports/2026-11-03/run-105600/bugs/BUG-04-02-live-stream-cors-503-ws-offline.md`

---

### Mức độ Trung bình (`Medium` — 3 Bugs)

4. **[BUG-02-01] Pipeline AI xử lý trận đấu bị lỗi AI_HEARTBEAT_TIMEOUT khiến 11 trận tiếp theo kẹt pending nhưng UI không hiển thị trạng thái lỗi/chờ**
   - **Website**: `02-sport-highlight` (`https://sport-highlight.cmcati.vn/matches`)
   - **Test Case**: `TC-02-04-03`
   - **Hiện tượng**: Trận `sev vs ray` (`a4e369b8-6937-46c0-9eb4-21f44e7a2835`) bị lỗi `AI_HEARTBEAT_TIMEOUT` (`"No heartbeat received from AI service within timeout window."`), kéo theo 11 trận mới hơn bị kẹt `processing_run.status = "pending"` (`0` phân đoạn), nhưng trên giao diện chỉ hiện `"Hiện chưa có phân đoạn nào"` mà không phân biệt với trận đã xử lý xong.
   - **File báo cáo**: `websites/02-sport-highlight/reports/2026-11-03/run-100025/bugs/BUG-02-01-ai-processing-heartbeat-timeout.md`

5. **[BUG-03-01] Modal phóng to ảnh của mọi dòng Flag = 0 bị hiển thị sai tiêu đề thành FLAG 1**
   - **Website**: `03-anti-logo` (`https://anti-logo.cmcati.vn/`)
   - **Test Case**: `TC-03-05-03`
   - **Hiện tượng**: Trong bảng `Logs` (`table.log-table`), khi bấm vào ảnh thumbnail của dòng có `Flag = 0` (`span.flag-badge.flag-zero`), tiêu đề modal `#thumbModalTitle` luôn hiển thị `"Frame #... — FLAG 1"`. Nguyên nhân do `row.dataset.flag` là chuỗi `"0"`, nên biểu thức `${data.flag ? 'FLAG 1' : 'FLAG 0'}` trong JS đánh giá `"0"` là `true`.
   - **File báo cáo**: `websites/03-anti-logo/reports/2026-11-03/run-101515/bugs/BUG-03-01-thumb-modal-flag0-mislabeled-flag1.md`

6. **[BUG-04-01] Bảng "Thống kê phân loại logo" tại Dashboard bị đảo thứ tự các nhãn số nguyên lên đầu và render 6,120 dòng (48,965 DOM nodes)**
   - **Website**: `04-safevision` (`https://safevision.cmcati.vn/`)
   - **Test Case**: `TC-04-02-02`
   - **Hiện tượng**: API `/api/dashboard` trả về `topLogos` đã sắp xếp giảm dần (`"logo": 121919`, `"18+": 9626`, ...), nhưng frontend gom lại vào object `{ [logo]: count }`. Theo chuẩn ECMAScript, các key số nguyên (`"0"`, `"1"`, `"3"`, ..., `"6024"` chỉ có `1 lần phát hiện, 0%`) bị đẩy lên đầu bảng trước cả `"logo"` (`121,919 lần, 56%`), đồng thời render toàn bộ `6,120` dòng (`48,965` DOM nodes) gây nặng trang.
   - **File báo cáo**: `websites/04-safevision/reports/2026-11-03/run-105600/bugs/BUG-04-01-dashboard-logo-stats-6120-dom-sort-order.md`

---

### Mức độ Thấp (`Low` — 4 Bugs)

7. **[BUG-01-03] Tiêu đề h1 giữ nguyên "Lịch sử upload" khi chuyển sang tab Khuôn mặt và Địa danh**
   - **Website**: `01-vtv-tu-lieu` (`http://vtvtulieu.cmcati.vn/warehouse-management`)
   - **Test Case**: `TC-01-07-01`, `TC-01-08-01`
   - **Hiện tượng**: Khi chuyển sang tab `Danh sách khuôn mặt` hoặc `Danh sách địa danh`, thẻ `main h1` vẫn hiển thị `"Lịch sử upload"`.
   - **File báo cáo**: `websites/01-vtv-tu-lieu/reports/2026-11-03/run-092745/bugs/BUG-01-03-warehouse-h1-heading-mismatch.md`

8. **[BUG-02-02] Mở URL trận đấu không tồn tại bị treo chữ "Đang tải..." sau khi hiện toast 404**
   - **Website**: `02-sport-highlight` (`https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000`)
   - **Test Case**: `TC-02-04-04`
   - **Hiện tượng**: Hệ thống hiện thông báo lỗi `"Match was not found."` nhưng tiêu đề và khung phát video vẫn giữ nguyên `"Đang tải..."` / `"Đang tải video..."`.
   - **File báo cáo**: `websites/02-sport-highlight/reports/2026-11-03/run-100025/bugs/BUG-02-02-invalid-match-id-infinite-loading-text.md`

9. **[BUG-03-02] Bộ đếm "Flag=1 count: 0" trên thanh tiêu đề Logs không khớp với danh sách thực tế (73 frames Flag=1)**
   - **Website**: `03-anti-logo` (`https://anti-logo.cmcati.vn/`)
   - **Test Case**: `TC-03-05-02`
   - **Hiện tượng**: Nhãn `span#aiFlagOneCount` hiển thị `Flag=1 count: 0` ngay cả khi bật `Show only flag=1` và bảng trả về `Showing 1-73 of 73 frames` có `Flag = 1`.
   - **File báo cáo**: `websites/03-anti-logo/reports/2026-11-03/run-101515/bugs/BUG-03-02-ai-flag1-count-header-zero-mismatch.md`

10. **[BUG-04-03] Ô tìm kiếm toàn cục trên thanh Header (⌘K) không có hành vi tìm kiếm**
    - **Website**: `04-safevision` (`https://safevision.cmcati.vn/`)
    - **Test Case**: `TC-04-08-02`
    - **Hiện tượng**: Ô `header input[placeholder="Tìm kiếm kênh, logo, kết quả..."]` chỉ cập nhật biến state nội bộ mà không gọi API tìm kiếm, không mở dropdown gợi ý và không điều hướng khi nhấn `Enter`.
    - **File báo cáo**: `websites/04-safevision/reports/2026-11-03/run-105600/bugs/BUG-04-03-header-global-search-noop.md`

---

## 3. CHI TIẾT KẾT QUẢ TỪNG WEBSITE

### 3.1. Website 01 — VTV Tư liệu (`http://vtvtulieu.cmcati.vn/`)
- **Thời gian chạy**: `09:20:00` – `09:30:00` (`2026-11-03`)
- **Báo cáo**: `websites/01-vtv-tu-lieu/reports/2026-11-03/run-092745/`
- **Kết quả**: `33` Test Cases (`28 PASS`, `2 FAIL`, `0 BLOCKED`, `3 NOT_RUN`)

| Mã nhóm | Chức năng | Tổng | PASS | FAIL | NOT_RUN | Tóm tắt kết quả |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| `01-Dang-nhap` | Đăng nhập | 3 | 3 | 0 | 0 | Kiểm tra giao diện login, ẩn/hiện mật khẩu, đăng nhập thành công (`admin`) |
| `02-Tim-kiem-tu-lieu` | Tìm kiếm tư liệu | 3 | 2 | **1** | 0 | **FAIL** `TC-01-02-01` (`BUG-01-01`: tìm kiếm trả về 0 kết quả); bộ lọc danh mục & nút Xóa lọc hoạt động đúng |
| `03-Danh-sach-ket-qua` | Danh sách kết quả | 3 | 3 | 0 | 0 | Hiển thị trạng thái rỗng/danh sách và điều hướng sang chi tiết video |
| `04-Chi-tiet-video` | Chi tiết video & AI Chat | 3 | 2 | **1** | 0 | Phát video HTML5, chuyển 4 tab (`Tổng quan`, `Phân cảnh`, `Phiên âm & Âm thanh`, `Đối tượng`), điều hướng `?t=`; **FAIL** `TC-01-04-02` (`BUG-01-02`: AI Chat lỗi HTTP `503`) |
| `05-Upload-video` | Upload video | 3 | 2 | 0 | 1 | Mở/đóng modal `Tải lên video mới`, kiểm tra trường chọn danh mục/file; `TC-01-05-02` (`NOT_RUN`) |
| `06-Lich-su-upload` | Lịch sử upload | 3 | 3 | 0 | 0 | Hiển thị 151 bản ghi, lọc theo trạng thái (`Hoàn thành`, `Đang xử lý`, `Lỗi`) & danh mục, phân trang |
| `07-Danh-sach-khuon-mat` | Danh sách khuôn mặt | 3 | 3 | 0 | 0 | Hiển thị các nhân vật nhận diện (`Phạm Minh Chính`, `Tô Lâm`, `Lương Cường`, ...), mở modal chi tiết và video liên quan (ghi nhận `BUG-01-03` ở tiêu đề `h1`) |
| `08-Danh-sach-dia-danh` | Danh sách địa danh | 3 | 3 | 0 | 0 | Hiển thị địa danh nhận diện, mở modal chi tiết và điều hướng sang video tại mốc thời gian |
| `09-Quan-ly-danh-muc` | Quản lý danh mục | 3 | 2 | 0 | 1 | Hiển thị 10 danh mục và số lượng video; `TC-01-09-02` (`NOT_RUN`) |
| `10-Quan-ly-nguoi-dung` | Quản lý người dùng | 3 | 2 | 0 | 1 | Hiển thị danh sách tài khoản, mở/Hủy modal `Tạo người dùng mới`; `TC-01-10-03` (`NOT_RUN`) |
| `11-Tai-khoan-dang-xuat` | Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | Xem menu tài khoản, đăng xuất về `/login` và chặn truy cập trái phép |

---

### 3.2. Website 02 — Sport Highlight (`https://sport-highlight.cmcati.vn/matches`)
- **Thời gian chạy**: `09:42:00` – `10:02:00` (`2026-11-03`)
- **Báo cáo**: `websites/02-sport-highlight/reports/2026-11-03/run-100025/`
- **Kết quả**: `24` Test Cases (`19 PASS`, `2 FAIL`, `0 BLOCKED`, `3 NOT_RUN`)

| Mã nhóm | Chức năng | Tổng | PASS | FAIL | NOT_RUN | Tóm tắt kết quả |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| `01-Dang-nhap` | Đăng nhập | 3 | 3 | 0 | 0 | Giao diện login, chuyển ngôn ngữ `VI`/`EN`, đăng nhập thành công (`admin`) |
| `02-Danh-sach-tran-dau` | Danh sách trận đấu | 3 | 3 | 0 | 0 | Hiển thị lưới 25 trận đấu, thẻ thống kê tổng quan, tìm kiếm `"mu vs"` và lọc theo giải đấu |
| `03-Tao-tran-dau` | Tạo trận đấu | 3 | 2 | 0 | 1 | Mở/đóng modal `Tạo trận đấu`, chuyển tab `Tải tệp lên` / `Tải lên từ URL`; `TC-02-03-02` (`NOT_RUN`) |
| `04-Chi-tiet-tran-dau` | Chi tiết trận đấu | 5 | 2 | **2** | 1 | Xem chi tiết trận `mu vs liv` (`171 phân đoạn`); **FAIL** `TC-02-04-03` (`BUG-02-01`: lỗi `AI_HEARTBEAT_TIMEOUT` không hiển thị trên UI) & **FAIL** `TC-02-04-04` (`BUG-02-02`: ID sai treo `"Đang tải..."`); `TC-02-04-05` (`NOT_RUN`) |
| `05-Phat-video-phan-doan` | Phát video & Phân đoạn | 3 | 3 | 0 | 0 | Phát video trận đấu, lọc phân đoạn theo sự kiện (`Goal`, `Shot`, `Foul`), bấm phân đoạn nhảy đúng `currentTime` |
| `06-Tao-xem-highlight` | Tạo & Xem Highlight | 3 | 2 | 0 | 1 | Mở tab/cấu hình tạo highlight, kiểm tra chọn phân đoạn; `TC-02-06-03` (`NOT_RUN`) |
| `07-Tim-kiem-nang-cao` | Tìm kiếm nâng cao | 2 | 2 | 0 | 0 | Mở trang `/search`, tìm kiếm ngữ nghĩa phân đoạn cầu thủ/sự kiện và phát thử clip kết quả |
| `08-Tai-khoan-dang-xuat` | Tài khoản & Đăng xuất | 2 | 2 | 0 | 0 | Hiển thị user `admin`, đăng xuất về `/login` và kiểm tra bảo vệ route |

---

### 3.3. Website 03 — Anti-Logo (`https://anti-logo.cmcati.vn/`)
- **Thời gian chạy**: `10:05:00` – `10:16:00` (`2026-11-03`)
- **Báo cáo**: `websites/03-anti-logo/reports/2026-11-03/run-101515/`
- **Kết quả**: `33` Test Cases (`21 PASS`, `2 FAIL`, `0 BLOCKED`, `10 NOT_RUN`)

| Mã nhóm | Chức năng | Tổng | PASS | FAIL | NOT_RUN | Tóm tắt kết quả |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| `01-Dang-nhap` | Đăng nhập | 3 | 3 | 0 | 0 | Giao diện login, kiểm tra phiên đăng nhập `admin` tại header |
| `02-Chon-nguon-input` | Chọn nguồn Input | 3 | 2 | 0 | 1 | Chuyển đổi 3 tab nguồn (`Upload File`, `Video URL`, `Live Stream`), kiểm tra danh sách kênh; `TC-03-02-03` (`NOT_RUN`) |
| `03-Dieu-khien-ai-stream` | Điều khiển AI & Stream | 3 | 1 | 0 | 2 | Kiểm tra trạng thái nút `Start AI`, `Stop AI`, `Start Stream`, `Stop Stream`; `TC-03-03-02`, `TC-03-03-03` (`NOT_RUN`) |
| `04-Xem-video-luong-khep` | Xem video luồng kép | 3 | 1 | 0 | 2 | Kiểm tra khung `Original Input` / `Processed Output (Clean)` và thanh timeline; `TC-03-04-02`, `TC-03-04-03` (`NOT_RUN`) |
| `05-Bang-logs-ai-flag` | Bảng Logs AI & Flag | 3 | 1 | **2** | 0 | Hiển thị bảng log (`10,000` frames); **FAIL** `TC-03-05-02` (`BUG-03-02`: `Flag=1 count: 0` lệch với 73 dòng `Flag=1`) & **FAIL** `TC-03-05-03` (`BUG-03-01`: modal ảnh `Flag=0` hiện sai thành `FLAG 1`) |
| `06-Xem-nhieu-kenh` | Xem nhiều kênh (Multiview) | 3 | 3 | 0 | 0 | Chuyển sang view `Multi-Channel`, kiểm tra lưới 4 kênh đồng thời và trạng thái từng ô |
| `07-Chinh-sua-bbox-nhan` | Chỉnh sửa BBox & Nhãn | 3 | 1 | 0 | 2 | Mở công cụ BBox/nhãn ở chế độ chỉ đọc; `TC-03-07-02`, `TC-03-07-03` (`NOT_RUN`) |
| `08-Cau-hinh-inpaint` | Cấu hình Inpaint | 3 | 2 | 0 | 1 | Xem thông số cấu hình (`Mode`, `FPS`, `Blur`, `ROI`); `TC-03-08-02` (`NOT_RUN`) |
| `09-Lich-su-jobs` | Lịch sử Jobs | 3 | 2 | 0 | 1 | Xem danh sách `Recent Jobs`, chọn lại job `96c453453fc7` để nạp log & video; `TC-03-09-03` (`NOT_RUN`) |
| `10-Danh-gia-evaluation` | Đánh giá (Evaluation) | 3 | 2 | 0 | 1 | Mở tab `Evaluation`, xem bảng chỉ số `Precision`, `Recall`, `F1-Score` của các đợt đánh giá; `TC-03-10-02` (`NOT_RUN`) |
| `11-Tai-khoan-dang-xuat` | Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | Hiển thị tài khoản `admin`, bấm `Logout` về `/login` và chặn truy cập khi chưa đăng nhập |

---

### 3.4. Website 04 — SafeVision (`https://safevision.cmcati.vn/`)
- **Thời gian chạy**: `10:44:00` – `10:56:00` (`2026-11-03`)
- **Báo cáo**: `websites/04-safevision/reports/2026-11-03/run-105600/`
- **Kết quả**: `27` Test Cases (`21 PASS`, `3 FAIL`, `0 BLOCKED`, `3 NOT_RUN`)

| Mã nhóm | Chức năng | Tổng | PASS | FAIL | NOT_RUN | Tóm tắt kết quả |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| `01-Dang-nhap` | Đăng nhập | 3 | 3 | 0 | 0 | Giao diện login, nút ẩn/hiện mật khẩu, đăng nhập JWT hợp lệ |
| `02-Dashboard` | Dashboard tổng quan | 3 | 2 | **1** | 0 | Hiển thị 4 thẻ KPI (`18` kênh, `166` logo mẫu, `218,526` phát hiện, `0` lỗi) & biểu đồ; **FAIL** `TC-04-02-02` (`BUG-04-01`: bảng thống kê đảo thứ tự integer keys và render `6,120` dòng) |
| `03-Quan-ly-kenh` | Quản lý kênh | 4 | 3 | 0 | 1 | Danh sách 18 kênh, tìm kiếm `"VTV1"`, lọc `Running`/`Error`, mở/Hủy modal `+ Thêm kênh`; `TC-04-03-04` (`NOT_RUN`) |
| `04-Giam-sat-truc-tiep` | Giám sát trực tiếp | 3 | 1 | **1** | 1 | Lưới `/live` & chọn nguồn phát; **FAIL** `TC-04-04-01` (`BUG-04-02`: 4/5 kênh `RUNNING` kẹt `LOADING` do CORS + HTTP `503`, 5/5 kênh báo `WS offline`); `TC-04-04-03` (`NOT_RUN`) |
| `05-Lich-su-phat-hien` | Lịch sử phát hiện | 4 | 4 | 0 | 0 | Bảng `218,526 bản ghi`, lọc kênh & nhãn `"logo"` (`121,932 bản ghi`), chuyển tab `/history/video` (`11 video`), xem modal ảnh bounding box |
| `06-Quan-ly-logo` | Quản lý logo mẫu | 3 | 2 | 0 | 1 | Thư viện `166 logo mẫu`, tìm kiếm `"ADIDAS"` (`4 logo mẫu`), mở/Hủy modal `+ Thêm logo mẫu`; `TC-04-06-03` (`NOT_RUN`) |
| `07-Tra-cuu-sao-ke` | Tra cứu & Sao kê | 3 | 3 | 0 | 0 | Lọc sao kê `/billing` theo kênh, loại logo, khoảng ngày (`582 bản ghi`), phân trang |
| `08-Thanh-tim-kiem-header` | Thanh tìm kiếm Header | 2 | 1 | **1** | 0 | Hiển thị ô tìm kiếm `⌘K`; **FAIL** `TC-04-08-02` (`BUG-04-03`: nhập từ khóa + `Enter` không có tác dụng) |
| `09-Tai-khoan-dang-xuat` | Tài khoản & Đăng xuất | 2 | 2 | 0 | 0 | Hiển thị tài khoản ở sidebar, đăng xuất xóa `token` và chặn truy cập trái phép |

---

## 4. TỔNG HỢP CÁC CASE CHƯA CHẠY (`19 NOT_RUN` — NGOÀI PHẠM VI LƯỢT ĐẦU)

Các test case dưới đây đã được khảo sát UI, cập nhật đầy đủ các bước và selector trong `test-cases.md` / `selectors.json`, nhưng được đánh dấu `NOT_RUN` theo đúng quy định lượt đầu (không upload, xóa dữ liệu, tạo highlight, sửa BBox/nhãn, Start/Stop kênh LIVE hoặc thay đổi cấu hình):

- **01 — VTV Tư liệu (`3 cases`)**:
  - `TC-01-05-02`: Submit tải lên video mới.
  - `TC-01-09-02`: Tạo mới / chỉnh sửa / xóa danh mục.
  - `TC-01-10-03`: Tạo mới / khóa / xóa tài khoản người dùng.
- **02 — Sport Highlight (`3 cases`)**:
  - `TC-02-03-02`: Submit tạo trận đấu mới (upload file / URL).
  - `TC-02-04-05`: Xóa trận đấu khỏi hệ thống.
  - `TC-02-06-03`: Bấm tạo và xuất file video Highlight mới.
- **03 — Anti-Logo (`10 cases`)**:
  - `TC-03-02-03`: Upload file video / gửi URL mới để chạy AI.
  - `TC-03-03-02`, `TC-03-03-03`: Bấm `Start AI` / `Stop AI` và `Start Stream` / `Stop Stream`.
  - `TC-03-04-02`, `TC-03-04-03`: Bấm `Record` ghi hình và tải clip từ luồng đang phát.
  - `TC-03-07-02`, `TC-03-07-03`: Vẽ/chỉnh sửa/xóa BBox và gán lại nhãn trên frame.
  - `TC-03-08-02`: Thay đổi và lưu cấu hình Inpaint (`Blur`, `FPS`, `ROI`).
  - `TC-03-09-03`: Xóa (`Delete`) hoặc dọn dẹp (`Cleanup`) job trong lịch sử.
  - `TC-03-10-02`: Kích hoạt chạy lượt `Evaluation` mới.
- **04 — SafeVision (`3 cases`)**:
  - `TC-04-03-04`: Lưu thêm kênh mới hoặc xóa kênh truyền hình hiện có.
  - `TC-04-04-03`: Bấm `Dừng` / `Chạy lại` kênh truyền hình đang LIVE.
  - `TC-04-06-03`: Upload thêm logo mẫu mới hoặc xóa logo mẫu trong thư viện.

