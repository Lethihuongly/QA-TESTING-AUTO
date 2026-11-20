# Báo cáo Kiểm thử Hồi quy — Website 04: SafeVision (`VTV Logo Detection`)

- **Run_ID:** `2026-11-10/run-090400`
- **Thời gian thực hiện:** `2026-11-10 10:13:50` → `2026-11-10 16:13:10 (+07:00)`
- **URL kiểm thử:** `https://safevision.cmcati.vn/` (`/`, `/channels`, `/channels/5d5a7da4-478e-40a3-be39-bef238c2772a` [`VTV3`], `/channels/a2884000-4624-4b57-b340-7b8c0e2cb657` [`VTV10`], `/login`)
- **Công cụ:** `chrome-devtools` MCP (`pageId: 1`)
- **Phạm vi:** Chỉ đọc (`Read-Only`) — kiểm tra Đăng nhập, Dashboard, Danh sách kênh, Chi tiết kênh, Luồng gốc & Luồng Output, Cảnh báo phát hiện logo, Tìm kiếm/Lọc, mở Menu cấu hình chỉ đọc và Đăng xuất. Không thêm/xóa kênh, không lưu cấu hình, không nhấn `Bắt đầu giám sát` / `Dừng lại`.

---

## 1. Thống kê Kết quả Thực thi

| Chỉ số | Giá trị |
|---|---|
| **Tổng số Test Case thiết kế (`features/*/test-cases.md`)** | **28** |
| **Đã thực thi (`PASS + FAIL`)** | **24** |
| **PASS** | **24** |
| **FAIL** | **0** |
| **BLOCKED (Cần xác nhận yêu cầu)** | **1** (`04-07-03` — `BUG-04-03` ô tìm kiếm trên Header) |
| **NOT_RUN (ngoài phạm vi chỉ đọc)** | **3** (`04-03-03`, `04-08-02`, `04-08-03`) |
| **Tỷ lệ PASS (trên số case đã thực thi)** | **100.0% (24/24)** |

> **Ghi chú mâu thuẫn với báo cáo cũ (`2026-11-09/run-110430`):**
> Báo cáo cũ `run-110430` ghi tổng 28 test case trong `summary.md` nhưng trong `results.csv` lại có **30 dòng** do tự thêm 2 mã không tồn tại trong bộ `test-cases.md` (`04-03-04` và `04-07-04`). Trong đợt chạy `2026-11-10/run-090400` này, `results.csv` và `summary.md` tuân thủ chính xác **28 `Case_ID` duy nhất** từ `features/*/test-cases.md`.

---

## 2. Kết quả Kiểm tra lại các Bug Đã Biết (`BUG-04-01` → `BUG-04-04`)

| Mã Bug | Mô tả | Trạng thái Đợt Này | Bằng chứng thực tế (`2026-11-10/run-090400`) |
|---|---|---|---|
| **BUG-04-01** | Bảng `THỐNG KÊ PHÂN LOẠI LOGO` trên Dashboard hiển thị nhãn `"Không xác định"` hoặc sắp xếp sai thứ tự | **FIXED (ĐÃ KHẮC PHỤC)** | Bảng hiển thị tên nhãn rõ ràng và sắp xếp giảm dần khớp 100% với `topLogos` từ `GET /api/v1/dashboard/stats` (`reqid=64834`): `3soc (16446)` > `3que (289)` > `ao3soc (279)` > `bản đồ 1 (156)` > `bản đồ 3 (32)` > `bản đồ 2 (28)`. |
| **BUG-04-02** | Kiểm tra cả luồng gốc và luồng output trên kênh đang hoạt động | **FIXED TRÊN KÊNH ĐANG RUNNING (`VTV10`) / GHI NHẬN TRẠNG THÁI IDLE TRÊN 8 KÊNH CÒN LẠI** | - Trên kênh đang chạy phiên AI **`VTV10`** (`Phiên bef9dc85`, `status="running"`): cả **`LUỒNG STREAM GỐC`** (`1280x720`, `25.0 FPS`) và **`LUỒNG DELAYED — ĐANG GIÁM SÁT`** (`/api/output_stream/bef9dc85.../playlist.m3u8`, `1280x720`, `24.5 FPS`) đều phát mượt (`readyState=4`, `droppedFrames=0`).<br>- Trên 8 kênh còn lại (như `VTV3`): `LUỒNG STREAM GỐC` phát trực tiếp `1280x720`, còn khung Output ở trạng thái `IDLE ("Output Stream Chưa Phát")` vì chưa bật phiên giám sát AI (`activeStreams = 1`). |
| **BUG-04-03** | Ô tìm kiếm nhanh trên thanh Header (`input[placeholder*="Tìm kiếm kênh"]`) không hiển thị | **CẦN XÁC NHẬN YÊU CẦU (`BLOCKED`)** | Kiểm tra DOM `<header>` trên `/`, `/channels`, `/channels/{id}`: `headerInputCount = 0` (chỉ có ô tìm kiếm tại trang `/channels` `uid=88_25`). Theo mục 4D, ghi nhận **`"Cần xác nhận yêu cầu"`** để PO/Dev xác nhận tính năng đã bỏ theo thiết kế hay bị thiếu, không tự kết luận FAIL. |
| **BUG-04-04** | (1) Danh sách kênh hiện tại & việc thiếu VTV6/VTV Cần Thơ; (2) Kiểm tra output đen/giật; (3) Thao tác từ chi tiết về danh sách rồi mở lại cùng kênh và đo thời gian đến khi video phát thực tế | **ĐÃ ĐO LƯỜNG & BÁO CÁO TỪNG PHẦN:<br>- Phần 1 (Danh sách kênh): CẦN XÁC NHẬN YÊU CẦU<br>- Phần 2 (Chất lượng Output trên VTV10): SMOOTH (0% drop)<br>- Phần 3 (Thời gian mở lại kênh VTV10): `0.59s – 1.14s` (`590ms – 1143ms`)** | - **Phần 1:** Hệ thống hiện có **9 kênh**: `VTV10, VTV2, VTV8, VTV3, VTV5, VTV4, VTV1, VTV7, VTV9`. Việc không có `VTV6` / `VTV Cần Thơ` cần đối chiếu danh sách kênh được yêu cầu chính thức, không tự suy từ tên dải VTV1–VTV10.<br>- **Phần 2:** Đo `check-video-lag.js` trên `VTV10` (`8.12s`): Luồng gốc `playbackRatio=1.000`, `25.0 FPS`, `dropRate=0%`; Luồng Output `playbackRatio=0.998`, `24.5 FPS`, `dropRate=0%`, `freezeTicks=0` (`SMOOTH`).<br>- **Phần 3:** Từ chi tiết `VTV10` nhấn `Quay lại` về `/channels` rồi mở lại `VTV10`: phân đoạn `.ts` đầu tiên của Luồng gốc xong ở **`509 ms`**, của Luồng Output xong ở **`590 ms`** (phân đoạn thứ 2–3 ở `882 ms – 1143 ms`), cả 2 thẻ `<video>` đạt `readyState=4` và phát thực tế trong **`0.59s – 1.14s`**, không bị màn hình đen kéo dài. |

