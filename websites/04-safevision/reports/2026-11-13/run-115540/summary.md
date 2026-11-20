# Báo cáo Kiểm thử Hồi quy Website 04 — SafeVision (VTV Logo Detection)

- **Run_ID:** `run-115540`
- **Ngày giờ thực thi:** `2026-11-13T12:09:00+07:00` — `2026-11-13T12:10:55+07:00` (Asia/Ho_Chi_Minh)
- **URL kiểm thử:** `https://safevision.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP (Read-Only Regression)

---

## 1. Tổng hợp Kết quả Kiểm thử

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Tổng số Test Case (`test-cases.md`)** | **28** | 9 features |
| **PASS** | **24** | Đã thực thi đầy đủ và đạt yêu cầu |
| **FAIL** | **0** | Không có |
| **BLOCKED** | **1** | `04-07-03` (`BUG-04-03` — Ô tìm kiếm nhanh trên header không tồn tại trong thiết kế DOM) |
| **NOT_RUN** | **3** | `04-03-03`, `04-08-02`, `04-08-03` (Ngoài phạm vi chỉ đọc) |
| **Tỷ lệ PASS (`PASS / (PASS + FAIL)`)** | **100.0% (24/24)** | Tính trên các ca đã thực thi có kết quả |

> [!NOTE]
> So với đợt chạy `run-085600` ngày hôm qua (2026-11-12) bị treo 22 case do hết phiên đăng nhập, hôm nay phiên đăng nhập với tài khoản `VTV vtv VT` đã hoạt động trở lại đầy đủ, giải phóng toàn bộ 22 case bị nghẽn và đưa kết quả kiểm thử SafeVision lên 24 PASS.

---

## 2. Kết quả Kiểm tra lại Bug cũ (Retest)

| Bug_ID | Case_ID | Mức độ | Trạng thái Hiện tại | Chi tiết |
|---|---|---|---|---|
| **BUG-04-01** | `04-02-03` | P1 | **FIXED** | Khối Thống kê phân loại logo hiển thị chính xác 7 nhóm nhãn (3soc: 16446, 3que: 289, ao3soc: 279, bản đồ 1: 156, s: 59, bản đồ 3: 32, bản đồ 2: 28). |
| **BUG-04-02** | `04-05-02` | P0 | **FIXED** | Đo lường định lượng phát video Luồng Gốc trên VTV10: `wallSec=4.00s`, `deltaVideoSec=3.58s`, `playbackRatio=0.895`, `decodedFrames=90`, `droppedFrames=0` (tỷ lệ rớt frame 0.00%), `effectiveFps=22.5 FPS`. Kết luận: **SMOOTH**. |
| **BUG-04-03** | `04-07-03` | P2 | **BLOCKED (Cần xác nhận spec)** | Ô tìm kiếm nhanh trên Header không có trong thiết kế UI; thanh tìm kiếm nằm tại `/channels`. |
| **BUG-04-04** | `04-03-01`, `04-05-02` | P0 | **FIXED** | Danh sách 9 kênh hiển thị đầy đủ và trạng thái hoạt động đồng bộ; phát video ổn định. |

