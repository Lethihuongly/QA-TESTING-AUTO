# Retest `BUG-03-02` — Bộ lọc `Show only flag=1` (`#flag1OnlyToggle`) trên bảng Frame Logs

- **Mã Bug:** `BUG-03-02`
- **Case_ID liên quan:** `03-06-02`
- **Run_ID:** `2026-11-10/run-090400`
- **Thời điểm kiểm tra:** `2026-11-10T10:03:43+07:00`
- **URL:** `https://anti-logo.cmcati.vn/channel/1`
- **Trạng thái hiện tại:** **FIXED (ĐÃ KHẮC PHỤC)**

## 1. Các bước kiểm tra
1. Quan sát bảng `#logTableBody` khi chưa bật `#flag1OnlyToggle`: hiển thị `"Showing 1-75 of 500 frames"` (hoặc `"Showing 76-150 of 500 frames"` gồm cả dòng `Flag=0` và `Flag=1`).
2. Tích chọn checkbox `Show only flag=1` (`#flag1OnlyToggle`, `uid=79_749`).
3. Kiểm tra toàn bộ các dòng hiển thị trong `#logTableBody` và nhãn `#frameLogWindowLabel`.

## 2. Kết quả Thực tế (Actual)
```json
{
  "toggleChecked": true,
  "windowLabel": "Showing 1-11 of 11 frames",
  "aiFlagOneCount": "50783",
  "visibleRowCount": 11,
  "flag1Count": 11,
  "flag0Count": 0,
  "nonFlag1Rows": [],
  "sampleFirst5": [
    {"frame": "4292851", "flag": "1", "player": "found", "logo": "found"},
    {"frame": "4292551", "flag": "1", "player": "found", "logo": "found"},
    {"frame": "4292478", "flag": "1", "player": "found", "logo": "found"},
    {"frame": "4292401", "flag": "1", "player": "found", "logo": "found"},
    {"frame": "4291379", "flag": "1", "player": "found", "logo": "found"}
  ]
}
```

## 3. Kết luận QA
- **`BUG-03-02` đã được sửa (`FIXED`)**: Bộ lọc `Show only flag=1` thực sự loại bỏ toàn bộ các dòng `Flag=0` khỏi `#logTableBody`.

