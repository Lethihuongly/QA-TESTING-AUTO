# Báo cáo Kiểm thử — Website 01: VTV Tư liệu (`2026-11-04`)

- **Run ID**: `run-103430`
- **Ngày giờ chạy**: `2026-11-04 10:23:00` – `10:34:30 (+07:00)`
- **URL**: `https://vtvtulieu.cmcati.vn/`
- **Công cụ**: `chrome-devtools` MCP

## 1. Thống kê Kết quả

| Trạng thái | Số lượng | Tỷ lệ |
| :--- | :---: | :---: |
| **Tổng số Test Case** | **33** | 100% |
| **PASS** | **30** | 90.9% (**100% số case đã chạy — 0 Bug tồn đọng**) |
| **FAIL** | **0** | 0% |
| **BLOCKED** | **0** | 0% |
| **NOT_RUN** | **3** | 9.1% (`01-10-01..03` — Upload ngoài phạm vi lượt chỉ đọc) |

## 2. Điểm mới so với lượt chạy ngày `2026-11-03`

1. **Đã khắc phục hoàn toàn `BUG-01-01` (`01-03-02` chuyển từ `FAIL` → `PASS`)**:
   - Tìm kiếm từ khóa `"thời sự"` trả về **38 kết quả** (`2` trang) tại `/results?q=th%E1%BB%9Di+s%E1%BB%B1&search_ocr=true&search_caption=true&search_asr=true&search_face=true`, phân trang và mở trang `/watch` hoạt động chính xác.
2. **Đã khắc phục hoàn toàn `BUG-01-02` (`01-09-02` chuyển từ `FAIL` → `PASS`)**:
   - Tính năng **Hỏi đáp về video** (`POST /api/v1/videos/{id}/chat`) trên video `5e30306e-d6ef-4eb1-ab83-9ecea0bfe57b` đã trả về HTTP `200 OK` (thời gian phản hồi ~`69.8s`) kèm nội dung tóm tắt chi tiết và 5 mốc thời gian (`51:40`, `0:54`, `0:00`, `55:24`, `45:03`).
3. **Đóng `BUG-01-03` (`CLOSED — NOT A BUG / Đúng thiết kế nghiệp vụ`)**:
   - Theo xác nhận nghiệp vụ, tiêu đề `main h1` `"Lịch sử upload"` tại `/warehouse-management` là tiêu đề chung cố định của trang cho cả 3 tab (`Người dùng tải`, `Danh sách khuôn mặt`, `Danh sách địa danh`), không phải lỗi. Toàn bộ Website 01 (VTV Tư liệu) đạt **100% PASS (30/30 case đã chạy, 0 Bug)**.
