# Bằng chứng kiểm thử Website 03 — Anti-Logo (`run-174400`)

- **Run_ID:** `run-174400`
- **Ngày giờ thực thi:** `2026-11-11T17:54:10+07:00` — `2026-11-11T17:57:15+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://anti-logo.cmcati.vn/channel/1`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Feature `01-Dang-nhap` & `11-Tai-khoan-Dang-xuat`
- **Trang `/login`:** Tiêu đề `VTV PCD CONTROL`, ô Tên đăng nhập (required), ô Mật khẩu (required), nút Hiện mật khẩu.
- **Tài khoản đăng nhập:** Tài khoản `vtv` có mặt trên thanh header.

---

## 2. Feature `02-Tong-quan-Dieu-khien` & `04-Chi-tiet-Preview`
- **Giao diện Kênh 1 (`/channel/1`):**
  - Header: Kênh 1, Kênh 2, Kênh 3, Multi-Channel (3 SDI), menu tài khoản vtv.
  - Video preview: Thẻ `<video>` có kích thước 1920x1080, phát luồng HLS blob.
  - Cấu hình nguồn: `select#defaultVideos` (13 video), `select#sdiInputs` (3 nguồn SDI).

---

## 3. Feature `03-Danh-sach-kenh` & `12-Kiem-tra-luong-SDI-Input`
- **Kiểm tra API trạng thái (`/channels/api/state`):**
  - Channel 01: `ok=true, status=200, state=IDLE`
  - Channel 02: `ok=true, status=200, state=IDLE`
  - Channel 03: `ok=true, status=200, state=IDLE`
- **Kiểm tra API nguồn SDI (`/v2/api/sdi_inputs`):**
  - `virtual_sdi:BONGDA_HD` (Channel 1, status: READY)
  - `virtual_sdi:THETHAO_TINTUC_HD` (Channel 2, status: READY)
  - `virtual_sdi:HAY_TV` (Channel 3, status: READY)
- **Kiểm tra thư mục video (`/v2/api/videos`):**
  - `video_dir_exists=true`, hiện có 13 file video.

---

## 4. Feature `05-Multi-Channel`
- **Trang `/channels`:**
  - Tiêu đề: `VTV PCD Command Center`.
  - Hiển thị đầy đủ lưới 3 kênh: Channel 01, Channel 02, Channel 03.

---

## 5. Feature `06-AI-Flag-Logs` & `07-Bounding-Box`
- **Bảng Frame Logs:** Hiển thị 75 frame gần nhất.
- **Lọc `Show only flag=1` (`#flag1OnlyToggle`):** Bật checkbox lọc chính xác toàn bộ các dòng có Flag=1.
- **Modal `✏️ Sửa BBox`:** Nhấn nút mở modal hiển thị tiêu đề `Frame #72240 — FLAG 1 (Player: found, Logo: found)`. Đóng an toàn.

