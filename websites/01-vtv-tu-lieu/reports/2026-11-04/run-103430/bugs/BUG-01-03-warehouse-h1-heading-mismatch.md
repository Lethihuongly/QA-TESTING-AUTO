# BUG-01-03: [CLOSED — NOT A BUG] Tiêu đề `main h1` giữ nguyên "Lịch sử upload" khi chuyển sang tab Khuôn mặt và Địa danh

- **Bug ID**: `BUG-01-03`
- **Website**: `01-vtv-tu-lieu` (`https://vtvtulieu.cmcati.vn/warehouse-management`)
- **Mức độ (Severity)**: `Low`
- **Trạng thái ngày 2026-11-04**: **`CLOSED — NOT A BUG (Đúng thiết kế nghiệp vụ)`**
- **Test Case liên quan**: `01-08-01` (`PASS`)

## Kết luận xác nhận nghiệp vụ
Theo xác nhận từ Product/QA ngày `2026-11-04`, tại trang `/warehouse-management`, tiêu đề `main h1` `"Lịch sử upload"` là tiêu đề chung cố định cho cả 3 tab (`Người dùng tải`, `Danh sách khuôn mặt`, `Danh sách địa danh`), còn số lượng mục (`151 mục`, `564 mục`, `18 mục`) và nút thao tác góc phải cập nhật theo từng tab. Đây là hành vi đúng thiết kế, không phải lỗi.
