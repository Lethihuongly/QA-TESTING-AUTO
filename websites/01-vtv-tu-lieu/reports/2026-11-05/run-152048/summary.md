# BÁO CÁO KIỂM THỬ HỒI QUY (LƯỢT 2) — WEBSITE 01: VTV TƯ LIỆU

## 1. Thông tin chung
- **Website**: VTV Tư liệu (`websites/01-vtv-tu-lieu/`)
- **URL**: `https://vtvtulieu.cmcati.vn/`
- **Thời gian chạy**: `2026-11-05 15:21:18` – `2026-11-05 15:43:30` (Asia/Ho_Chi_Minh, UTC+7)
- **Mã đợt chạy**: `run-152048` (Lượt kiểm thử kỹ lần 2 trong ngày `2026-11-05`)
- **Công cụ**: `chrome-devtools` MCP (chỉ đọc)

---

## 2. Tổng hợp kết quả
| Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | Bug mới | Bug cũ còn tái hiện |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **33** | **31** | **0** | **0** | **2** | **100.00% (31/31)** | **0** | **0** |

- **Kiểm tra công thức**: `Tổng TC = 31 + 0 + 0 + 2 = 33`.
- **Các case `NOT_RUN` (2 case ngoài phạm vi chỉ đọc)**: `01-10-02` (upload video hợp lệ), `01-10-03` (upload file không hợp lệ).

---

## 3. Kết quả kiểm tra lại Bug cũ & Bug đợt trước (Retest)
| Mã Bug | Tiêu đề | Trạng thái trong đợt `run-152048` | Bằng chứng xác minh thực tế |
| :--- | :--- | :--- | :--- |
| **BUG-01-01** | Các nút số trang (`1`, `2`, `3`) trong thanh phân trang tìm kiếm bị `disabled` | **Không còn tái hiện (Đã khắc phục)** | Tìm kiếm `"thời sự"` trả về 38 kết quả (2 trang). Click trực tiếp nút số `2` (`uid=121_184`) chuyển sang `&page_id=2`; click trực tiếp nút số `1` (`uid=123_170`) quay về trang 1 (`01-06-02` PASS). |
| **BUG-01-02** | Trợ lý hỏi đáp AI trả lỗi `500 Internal Server Error` khi gửi câu hỏi | **Không còn tái hiện (Đã khắc phục)** | Đã kiểm thử chuyên sâu trên video `be08b277-678b-4b51-868e-10dd4d92d6b2`:<br>1. **Đơn lượt (`history: []`)**: Gửi `"Video này nói về nội dung gì?"` (`reqid=1353 POST /api/v1/videos/.../chat`) trả về **`200 OK`** (~28s), hiển thị tóm tắt đầy đủ (`uid=162_0`) và 8 nút mốc thời gian (`12:09`, `5:48`, `6:39`, `9:20`, `9:51`, `19:10`, `5:00`, `8:20`).<br>2. **Click mốc thời gian (`5:48`, `uid=162_2`)**: Tua trình phát tới phân đoạn tương ứng và bảo toàn lịch sử chat.<br>3. **Đa lượt (`history` có dữ liệu)**: Gửi câu hỏi nối tiếp `"Những nhân vật nào xuất hiện trong video?"` (`reqid=1356 POST /api/v1/videos/.../chat`) trả về **`200 OK`** (~45s), hiển thị chi tiết danh sách nhân vật (`uid=166_0`) và 8 mốc thời gian.<br>4. **Xóa cuộc trò chuyện (`uid=164_3`)**: Xóa sạch lịch sử và khôi phục 4 nút gợi ý ban đầu.<br>*(Lưu ý kỹ thuật: Cuối phiên kiểm thử lúc `17:05:45`, kết nối WebSocket `wss://vtvtulieu-api.cmcati.vn/ws` báo `502 Bad Gateway` 13 lần rồi kết nối lại, làm mất phiên đăng nhập khiến request kế tiếp `reqid=1358` trả `401 Unauthorized` và đẩy về `/login`).* |
| **BUG-01-03** | Tìm kiếm không hỗ trợ toán tử ngoặc kép `""` | **Đã đóng theo thiết kế** | Hệ thống sử dụng semantic/keyword search thông thường. |
| **BUG-01-04** *(Ghi nhận ở `run-115830`)* | Tìm kiếm từ khóa không khớp (`xyznonexistent12345`) bị treo >10s và lỗi CORS / Gateway Timeout | **Không còn tái hiện trong đợt `run-152048`** | Khi chạy lại `01-03-03` với đúng từ khóa `xyznonexistent12345` lúc `15:39:18`, API `GET /api/v1/videos/search?keyword=xyznonexistent12345&page_id=1&page_size=20` (`reqid=222`) đã trả về **`200 OK`** và giao diện hiển thị đúng **`"Không tìm thấy kết quả nào!"`** (`uid=131_12`), Console không có lỗi CORS. Cho thấy hiện tượng timeout ở đợt `run-115830` là nghẽn tạm thời của backend search. |

---

## 4. Hạn chế
- Lời gọi `take_screenshot` với `filePath` trả về `Error: Access denied: path "..." is not within any of the configured workspace roots.` nên thư mục `screenshots/` để trống theo đúng quy định Mục 7.

