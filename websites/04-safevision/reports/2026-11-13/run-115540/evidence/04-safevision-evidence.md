# Bằng chứng kiểm thử Website 04 — SafeVision (`run-115540`)

- **Run_ID:** `run-115540`
- **Ngày giờ thực thi:** `2026-11-13T12:09:00+07:00` — `2026-11-13T12:10:55+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://safevision.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` & `09-Tai-khoan-Dang-xuat` (`04-01-01..03`, `04-09-01..03`)
- **Trang `/login` (`04-01-01`, `04-01-03`):**
  - Tiêu đề: `VTV Logo Detection – AI Enterprise Platform`
  - Khối: `Đăng nhập VTV PCD`
  - Form: `input#username` (`required=true`), `input#password` (`required=true`), nút `Hiện mật khẩu` và nút `Đăng nhập`.
- **Phiên đăng nhập thành công (`04-01-02`):**
  - Tài khoản: `VTV vtv VT` (`uid=62_22`).
  - URL làm việc: `/`, `/channels`, `/channels/a2884000-4624-4b57-b340-7b8c0e2cb657`.
  - Menu người dùng hiển thị liên kết `Đăng xuất`.

---

## 2. Feature `02-Dashboard-Tong-quan` (`04-02-01..03`)
- **Bảng Điều Khiển Tổng Quan (`/`):**
  - KPI Cards:
    - TỔNG SỐ LUỒNG LIVE: `287` (`1 đang chạy`)
    - KÊNH TRUYỀN HÌNH: `9` (`9 hoạt động phát sóng`)
    - PHÁT HIỆN HÔM NAY: `3` (Tổng tích lũy: `218757`)
    - HỆ THỐNG AI EDGE: `Healthy` (`Hoạt động ổn định`)
  - Thống kê phân loại logo (`BUG-04-01` Retest):
    - `3soc`: 16446
    - `3que`: 289
    - `ao3soc`: 279
    - `bản đồ 1`: 156
    - `s`: 59
    - `bản đồ 3`: 32
    - `bản đồ 2`: 28
  - Realtime Feed Sự kiện phát hiện gần đây: Luồng `#74d81044` trên Kênh `VTV1` lúc 12:05:09.

---

## 3. Feature `03-Danh-sach-kenh`, `07-Tim-kiem-Loc` & `08-Cau-hinh` (`04-03-01..03`, `04-07-01..03`, `04-08-01..03`)
- **Quản lý kênh (`/channels`):**
  - Hiển thị đầy đủ 9 kênh: VTV10, VTV5, VTV8, VTV2, VTV4, VTV1 (Phát hiện vi phạm), VTV3, VTV7, VTV9.
  - Ô tìm kiếm: `Tìm kiếm theo tên hoặc mã kênh...` (`uid=63_27`). Nhập `"VTV1"` hoạt động tốt.
  - BUG-04-03: Ô tìm kiếm nhanh trên Header không tồn tại trong thiết kế DOM (`04-07-03` = `BLOCKED`).
- **Dialog Thêm kênh mới (`04-08-01`):**
  - Mở an toàn qua nút `Thêm kênh` (`uid=63_26`).
  - Hiển thị Tên kênh, Mã kênh, Mô tả, URL Luồng Stream.
  - Đóng an toàn qua nút `Hủy` (`uid=65_14`).

---

## 4. Feature `04-Chi-tiet-kenh`, `05-Xem-truc-tiep` & `06-Canh-bao` (`04-04-01..03`, `04-05-01..04`, `04-06-01..03`)
- **Chi tiết kênh VTV10 (`/channels/a2884000-4624-4b57-b340-7b8c0e2cb657`):**
  - Thông tin kênh: `VTV10`, `Hà Nội`, `Đang hoạt động`.
  - Khung Luồng Stream Gốc: `<video>` HLS phát mượt mà ở độ phân giải `1280x720`, `duration=48.02s`, `readyState=4`.
  - Khung Luồng Delayed: Hiển thị đúng thông báo `Output Stream Chưa Phát`.
- **Đo lường giật lag (`BUG-04-02` Retest):**
  - `wallSec`: 4.00s, `deltaVideoSec`: 3.58s.
  - `playbackRatio`: 0.895.
  - `decodedFrames`: 90 frames, `droppedFrames`: 0 (tỷ lệ rớt frame 0.00%).
  - `effectiveFps`: 22.5 FPS. Kết luận: **SMOOTH**.
- **Danh sách phát hiện:**
  - Hiển thị `141,417 bản ghi` (`14,142 trang`).
  - Bản ghi mới nhất: phiên `4296fb51-7c2c-40ca-b1b1-6b682e9550db`, logo `3soc`, mốc thời gian `04:20.0`, nút `Xem ảnh lớn`.

