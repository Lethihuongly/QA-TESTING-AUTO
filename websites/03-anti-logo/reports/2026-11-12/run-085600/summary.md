# Báo cáo Kiểm thử Hồi quy Website 03 — Anti-Logo (VTV PCD CONTROL)

- **Run_ID:** `run-085600`
- **Ngày giờ thực thi:** `2026-11-12T09:13:16+07:00` — `2026-11-12T09:16:40+07:00` (Asia/Ho_Chi_Minh)
- **URL kiểm thử:** `https://anti-logo.cmcati.vn/channel/1`
- **Công cụ:** `chrome-devtools` MCP (Read-Only Regression)

---

## 1. Tổng hợp Kết quả Kiểm thử

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Tổng số Test Case (`test-cases.md`)** | **39** | Đếm từ 12 features (`03-01` .. `03-12`) |
| **PASS** | **30** | Đạt yêu cầu nghiệp vụ |
| **FAIL** | **0** | Không có lỗi phát sinh mới |
| **BLOCKED** | **0** | Không có |
| **NOT_RUN** | **9** | `03-07-03`, `03-08-02..03`, `03-09-01..03`, `03-10-01..03` (Chỉ đọc — không can thiệp luồng/ghi đè) |
| **Tỷ lệ PASS (`PASS / (PASS + FAIL)`)** | **100.0% (30/30)** | Tính trên các ca đã thực thi |

---

## 2. Kết quả Kiểm tra lại Bug cũ (Retest)

| Bug_ID | Case_ID | Mức độ | Trạng thái Hiện tại | Chi tiết |
|---|---|---|---|---|
| **BUG-03-01** | `03-07-02` | P2 | **FIXED** | Nhấn `✏️ Sửa BBox` (`uid=41_452`) trên dòng frame vi phạm: modal `#thumbModal` mở an toàn, hiển thị đúng tiêu đề `Frame #72240 — FLAG 1 (Player: found, Logo: found)` và đóng an toàn qua `#thumbModalClose`. |
| **BUG-03-02** | `03-06-02` | P1 | **FIXED** | Khi checkbox `Show only flag=1` (`#flag1OnlyToggle`, `uid=41_420`) được bật (`checked=true`), bảng Frame Logs lọc chính xác 75/75 dòng hiển thị có `Flag=1` (`nonFlag1Count = 0`). |
| **BUG-03-03** | `03-03-02`, `03-03-03`, `03-12-03` | P0 | **FIXED** | Cả 5 endpoint (`/v2/api/sdi_inputs`, `/channels/api/{1,2,3}/sdi_inputs` và `/channels/api/state`) đều trả về `HTTP 200`, trạng thái `READY`/`IDLE`, `ok=true`, không bị lỗi `502 Bad Gateway`. |
| **BUG-03-04** | `03-04-04`, `03-05-02` | P0 | **PASS_SMOOTH / READY** | Trạng thái kênh `IDLE` được phản ánh đồng bộ trên UI và API; hạ tầng SDI sẵn sàng. |

