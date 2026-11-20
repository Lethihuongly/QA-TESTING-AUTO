# BUG-02-02 — Trang chi tiết trận đấu với ID không tồn tại (`/matches/{invalid_id}`) vẫn hiển thị chữ `"Đang tải..."` / `"Đang tải video..."` sau khi báo lỗi 404

## 1. Thông tin định danh

- **Bug ID:** `BUG-02-02`
- **Website:** `Sport Highlight` (`02-sport-highlight`)
- **Chức năng:** `02-04` — Chi tiết trận đấu
- **Test Case liên quan:** `02-04-03`
- **Mức độ nghiêm trọng (Severity):** `Low`
- **Mức độ ưu tiên (Priority):** `P2`
- **Ngày giờ phát hiện:** `2026-11-03 09:56:58 (+07:00)`
- **Môi trường:** `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000` (Chrome Desktop, Windows)

---

## 2. Các bước tái hiện (Steps to Reproduce)

1. Đăng nhập vào `https://sport-highlight.cmcati.vn/matches`.
2. Mở URL trận đấu không tồn tại: `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000`.
3. Quan sát thông báo toast và trạng thái hiển thị trên thanh tiêu đề / khung video.

---

## 3. Kết quả mong đợi vs Kết quả thực tế

- **Kết quả mong đợi (Expected):**
  - Khi API trả về `404 Not Found` (`"Match was not found."`), giao diện kết thúc trạng thái loading và hiển thị màn hình/thông báo `"Không tìm thấy trận đấu"` kèm nút quay lại danh sách.
- **Kết quả thực tế (Actual):**
  - Hệ thống có hiển thị toast `"Đã xảy ra lỗi"` / `"Match was not found."` ở góc màn hình.
  - Tuy nhiên, thanh tiêu đề phía trên (`uid=59_4`) vẫn hiển thị chữ `"Đang tải..."` và khung trình phát (`uid=59_30`) vẫn hiển thị `"Đang tải video..."` vô thời hạn.

---

## 4. Bằng chứng kỹ thuật (Evidence)

- **Snapshot (`uid=59_0..59_62`):**
  ```text
  uid=59_3 link "Back to matches" url="https://sport-highlight.cmcati.vn/matches"
  uid=59_4 "Đang tải..."
  uid=59_30 "Đang tải video..."
  uid=59_58 listitem
    uid=59_60 "Đã xảy ra lỗi"
    uid=59_61 "Match was not found."
  ```
- **Ảnh chụp màn hình:** Thiếu file ảnh minh chứng do lỗi MCP `take_screenshot`: `Error: Access denied: path "..." is not within any of the configured workspace roots.`

