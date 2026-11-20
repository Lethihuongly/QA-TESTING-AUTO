# Bằng chứng kiểm thử Website 01 — VTV Tư liệu (`run-174400`)

- **Run_ID:** `run-174400`
- **Ngày giờ thực thi:** `2026-11-11T17:40:00+07:00` — `2026-11-11T17:50:40+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://vtvtulieu.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` (`01-01-01`, `01-01-02`, `01-01-03`)
- **Trang `/login` khi chưa đăng nhập (`01-01-01`, `01-01-03`):**
  - Chuyển hướng về: `https://vtvtulieu.cmcati.vn/login?next=%2F`
  - Snapshot:
    - Tiêu đề: `CMC Video Miner`
    - Khối: `Đăng nhập VTV Tư liệu`
    - Form: `input#username` (required), `input#password` (required), nút `Hiện mật khẩu`, nút `Đăng nhập`.
- **Phiên đã đăng nhập (`01-01-02`):**
  - Network: `GET /api/v1/auth/me [200]`
  - Người dùng đăng nhập: `VTV`
  - URL làm việc: `https://vtvtulieu.cmcati.vn/`

---

## 2. Feature `02-Trang-chu` & `03-Tim-kiem` (`01-02-01..03`, `01-03-01..03`)
- **Trang chủ (`/`):**
  - Header: `TRUNG TÂM TRUY XUẤT ĐA PHƯƠNG TIỆN`, nút `Toggle theme`, `Notifications`, `Xem lịch sử upload`, nút tài khoản `VTV`.
  - Main: `CMC VIDEO MINER`, `Search input`, nút `Initiate search` (`disabled=true` khi ô tìm kiếm trống — `01-02-03`), 6 thẻ gợi ý.
- **Tìm kiếm gợi ý (`01-02-02`, `01-03-01`):**
  - Nhấn thẻ `Ẩm thực Việt Nam`: chuyển sang `/results?q=%E1%BA%A8m+th%E1%BB%B1c+Vi%E1%BB%87t+Nam`.
  - Kết quả: `Đã tìm thấy 63 kết quả cho "Ẩm thực Việt Nam"`, 20 thẻ trang 1.
- **Phân trang (`01-03-02` — `BUG-01-01` Retest):**
  - Bấm trang 2: chuyển sang `/results?q=%E1%BA%A8m+th%E1%BB%B1c+Vi%E1%BB%87t+Nam&page_id=2`, `activePage="2"`, hiển thị 20 thẻ mới trang 2 (thẻ đầu: `"Tình hình kinh tế Việt Nam năm 2024"`).
- **Từ khóa rỗng / không tồn tại (`01-03-03`):**
  - Tìm `xyznonexistent12345`: hiển thị `Không tìm thấy kết quả nào!`. Nút Clear search input hoạt động.

---

## 3. Feature `04-Danh-sach-tu-lieu` & `07-Lich-su-upload` (`01-04-01..03`, `01-07-01..03`)
- **Quản lý kho (`/warehouse-management`):**
  - `h1`: `Lịch sử upload`, tổng số `140 mục` (24 trang), 3 tab (`Người dùng tải`, `Danh sách khuôn mặt`, `Danh sách địa danh`), bảng 8 cột.
- **Lọc `"Thời sự"` & Phân trang:**
  - `17 mục` (3 trang). Sang trang 2 (`&manual_page=2`): hiển thị 6 video trang 2.
- **Lọc không tồn tại:**
  - `xyz_khong_ton_tai_9999`: `0 mục` / `0 video`, `Không có lịch sử upload - Các video bạn upload sẽ hiển thị ở đây`.

---

## 4. Feature `05-Chi-tiet-Phat-video` & `06-Phan-tich-video` (`01-05-01..03`, `01-06-01..03`)
- **Video `be08b277-678b-4b51-868e-10dd4d92d6b2`:**
  - Video info: `readyState=4`, `paused=false`, `duration=1317.48s`, `1920x1080`, `error=null`.
  - Phân đoạn: 19 phân đoạn. Chọn phân đoạn 2: video tua đến `1:47`, tiêu đề phân đoạn: `Phân đoạn 2/19 (1:42 - 3:00)`.
  - Phân tích clip: 5 tab (`Tóm tắt`, `Cảnh`, `Khuôn mặt`, `OCR`, `Lời thoại`). Các trường không có dữ liệu hiển thị `(Trống)`. Chuyển tab sang `Lời thoại` cập nhật URL `&active_tab=speech`.
- **Video ID không tồn tại (`00000000-0000-0000-0000-000000000000`):**
  - Hiển thị `Không thể tải video`, `Video not found: 00000000-0000-0000-0000-000000000000`, nút `Try Again`.

---

## 5. Feature `08-Khuon-mat-Dia-danh` (`01-08-01..03`)
- Tab `Danh sách khuôn mặt`: `564 mục` (94 trang).
- Tab `Danh sách địa danh`: `18 mục` (3 trang).
- Lọc `Hội An`: `1 mục` (`Phố cổ Hội An`).
- Lọc `xyz_khong_ton_tai`: `0 mục`, `Không có dữ liệu địa danh`.

---

## 6. Feature `09-Tro-ly-hoi-dap` (`01-09-01..03` & `BUG-01-02` Retest)
- Mở khung chat: 4 câu hỏi mẫu, textarea, nút gửi (disabled khi rỗng).
- Bấm câu hỏi mẫu `"Video này nói về nội dung gì?"`: AI trả lời ngay tức thì tóm tắt các sự kiện nổi bật trong video.

---

## 7. Feature `10-Upload-tu-lieu` & `11-Quan-ly-tai-khoan-Dang-xuat`
- Mở và đóng an toàn dialog `Tải video lên`.
- Menu `Tài khoản người dùng`: hiển thị tên tài khoản `VTV` và nút `Đăng xuất`.

