# BUG-03-01 — Mọi frame có `Flag = 0` khi mở hộp thoại xem chi tiết `#thumbModal` đều bị hiển thị sai tiêu đề thành `FLAG 1`

## 1. Thông tin định danh

- **Bug ID:** `BUG-03-01`
- **Website:** `Anti-Logo` (`03-anti-logo`)
- **Chức năng:** `03-07` — BBox & Nhãn (`#thumbModal`)
- **Test Case liên quan:** `03-07-02`
- **Mức độ nghiêm trọng (Severity):** `Medium`
- **Mức độ ưu tiên (Priority):** `P1`
- **Ngày giờ phát hiện:** `2026-11-03 10:11:15 (+07:00)`
- **Môi trường:** `https://anti-logo.cmcati.vn/channel/1` (Chrome Desktop, Windows)

---

## 2. Các bước tái hiện (Steps to Reproduce)

1. Đăng nhập vào `https://anti-logo.cmcati.vn/channel/1`.
2. Tại bảng `Logs` (`table.log-table`), tìm một dòng có cột `Flag` hiển thị `0` (ví dụ Frame `#3526175`, `Flag = 0`, `Player = found`, `Logo = none`).
3. Nhấn vào ảnh thumbnail ở cột `Mini-frame` hoặc nút `✏️ Sửa BBox` của dòng đó để mở hộp thoại `#thumbModal`.
4. Quan sát tiêu đề `#thumbModalTitle` ở phía trên hộp thoại.

---

## 3. Kết quả mong đợi vs Kết quả thực tế

- **Kết quả mong đợi (Expected):**
  - Tiêu đề hộp thoại `#thumbModalTitle` hiển thị đúng trạng thái cờ của frame:
    `"Frame #3526175 — FLAG 0 (Player: found, Logo: none)"`
- **Kết quả thực tế (Actual):**
  - Tiêu đề hộp thoại `#thumbModalTitle` hiển thị sai thành:
    `"Frame #3526175 — FLAG 1 (Player: found, Logo: none)"`
  - Nguyên nhân kỹ thuật: Dữ liệu `data.flag` trả về có kiểu chuỗi `"0"`. Trong mã JavaScript tạo `rowTitle`:
    ```javascript
    const rowTitle = `Frame #${data.frame_index} — ${data.flag ? 'FLAG 1' : 'FLAG 0'} (Player: ${playerStatus}, Logo: ${logoStatus})`;
    ```
    Vì chuỗi `"0"` khác rỗng nên `Boolean("0") === true`, dẫn đến toán tử 3 ngôi luôn trả về `'FLAG 1'` cho cả các frame có `data.flag === "0"`.

---

## 4. Bằng chứng kỹ thuật (Evidence)

- **Kết quả kiểm tra DOM qua `evaluate_script`:**
  ```json
  {
    "cells": ["3526175", "0", "found", "none", "Chọn\n✏️ Sửa BBox", "38.0 ms", ""],
    "rowDatasetFlag": "0",
    "pillClass": "status-pill status-flag-0",
    "pillText": "0",
    "modalTitle": "Frame #3526175 — FLAG 1 (Player: found, Logo: none)"
  }
  ```
- **Ảnh chụp màn hình:** Thiếu file ảnh minh chứng do lỗi MCP `take_screenshot`: `Error: Access denied: path "..." is not within any of the configured workspace roots.`

