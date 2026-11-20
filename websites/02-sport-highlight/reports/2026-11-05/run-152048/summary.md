# BÁO CÁO KIỂM THỬ HỒI QUY (LƯỢT 2) — WEBSITE 02: SPORT HIGHLIGHT

## 1. Thông tin chung
- **Website**: Sport Highlight (`websites/02-sport-highlight/`)
- **URL**: `https://sport-highlight.cmcati.vn/matches`
- **Thời gian chạy**: `2026-11-05 15:21:40` – `2026-11-05 15:29:10` (Asia/Ho_Chi_Minh, UTC+7)
- **Mã đợt chạy**: `run-152048` (Lượt kiểm thử kỹ lần 2 trong ngày `2026-11-05`)
- **Công cụ**: `chrome-devtools` MCP (chỉ đọc)

---

## 2. Tổng hợp kết quả
| Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN | Tỷ lệ PASS (`PASS / (PASS + FAIL)`) | Bug mới | Bug cũ còn tái hiện |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **24** | **21** | **0** | **0** | **3** | **100.00% (21/21)** | **0** | **1** (`BUG-02-02` mức Low/P3 UX) |

- **Kiểm tra công thức**: `Tổng TC = 21 + 0 + 0 + 3 = 24`.
- **Các case `NOT_RUN` (3 case ngoài phạm vi chỉ đọc)**: `02-07-01`, `02-07-02`, `02-07-03` (thêm/xóa/tách/gộp phân đoạn và tạo video highlight mới).
- **Đăng xuất cuối website**: Đã thực hiện đăng xuất qua menu tài khoản (`uid=111_1`) và xác minh truy cập `/matches` tự động redirect về `/login?next=%2Fmatches` (`uid=112_0..112_14`).

---

## 3. Kết quả kiểm tra lại Bug cũ (Retest)
| Mã Bug | Tiêu đề | Trạng thái trong đợt `run-152048` | Bằng chứng xác minh thực tế |
| :--- | :--- | :--- | :--- |
| **BUG-02-01** | Một số trận đấu mới upload bị lỗi xử lý AI (`ERROR` / `0 đoạn`) | **Không còn tái hiện (Đã khắc phục)** | Khi lọc trạng thái `"Đã kết thúc"` (`154 trận đấu`), toàn bộ 12 trận mới nhất trên trang 1 đều hoàn tất xử lý với nút `"Chỉnh sửa"`. Trận `Troyes vs Le Mans` (`775f9ccd-...`) hiện có `134 đoạn` (tăng thêm 10 đoạn so với 124 đoạn buổi trưa do đồng bộ trực tiếp); trận `Psv vs Club Brugge Kv` (`26f87d02-...`) có `457 đoạn` (`331 Trong trận`, `126 Ngoài trận`) và phát video mượt. |
| **BUG-02-02** | Truy cập `/matches/<uuid-không-tồn-tại>` hiện Toast 404 nhưng tiêu đề vẫn treo `"Đang tải..."` | **Còn tái hiện (Mức Low/P3 UX)** | Truy cập `/matches/00000000-0000-0000-0000-000000000000` hiển thị đúng Toast `"Đã xảy ra lỗi - Match was not found."` (`uid=110_73..110_80`) và khóa toàn bộ nút điều khiển player (`02-04-03` PASS), nhưng tiêu đề `uid=110_4` vẫn giữ `"Đang tải..."` và khung video `uid=110_30` vẫn giữ `"Đang tải video..."`. |

