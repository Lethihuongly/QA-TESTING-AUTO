# BÁO CÁO TỔNG HỢP KIỂM THỬ — WEBSITE 02: SPORT HIGHLIGHT (CMCATI HIGHLIGHT)

## 1. Thông tin chung
- **Website:** Sport Highlight — Hệ thống quản lý trận đấu và biên tập highlight (`VTV HIGHLIGHT` / `CMCATI Highlight`)
- **URL kiểm thử:** `https://sport-highlight.cmcati.vn/matches`
- **Ngày giờ chạy:** `2026-11-05 13:53:00` → `2026-11-05 14:12:10` (UTC+7, `run-115830`)
- **Người thực hiện:** QA Agent (sử dụng `chrome-devtools` MCP) phối hợp cùng Tester (nhập thông tin đăng nhập thủ công)
- **Phạm vi kiểm thử:** Kiểm thử hồi quy chỉ đọc (Read-only Regression Test) 8 nhóm chức năng (`01-Dang-nhap` đến `08-Dang-xuat`, tổng 24 test case) và kiểm tra lại 2 bug cũ (`BUG-02-01`, `BUG-02-02`).

---

## 2. Thống kê kết quả thực thi

| Chỉ số | Giá trị | Ghi chú |
| --- | ---: | --- |
| **Tổng số Test Case** | **24** | `PASS + FAIL + BLOCKED + NOT_RUN = 21 + 0 + 0 + 3 = 24` |
| **PASS** | **21** | Đạt toàn bộ 21/21 test case trong phạm vi chỉ đọc |
| **FAIL** | **0** | Không có test case FAIL theo tiêu chí `test-cases.md` |
| **BLOCKED** | **0** | Không có case bị chặn |
| **NOT_RUN** | **3** | `02-07-01`, `02-07-02`, `02-07-03` (ngoài phạm vi chỉ đọc: không tạo trận / không xuất gói highlight / không sửa xóa phân đoạn) |
| **Tỷ lệ PASS** | **100.00%** | `PASS / (PASS + FAIL) = 21 / 21` |

---

## 3. Kết quả kiểm tra lại Bug cũ (Retest)

| Mã Bug | Tiêu đề | Kết quả kiểm tra lại (`2026-11-05`) | Bằng chứng |
| --- | --- | --- | --- |
| **BUG-02-01** | Nhiều trận đấu sau khi ghi hình xong bị rơi vào trạng thái `"Xử lý AI thất bại"` (0 phân đoạn AI) | **Không còn tái hiện trong lượt này** | Kiểm tra lại trực tiếp trận `Troyes vs Le Mans` (`775f9ccd-6933-422b-9b76-5cd13a553ba1` — trận bị lỗi ở báo cáo trước) thấy đã xử lý xong (`Tất cả 124` đoạn, `status "Đang đồng bộ trực tiếp"`). Kiểm tra trận mới nhất ngày `05/11` (`Psv vs Club Brugge Kv` `26f87d02-...`) có `457` phân đoạn (`Trong trận 331`, `Ngoài trận 126`, `Mức 3 L3 98`), và kiểm tra `/api/matches?page=1&limit=12` xác nhận cả 12 trận trang 1 đều `status: "completed"`, không có trận nào báo `"Xử lý AI thất bại"`. |
| **BUG-02-02** | Trang chi tiết trận đấu với ID không tồn tại (`/matches/00000000-...`) giữ nguyên chữ `"Đang tải..."` và `"Đang tải video..."` sau khi Toast 404 biến mất | **Còn tái hiện** *(Mức độ: Low / P3 UX)* | Truy cập `/matches/00000000-0000-0000-0000-000000000000` hiển thị 4 Toast `"Đã xảy ra lỗi - Match was not found."` (`uid=64_73..64_88`), các nút phát video bị `disabled` và timeline hiện `"Hiện chưa có phân đoạn nào"` (đáp ứng tiêu chí PASS của `02-04-03`), nhưng tiêu đề trận (`uid=64_4`) vẫn giữ `"Đang tải..."` và khung video (`uid=64_30`) vẫn giữ `"Đang tải video..."`. |

---

## 4. Danh sách Bug mới phát hiện
- **Không có bug mới** trên Website 02 trong đợt chạy này.

---

## 5. Ghi chú & Hạn chế trong lượt chạy
1. **Biến động dữ liệu thực tế:** Tổng số trận đấu tại thời điểm kiểm thử là `154 trận đấu` (`13 trang`), tăng từ `144 trận đấu` của ngày `2026-11-04`.
2. **Giới hạn lưu ảnh chụp màn hình qua MCP:** Công cụ `take_screenshot` khi truyền `filePath` bị chặn bởi cấu hình workspace root của MCP (`Error: Access denied: path ... is not within any of the configured workspace roots.`). Toàn bộ bằng chứng đã được ghi nhận bằng DOM Snapshot UID, Network và `evaluate_script`.

