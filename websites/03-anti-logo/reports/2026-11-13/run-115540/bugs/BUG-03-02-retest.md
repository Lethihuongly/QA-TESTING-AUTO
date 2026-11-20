# Retest Bug BUG-03-02 — Anti-Logo

- **Mã Bug:** `BUG-03-02`
- **Mã Test Case:** `03-06-02`
- **Chức năng:** `06-AI-Flag-Logs`
- **Mức độ nghiêm trọng:** `P1`
- **Ngày kiểm tra lại:** `2026-11-13`
- **Run_ID:** `run-115540`
- **Trạng thái:** **FIXED**

## Mô tả lỗi ban đầu
Khi bật checkbox `Show only flag=1` (`#flag1OnlyToggle`), bảng Frame Logs lọc sai hoặc vẫn hiển thị các frame có `Flag=0`.

## Kết quả kiểm tra lại thực tế (2026-11-13)
1. Trên trang `/channel/1`, bật checkbox `Show only flag=1` (`#flag1OnlyToggle`).
2. Bảng `#logTableBody` tải lại 75 frame.
3. Kiểm tra toàn bộ 75 dòng hiển thị: 100% các dòng đều có `Flag=1`, `nonFlag1Count = 0`.
4. Các frame đầu tiên: 350940, 350880, 350700, 350580, 350550.

## Kết luận
Bộ lọc Flag 1 hoạt động hoàn toàn chính xác. Trạng thái xác nhận: **FIXED**.

