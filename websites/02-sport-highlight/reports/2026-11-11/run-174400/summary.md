# Báo cáo Kiểm thử Hồi quy Website 02 — Sport Highlight (CMCATI Highlight)

- **Run_ID:** `run-174400`
- **Ngày giờ thực thi:** `2026-11-11T17:50:45+07:00` — `2026-11-11T17:54:05+07:00` (Asia/Ho_Chi_Minh)
- **URL kiểm thử:** `https://sport-highlight.cmcati.vn/matches`
- **Công cụ:** `chrome-devtools` MCP (Read-Only Regression)

---

## 1. Tổng hợp Kết quả Kiểm thử

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Tổng số Test Case (`test-cases.md`)** | **24** | 8 feature x 3 case |
| **PASS** | **19** | Đạt yêu cầu nghiệp vụ |
| **FAIL** | **2** | `02-03-03` (`BUG-02-03`), `02-04-03` (`BUG-02-02`) |
| **BLOCKED** | **0** | Không có |
| **NOT_RUN** | **3** | `02-07-02`, `02-07-03` (Chỉ đọc — không tạo trận/export thật) |
| **Tỷ lệ PASS (`PASS / (PASS + FAIL)`)** | **90.48% (19/21)** | Tính trên các ca đã thực thi |

---

## 2. Trạng thái Bug Đã Kiểm tra Lại

| Bug_ID | Case_ID | Mức độ | Trạng thái Hiện tại | Chi tiết |
|---|---|---|---|---|
| **BUG-02-01** | `02-05-01` | P0 | **FIXED** | Video HLS trên trận `Sevilla vs Alaves` (`28fa419c...`) phát mượt mà ở độ phân giải 1080p (`readyState=4`, `currentTime` tăng liên tục, `error=null`). |
| **BUG-02-02** | `02-04-03`, `02-05-03` | P1 | **PARTIALLY FIXED** | Player controls đã được disabled khi match 404 (`02-05-03` = PASS); tuy nhiên giao diện vẫn treo ở trạng thái `"Đang tải..."` và `"Đang tải video..."`, không có màn hình Empty/Error state 404 (`02-04-03` = FAIL). |
| **BUG-02-03** | `02-03-03` | P1 | **OPEN** | Lọc `TRẠNG THÁI = "Đã kết thúc"` rồi bấm `"Tiếp"` sang trang 2: URL mất tham số lọc, combobox bị reset về `"Tất cả"` và danh sách chuyển sang tải toàn bộ trận không lọc (`02-03-03` = FAIL). |
| **BUG-02-04** | `02-05-02` | P1 | **FIXED (Phần UI Timeline)** | Timeline phân đoạn AI hiển thị đầy đủ các block và tua video mượt mà khi click. |

