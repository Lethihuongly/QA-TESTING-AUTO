# Retest BUG-02-04: Hiển thị phân đoạn trên Timeline và giới hạn kéo biên segment

- **Bug_ID:** BUG-02-04
- **Case_ID:** 02-05-02 (Phần hiển thị Timeline chỉ đọc) / `02-07` (Phần kéo biên sửa dữ liệu — ngoài phạm vi chỉ đọc)
- **Website:** 02 — Sport Highlight (`https://sport-highlight.cmcati.vn/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a`)
- **Mức độ ưu tiên:** P1 (High)
- **Trạng thái báo cáo cũ (`2026-11-09/run-110430`):** PARTIALLY FIXED / FIXED (tùy phần)
- **Trạng thái kiểm tra lại (`2026-11-10/run-090400`):**
  - **Phần 2 (Hiển thị các khối phân đoạn trên Timeline khi chọn/bỏ chọn và thay đổi vùng xem):** **FIXED (Đã xác minh thực tế bằng MCP)**
  - **Phần 1 (Kéo biên segment trên Timeline / `clampSegmentBounds`):** **CHƯA KIỂM CHỨNG BẰNG THAO TÁC SỬA (NOT VERIFIED — Read-Only Scope)**
- **Thời điểm kiểm tra:** `2026-11-10T09:41:00+07:00` — `2026-11-10T09:42:39+07:00`

## 1. Kiểm chứng thực tế Phần 2 (Hiển thị phân đoạn trên Timeline — Chỉ đọc)
Trên trận `Sevilla vs Alaves` (`/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a`, tổng cộng `599` phân đoạn):
1. **Tại mức phóng `1x` (Toàn trận `00:00:00` – `02:45:00`):**
   - Toàn bộ **599/599** khối phân đoạn (`div[role="button"]`) đều được hiển thị đầy đủ trên thanh Timeline (`count: 599`).
2. **Khi chọn sang phân đoạn khác (`uid=65_703` — `"Ngoài trận · Hai đội ra sân Mức 3 00:00:15 - 00:00:18"`):**
   - Trình phát tua chính xác đến `15.36s`.
   - Hai nút kéo biên `"Điểm vào"` và `"Điểm ra"` (`childButtons: 2`) di chuyển sang phân đoạn 2, trong khi toàn bộ **599** khối phân đoạn trên Timeline vẫn giữ nguyên hiển thị (không xảy ra lỗi ẩn mất các phân đoạn không được chọn).
3. **Khi thay đổi vùng xem Timeline (Nhấn `"Phóng to"` `uid=65_43` từ `1x` lên `2x`):**
   - Khung nhìn dòng thời gian hiển thị nửa đầu trận đấu (`00:00:00` – `01:23:44`).
   - UI áp dụng virtualization hợp lý, hiển thị **375** khối phân đoạn nằm trong vùng xem hiện tại (`firstBlock: "00:00:00 - 00:00:15"`, `lastBlock: "01:22:08 - 01:23:44"`), và phân đoạn đang chọn vẫn giữ nguyên trạng thái active kèm 2 nút `"Điểm vào"` / `"Điểm ra"`.

## 2. Ghi nhận Phần 1 (Kéo biên segment trên Timeline)
- Theo đúng quy định mục 3 và mục 4B: Thao tác kéo biên segment trên Timeline có thể tự động gửi request `PATCH /api/matches/{id}/segments/{segId}` làm thay đổi dữ liệu thật trên hệ thống đang hoạt động, nên **không thực hiện trên dữ liệu thật**.
- Do đó, phần giới hạn kéo biên (`clampSegmentBounds`) được ghi nhận là **chưa kiểm chứng bằng thao tác sửa trong đợt chạy chỉ đọc này**; không tự kết luận đã `FIXED` chỉ từ việc đọc mã nguồn.