---

## 3. Bảng Kết quả Chi tiết Từng Test Case (28 Cases)

| Case_ID | Chức năng | Tiêu đề | Ưu tiên | Trạng thái | Tóm tắt Kết quả Thực tế |
|---|---|---|---|---|---|
| `04-01-01` | Đăng nhập | Hiển thị giao diện trang Đăng nhập (`/login`) | P0 | **PASS** | Hiển thị `h3 "Đăng nhập VTV PCD"`, `#username`, `#password`, `Hiện mật khẩu`, `Đăng nhập`. |
| `04-01-02` | Đăng nhập | Đăng nhập thành công và xác thực phiên làm việc | P0 | **PASS** | Đã đăng nhập tài khoản `VTV vtv VT`, `GET /api/v1/auth/me` trả `HTTP 200`. |
| `04-01-03` | Đăng nhập | Kiểm tra validation rỗng và nút ẩn/hiện mật khẩu tại `/login` | P1 | **PASS** | `validWhenEmpty=false`, nút `Hiện mật khẩu` đổi `type` `password <-> text`. |
| `04-02-01` | Dashboard | Hiển thị Bảng Điều Khiển Tổng Quan và 4 thẻ KPI trên Dashboard (`/`) | P1 | **PASS** | `274` luồng (`1 đang chạy`), `9` kênh, `0` phát hiện hôm nay (`218697` tích lũy), `Healthy`. |
| `04-02-02` | Dashboard | Hiển thị bảng Tình trạng chi tiết kênh và điều hướng sang chi tiết kênh | P1 | **PASS** | Nhấn `Cấu hình & Giám sát` trên `VTV3` chuyển tới `/channels/5d5a7da4...`. |
| `04-02-03` | Dashboard | Hiển thị và sắp xếp bảng Thống kê phân loại logo (`BUG-04-01`) | P1 | **PASS** | `3soc (16446) > 3que (289) > ao3soc (279) > bản đồ 1 (156) > bản đồ 3 (32) > bản đồ 2 (28)`. |
| `04-03-01` | Danh sách kênh | Hiển thị trang Danh sách kênh phát (`/channels`) | P0 | **PASS** | Hiển thị 9 kênh: `VTV10, VTV2, VTV8, VTV3, VTV5, VTV4, VTV1, VTV7, VTV9`. |
| `04-03-02` | Danh sách kênh | Kiểm tra thông tin trên từng thẻ kênh và điều hướng nút `Chi tiết` | P1 | **PASS** | Đầy đủ mã kênh, mô tả, nhãn `Đang phát`, nút `Chi tiết`. |
| `04-03-03` | Danh sách kênh | Thêm kênh truyền hình mới (nút `Thêm kênh`) | P2 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không tạo kênh mới). |
| `04-04-01` | Chi tiết kênh | Hiển thị thông tin chi tiết kênh truyền hình (`/channels/{id}`) | P0 | **PASS** | Hiển thị đầy đủ 2 khung video, Menu cấu hình, Sự kiện phát hiện, Danh sách phát hiện. |
| `04-04-02` | Chi tiết kênh | Điều hướng nút `Quay lại` về `/channels` và mở lại cùng kênh (`BUG-04-04`) | P1 | **PASS** | Quay lại `/channels` và mở lại `VTV10` phát thực tế cả 2 luồng sau `0.59s – 1.14s`. |
| `04-04-03` | Chi tiết kênh | Mở URL kênh không tồn tại (`/channels/00000000-0000-0000-0000-000000000000`) | P2 | **PASS** | Hiển thị `h2 "Không tìm thấy kênh"` và nút `Quay lại danh sách kênh`. |
| `04-05-01` | Xem trực tiếp | Kiểm tra phát trực tiếp `LUỒNG STREAM GỐC` trên trang chi tiết kênh | P0 | **PASS** | Phát mượt `1280x720 @ 25 FPS`, `readyState=4`, `paused=false`. |
| `04-05-02` | Xem trực tiếp | Kiểm tra phát trực tiếp `LUỒNG DELAYED — ĐANG GIÁM SÁT` (`BUG-04-02`) | P0 | **PASS** | Trên `VTV10` (`RUNNING`), phát mượt `1280x720 @ 24.5 FPS`, `readyState=4`, `droppedFrames=0`. |
| `04-05-03` | Xem trực tiếp | Đối chiếu trạng thái phát giữa các kênh trên `/channels` và chi tiết kênh | P1 | **PASS** | `VTV10` đang `RUNNING` cả 2 luồng; 8 kênh còn lại phát `LUỒNG STREAM GỐC` và `IDLE` ở Output. |
| `04-05-04` | Xem trực tiếp | Đo lường định lượng chất lượng 2 luồng video bằng `check-video-lag.js` | P0 | **PASS** | Cả 2 luồng trên `VTV10` đạt `verdict = "SMOOTH"`, `dropRatePercent = 0%`, `freezeTicks = 0`. |
| `04-06-01` | Cảnh báo / Phát hiện | Hiển thị bảng `Danh sách các phát hiện` trên trang chi tiết kênh | P1 | **PASS** | Hiển thị `13459` bản ghi (`VTV3`) / `141417` bản ghi (`VTV10`) với đủ 5 cột. |
| `04-06-02` | Cảnh báo / Phát hiện | Mở và đóng modal `XEM CHI TIẾT ẢNH SNAPSHOT` phát hiện logo | P1 | **PASS** | Mở modal xem ảnh lớn hợp lệ và đóng lại an toàn. |
| `04-06-03` | Cảnh báo / Phát hiện | Phân trang bảng `Danh sách các phát hiện` | P2 | **PASS** | Chuyển từ `Trang 1/1346` sang `Trang 2/1346` tải dữ liệu mới chính xác. |
| `04-07-01` | Tìm kiếm & Lọc | Tìm kiếm kênh hợp lệ trên trang `/channels` | P1 | **PASS** | Nhập `"VTV3"` lọc còn đúng `["VTV3"]`. |
| `04-07-02` | Tìm kiếm & Lọc | Tìm kiếm kênh với từ khóa không tồn tại trên trang `/channels` | P2 | **PASS** | Nhập `"xyz_khong_ton_tai_9999"` hiển thị `"Không tìm thấy kênh nào"`. |
| `04-07-03` | Tìm kiếm & Lọc | Xác minh ô tìm kiếm nhanh trên thanh Header (`BUG-04-03`) | P2 | **BLOCKED** | Không có `<input>` trên Header; ghi nhận `"Cần xác nhận yêu cầu"`. |
| `04-08-01` | Cấu hình kênh | Mở và đóng `MENU CẤU HÌNH & THIẾT LẬP` ở chế độ chỉ đọc | P1 | **PASS** | Mở hiển thị 13 trường cấu hình và đóng lại an toàn, không lưu. |
| `04-08-02` | Cấu hình kênh | Thay đổi và lưu cấu hình giám sát kênh | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không lưu cấu hình). |
| `04-08-03` | Cấu hình kênh | Thực thi nút `Bắt đầu giám sát` / `Dừng lại` luồng xử lý AI | P1 | **NOT_RUN** | Ngoài phạm vi chỉ đọc (không Start/Stop luồng). |
| `04-09-01` | Tài khoản & Đăng xuất | Hiển thị thông tin người dùng và mở menu tài khoản trên Header | P1 | **PASS** | Nhấn `VTV vtv VT` mở menu hiển thị `Tài khoản` và `Đăng xuất`. |
| `04-09-02` | Tài khoản & Đăng xuất | Thực hiện Đăng xuất khỏi hệ thống SafeVision | P1 | **PASS** | Nhấn `Đăng xuất` chuyển về `https://safevision.cmcati.vn/login`. |
| `04-09-03` | Tài khoản & Đăng xuất | Kiểm tra chặn truy cập trang nội bộ khi chưa đăng nhập | P1 | **PASS** | Truy cập `/` khi chưa đăng nhập tự động chuyển về `/login?next=%2F`. |

