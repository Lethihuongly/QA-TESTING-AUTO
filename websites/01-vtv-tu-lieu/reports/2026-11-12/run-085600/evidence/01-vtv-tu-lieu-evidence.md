# Bằng chứng kiểm thử Website 01 — VTV Tư liệu (`run-085600`)

- **Run_ID:** `run-085600`
- **Ngày giờ thực thi:** `2026-11-12T08:57:00+07:00` — `2026-11-12T09:09:30+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://vtvtulieu.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` (`01-01-01`, `01-01-02`, `01-01-03`)
- **Trang `/login` (`01-01-01`, `01-01-03`):**
  - URL: `https://vtvtulieu.cmcati.vn/login`
  - Snapshot (`uid=25_0`..`25_11`):
    - Tiêu đề: `CMC Video Miner`
    - Khối: `Đăng nhập VTV Tư liệu`
    - Form: `input#username` (`required=true`, `checkValidity()=false` khi trống), `input#password` (`required=true`, `type="password"`), nút `Hiện mật khẩu` (`uid=25_10` -> bấm đổi sang `Ẩn mật khẩu`), nút `Đăng nhập` (`uid=25_11`).
- **Phiên đã đăng nhập (`01-01-02`):**
  - Người dùng đăng nhập: `VTV` (`uid=4_1`)
  - URL làm việc: `https://vtvtulieu.cmcati.vn/` và `https://vtvtulieu.cmcati.vn/warehouse-management`

---

## 2. Feature `02-Trang-chu` & `03-Tim-kiem` (`01-02-01..03`, `01-03-01..03`)
- **Trang chủ (`/`):**
  - Header: `TRUNG TÂM TRUY XUẤT ĐA PHƯƠNG TIỆN`, nút `Toggle theme`, `Notifications`, `Xem lịch sử upload`, nút tài khoản `VTV`.
  - Main: `CMC VIDEO MINER`, `Search input` (`uid=15_14`), nút `Initiate search` (`uid=15_13`, `disabled=true` khi ô tìm kiếm trống — `01-02-03`), 6 thẻ gợi ý (`uid=15_17`..`15_22`).
- **Tìm kiếm gợi ý (`01-02-02`, `01-03-01`):**
  - Nhấn thẻ `Ẩm thực Việt Nam` (`uid=15_21`): chuyển sang `/results?q=%E1%BA%A8m+th%E1%BB%B1c+Vi%E1%BB%87t+Nam`.
  - Kết quả: `Đã tìm thấy 73 kết quả cho "Ẩm thực Việt Nam"`, 20 thẻ trang 1.
- **Phân trang (`01-03-02` — `BUG-01-01` Retest):**
  - Bấm trang 2 (`uid=18_211`): chuyển sang `/results?q=%E1%BA%A8m+th%E1%BB%B1c+Vi%E1%BB%87t+Nam&page_id=2`, `activePage="2"`, hiển thị 20 thẻ mới trang 2 (thẻ đầu: `"Tình hình kinh tế Việt Nam năm 2024"`).
- **Từ khóa rỗng / không tồn tại (`01-03-03`):**
  - Tìm `xyznonexistent12345`: hiển thị `Không tìm thấy kết quả nào!`. Nút `Clear search input` (`uid=19_6`) làm trống ô tìm kiếm và disable nút `Search current query` (`uid=19_4`).

---

## 3. Feature `04-Danh-sach-tu-lieu` & `07-Lich-su-upload` (`01-04-01..03`, `01-07-01..03`)
- **Quản lý kho (`/warehouse-management`):**
  - `h1`: `Lịch sử upload`, tổng số `140 mục` (`140 video, 24 trang`), 3 tab (`Người dùng tải`, `Danh sách khuôn mặt`, `Danh sách địa danh`), bảng 8 cột.
- **Lọc `"Thời sự"` & Phân trang:**
  - `17 mục` (`17 video, 3 trang`). Sang trang 2 (`&manual_page=2`): hiển thị 6 video trang 2 (`Tin tức thời sự quốc tế mới nhất - Tin Nóng Thế Giới 24h Qua - YouTube (1).mp4`...).
- **Lọc không tồn tại:**
  - `xyz_khong_ton_tai_9999`: `0 mục` / `0 video`, `Không có lịch sử upload - Các video bạn upload sẽ hiển thị ở đây`.

---

## 4. Feature `05-Chi-tiet-Phat-video` & `06-Phan-tich-video` (`01-05-01..03`, `01-06-01..03`)
- **Video `be08b277-678b-4b51-868e-10dd4d92d6b2`:**
  - Video info: `readyState=4`, `paused=false`, `duration=1317.477007s`, `1920x1080`, `error=null`, `currentTime=14.165s`.
  - Phân đoạn: 19 phân đoạn. Chọn phân đoạn 2 (`uid=21_17`): cập nhật `clip_id=57a4c47a-7fff-4c28-9537-24c840d1f607`, tiêu đề phân đoạn: `Phân đoạn 2/19 (1:42 - 3:00)`.
  - Phân tích clip: 5 tab (`Tóm tắt`, `Cảnh`, `Khuôn mặt`, `OCR`, `Lời thoại`). Các trường không có dữ liệu hiển thị `(Trống)`. Chuyển tab sang `Lời thoại` (`uid=21_73`) cập nhật URL `&active_tab=speech`.
- **Video ID không tồn tại (`00000000-0000-0000-0000-000000000000`):**
  - Hiển thị `Không thể tải video` (`uid=24_12`), `Video not found: 00000000-0000-0000-0000-000000000000` (`uid=24_13`), nút `Try Again` (`uid=24_14`).

---

## 5. Feature `08-Khuon-mat-Dia-danh` (`01-08-01..03`)
- Tab `Danh sách khuôn mặt` (`?tab=face`): `564 mục` (`564 khuôn mặt, 94 trang`).
- Tab `Danh sách địa danh` (`?tab=location`): `18 mục` (`18 địa danh, 3 trang`).
- Lọc `Hội An`: `1 mục` (`Phố cổ Hội An`).
- Lọc `xyz_khong_ton_tai`: `0 mục`, `Không có dữ liệu địa danh - Danh sách địa danh đã đăng ký sẽ hiển thị ở đây.`.

---

## 6. Feature `09-Tro-ly-hoi-dap` (`01-09-01..03` & `BUG-01-02` Retest)
- Mở khung chat (`uid=21_89`): 4 câu hỏi mẫu (`uid=23_14`..`23_17`), textarea (`uid=23_19`), nút gửi (`uid=23_20`, `disabled` khi rỗng).
- Bấm câu hỏi mẫu `"Video này nói về nội dung gì?"` (`uid=23_14`): AI trả lời nhanh chóng tóm tắt các sự kiện nổi bật trong video.

---

## 7. Feature `10-Upload-tu-lieu` & `11-Quan-ly-tai-khoan-Dang-xuat`
- Mở và đóng an toàn dialog `Tải Video Lên` (`uid=2_0`, đóng qua `uid=2_12`).
- Menu `Tài khoản người dùng` (`uid=4_0`): hiển thị tên tài khoản `VTV` (`uid=4_1`) và nút `Đăng xuất` (`uid=4_2`).

