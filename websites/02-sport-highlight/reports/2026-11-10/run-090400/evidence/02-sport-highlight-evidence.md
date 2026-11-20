# Bằng chứng kiểm thử Website 02 — Sport Highlight (`run-090400`)

- **Run_ID:** `run-090400`
- **Ngày giờ thực thi:** `2026-11-10T09:30:57+07:00` — `2026-11-10T09:53:00+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://sport-highlight.cmcati.vn/matches`
- **Ghi chú công cụ chụp ảnh màn hình (`take_screenshot`):**
  - Lỗi nguyên văn từ MCP server: `Error: Access denied: path "..." is not within any of the configured workspace roots.`
  - Bằng chứng được lưu đầy đủ từ DOM Accessibility Snapshot, `evaluate_script`, Network Requests và Console Messages.

---

## <a id="02-01"></a><a id="02-08"></a>1. Feature `01-Dang-nhap` & `08-Dang-xuat` (`02-01-01..03`, `02-08-01..03`)
- **Phiên đã đăng nhập (`02-01-02`):**
  - `reqid=505 GET https://sport-highlight.cmcati.vn/api/auth/me [200]`
  - `reqid=507 GET https://sport-highlight.cmcati.vn/api/matches?page=1&page_size=12&order_by=created_at&order_dir=desc [200]`
- **Menu tài khoản & Đăng xuất (`02-08-01`, `02-08-02`):**
  - Nhấn `uid=74_11 button "Mở menu tài khoản"` mở `uid=75_0 menu` chứa `uid=75_1 menuitem "Đăng xuất"`.
  - Nhấn `uid=75_1` gửi `reqid=1148 POST https://sport-highlight.cmcati.vn/api/auth/logout [303]`, xóa phiên (`GET /api/auth/me` trả về `401`) và chuyển hướng về `https://sport-highlight.cmcati.vn/login?next=%2Fmatches`.
- **Truy cập trang bảo vệ sau đăng xuất & Kiểm tra màn hình `/login` (`02-08-03`, `02-01-01`, `02-01-03`):**
  - Snapshot `uid=73_0` trên `/login?next=%2Fmatches`:
    - `uid=73_1`: `link "VTV HIGHLIGHT"`
    - `uid=73_3`: `"Đăng nhập"`
    - `uid=73_7`: `textbox "Tên đăng nhập" required`
    - `uid=73_9`: `textbox "Mật khẩu Hiện mật khẩu" required`
    - `uid=73_10`: `button "Hiện mật khẩu"`
    - `uid=73_11`: `button "Đăng nhập"`
  - Kết quả `evaluate_script` kiểm tra validation:
    ```json
    {"url":"https://sport-highlight.cmcati.vn/login?next=%2Fmatches","uRequired":true,"uValid":false,"uMissing":true,"pRequired":true,"pValid":false,"pMissing":true,"pTypeBefore":"password","meAfterLogout":{"status":401}}
    ```

---

## <a id="02-02"></a>2. Feature `02-Danh-sach-tran` (`02-02-01..03`)
- **Snapshot `/matches` (`uid=50_0`):**
  - Hiển thị `KẾT QUẢ: 173 trận đấu`, `Trang 1 / 15` và 12 thẻ trận đấu trên trang 1.
  - Mỗi thẻ hiển thị trạng thái (`"Đã kết thúc"`), giờ (`"23:00 08 thg 11"`), tên hai đội (`"Le Mans – – Monaco"`), giải đấu & thời lượng (`"Hạng Nhất Pháp Ligue 1 26/27 · 180 phút"`), nhãn `"Chỉnh sửa"`.
  - Nhấn `uid=50_8 button "Làm mới danh sách trận"` gửi `reqid=555 GET /api/matches?page=1&page_size=12&order_by=created_at&order_dir=desc [200]`.
  - Nhấn thẻ `uid=64_36 link "Sevilla – – Alaves..."` điều hướng tới `https://sport-highlight.cmcati.vn/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a?fromPage=2` (`02-02-03`).

---

## <a id="02-03"></a>3. Feature `03-Tim-kiem-Loc-Phan-trang` (`02-03-01..03` & `BUG-02-03`)
- **Tìm kiếm `"Real Madrid"` & `"Đặt lại"` (`02-03-01`):**
  - `reqid=556 GET /api/matches?page=1&page_size=12&order_by=created_at&order_dir=desc&search=Real+Madrid [200]` -> `11 trận đấu`, `Trang 1 / 1`.
  - Nhấn `Đặt lại` (`uid=50_27`) -> `reqid=588` khôi phục `173 trận đấu`, `Trang 1 / 15`.
- **Tìm kiếm không tồn tại `"xyz_khong_ton_tai_9999"` (`02-03-02`):**
  - `reqid=587 [200]` -> `0 trận đấu`, `Trang 1 / 1`, `"Không tìm thấy trận đấu"` (`uid=52_4`).
- **Phân trang kèm bộ lọc (`02-03-03` — `FAIL` / `BUG-02-03` OPEN):**
  - Lần 1: Chọn `TRẠNG THÁI = "Đã kết thúc"` (`uid=54_4`) -> `reqid=591 GET /api/matches?page=1&page_size=12&order_by=created_at&order_dir=desc&status=completed [200]`. Nhấn `"Tiếp"` (`uid=55_183`) chuyển tới `/matches?page=2`: sau `reqid=593 GET /matches?page=2&_rsc=...`, combobox `TRẠNG THÁI` (`uid=57_19`) bị reset về `"Tất cả"` và trang gọi `reqid=599 GET /api/matches?page=2&page_size=12&order_by=created_at&order_dir=desc [200]` (mất `status=completed`).
  - Lần 2: Nhập `TÌM KIẾM = "a"` + `TRẠNG THÁI = "Đã kết thúc"` -> `159 trận đấu`, `Trang 1 / 14` (`uid=60_28`, `uid=61_0..61_3`). Nhấn `"Tiếp"` (`uid=60_183`) sang `/matches?page=2` -> ô `TÌM KIẾM` (`uid=62_15`) bị xóa rỗng, `TRẠNG THÁI` (`uid=62_19`) về `"Tất cả"`, kết quả nhảy về `173 trận đấu`, `Trang 2 / 15` (`uid=62_27..62_31`).

