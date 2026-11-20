# Báo cáo tổng hợp kiểm thử — Website 01: VTV Tư liệu (`01-vtv-tu-lieu`)

- **Run ID**: `run-092745`
- **Ngày thực hiện**: `2026-11-03` (`09:27:45` – `09:46:17 +07:00`)
- **URL**: `http://vtvtulieu.cmcati.vn/` (`https://vtvtulieu.cmcati.vn/`)
- **Môi trường**: Windows, trình duyệt Google Chrome điều khiển qua `chrome-devtools` MCP
- **Tài khoản kiểm thử**: `VTV` (đăng nhập thủ công trên Chrome của MCP, đã đăng xuất cuối phiên)

---

## 1. Thống kê kết quả theo Test Case

| Trạng thái | Số lượng | Tỷ lệ | Chi tiết Case ID |
| :--- | :---: | :---: | :--- |
| **PASS** | **28** | 84.8% | `01-01-01`, `01-01-02`, `01-01-03`, `01-02-01`, `01-02-02`, `01-02-03`, `01-03-01`, `01-03-03`, `01-04-01`, `01-04-02`, `01-04-03`, `01-05-01`, `01-05-02`, `01-05-03`, `01-06-01`, `01-06-02`, `01-06-03`, `01-07-01`, `01-07-02`, `01-07-03`, `01-08-01`, `01-08-02`, `01-08-03`, `01-09-01`, `01-09-03`, `01-11-01`, `01-11-02`, `01-11-03` |
| **FAIL** | **2** | 6.1% | `01-03-02` (`BUG-01-01`), `01-09-02` (`BUG-01-02`) |
| **BLOCKED** | **0** | 0.0% | *(Không có)* |
| **NOT_RUN** | **3** | 9.1% | `01-10-01`, `01-10-02`, `01-10-03` *(Chức năng Upload — ngoài phạm vi lượt đầu theo yêu cầu)* |
| **Tổng cộng** | **33** | **100%** | Đầy đủ 11 nhóm chức năng (`01-01` đến `01-11`) |

---

## 2. Danh sách Bug phát hiện

1. **[BUG-01-01](bugs/BUG-01-01-search-returns-empty.md)** *(High / P0-P1 — Case `01-03-02`)*:
   - **Hiện tượng**: Tìm kiếm từ khóa trên trang `/results` (ví dụ `"thời sự"`, `"An ninh quốc gia"`, `"Hà Nội"`, `"Đà Nẵng"`, `"Quốc hội"`, `"VTV"`) luôn trả về `"Không tìm thấy kết quả nào!"` (`GET /api/v1/videos/search` trả về `items: [], total: 0`), mặc dù trong kho tư liệu (`/warehouse-management`) đã có **151 video**, gồm **17 video** có tên chứa `"Thời sự"` và ít nhất **36 video** có `statusData="COMPLETED"` đầy đủ tiêu đề, mô tả, OCR và lời thoại.
2. **[BUG-01-02](bugs/BUG-01-02-ai-video-chat-503.md)** *(High / P1 — Case `01-09-02`)*:
   - **Hiện tượng**: Trong khung **Hỏi đáp về video** tại trang `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`, khi bấm câu hỏi mẫu `"Video này nói về nội dung gì?"`, API `POST /api/v1/videos/be08b277-678b-4b51-868e-10dd4d92d6b2/chat` trả về lỗi **HTTP 503** (`{"message":"AI video chat request failed","status":503}`), giao diện hiển thị `"Không thể hoàn tất yêu cầu: AI video chat request failed"`.
3. **[BUG-01-03](bugs/BUG-01-03-warehouse-h1-heading-mismatch.md)** *(Low / P2 — Case `01-08-01`)*:
   - **Hiện tượng**: Trên trang `/warehouse-management`, khi chuyển sang tab `Danh sách khuôn mặt` (`?tab=face`, 564 mục) hoặc `Danh sách địa danh` (`?tab=location`, 18 mục), tiêu đề chính `main h1` vẫn giữ cố định là `"Lịch sử upload"`.

---

## 3. Ghi chú về lưu file ảnh chụp màn hình (`take_screenshot`)

Khi gọi công cụ `take_screenshot` của `chrome-devtools` MCP với tham số `filePath` trỏ vào thư mục báo cáo, MCP server trả về lỗi nguyên văn:

```text
Error: Access denied: path "c:\\Users\\cati2\\Downloads\\CMC-QA-TESTING\\CMC-QA-TESTING\\websites\\01-vtv-tu-lieu\\reports\\2026-11-03\\run-092745\\evidence\\01-01-01-login-page.png" (canonical: "C:\\Users\\cati2\\Downloads\\CMC-QA-TESTING\\CMC-QA-TESTING\\websites\\01-vtv-tu-lieu\\reports\\2026-11-03\\run-092745\\evidence\\01-01-01-login-page.png") is not within any of the configured workspace roots.
```

Theo đúng quy định, báo cáo ghi nhận lỗi nguyên văn và đánh dấu **thiếu file ảnh minh chứng** trong thư mục `evidence/`, đồng thời lưu đầy đủ bằng chứng từ `take_snapshot`, `evaluate_script`, `list_console_messages` và `list_network_requests`.
