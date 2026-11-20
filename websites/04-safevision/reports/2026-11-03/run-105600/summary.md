# Báo cáo Kiểm thử — 04 SafeVision (`VTV Logo Detection – AI Enterprise Platform`)

## 1. Thông tin chung

- **Website:** `SafeVision` (`04-safevision`)
- **URL:** `https://safevision.cmcati.vn/`
- **Ngày giờ chạy:** `2026-11-03 10:21:10 — 10:56:00 (+07:00)`
- **Công cụ sử dụng:** `chrome-devtools` MCP (`navigate_page`, `take_snapshot`, `fill`, `click`, `evaluate_script`, `list_console_messages`, `list_network_requests`)
- **Người thực hiện:** QA Agent (`chrome-devtools` MCP) + Người dùng hỗ trợ đăng nhập

---

## 2. Bảng tổng hợp kết quả

| Trạng thái | Số lượng | Tỷ lệ |
|------------|----------|-------|
| **Tổng số Test Case** | **27** | **100%** |
| **PASS** | 21 | 77.78% |
| **FAIL** | 3 | 11.11% |
| **BLOCKED** | 0 | 0.00% |
| **NOT_RUN** | 3 | 11.11% |

### Chi tiết theo từng chức năng

| Mã CN | Tên chức năng | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Trạng thái |
|-------|---------------|---------|------|------|---------|---------|------------|
| `04-01` | Đăng nhập | 3 | 3 | 0 | 0 | 0 | PASS |
| `04-02` | Dashboard (`Bảng Điều Khiển Tổng Quan`) | 3 | 2 | 1 | 0 | 0 | FAIL |
| `04-03` | Danh sách kênh (`/channels`) | 3 | 2 | 0 | 0 | 1 | PASS |
| `04-04` | Chi tiết kênh (`/channels/{id}`) | 3 | 3 | 0 | 0 | 0 | PASS |
| `04-05` | Xem trực tiếp (`LUỒNG STREAM GỐC` & `DELAYED`) | 3 | 2 | 1 | 0 | 0 | FAIL |
| `04-06` | Cảnh báo & Danh sách phát hiện | 3 | 3 | 0 | 0 | 0 | PASS |
| `04-07` | Tìm kiếm & Lọc | 3 | 2 | 1 | 0 | 0 | FAIL |
| `04-08` | Cấu hình (`MENU CẤU HÌNH & THIẾT LẬP`) | 3 | 1 | 0 | 0 | 2 | PASS |
| `04-09` | Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | 0 | PASS |

---

## 3. Danh sách Bug phát hiện

1. **[BUG-04-02](bugs/BUG-04-02-live-stream-cors-503-ws-offline.md) — [High] 4/5 kênh đang báo `"Đang phát"` / `"RUNNING"` (`VTV10`, `VTV7`, `VTV8`, `VTV9`) bị lỗi CORS luồng gốc, lỗi `503` luồng AI output (kẹt `"LOADING"`) và toàn bộ kênh báo `"WS offline"`**
   - **Test Case liên quan:** `04-05-03`
   - **Mô tả ngắn:** Trong 5 luồng có `status = "running"` từ `GET /api/v1/streams`, chỉ có kênh `VTV3` (`211c86e8-9ba5-4329-a86a-b2839102eece`) phát được cả 2 luồng video (`1280x720`). 4 kênh còn lại (`VTV10`, `VTV7`, `VTV8`, `VTV9`) mặc dù giao diện hiển thị `"Đang phát"` / `"RUNNING"` nhưng khi mở vào bị kẹt ở `"LOADING"` do:
     1. Luồng gốc từ `https://vtvgolive-vtv02.vtvdigital.vn/.../master.m3u8` bị trình duyệt chặn bởi chính sách CORS (`No 'Access-Control-Allow-Origin' header`).
     2. Luồng AI output `https://safevision-ai.cmcati.vn/api/output_stream/{id}/playlist.m3u8` trả về lỗi HTTP `503 Service Unavailable` lặp vô hạn (>240 lần).
     3. Tất cả các trang chi tiết kênh (kể cả `VTV3`) đều hiển thị `"WS offline"` kèm cảnh báo Console `[ChannelWS] SockJS or Stomp not loaded`.

2. **[BUG-04-01](bugs/BUG-04-01-dashboard-logo-stats-6120-dom-sort-order.md) — [Medium] Khối `THỐNG KÊ PHÂN LOẠI LOGO` trên Dashboard bị đảo thứ tự sắp xếp (đẩy nhãn số `"0"`, `"1"`, `"3"` với `0%` lên đầu) và render toàn bộ `6,120` dòng (`48,965` DOM nodes)**
   - **Test Case liên quan:** `04-02-03`
   - **Mô tả ngắn:** API `GET /api/v1/dashboard/stats` trả về mảng `topLogos` gồm `6,120` phần tử đã sắp xếp giảm dần (`logo`: `121,919` lần — `56%`, `VTV6`: `17,391` lần — `8%`, `3soc`: `16,446` lần — `8%`, ...), nhưng chứa nhiều nhãn rác dạng số nguyên/timestamp (`"0"`, `"1"`, `"1789528251567"`). Khi frontend chuyển mảng này sang Object JavaScript `{ [logo]: count }`, quy tắc duyệt khóa số nguyên của JS tự động đẩy toàn bộ các nhãn số nguyên (`"0"`..`"6024"`, chỉ có `1–4` lần phát hiện `0%`) lên đầu danh sách trước `"logo"` (`121,919` lần), đồng thời render toàn bộ `6,120` dòng (`48,965` phần tử DOM) làm chậm quá trình tải trang tổng quan.

3. **[BUG-04-03](bugs/BUG-04-03-header-global-search-noop.md) — [Low] Ô tìm kiếm toàn cục trên thanh header (`Tìm kiếm kênh, logo, kết quả...` / `⌘K`) chưa được gắn chức năng tìm kiếm**
   - **Test Case liên quan:** `04-07-03`
   - **Mô tả ngắn:** Khi nhập từ khóa (ví dụ `"VTV3"`) vào ô `header input[placeholder="Tìm kiếm kênh, logo, kết quả..."]`, component chỉ cập nhật biến state nội bộ (`onChange: e => m(e.target.value)`) mà không thực hiện lọc dữ liệu, không gọi API và không hiển thị danh sách kết quả gợi ý.

---

## 4. Ghi chú về phạm vi & Minh chứng

- **Tuân thủ quy tắc bảo vệ kênh LIVE & phạm vi lượt đầu:**
  - Không bấm nút `Dừng lại`, không thay đổi tham số trong `MENU CẤU HÌNH & THIẾT LẬP`, không thêm/xóa kênh hoặc thêm/xóa/upload logo (`04-03-03`, `04-08-02`, `04-08-03` ghi `NOT_RUN — ngoài phạm vi lượt đầu`).
- **Ghi chú lỗi lưu file ảnh chụp màn hình (`take_screenshot`):**
  - Khi gọi `take_screenshot` có truyền `filePath` vào thư mục báo cáo, server `chrome-devtools` MCP trả về lỗi:
    `Error: Access denied: path "..." is not within any of the configured workspace roots.`
  - Đã ghi nhận thiếu file ảnh minh chứng theo đúng quy tắc và lưu đầy đủ bằng chứng qua `take_snapshot`, `evaluate_script`, `list_console_messages`, `list_network_requests`.

