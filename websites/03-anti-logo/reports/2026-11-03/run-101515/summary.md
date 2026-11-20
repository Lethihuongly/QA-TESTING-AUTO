# Báo cáo Kiểm thử — 03 Anti-Logo (`VTV PCD CONTROL`)

## 1. Thông tin chung

- **Website:** `Anti-Logo` (`03-anti-logo`)
- **URL:** `https://anti-logo.cmcati.vn/`
- **Ngày giờ chạy:** `2026-11-03 10:05:30 — 10:15:15 (+07:00)`
- **Công cụ sử dụng:** `chrome-devtools` MCP (`navigate_page`, `take_snapshot`, `click`, `evaluate_script`)
- **Người thực hiện:** QA Agent (`chrome-devtools` MCP) + Người dùng hỗ trợ đăng nhập

---

## 2. Bảng tổng hợp kết quả

| Trạng thái | Số lượng | Tỷ lệ |
|------------|----------|-------|
| **Tổng số Test Case** | **33** | **100%** |
| **PASS** | 21 | 63.64% |
| **FAIL** | 2 | 6.06% |
| **BLOCKED** | 0 | 0.00% |
| **NOT_RUN** | 10 | 30.30% |

### Chi tiết theo từng chức năng

| Mã CN | Tên chức năng | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Trạng thái |
|-------|---------------|---------|------|------|---------|---------|------------|
| `03-01` | Đăng nhập | 3 | 3 | 0 | 0 | 0 | PASS |
| `03-02` | Dashboard | 3 | 3 | 0 | 0 | 0 | PASS |
| `03-03` | Danh sách kênh | 3 | 3 | 0 | 0 | 0 | PASS |
| `03-04` | Preview | 3 | 3 | 0 | 0 | 0 | PASS |
| `03-05` | Multi-channel (`VTV PCD Command Center`) | 3 | 3 | 0 | 0 | 0 | PASS |
| `03-06` | AI Flag & Logs | 3 | 2 | 1 | 0 | 0 | FAIL |
| `03-07` | BBox & Nhãn (`#thumbModal`) | 3 | 1 | 1 | 0 | 1 | FAIL |
| `03-08` | Start / Stop Stream | 3 | 0 | 0 | 0 | 3 | NOT_RUN |
| `03-09` | Cấu hình FPS, Blur & Protect ROI | 3 | 0 | 0 | 0 | 3 | NOT_RUN |
| `03-10` | Upload Video & Logo | 3 | 0 | 0 | 0 | 3 | NOT_RUN |
| `03-11` | Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | 0 | PASS |

---

## 3. Danh sách Bug phát hiện

1. **[BUG-03-01](bugs/BUG-03-01-thumb-modal-flag0-mislabeled-flag1.md) — [Medium] Mọi frame có `Flag = 0` khi mở hộp thoại xem chi tiết `#thumbModal` đều bị hiển thị sai tiêu đề thành `FLAG 1`**
   - **Test Case liên quan:** `03-07-02`
   - **Mô tả ngắn:** Trong bảng `table.log-table`, các dòng không có cờ vi phạm hiển thị cột `Flag = 0` (`<span class="status-pill status-flag-0">0</span>`, ví dụ Frame `#3526175`). Tuy nhiên khi nhấn vào ảnh thumbnail hoặc nút `✏️ Sửa BBox` để mở `#thumbModal`, tiêu đề `#thumbModalTitle` luôn hiển thị `"Frame #3526175 — FLAG 1 (Player: found, Logo: none)"`. Nguyên nhân do `data.flag` có kiểu chuỗi `"0"`, nên biểu thức `${data.flag ? 'FLAG 1' : 'FLAG 0'}` trong JavaScript đánh giá chuỗi `"0"` là `true` (`Boolean("0") === true`).

2. **[BUG-03-02](bugs/BUG-03-02-ai-flag1-count-header-zero-mismatch.md) — [Low] Bộ đếm `Flag=1 count` (`#aiFlagOneCount`) trên thanh trạng thái `Logs` hiển thị `0` dù trong phiên có `73` frame `Flag=1`**
   - **Test Case liên quan:** `03-06-03`
   - **Mô tả ngắn:** Trên thanh trạng thái `AI lane` của bảng `Logs` tại `/channel/1`, chỉ số `Flag=1 count:` (`span#aiFlagOneCount`) hiển thị `0`, trong khi khi bật checkbox `Show only flag=1` (`#flag1OnlyToggle`) bảng hiển thị `Showing 1-73 of 73 frames` đều có `Flag = 1`. Nguyên nhân do hàm `updateAiLaneStatus(data)` chặn các frame có `frameIndex <= aiLaneStatus.lastFrameIndex`, nên khi tải danh sách frame lịch sử theo thứ tự giảm dần (từ frame mới nhất xuống cũ hơn), toàn bộ các frame `Flag = 1` trước đó bị bỏ qua không được cộng vào `aiLaneStatus.flag1Count`.

---

## 4. Ghi chú về phạm vi & Minh chứng

- **Tuân thủ tuyệt đối quy tắc bảo vệ kênh LIVE & phạm vi lượt đầu:**
  - Cả 3 kênh (`Kênh 1`: `virtual-sdi-BONGDA_HD`, `Kênh 2`: `virtual-sdi-THETHAO_TINTUC_HD`, `Kênh 3`: `virtual-sdi-HAY_TV`) đều đang chạy luồng LIVE trực tiếp.
  - Đã giữ nguyên trạng thái 3 kênh LIVE, không bấm `Stop current stream`, không thay đổi FPS/Blur/ROI, không bật/tắt checkbox nhãn YOLO, không sửa/lưu BBox và không upload file (`03-07-03`, `03-08-01..03`, `03-09-01..03`, `03-10-01..03` ghi `NOT_RUN — ngoài phạm vi lượt đầu`).
- **Ghi chú lỗi lưu file ảnh chụp màn hình (`take_screenshot`):**
  - Khi gọi `take_screenshot` có truyền `filePath` vào thư mục báo cáo, server `chrome-devtools` MCP trả về lỗi:
    `Error: Access denied: path "..." is not within any of the configured workspace roots.`
  - Đã ghi nhận thiếu file ảnh minh chứng theo đúng quy tắc và lưu đầy đủ bằng chứng qua `take_snapshot` và `evaluate_script`.

