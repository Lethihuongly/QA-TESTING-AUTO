# [VTV Tư liệu] [Khuôn mặt & Địa danh] Tiêu đề chính `h1` trên `/warehouse-management` luôn giữ cố định là "Lịch sử upload" khi chuyển sang tab "Danh sách khuôn mặt" hoặc "Danh sách địa danh"

- **Thời gian / URL / phiên bản build**: `2026-11-03 09:40:22 +07:00` | `https://vtvtulieu.cmcati.vn/warehouse-management?tab=face` và `https://vtvtulieu.cmcati.vn/warehouse-management?tab=location`
- **Môi trường / trình duyệt / tài khoản (không ghi mật khẩu)**: Windows / Google Chrome (qua `chrome-devtools` MCP) / Tài khoản `VTV`
- **Mức độ ảnh hưởng / ưu tiên**: Thấp (Low / UI Text) / P2
- **Tiền điều kiện / ID dữ liệu test**: Đã đăng nhập hợp lệ, mở `/warehouse-management`.
- **Các bước tái hiện**:
  1. Truy cập `https://vtvtulieu.cmcati.vn/warehouse-management`.
  2. Bấm chuyển sang tab `Danh sách khuôn mặt` (`?tab=face`) hoặc `Danh sách địa danh` (`?tab=location`).
  3. Quan sát tiêu đề `main h1` ở đầu trang.
- **Kết quả mong đợi**:
  - Tiêu đề `main h1` cập nhật tương ứng với tab đang chọn (hoặc đặt tên chung như `"Quản lý kho tư liệu"`), tránh gây nhầm lẫn bộ đếm `"564 mục"` (khuôn mặt) / `"18 mục"` (địa danh) là `"Lịch sử upload"`.
- **Kết quả thực tế**:
  - `main h1` vẫn hiển thị `"Lịch sử upload"` ở cả 3 tab (`Người dùng tải`, `Danh sách khuôn mặt`, `Danh sách địa danh`).
- **Tần suất tái hiện**: 100%.
- **Console / request liên quan (đã loại token, cookie, mật khẩu)**: Không có lỗi console.
- **Minh chứng**: Snapshot `uid=14_3` tại `?tab=face` (`564 mục`) và `?tab=location` (`18 mục`).
- **Case liên quan / kết quả retest**: `01-08-01` (Ghi nhận lưu ý UI/UX).

