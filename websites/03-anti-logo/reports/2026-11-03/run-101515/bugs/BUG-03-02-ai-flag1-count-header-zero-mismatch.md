# BUG-03-02 — Bộ đếm `Flag=1 count` (`#aiFlagOneCount`) trên thanh trạng thái `Logs` hiển thị `0` dù trong phiên có `73` frame `Flag=1`

## 1. Thông tin định danh

- **Bug ID:** `BUG-03-02`
- **Website:** `Anti-Logo` (`03-anti-logo`)
- **Chức năng:** `03-06` — AI Flag & Logs
- **Test Case liên quan:** `03-06-03`
- **Mức độ nghiêm trọng (Severity):** `Low`
- **Mức độ ưu tiên (Priority):** `P2`
- **Ngày giờ phát hiện:** `2026-11-03 10:10:14 (+07:00)`
- **Môi trường:** `https://anti-logo.cmcati.vn/channel/1` (Chrome Desktop, Windows)

---

## 2. Các bước tái hiện (Steps to Reproduce)

1. Đăng nhập vào `https://anti-logo.cmcati.vn/channel/1`.
2. Quan sát chỉ số `Flag=1 count:` (`span#aiFlagOneCount`) trên thanh trạng thái `AI lane` phía trên bảng `Logs`.
3. Tích chọn checkbox `Show only flag=1` (`input#flag1OnlyToggle`) và quan sát số lượng frame `Flag=1` được liệt kê trong bảng.

---

## 3. Kết quả mong đợi vs Kết quả thực tế

- **Kết quả mong đợi (Expected):**
  - Chỉ số `Flag=1 count:` (`#aiFlagOneCount`) phản ánh đúng tổng số frame có `Flag = 1` trong phiên hiện tại (ví dụ `73`), nhất quán với kết quả khi lọc `Show only flag=1`.
- **Kết quả thực tế (Actual):**
  - `span#aiFlagOneCount` hiển thị `Flag=1 count: 0` cả trước và trong khi bật bộ lọc `Show only flag=1`, mặc dù ngay bên dưới bảng hiển thị `Showing 1-73 of 73 frames` có `Flag = 1` (`Frame 3521054 .. 3519251`).
  - Nguyên nhân kỹ thuật: Hàm `updateAiLaneStatus(data)` có điều kiện `if (aiLaneStatus.lastFrameIndex !== null && frameIndex <= aiLaneStatus.lastFrameIndex) return;`, nên khi nạp danh sách frame của phiên theo thứ tự giảm dần (frame mới nhất nạp trước), mọi frame cũ hơn (bao gồm 73 frame `Flag=1`) đều bị bỏ qua.

---

## 4. Bằng chứng kỹ thuật (Evidence)

- **Kết quả kiểm tra qua `evaluate_script`:**
  ```json
  {
    "beforeText": "Flag=1 count: 0",
    "duringFlag1Text": "Flag=1 count: 0",
    "duringShowingText": "Showing 1-73 of 73 frames"
  }
  ```
- **Ảnh chụp màn hình:** Thiếu file ảnh minh chứng do lỗi MCP `take_screenshot`: `Error: Access denied: path "..." is not within any of the configured workspace roots.`

