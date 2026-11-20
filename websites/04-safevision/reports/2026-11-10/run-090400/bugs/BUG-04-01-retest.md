# Retest `BUG-04-01` — Bảng `THỐNG KÊ PHÂN LOẠI LOGO` hiển thị và sắp xếp đúng theo dữ liệu hiện tại

- **Mã Bug:** `BUG-04-01`
- **Case_ID liên quan:** `04-02-03`
- **Run_ID:** `2026-11-10/run-090400`
- **Thời điểm kiểm tra:** `2026-11-10T16:06:35+07:00`
- **URL:** `https://safevision.cmcati.vn/`
- **Trạng thái hiện tại:** **FIXED (ĐÃ KHẮC PHỤC)**

## 1. Bằng chứng API (`reqid=64834 GET https://safevision-api.cmcati.vn/api/v1/dashboard/stats`)
```json
{
  "totalChannels": 9,
  "totalStreams": 274,
  "activeStreams": 1,
  "totalDetections": 218697,
  "todayDetections": 0,
  "topLogos": [
    {"count": 16446, "approved": 1, "logo": "3soc", "rejected": 0},
    {"count": 289, "approved": 5, "logo": "3que", "rejected": 0},
    {"count": 279, "approved": 1, "logo": "ao3soc", "rejected": 0},
    {"count": 156, "approved": 0, "logo": "bản đồ 1", "rejected": 0},
    {"count": 32, "approved": 0, "logo": "bản đồ 3", "rejected": 0},
    {"count": 28, "approved": 0, "logo": "bản đồ 2", "rejected": 0}
  ]
}
```

## 2. Bằng chứng UI (`uid=86_43..61`)
- `3soc`: `16446 lần phát hiện`
- `3que`: `289 lần phát hiện`
- `ao3soc`: `279 lần phát hiện`
- `bản đồ 1`: `156 lần phát hiện`
- `bản đồ 3`: `32 lần phát hiện`
- `bản đồ 2`: `28 lần phát hiện`

## 3. Kết luận QA
- **`BUG-04-01` đã được sửa (`FIXED`)**: Tên logo hiển thị đầy đủ (không còn `"Không xác định"`) và thứ tự sắp xếp giảm dần khớp 100% với dữ liệu API.

