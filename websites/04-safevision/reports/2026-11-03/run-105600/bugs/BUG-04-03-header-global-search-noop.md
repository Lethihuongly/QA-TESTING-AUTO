# BUG-04-03 — Ô tìm kiếm toàn cục trên thanh header (`Tìm kiếm kênh, logo, kết quả...` / `⌘K`) chưa được gắn chức năng tìm kiếm

## 1. Thông tin định danh

- **Bug ID:** `BUG-04-03`
- **Website:** `SafeVision` (`04-safevision`)
- **Chức năng:** `04-07` — Tìm kiếm & Lọc
- **Test Case liên quan:** `04-07-03`
- **Mức độ nghiêm trọng (Severity):** `Low`
- **Mức độ ưu tiên (Priority):** `P2`
- **Ngày giờ phát hiện:** `2026-11-03 10:55:31 (+07:00)`
- **Môi trường:** `https://safevision.cmcati.vn/channels` (Chrome Desktop, Windows)

---

## 2. Các bước tái hiện (Steps to Reproduce)

1. Đăng nhập vào `https://safevision.cmcati.vn/channels` hoặc `https://safevision.cmcati.vn/`.
2. Nhấp vào ô tìm kiếm trên thanh header (`header input[placeholder="Tìm kiếm kênh, logo, kết quả..."]`, có ký hiệu phím tắt `⌘K`).
3. Nhập từ khóa `"VTV3"` hoặc `"3que"` và nhấn Enter.

---

## 3. Kết quả mong đợi vs Kết quả thực tế

- **Kết quả mong đợi (Expected):**
  - Hiển thị danh sách kết quả tìm kiếm nhanh (kênh, logo, bản ghi phát hiện) hoặc lọc dữ liệu tương ứng.
- **Kết quả thực tế (Actual):**
  - Ô tìm kiếm chỉ cập nhật biến state nội bộ (`onChange: e => m(e.target.value)`), không gắn `onKeyDown` / `onSubmit`, không gọi API tìm kiếm và không hiển thị bất kỳ danh sách kết quả nào.

---

## 4. Bằng chứng kỹ thuật (Evidence)

- **Kiểm tra React props của `header input[placeholder="Tìm kiếm kênh, logo, kết quả..."]` qua `evaluate_script`:**
  ```json
  {
    "exists": true,
    "props": ["type", "placeholder", "value", "onChange", "onFocus", "onBlur", "className"],
    "hasOnChange": true,
    "hasOnKeyDown": false,
    "onChangeStr": "e=>m(e.target.value)",
    "onFocusStr": "()=>f(!0)"
  }
  ```
- **Ảnh chụp màn hình:** Thiếu file ảnh minh chứng do lỗi MCP `take_screenshot`: `Error: Access denied: path "..." is not within any of the configured workspace roots.`

