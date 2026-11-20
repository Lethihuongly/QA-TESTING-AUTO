# Bằng chứng kiểm thử Website 02 — Sport Highlight (`run-085600`)

- **Run_ID:** `run-085600`
- **Ngày giờ thực thi:** `2026-11-12T09:09:33+07:00` — `2026-11-12T09:13:10+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://sport-highlight.cmcati.vn/matches`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` & `08-Tai-khoan-dang-xuat`
- **Xác thực phiên:** `GET /api/auth/me` trả về `HTTP 200` (`{"username": "vtv"}`). Khi truy cập không có cookie (`credentials: 'omit'`), `GET /api/auth/me` trả về `HTTP 401`.
- **Menu tài khoản (`uid=30_0`):** Hiển thị `menuitem "Đăng xuất"` (`uid=30_1`).

---

## 2. Feature `02-Danh-sach-tran` & `03-Tim-kiem-Loc-Phan-trang`
- **Danh sách trận (`/matches`):** Hiển thị `171 trận đấu`, `Trang 1 / 15`, 12 thẻ trận đấu trên trang 1 (`Le Mans – – Monaco`, `Rennes – – Lille`...).
- **Tìm kiếm `"Real Madrid"` (`02-03-01`):** Trả về `11 trận đấu` (`Trang 1 / 1`). Nhấn `"Đặt lại"` (`uid=29_26`) khôi phục `171 trận đấu`.
- **Tìm kiếm không tồn tại (`02-03-02`):** Nhập `"xyz_khong_ton_tai_9999"` trả về `0 trận đấu`, hiển thị `"Không tìm thấy trận đấu - Điều chỉnh bộ lọc hoặc tạo trận mới để bắt đầu ghi hình."`.
- **Phân trang sau khi lọc (`02-03-03` — `BUG-02-03` FAIL):** Chọn `TRẠNG THÁI = "Đã kết thúc"` (`uid=33_4`) -> bấm `"Áp dụng"` (`uid=34_25`) -> bấm `"Tiếp"` (`uid=34_183`): URL chuyển sang `/matches?page=2`, mất tham số lọc và combobox `TRẠNG THÁI` (`uid=36_19`) bị reset về `"Tất cả"`.

---

## 3. Feature `04-Chi-tiet-tran-dau`, `05-Phat-video` & `06-Highlight`
- **Trận `Sevilla vs Alaves` (`/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a?fromPage=1`):**
  - Thẻ `<video>`: `readyState=4`, `duration=9900s`, `1920x1080`, `paused=false`, `currentTime=12.01s`, `error=null` (`BUG-02-01` FIXED).
  - Phân đoạn AI: `599 đoạn đang hiển thị` (`Trong trận 405`, `Ngoài trận 194`; `Trước trận 62`, `Hiệp 1 204`, `Giờ nghỉ 119`, `Hiệp 2 206`, `Sau trận 8`).
  - Dialog `Danh sách Highlight` (`uid=38_0`): Mở và đóng bình thường, hiển thị `"Trận này chưa có highlight được export."` (`uid=38_4`).
- **Trận không tồn tại (`/matches/00000000-0000-0000-0000-000000000000` — `BUG-02-02` PARTIALLY FIXED):**
  - Các nút điều khiển trình phát đều `disabled` (`02-05-03` = `PASS`).
  - Giao diện vẫn treo ở `"Đang tải..."` (`uid=39_4`) và `"Đang tải video..."` (`uid=39_30`) (`02-04-03` = `FAIL`).

---

## 4. Feature `07-Upload-ghi-hinh`
- Mở và đóng an toàn dialog `Tạo trận đấu` (`uid=28_0`, đóng qua `uid=28_20`) ở chế độ chỉ đọc.

