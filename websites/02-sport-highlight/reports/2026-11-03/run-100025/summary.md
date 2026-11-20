# Báo cáo Kiểm thử — 02 Sport Highlight

## 1. Thông tin chung

- **Website:** `Sport Highlight` (`02-sport-highlight`)
- **URL:** `https://sport-highlight.cmcati.vn/matches`
- **Ngày giờ chạy:** `2026-11-03 09:47:00 — 10:00:25 (+07:00)`
- **Công cụ sử dụng:** `chrome-devtools` MCP (`navigate_page`, `take_snapshot`, `fill`, `click`, `evaluate_script`, `list_console_messages`, `list_network_requests`, `get_network_request`)
- **Người thực hiện:** QA Agent (`chrome-devtools` MCP) + Người dùng hỗ trợ đăng nhập

---

## 2. Bảng tổng hợp kết quả

| Trạng thái | Số lượng | Tỷ lệ |
|------------|----------|-------|
| **Tổng số Test Case** | **24** | **100%** |
| **PASS** | 19 | 79.17% |
| **FAIL** | 2 | 8.33% |
| **BLOCKED** | 0 | 0.00% |
| **NOT_RUN** | 3 | 12.50% |

### Chi tiết theo từng chức năng

| Mã CN | Tên chức năng | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Trạng thái |
|-------|---------------|---------|------|------|---------|---------|------------|
| `02-01` | Đăng nhập | 3 | 3 | 0 | 0 | 0 | PASS |
| `02-02` | Danh sách trận đấu | 3 | 3 | 0 | 0 | 0 | PASS |
| `02-03` | Tìm kiếm, lọc và phân trang | 3 | 3 | 0 | 0 | 0 | PASS |
| `02-04` | Chi tiết trận đấu | 3 | 1 | 2 | 0 | 0 | FAIL |
| `02-05` | Phát video | 3 | 3 | 0 | 0 | 0 | PASS |
| `02-06` | Highlight | 3 | 3 | 0 | 0 | 0 | PASS |
| `02-07` | Upload / Ghi hình trận đấu | 3 | 0 | 0 | 0 | 3 | NOT_RUN |
| `02-08` | Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | 0 | PASS |

---

## 3. Danh sách Bug phát hiện

1. **[BUG-02-01](bugs/BUG-02-01-ai-processing-heartbeat-timeout.md) — [Medium] Lỗi tiến trình AI (`AI_HEARTBEAT_TIMEOUT`) và hàng đợi xử lý AI bị kẹt `pending` nhưng giao diện không hiển thị trạng thái lỗi/đang chờ**
   - **Test Case liên quan:** `02-04-02`
   - **Mô tả ngắn:** Trận mới nhất `sev vs ray` (`37315ce4-6a25-4ce4-985c-066e228c6f41`) có `processing_run.status = "failed"` với lỗi `AI_HEARTBEAT_TIMEOUT` (`"No AI heartbeat for more than 180 seconds"`). Đồng thời 11 trận đấu kế tiếp trên trang 1 (`Troyes vs Le Mans`, `Nice vs Rennes`, `Paris FC vs AS Monaco`, ...) đã ghi hình xong (`recording.status = "ready"`) nhưng đều kẹt ở `processing_run.status = "pending"` (`0` phân đoạn). Khi mở trang chi tiết các trận này, giao diện chỉ hiển thị `"Hiện chưa có phân đoạn nào"` mà không phân biệt giữa trận chưa có sự kiện, trận đang chờ hàng đợi AI hay trận bị lỗi AI worker.
   - *(Ghi chú bổ sung từ API `/api/youtube/uploads?limit=20`)*: Bản upload YouTube của trận `Sevilla vs Osasuna` (`5fe8deab-2a03-4415-9598-db46756cce75`) có `thumbnail_status: "failed"`, `thumbnail_error: "Video published, but YouTube rejected the thumbnail."`

2. **[BUG-02-02](bugs/BUG-02-02-invalid-match-id-infinite-loading-text.md) — [Low] Trang chi tiết trận đấu với ID không tồn tại (`/matches/{invalid_id}`) vẫn hiển thị chữ `"Đang tải..."` / `"Đang tải video..."` sau khi báo lỗi 404**
   - **Test Case liên quan:** `02-04-03`
   - **Mô tả ngắn:** Khi truy cập `/matches/00000000-0000-0000-0000-000000000000`, hệ thống trả HTTP `404` và hiển thị toast `"Đã xảy ra lỗi: Match was not found."`, nhưng tiêu đề trên header vẫn giữ nguyên chữ `"Đang tải..."` và vùng khung video vẫn giữ nguyên `"Đang tải video..."` thay vì chuyển sang trạng thái lỗi/không tìm thấy trận đấu.

---

## 4. Ghi chú về phạm vi & Minh chứng

- **Các case `NOT_RUN` (ngoài phạm vi lượt đầu):**
  - `02-07-01`, `02-07-02`, `02-07-03`: Đã mở hộp thoại `Tạo trận đấu` để khảo sát cấu trúc form và kiểm chứng selector, sau đó đóng hộp thoại mà không tạo trận mới hay kích hoạt ghi hình; không tạo highlight mới trong `02-06`.
- **Ghi chú lỗi lưu file ảnh chụp màn hình (`take_screenshot`):**
  - Khi gọi `take_screenshot` có truyền `filePath` vào thư mục báo cáo, server `chrome-devtools` MCP trả về lỗi:
    `Error: Access denied: path "..." is not within any of the configured workspace roots.`
  - Đã ghi nhận thiếu file ảnh minh chứng theo đúng quy tắc và lưu đầy đủ bằng chứng qua `take_snapshot`, `evaluate_script`, `list_console_messages`, `list_network_requests`.

