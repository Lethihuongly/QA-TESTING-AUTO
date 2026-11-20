# Retest BUG-03-02: Bộ lọc chỉ hiển thị Flag=1 trong bảng Frame Logs

- **Bug_ID:** BUG-03-02
- **Case_ID:** 03-06-02
- **Website:** 03 — Anti-Logo (`https://anti-logo.cmcati.vn/`)
- **Mức độ ưu tiên:** P1 (Medium)
- **Trạng thái kiểm tra lại (`2026-11-11/run-174400`):** **FIXED**

## 1. Kết quả kiểm tra
- Bật checkbox `#flag1OnlyToggle` (`Show only flag=1`):
  - Bảng `#logTableBody` lọc chính xác, tất cả các dòng hiển thị đều có `Flag=1` (Player: found, Logo: found).
  - Không có dòng nào mang `Flag=0` bị hiển thị lẫn lộn.

## 2. Kết luận QA
Bộ lọc chỉ hiển thị Flag=1 hoạt động chính xác (**FIXED**).

