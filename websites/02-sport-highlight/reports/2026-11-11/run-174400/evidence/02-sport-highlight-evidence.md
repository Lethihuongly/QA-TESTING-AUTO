# Bằng chứng kiểm thử Website 02 — Sport Highlight (`run-174400`)

- **Run_ID:** `run-174400`
- **Ngày giờ thực thi:** `2026-11-11T17:50:45+07:00` — `2026-11-11T17:54:05+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://sport-highlight.cmcati.vn/matches`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` & `08-Dang-xuat`
- **Xác thực:** Khi chưa đăng nhập, route `/matches` trả về HTTP 401 và chuyển hướng về `/login?next=%2Fmatches`.
- **Form đăng nhập:** `input#username` (required), `input#password` (required), nút `Hiện mật khẩu`.
- **Menu tài khoản:** Bấm nút mở menu tài khoản hiển thị tùy chọn `Đăng xuất`.

---

## 2. Feature `02-Danh-sach-tran` & `03-Tim-kiem-Loc-Phan-trang`
- **Danh sách mặc định:** `/matches` hiển thị `173 trận đấu`, `Trang 1 / 15`, 12 thẻ trận đấu. Thẻ đầu tiên: `Le Mans – – Monaco`.
- **Tìm kiếm `Real Madrid`:** Kết quả lọc ra đúng `11 trận đấu`, `Trang 1 / 1`.
- **Nút `Đặt lại`:** Khôi phục danh sách đầy đủ `173 trận đấu`, `Trang 1 / 15`.
- **Tìm kiếm không tồn tại `xyz_khong_ton_tai_9999`:** Hiển thị `0 trận đấu` và thông báo `Không tìm thấy trận đấu`.
- **Phân trang kèm bộ lọc (`BUG-02-03` OPEN):**
  - Chọn `TRẠNG THÁI = "Đã kết thúc"`.
  - Bấm `"Tiếp"`: URL chuyển sang `/matches?page=2`, tham số `status=completed` bị mất, combobox `TRẠNG THÁI` bị reset về `"Tất cả"`.

---

## 3. Feature `04-Chi-tiet-tran-dau` & `05-Phat-video`
- **Trận `Sevilla vs Alaves` (`28fa419c...`):**
  - `<video>` phát mượt mà: `readyState=4`, `paused=false`, `duration=9900s`, `videoWidth=1920`, `videoHeight=1080`, `error=null`.
- **Trận không tồn tại (`00000000-0000-0000-0000-000000000000` — `BUG-02-02`):**
  - 9 nút điều khiển player đều bị vô hiệu hóa (`disabled=true`).
  - Giao diện treo vĩnh viễn ở trạng thái `"Đang tải..."` và `"Đang tải video..."`.

---

## 4. Feature `06-Highlight` & `07-Upload-ghi-hinh`
- **Highlight:** Bấm `Highlight` mở dialog `Danh sách Highlight`, hiển thị `Trận này chưa có highlight được export.` và nút `Close`.
- **Tạo trận mới:** Bấm `Trận mới` mở dialog `Tạo trận đấu` với các trường Đội A, Đội B, Kênh phát, Giải đấu, Giờ bắt đầu, Giờ kết thúc; đóng an toàn bằng nút `Close`.

