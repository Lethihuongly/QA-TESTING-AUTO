# Bằng chứng kiểm thử Website 04 — SafeVision (`run-174400`)

- **Run_ID:** `run-174400`
- **Ngày giờ thực thi:** `2026-11-11T17:57:35+07:00` — `2026-11-11T17:59:40+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://safevision.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` & `09-Tai-khoan-Dang-xuat`
- **Trang `/login`:** Tiêu đề `Đăng nhập VTV PCD`, ô Tên đăng nhập (required), ô Mật khẩu (required), nút Hiện mật khẩu.
- **Tài khoản đăng nhập:** Tài khoản `VTV vtv VT` hiển thị trên thanh banner.

---

## 2. Feature `02-Dashboard-Tong-quan` & `03-Danh-sach-kenh`
- **Danh sách 9 kênh:** `/channels` hiển thị đầy đủ 9 kênh: `VTV10, VTV2, VTV8, VTV3, VTV1, VTV5, VTV4, VTV7, VTV9` ở trạng thái `Đang hoạt động`.
- **Telemetry inference:** Vùng telemetry hiển thị inference pool, queue, in-flight.

---

## 3. Feature `04-Chi-tiet-kenh` & `05-Xem-truc-tiep`
- **Kênh `VTV10` (`/channels/a2884000...`):**
  - Thẻ `LUỒNG STREAM GỐC`: `readyState=4`, `paused=false`, `currentTime=33.87s`, `videoWidth=1280`, `videoHeight=720`, `error=null`.
  - Thẻ `LUỒNG DELAYED`: hiển thị `Output Stream Chưa Phát` (do phiên AI đang tạm dừng).
- **Kết quả đo lường định lượng `check-video-lag.js` trên Luồng Gốc:**
  - `wallSec`: 8.02s
  - `deltaVideoSec`: 8.02s
  - `playbackRatio`: 1.000
  - `decodedFrames`: 200
  - `droppedFrames`: 0 (0.00%)
  - `effectiveFps`: 24.9 FPS
  - `freezeTicks`: 0
  - `verdict`: `SMOOTH`

---

## 4. Feature `07-Tim-kiem-Loc` & `08-Cau-hinh-Giam-sat`
- **Tìm kiếm:** Ô tìm kiếm trên `/channels` hoạt động chính xác. Nhập `"VTV1"` lọc danh sách còn đúng 2 kênh (`VTV10` và `VTV1`).
- **Header search (`BUG-04-03` BLOCKED):** Không tồn tại `<input>` trên thanh `<header>`.
- **Dialog Thêm kênh:** Mở dialog `Thêm kênh mới` (Tên kênh, Mã kênh, Mô tả, URL Stream); đóng an toàn qua nút `Hủy`.

