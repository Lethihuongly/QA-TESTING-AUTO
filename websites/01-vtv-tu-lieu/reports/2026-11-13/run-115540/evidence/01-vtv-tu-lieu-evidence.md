# Bằng chứng kiểm thử Website 01 — VTV Tư liệu (`run-115540`)

- **Run_ID:** `run-115540`
- **Ngày giờ thực thi:** `2026-11-13T12:03:00+07:00` — `2026-11-13T12:08:15+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://vtvtulieu.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` (`01-01-01`, `01-01-02`, `01-01-03`)
- **Trang `/login` (`01-01-01`, `01-01-03`):**
  - URL: `https://vtvtulieu.cmcati.vn/login?next=%2F`
  - Tiêu đề: `CMC Video Miner`
  - Khối: `Đăng nhập VTV Tư liệu`
  - Form: `input#username` (`required=true`, `checkValidity()=false` khi trống), `input#password` (`required=true`, `type="password"`), nút `Hiện mật khẩu` -> bấm đổi sang `Ẩn mật khẩu`, nút `Đăng nhập`.
- **Phiên đã đăng nhập (`01-01-02`):**
  - Người dùng đăng nhập: `VTV` (menuitem tài khoản)
  - URL làm việc: `https://vtvtulieu.cmcati.vn/` và `https://vtvtulieu.cmcati.vn/warehouse-management`

---

## 2. Feature `02-Trang-chu` & `03-Tim-kiem` (`01-02-01..03`, `01-03-01..03`)
- **Trang chủ (`/`):**
  - Header: `TRUNG TÂM TRUY XUẤT ĐA PHƯƠNG TIỆN`, nút `Toggle theme`, `Notifications`, `Xem lịch sử upload`, nút tài khoản `VTV`.
  - Main: `CMC VIDEO MINER`, `Search input`, nút `Initiate search` (`disabled=true` khi ô tìm kiếm trống — `01-02-03`), 6 thẻ gợi ý.
- **Tìm kiếm gợi ý (`01-02-02`, `01-03-01`):**
  - Nhấn thẻ `Ẩm thực Việt Nam`: chuyển sang `/results?q=%E1%BA%A8m+th%E1%BB%B1c+Vi%E1%BB%87t+Nam`.
  - Kết quả: `Đã tìm thấy 63 kết quả cho "Ẩm thực Việt Nam"`, 20 thẻ trang 1.
- **Phân trang (`01-03-02` — `BUG-01-01` Retest):**
  - Bấm trang 2: chuyển sang `/results?q=%E1%BA%A8m+th%E1%BB%B1c+Vi%E1%BB%87t+Nam&page_id=2`, hiển thị 20 thẻ mới trang 2 (thẻ đầu: `"Tình hình kinh tế Việt Nam năm 2024"`). Không gặp lỗi timeout.
- **Từ khóa rỗng / không tồn tại (`01-03-03`):**
  - Tìm `xyznonexistent12345`: hiển thị `Không tìm thấy kết quả nào!`. Nút `Clear search input` làm trống ô tìm kiếm và disable nút tìm kiếm.

---

## 3. Feature `04-Danh-sach-tu-lieu` & `07-Lich-su-upload` (`01-04-01..03`, `01-07-01..03`)
- **Quản lý kho (`/warehouse-management`):**
  - `h1`: `Lịch sử upload`, tổng số `140 mục` (`140 video, 24 trang`), 3 tab (`Người dùng tải`, `Danh sách khuôn mặt`, `Danh sách địa danh`), bảng 8 cột.
- **Lọc `"Thời sự"` & Phân trang:**
  - `17 mục` (`17 video, 3 trang`). Sang trang 2 (`&manual_page=2`): hiển thị 6 video trang 2 (`Thời sự Quốc tế sáng 6-7...`).
- **Lọc không tồn tại:**
  - `xyz_khong_ton_tai_9999`: `0 mục` / `0 video`, `Không có lịch sử upload - Các video bạn upload sẽ hiển thị ở đây`.

---

## 4. Feature `05-Chi-tiet-Phat-video` & `06-Phan-tich-video` (`01-05-01..03`, `01-06-01..03`)
- **Video `be08b277-678b-4b51-868e-10dd4d92d6b2`:**
  - Video info: `readyState=4`, `paused=false`, `duration=1317.477007s`, `1920x1080`, `error=null`.
  - Phân đoạn: 19 phân đoạn. Chọn phân đoạn 2: cập nhật `clip_id=dfb17a78-1eb3-4fc0-9c0b-b7503438a118`, tiêu đề phân đoạn: `Phân đoạn 2/19 (1:42 - 3:00)`.
  - 5 tabs: `Tóm tắt`, `Cảnh`, `Khuôn mặt`, `OCR`, `Lời thoại`. Chuyển sang `active_tab=speech`: dữ liệu lời thoại hiển thị đầy đủ.
- **404 Video (`01-05-03`):**
  - Truy cập `video_id=00000000-0000-0000-0000-000000000000`: hiển thị `Không thể tải video`, `Video not found: 00000000-0000-0000-0000-000000000000` + nút `Try Again`.

---

## 5. Feature `08-Khuon-mat-Dia-danh` (`01-08-01..03`)
- `tab=face`: 564 mục (94 trang).
- `tab=location`: 18 mục (3 trang).
- Lọc `Hội An`: hiển thị 1 mục (`Phố cổ Hội An`).
- Lọc `xyz_khong_ton_tai`: hiển thị 0 mục và thông báo `Không có dữ liệu địa danh`.

---

## 6. Feature `09-Tro-ly-hoi-dap` (`01-09-01..03`)
- Nút nổi `Mở trợ lý hỏi đáp video` mở khung `Hỏi đáp về video` gồm 4 câu hỏi mẫu, `textarea`, nút `Gửi câu hỏi` (`disabled=true` khi trống).
- Nhấn `"Video này nói về nội dung gì?"`: AI trả lời chi tiết về các sự kiện trong video, không treo loading (`BUG-01-02` FIXED).

---

## 7. Feature `10-Upload-tu-lieu` & `11-Quan-ly-tai-khoan-Dang-xuat` (`01-10-01..03`, `01-11-01..03`)
- Dialog `Tải Video Lên` (`uid=59_2`) mở an toàn và đóng qua nút `Close` (`uid=59_14`).
- Menu `Tài khoản người dùng` (`uid=60_9`) mở menu `uid=61_0` chứa tên tài khoản `VTV` (`uid=61_1`) và `Đăng xuất` (`uid=61_2`).
- Route guard tự động chuyển hướng về `/login` khi truy cập chưa xác thực.

