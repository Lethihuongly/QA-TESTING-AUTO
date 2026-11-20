# BUG-02-01 — Lỗi tiến trình AI (`AI_HEARTBEAT_TIMEOUT`) và hàng đợi xử lý AI bị kẹt `pending` nhưng giao diện không hiển thị trạng thái lỗi/đang chờ

## 1. Thông tin định danh

- **Bug ID:** `BUG-02-01`
- **Website:** `Sport Highlight` (`02-sport-highlight`)
- **Chức năng:** `02-04` — Chi tiết trận đấu
- **Test Case liên quan:** `02-04-02`
- **Mức độ nghiêm trọng (Severity):** `Medium`
- **Mức độ ưu tiên (Priority):** `P1`
- **Ngày giờ phát hiện:** `2026-11-03 09:50:15 (+07:00)`
- **Môi trường:** `https://sport-highlight.cmcati.vn/matches` (Chrome Desktop, Windows)

---

## 2. Các bước tái hiện (Steps to Reproduce)

1. Đăng nhập vào `https://sport-highlight.cmcati.vn/matches`.
2. Quan sát API `GET /api/matches?page=1&page_size=12&order_by=created_at&order_dir=desc` và mở chi tiết các trận đấu mới nhất:
   - Trận `sev vs ray` (`/matches/37315ce4-6a25-4ce4-985c-066e228c6f41`)
   - Trận `Troyes vs Le Mans` (`/matches/775f9ccd-6933-422b-9b76-5cd13a553ba1`)
3. Quan sát khu vực phân đoạn dưới video và cột `HÀNG ĐỢI AI` bên phải.

---

## 3. Kết quả mong đợi vs Kết quả thực tế

- **Kết quả mong đợi (Expected):**
  - Tiến trình AI phân tích phân đoạn hoạt động ổn định cho các trận đã hoàn tất ghi hình (`recording.status = "ready"`).
  - Nếu tiến trình AI đang chờ (`pending`) hoặc bị lỗi (`failed`), giao diện trang danh sách và trang chi tiết trận đấu cần hiển thị rõ trạng thái xử lý AI (ví dụ: `"Đang chờ AI xử lý"` hoặc `"Lỗi xử lý AI: AI_HEARTBEAT_TIMEOUT"` kèm nút thử lại).
- **Kết quả thực tế (Actual):**
  - Trong dữ liệu trả về từ `GET /api/matches`:
    - Trận `sev vs ray` (`37315ce4-6a25-4ce4-985c-066e228c6f41`) có `processing_run.status = "failed"`, `error_code = "AI_HEARTBEAT_TIMEOUT"`, `error_message = "No AI heartbeat for more than 180 seconds"`.
    - 11 trận đấu còn lại trên trang 1 (`Troyes vs Le Mans`, `Nice vs Rennes`, `Paris FC vs AS Monaco`, `Strasbourg vs Auxerre`, `Lyon vs Angers`, ...) đã có bản ghi hoàn chỉnh (`recording.status = "ready"`, thời lượng 135–180 phút) nhưng đều nằm ở trạng thái `processing_run.status = "pending"`, `segments_detected_count = 0`.
  - Trên giao diện chi tiết trận đấu (`/matches/775f9ccd-6933-422b-9b76-5cd13a553ba1`), hệ thống chỉ hiển thị `"Hiện chưa có phân đoạn nào"` và `"Không có đề xuất trong bộ lọc hiện tại."`, khiến người dùng không biết trận đấu đang xếp hàng chờ AI hay worker AI đã ngừng phản hồi.

---

## 4. Bằng chứng kỹ thuật (Evidence)

- **Snapshot:** `uid=53_51..53_63` tại `/matches/775f9ccd-6933-422b-9b76-5cd13a553ba1`
- **Network Response (`GET /api/matches?page=1&page_size=12&order_by=created_at&order_dir=desc`):**
  ```json
  {
    "id": "37315ce4-6a25-4ce4-985c-066e228c6f41",
    "team_a": "sev",
    "team_b": "ray",
    "status": "ended",
    "processing_run": {
      "status": "failed",
      "error_code": "AI_HEARTBEAT_TIMEOUT",
      "error_message": "No AI heartbeat for more than 180 seconds",
      "segments_detected_count": 0
    }
  }
  ```
- **Ảnh chụp màn hình:** Thiếu file ảnh minh chứng do lỗi MCP `take_screenshot`: `Error: Access denied: path "..." is not within any of the configured workspace roots.`