---

## <a id="02-04"></a><a id="02-05"></a>4. Feature `04-Chi-tiet-tran-Trang-thai-AI` & `05-Phat-video-Chon-phan-doan` (`02-04-01..03`, `02-05-01..03`, `BUG-02-01`, `BUG-02-02`, `BUG-02-04`)
- **Phát HLS thực tế trên trận đã hoàn thành (`02-05-01` / `BUG-02-01`):**
  ```json
  {"video":{"readyState":4,"networkState":2,"paused":false,"currentTime":50.978954,"duration":9900,"videoWidth":1920,"videoHeight":1080,"error":null},"hlsEntries":[{"url":"https://sport-highlight.cmcati.vn/api/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a/hls/index.m3u8?v=2026-11-06T22%3A30%3A00.514350Z","status":200},{"url":"https://sport-highlight.cmcati.vn/api/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a/hls/000.ts","status":200}]}
  ```
  - Kiểm tra thêm `/api/matches/{id}/hls/index.m3u8` trên `Le Mans vs Monaco` (`aee37683...`), `Troyes vs Le Mans` (`775f9ccd...`) và `Le Mans vs Toulouse` (`c26dae78...`) đều trả về `HTTP 200 OK` (`#EXTM3U #EXT-X-VERSION:3...`).
- **Chọn phân đoạn & Hiển thị Timeline (`02-05-02` / `BUG-02-04`):**
  - Tại `1x` zoom sau khi chọn phân đoạn 2 (`uid=65_703` — `00:00:15 - 00:00:18`):
    ```json
    {"count":599,"tagName":"DIV","sample":[{"ariaLabel":"Ngoài trận Mức 0 00:00:00 - 00:00:15","styleLeft":"0.0050505%","styleWidth":"0.149899%","childButtons":0},{"ariaLabel":"Ngoài trận · Hai đội ra sân Mức 3 00:00:15 - 00:00:18","styleLeft":"0.155152%","styleWidth":"0.0315151%","childButtons":2}]}
    ```
  - Sau khi nhấn `Phóng to` lên `2x` (`uid=65_43`):
    ```json
    {"zoomText":"2x","renderedSegmentBlocksInViewport":375,"firstBlock":{"ariaLabel":"Ngoài trận Mức 0 00:00:00 - 00:00:15","left":"0.010101%","width":"0.299798%"},"lastBlock":{"ariaLabel":"Ngoài trận Mức 0 01:22:08 - 01:23:44","left":"99.5657%","width":"1.93333%"},"selectedWithHandles":["Ngoài trận · Hai đội ra sân Mức 3 00:00:15 - 00:00:18"]}
    ```
- **Trận đấu không tồn tại (`/matches/00000000-0000-0000-0000-000000000000` — `02-04-03`, `02-05-03`, `BUG-02-02`):**
  - Theo dõi liên tục 11 giây (`t0` -> `t11`) và kiểm tra lại ở giây thứ 55:
    ```json
    {"t0":{"hasDangTai":true,"hasDangTaiVideo":true,"hasToast":false,"requestCount":6},"t11":{"hasDangTai":true,"hasDangTaiVideo":true,"hasToast":false,"requestCount":6},"disabledBtns":["Phát","Phát lại đoạn","Tắt âm lượng","Toàn màn hình","Thu nhỏ","Tách","Gộp trước","Gộp sau","Xóa"]}
    ```

---

## <a id="02-06"></a>5. Feature `06-Tao-Xem-Highlight` (`02-06-01..03`)
- **Trận đã có highlight (`Benfica vs Celtic` — `/matches/35304664-801d-41a0-9d8f-2f301329e066`, `02-06-01`, `02-06-02`):**
  - `uid=67_2 dialog "Danh sách Highlight"` hiển thị 9 cột và 2 bản ghi (`MP4 · 9df2e355` và `MP4 · 9f0181fa`, `00:35:51`, `Mức 3`, `100%`, `Hoàn tất.`), kèm link YouTube (`https://www.youtube.com/watch?v=jYK60p629fc`, `https://www.youtube.com/watch?v=GId1iQIqHC8`) và link `Tải highlight`.
- **Trận chưa có highlight (`Sevilla vs Alaves` — `/matches/28fa419c-d6be-480a-a15d-9dd01f14cf9a`, `02-06-03`):**
  - `uid=66_0 dialog "Danh sách Highlight"` hiển thị `"Trận này chưa có highlight được export."` (`uid=66_4`).

---

## <a id="02-07"></a>6. Feature `07-Upload-ghi-hinh` (`02-07-01..03`)
- Mở và đóng an toàn ở chế độ chỉ đọc `uid=63_0 dialog "Tạo trận đấu"` (gồm `Đội A`, `Đội B`, `Kênh phát`, `Giải đấu`, `Giờ bắt đầu`, `Giờ kết thúc`). Không thực hiện tạo trận mới (`NOT_RUN` theo phạm vi chỉ đọc).

