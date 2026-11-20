# Báo cáo Kiểm thử Hồi quy Website 04 — SafeVision (VTV Logo Detection)

- **Run_ID:** `run-174400`
- **Ngày giờ thực thi:** `2026-11-11T17:57:35+07:00` — `2026-11-11T17:59:40+07:00` (Asia/Ho_Chi_Minh)
- **URL kiểm thử:** `https://safevision.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP (Read-Only Regression)

---

## 1. Tổng hợp Kết quả Kiểm thử

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Tổng số Test Case (`test-cases.md`)** | **28** | Đếm từ 9 features |
| **PASS** | **24** | Đạt yêu cầu nghiệp vụ |
| **FAIL** | **0** | Không có ca thất bại |
| **BLOCKED** | **1** | `04-07-03` (`BUG-04-03`: Header search input không tồn tại) |
| **NOT_RUN** | **3** | `04-03-03`, `04-08-02`, `04-08-03` (Chỉ đọc — không tạo kênh/thay đổi cấu hình) |
| **Tỷ lệ PASS (`PASS / (PASS + FAIL)`)** | **100.0% (24/24)** | Tính trên các ca đã thực thi |

---

## 2. Trạng thái Bug Đã Kiểm tra Lại

| Bug_ID | Case_ID | Mức độ | Trạng thái Hiện tại | Chi tiết |
|---|---|---|---|---|
| **BUG-04-01** | `04-02-03` | P1 | **FIXED** | Dữ liệu thống kê phân loại logo hiển thị đồng bộ với backend. |
| **BUG-04-02** | `04-05-02` | P0 | **FIXED** | Luồng video gốc trên `VTV10` phát mượt mà: `wallSec=8.02s`, `deltaVideoSec=8.02s`, `playbackRatio=1.000`, `droppedFrames=0` (`0.00%`), `effectiveFps=24.9 FPS`, `freezeTicks=0`. Kết luận: `SMOOTH`. |
| **BUG-04-03** | `04-07-03` | P2 | **CẦN XÁC NHẬN YÊU CẦU (BLOCKED)** | Không có ô `<input>` tìm kiếm trên thanh `<header>` (`headerInputCount = 0`). Ô tìm kiếm nằm ở trang `/channels`. Cần xác nhận của PO/BA về thiết kế. |
| **BUG-04-04** | `04-03-01`, `04-05-04` | P1 | **Phần 1: CẦN XÁC NHẬN / Phần 2: SMOOTH** | Danh sách 9 kênh hiển thị đầy đủ; video khởi tạo và phát nhanh chóng. |

