# BÁO CÁO TỔNG HỢP KIỂM THỬ — WEBSITE 01: VTV TƯ LIỆU (CMC VIDEO MINER)

## 1. Thông tin chung
- **Website:** VTV Tư liệu — Hệ thống tìm kiếm và biên tập video (`CMC Video Miner`)
- **URL kiểm thử:** `https://vtvtulieu.cmcati.vn/`
- **Ngày giờ chạy:** `2026-11-05 11:58:30` → `2026-11-05 13:50:45` (UTC+7, `run-115830`)
- **Người thực hiện:** QA Agent (sử dụng `chrome-devtools` MCP) phối hợp cùng Tester (nhập thông tin đăng nhập thủ công)
- **Phạm vi kiểm thử:** Kiểm thử hồi quy chỉ đọc (Read-only Regression Test) toàn bộ 11 nhóm chức năng (`01-Dang-nhap` đến `11-Dang-xuat`) và kiểm tra lại các bug cũ (`BUG-01-01`, `BUG-01-02`, `BUG-01-03`).

---

## 2. Thống kê kết quả thực thi

| Chỉ số | Giá trị | Ghi chú |
| --- | ---: | --- |
| **Tổng số Test Case** | **33** | `PASS + FAIL + BLOCKED + NOT_RUN = 29 + 1 + 0 + 3 = 33` |
| **PASS** | **29** | Xác minh trực tiếp qua DOM Snapshot, Network, Console & `evaluate_script` |
| **FAIL** | **1** | `01-03-03` (`BUG-01-04` — tìm từ khóa không tồn tại bị treo ~60s rồi lỗi `Something went wrong`) |
| **BLOCKED** | **0** | Không có case bị chặn |
| **NOT_RUN** | **3** | `01-09-02`, `01-10-02`, `01-10-03` (ngoài phạm vi chỉ đọc: không gửi yêu cầu xử lý AI mới / không ghi dữ liệu mới) |
| **Tỷ lệ PASS** | **96.67%** | `PASS / (PASS + FAIL) = 29 / 30` |

---

## 3. Kết quả kiểm tra lại Bug cũ (Retest)

| Mã Bug | Tiêu đề | Kết quả kiểm tra lại (`2026-11-05`) | Bằng chứng |
| --- | --- | --- | --- |
| **BUG-01-01** | Lỗi `Something went wrong` khi tìm kiếm từ khóa `"thời sự"` và phân trang trên `/results` | **Không còn tái hiện trong lượt này** | Tìm kiếm `"thời sự"` trả về `Đã tìm thấy 38 kết quả cho"thời sự"` (`uid=12_3`), chuyển sang trang 2 (`&page_id=2`, `uid=15_0..15_31`) hoạt động bình thường (`200 OK`). Tuy nhiên lỗi timeout/CORS xuất hiện ở nhánh tìm kiếm từ khóa không tồn tại (`BUG-01-04`). |
| **BUG-01-02** | Trợ lý hỏi đáp video trả về `"Error Processing Request"` do `POST /api/v1/videos/{id}/chat` lỗi `500 Internal Server Error` | **Chưa đủ điều kiện xác minh** | Theo quy tắc phạm vi Mục 3 & Mục 5 (*"Không gửi yêu cầu xử lý AI mới; chỉ gửi hỏi đáp nếu đã được phép"*), lượt chạy này chỉ kiểm tra mở/đóng khung chat (`01-09-01` PASS) và trạng thái khóa nút Gửi khi ô nhập rỗng (`01-09-03` PASS), không gửi request `POST /chat`. |
| **BUG-01-03** | Tiêu đề `h1` trên `/warehouse-management` giữ nguyên `"Lịch sử upload"` khi chuyển sang tab Khuôn mặt / Địa danh | **Không còn tái hiện / Đã đóng theo thiết kế** | Đã xác nhận là thiết kế chủ đích ở báo cáo trước (`01-08-01` PASS). |

---

## 4. Danh sách Bug mới phát hiện

| Mã Bug | Test Case | Mức độ | Tóm tắt lỗi | File chi tiết |
| --- | --- | --- | --- | --- |
| **BUG-01-04** | `01-03-03` | High (P1) | Tìm kiếm từ khóa không tồn tại (`xyz_khong_ton_tai_9999`) trên `/results` làm request `GET /api/v1/videos/search` treo ~60s rồi lỗi `net::ERR_FAILED` / CORS, UI hiển thị `h3 "Something went wrong"` thay vì `"Không tìm thấy kết quả nào!"`. | `bugs/BUG-01-04-search-nonexistent-keyword-timeout-cors.md` |

---

## 5. Ghi chú & Hạn chế trong lượt chạy
1. **Bảo mật thông tin đăng nhập (`01-01-02`):** Tester nhập thủ công tài khoản/mật khẩu trên cửa sổ Chrome của MCP; QA Agent xác minh trạng thái sau đăng nhập (`GET /api/v1/auth/me [200]`, STOMP connected, giao diện trang chủ). Không lưu mật khẩu, cookie hay token vào báo cáo.
2. **Biến động dữ liệu kho (`01-04-01`, `01-06-03`):** Tổng số video trong kho tại thời điểm kiểm thử là `140 mục` (24 trang). Video `sample-30s.mp4` (`26940e61-7661-440e-a1d1-4081a2cc5774`) dùng ở báo cáo trước đã bị xóa khỏi kho, nên case `01-06-03` được xác minh trên phân đoạn 2/19 (`clip_id=57a4c47a-7fff-4c28-9537-24c840d1f607`) của video `be08b277-678b-4b51-868e-10dd4d92d6b2` (hiển thị `(Trống)` và `"Chưa có khuôn mặt nào đã đặt tên."`).
3. **Giới hạn lưu ảnh chụp màn hình qua MCP:** Công cụ `take_screenshot` khi truyền `filePath` trả về lỗi nguyên văn:
   `Error: Access denied: path "C:\\Users\\cati2\\Downloads\\CMC-QA-TESTING\\CMC-QA-TESTING\\websites\\01-vtv-tu-lieu\\reports\\2026-11-05\\run-115830\\screenshots\\01-01-01-login-page.png" (canonical: "C:\\Users\\cati2\\Downloads\\CMC-QA-TESTING\\CMC-QA-TESTING\\websites\\01-vtv-tu-lieu\\reports\\2026-11-05\\run-115830\\screenshots\\01-01-01-login-page.png") is not within any of the configured workspace roots.`
   Do đó thư mục `screenshots/` để trống đúng quy định, không tạo đường dẫn ảnh giả.

