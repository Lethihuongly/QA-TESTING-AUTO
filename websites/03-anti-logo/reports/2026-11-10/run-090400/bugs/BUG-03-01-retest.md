# Retest `BUG-03-01` — Nhãn `FLAG` trong modal `✏️ Sửa BBox` (`#thumbModalTitle`) khớp với dòng log đã chọn

- **Mã Bug:** `BUG-03-01`
- **Case_ID liên quan:** `03-07-01`, `03-07-02`
- **Run_ID:** `2026-11-10/run-090400`
- **Thời điểm kiểm tra:** `2026-11-10T10:04:19+07:00`
- **URL:** `https://anti-logo.cmcati.vn/channel/1`
- **Trạng thái hiện tại:** **FIXED (ĐÃ KHẮC PHỤC)**

## 1. Các bước kiểm tra (Chế độ chỉ đọc)
1. Bật bộ lọc `Show only flag=1` (`#flag1OnlyToggle`) trên bảng Frame Logs (`#logTableBody`).
2. Nhấn nút `✏️ Sửa BBox` trên dòng đầu tiên có `Flag=1` (`Frame 4292851`).
3. Kiểm tra tiêu đề `#thumbModalTitle` trong `#thumbModal`, sau đó nhấn `#thumbModalClose` (`×`) để đóng modal (không lưu).
4. Bỏ chọn `#flag1OnlyToggle`, nhấn nút `✏️ Sửa BBox` trên dòng đầu tiên có `Flag=0` (`Frame 4302977`).
5. Kiểm tra tiêu đề `#thumbModalTitle`, sau đó nhấn `#thumbModalClose` (`×`) để đóng modal.

## 2. Kết quả Thực tế (Actual)
- **Trên dòng `Flag=1` (`Frame 4292851`):**
  - `modalVisible = true`
  - `#thumbModalTitle = "Frame #4292851 — FLAG 1 (Player: found, Logo: found)"`
- **Trên dòng `Flag=0` (`Frame 4302977`):**
  - `modalVisible = true`
  - `#thumbModalTitle = "Frame #4302977 — FLAG 0 (Player: found, Logo: none)"`
- Sau khi nhấn `#thumbModalClose`, modal đóng hoàn toàn (`modalClosedAfter = true`).

## 3. Kết luận QA
- **`BUG-03-01` đã được sửa (`FIXED`)**: Tiêu đề `#thumbModalTitle` phản ánh chính xác số Frame và giá trị `FLAG 1` / `FLAG 0` của dòng log được chọn.

