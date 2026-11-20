# 03-03 — Danh sách kênh (`Kênh 1`, `Kênh 2`, `Kênh 3`, `Live SDI inputs`)

## Thông tin chung

- **Mã chức năng:** `03-03`
- **Website:** `Anti-Logo` (`03`)
- **URL liên quan:** `https://anti-logo.cmcati.vn/channel/1`, `/channel/2`, `/channel/3`
- **Ưu tiên:** `P0`
- **Trạng thái thiết kế:** `READY`

## Mục tiêu kiểm thử

Xác minh chức năng chuyển đổi và xem thông tin các kênh đơn lẻ (`Kênh 1`, `Kênh 2`, `Kênh 3`) cùng danh sách nguồn `Live SDI inputs (auto-detected)` (`select#sdiInputs`) mà không làm gián đoạn luồng đang phát.

## Tiền điều kiện

- Đã đăng nhập vào `https://anti-logo.cmcati.vn/`.

---

## Danh sách Test Case

### TC `03-03-01` — Hiển thị danh sách kênh trên thanh điều hướng và danh sách `Live SDI inputs`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive / Smoke`
- **Các bước thực hiện:**
  1. Tại trang `/channel/1`, kiểm tra các liên kết kênh trên thanh header: `a[href="/channel/1"]`, `a[href="/channel/2"]`, `a[href="/channel/3"]`, `a[href="/channels"]`.
  2. Kiểm tra danh sách `select#sdiInputs` (`Live SDI inputs (auto-detected)`).
- **Dữ liệu kiểm thử:** Kênh 1 (`/channel/1`).
- **Kết quả mong đợi (Expected):**
  - Hiển thị đầy đủ 3 liên kết kênh đơn (`Kênh 1`, `Kênh 2`, `Kênh 3`) và liên kết `📺 Multi-Channel (3 SDI)`.
  - `select#sdiInputs` hiển thị 4 tùy chọn: luồng đang chạy `🟢 Live SDI Stream: virtual-sdi-BONGDA_HD ... [Active]` và 3 nguồn Virtual SDI (`BONGDA_HD`, `THETHAO_TINTUC_HD`, `HAY_TV`).
- **Điểm cần chụp minh chứng:** `03-03-01-channel-list.png`

---

### TC `03-03-02` — Chuyển đổi xem giữa `Kênh 1`, `Kênh 2` và `Kênh 3`

- **Mức ưu tiên:** `P0`
- **Loại kiểm thử:** `Positive`
- **Các bước thực hiện:**
  1. Điều hướng sang `https://anti-logo.cmcati.vn/channel/2` (`Kênh 2`) và kiểm tra nguồn SDI đang chạy.
  2. Điều hướng sang `https://anti-logo.cmcati.vn/channel/3` (`Kênh 3`) và kiểm tra nguồn SDI đang chạy.
  3. Quay lại `https://anti-logo.cmcati.vn/channel/1` (`Kênh 1`).
- **Dữ liệu kiểm thử:**
  - `Kênh 1`: `virtual-sdi-BONGDA_HD`
  - `Kênh 2`: `virtual-sdi-THETHAO_TINTUC_HD`
  - `Kênh 3`: `virtual-sdi-HAY_TV`
- **Kết quả mong đợi (Expected):**
  - Mỗi trang kênh hiển thị đúng luồng SDI đang hoạt động tương ứng (`Kênh 1`: `BONGDA_HD`, `Kênh 2`: `THETHAO_TINTUC_HD`, `Kênh 3`: `HAY_TV`) cùng bảng `Logs` riêng của kênh đó.
- **Điểm cần chụp minh chứng:** `03-03-02-switch-channels.png`

---

### TC `03-03-03` — Kiểm tra trạng thái khóa (`[Locked - Active stream running]`) của các nguồn SDI không hoạt động

- **Mức ưu tiên:** `P1`
- **Loại kiểm thử:** `Negative / Boundary`
- **Các bước thực hiện:**
  1. Kiểm tra các tùy chọn trong `select#sdiInputs` khi kênh đang có luồng LIVE hoạt động.
- **Dữ liệu kiểm thử:** Các option trong `select#sdiInputs` tại `/channel/1`, `/channel/2`, `/channel/3`.
- **Kết quả mong đợi (Expected):**
  - Các nguồn Virtual SDI khác được đánh dấu rõ `🔒 ... [Locked - Active stream running]` để ngăn chuyển nguồn đè lên luồng đang chạy.
- **Điểm cần chụp minh chứng:** `03-03-03-locked-sdi-options.png`
