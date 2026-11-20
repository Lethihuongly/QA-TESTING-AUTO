# Bằng chứng kiểm thử Website 01 — VTV Tư liệu (`run-090400`)

- **Run_ID:** `run-090400`
- **Ngày giờ thực thi:** `2026-11-10T09:04:00+07:00` — `2026-11-10T09:28:00+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://vtvtulieu.cmcati.vn/`
- **Ghi chú công cụ chụp ảnh màn hình (`take_screenshot`):**
  - Lỗi nguyên văn từ MCP server khi gọi `take_screenshot` với `filePath`:
    `Error: Access denied: path "c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/01-vtv-tu-lieu/reports/2026-11-10/run-090400/screenshots/01-01-check.png" (canonical: "C:\Users\cati2\Downloads\CMC-QA-TESTING\CMC-QA-TESTING\websites\01-vtv-tu-lieu\reports\2026-11-10\run-090400\screenshots\01-01-check.png") is not within any of the configured workspace roots.`
  - Do đó toàn bộ bằng chứng được ghi nhận từ DOM Accessibility Snapshot, `evaluate_script`, Network Requests và Console Messages. Không giả lập đường dẫn file ảnh.

---

## <a id="01-01"></a>1. Feature `01-Dang-nhap` (`01-01-01`, `01-01-02`, `01-01-03`)
- **Phiên đã đăng nhập (`01-01-02`):**
  - Network: `reqid=28 GET https://vtvtulieu-api.cmcati.vn/api/v1/auth/me [200]`
  - Console: `msgid=2 [log] Connected to notification STOMP server`
- **Trang `/login` khi chưa đăng nhập (`01-01-01`, `01-01-03`):**
  - URL sau khi truy cập `/warehouse-management` lúc đã đăng xuất: `https://vtvtulieu.cmcati.vn/login?next=%2Fwarehouse-management`
  - Snapshot `uid=48_0`:
    - `uid=48_3`: `"Đăng nhập VTV Tư liệu"`
    - `uid=48_4`: `"Truy cập hệ thống tìm kiếm và biên tập video"`
    - `uid=48_7`: `textbox "Tên đăng nhập" required`
    - `uid=48_9`: `textbox "Mật khẩu" required`
    - `uid=48_10`: `button "Hiện mật khẩu"` -> sau khi click đổi thành `button "Ẩn mật khẩu"`
    - `uid=48_11`: `button "Đăng nhập"`
  - Kết quả `evaluate_script` kiểm tra HTML5 validation:
    ```json
    {"usernameRequired":true,"usernameValid":false,"usernameValueMissing":true,"passwordRequired":true,"passwordValid":false,"passwordTypeBefore":"password"}
    ```

---

## <a id="01-02"></a>2. Feature `02-Trang-chu` (`01-02-01`, `01-02-02`, `01-02-03`)
- **Snapshot trang chủ `/` (`uid=1_0`, `uid=3_0`):**
  - Header: `TRUNG TÂM TRUY XUẤT ĐA PHƯƠNG TIỆN`, `button "Toggle theme"`, `button "Notifications"`, `button "Xem lịch sử upload"`, `button "Tài khoản người dùng"`.
  - Main: `CMC VIDEO MINER`, `textbox "Search input"` (`uid=1_15`), `button "Initiate search" disableable disabled` (`uid=1_14` — xác nhận `01-02-03`), `button "Upload content"` (`uid=1_16`), 6 thẻ gợi ý tìm kiếm (`"Công nghệ thực tế ảo VR"`, `"Chính sách phát triển kinh tế"`, `"Tỷ giá ngoại tệ"`, `"Hợp tác thương mại quốc tế"`, `"Ẩm thực Việt Nam"`, `"Champions League"`).
- **Nhấn thẻ gợi ý `"Công nghệ thực tế ảo VR"` (`01-02-02`):**
  - Điều hướng tới `/results?q=C%C3%B4ng+ngh%E1%BB%87+th%E1%BB%B1c+t%E1%BA%BF+%E1%BA%A3o+VR`.
  - Network: `reqid=39 GET https://vtvtulieu-api.cmcati.vn/api/v1/videos/search?query=C%C3%B4ng+ngh%E1%BB%87+th%E1%BB%B1c+t%E1%BA%BF+%E1%BA%A3o+VR&page_id=1&page_size=20 [200]` (`duration: 11277 ms`).
  - UI hiển thị `heading "Đã tìm thấy 87 kết quả cho\"Công nghệ thực tế ảo VR\""` (`uid=5_3`), 20 thẻ kết quả ở trang 1.

---

## <a id="01-03"></a>3. Feature `03-Tim-kiem` (`01-03-01`, `01-03-02` / `BUG-01-01`, `01-03-03`)
- **Dialog tìm kiếm bằng hình ảnh (`01-03-01`):**
  - Nhấn `uid=1_16` mở `dialog "Tìm kiếm bằng hình ảnh"` (`uid=2_0`) với `"Tìm kiếm sử dụng khuôn mặt"` (`uid=2_3`), `"Tìm kiếm theo cảnh chụp (thử nghiệm)"` (`uid=2_4`), `"tải tệp lên"` (`uid=2_6`), đóng qua `Close` (`uid=2_11`).
- **Tìm kiếm & Phân trang (`01-03-01`, `01-03-02` / `BUG-01-01`):**
  - Từ khóa `"Công nghệ thực tế ảo VR"` (`87` kết quả):
    - Lần nhấn trang 2 đầu tiên (`reqid=59`): lỗi `net::ERR_FAILED` (`msgid=6` CORS / gateway timeout), hiển thị `h3 "Something went wrong"`.
    - Lần nhấn trang 2 thứ hai (`reqid=77`): `HTTP 200 OK`, `activePage: "2"`, `firstCard: "Doanh nghiệp ứng dụng công nghệ tái chế và năng lượng mặt trời trong sản xuất tã trẻ em"`, `cardCount: 20`.
  - Từ khóa `"thời sự"` (`38` kết quả):
    - Trang 1 (`reqid=94` HTTP 200): `totalText: "Đã tìm thấy 38 kết quả cho\"thời sự\""`, `activePage: "1"`, `cardCount: 20`, `firstCard: "Thời sự"`.
    - Trang 2 (`uid=12_197`): URL `https://vtvtulieu.cmcati.vn/results?q=th%E1%BB%9Di+s%E1%BB%B1&search_ocr=true&search_caption=true&search_asr=true&search_face=true&page_id=2`, `activePage: "2"`, `cardCount: 18`, `firstCard: "Biên tập viên Nguyễn Văn A đưa tin về sự kiện bão số 5 đổ bộ vào miền Trung"`.
- **Từ khóa không có kết quả & Xóa ô tìm kiếm (`01-03-03`):**
  - Từ khóa `"xyznonexistent12345"` (`reqid=119` HTTP 200): hiển thị `heading "Không tìm thấy kết quả nào!"` (`uid=14_3`).
  - Nhấn `Clear search input` (`uid=14_2`): `Search input` về rỗng và nút `Search current query` (`uid=14_0`) chuyển sang `disabled`.

---

## <a id="01-04"></a><a id="01-07"></a>4. Feature `04-Danh-sach-tu-lieu` & `07-Lich-su-upload` (`01-04-01..03`, `01-07-01..03`)
- **Danh sách mặc định (`/warehouse-management`):**
  - Network: `reqid=123 GET https://vtvtulieu-api.cmcati.vn/api/v1/videos?manual_upload=true&page_id=1&page_size=6 [200]`.
  - UI: `heading "Lịch sử upload" level="1"` (`uid=16_3`), `140 mục` (`140 video, 24 trang`), 3 tab (`Người dùng tải`, `Danh sách khuôn mặt`, `Danh sách địa danh`), bảng 8 cột (`Tên video`, `Chủ đề`, `Giai đoạn`, `Thời lượng`, `Thời gian phát sóng`, `Thời gian tạo`, `Trạng thái`, `Thao tác`).
- **Lọc `"Thời sự"` & Phân trang:**
  - Nhập `"Thời sự"` vào `Nhập tên video...` (`uid=19_4`) -> URL `?source_filename=Th%E1%BB%9Di+s%E1%BB%B1`, hiển thị `17 mục` (`17 video, 3 trang`), nhãn `Đang lọc: Tên: Thời sự`.
  - Chuyển sang trang 2 (`uid=22_73`) -> URL `?source_filename=Th%E1%BB%9Di+s%E1%BB%B1&manual_page=2`, hiển thị 6 video trang 2 (`"Tin tức thời sự quốc tế mới nhất - Tin Nóng Thế Giới 24h Qua - YouTube (1).mp4"`...).
- **Lọc từ khóa không tồn tại (`"xyz_khong_ton_tai_9999"`):**
  - Hiển thị `0 mục` / `0 video`, `heading "Không có lịch sử upload"` (`uid=21_1`) và `"Các video bạn upload sẽ hiển thị ở đây"` (`uid=21_2`).

---

## <a id="01-05"></a><a id="01-06"></a>5. Feature `05-Chi-tiet-Phat-video` & `06-Phan-tich-video` (`01-05-01..03`, `01-06-01..03`)
- **Trang `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`:**
  - Network: `reqid=340 GET /api/v1/videos/be08b277-678b-4b51-868e-10dd4d92d6b2 [200]`, `reqid=341 GET /api/v1/segments?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2&page_id=1&page_size=100 [200]`.
  - Kết quả `evaluate_script` trên thẻ `<video>`:
    ```json
    {"hasVideo":true,"readyState":4,"networkState":1,"paused":false,"currentTime":32.736441,"duration":1317.477007,"videoWidth":1920,"videoHeight":1080,"error":null,"srcPrefix":"https://s3.hn-2.cloud.cmctelecom.vn/vtv/vtv-tulieu/v-metadata/videos/be08b277-678b-4b51-868e-10dd4d92d6b2/original.mp4"}
    ```
  - Chọn phân đoạn 2 (`uid=36_17`): URL cập nhật `&clip_id=57a4c47a-7fff-4c28-9537-24c840d1f607`, video tua tới `1:53 / 21:57`, `Phân tích clip` hiển thị `Phân đoạn 2/19 (1:42 - 3:00)`.
  - Chuyển đổi 5 tab trong `Phân tích clip`:
    - `Tóm tắt` (`&active_tab=description`): Mô tả, Nhân vật, Tổ chức, Địa điểm, Thời gian, Sự kiện (các trường rỗng hiển thị `(Trống)`).
    - `Cảnh` (`&active_tab=scene`): Scene 1 (`1:42 – 2:13`), Scene 2 (`2:13 – 3:00`).
    - `Khuôn mặt` (`&active_tab=face`): `Đã có tên 0` (`"Chưa có khuôn mặt nào đã đặt tên."`), `Chưa có tên 1`.
    - `OCR` (`&active_tab=ocr`): Khung hình `2586` (`1:43`) đến `3806` (`2:32`) kèm văn bản OCR.
    - `Lời thoại` (`&active_tab=speech`): Đoạn thoại `1:43-2:12` và `2:14-2:57`.
- **Video ID không tồn tại (`/watch?video_id=00000000-0000-0000-0000-000000000000` — `01-05-03`):**
  - Hiển thị `heading "Không thể tải video" level="3"` (`uid=46_12`), `"Video not found: 00000000-0000-0000-0000-000000000000"` (`uid=46_13`), `button "Try Again"` (`uid=46_14`).

---

## <a id="01-08"></a>6. Feature `08-Khuon-mat-Dia-danh` (`01-08-01..03`)
- **Tab `Danh sách khuôn mặt` (`?tab=face`):** `564 mục` (`564 khuôn mặt, 94 trang`), 5 cột (`Khuôn mặt`, `Tên`, `Vai trò`, `Thời gian tạo`, `Thao tác`).
- **Tab `Danh sách địa danh` (`?tab=location`):** `18 mục` (`18 địa danh, 3 trang`), 5 cột (`Hình ảnh`, `Tên địa danh`, `Mô tả`, `Thời gian tạo`, `Thao tác`).
- **Lọc địa danh `"Hội An"` (`01-08-02`):** URL `&location_name=H%E1%BB%99i+An`, hiển thị `1 mục` (`Phố cổ Hội An`), nhãn `Đang lọc: Tên: Hội An`.
- **Lọc địa danh `"xyz_khong_ton_tai"` (`01-08-03`):** URL `&location_name=xyz_khong_ton_tai`, hiển thị `0 mục`, `heading "Không có dữ liệu địa danh"` (`uid=35_1`).

---

## <a id="01-09"></a>7. Feature `09-Tro-ly-hoi-dap` (`01-09-01..03` & `BUG-01-02`)
- Mở khung `Hỏi đáp về video` (`uid=44_0`): khi `textbox "Câu hỏi về video"` (`uid=44_11`) trống, `button "Gửi câu hỏi"` (`uid=44_12`) ở trạng thái `disabled` (`01-09-03`).
- Nhấn câu hỏi gợi ý `"Video này nói về nội dung gì?"` (`uid=44_6` — `01-09-02`):
  - Network: `reqid=382 POST https://vtvtulieu-api.cmcati.vn/api/v1/videos/be08b277-678b-4b51-868e-10dd4d92d6b2/chat [200]`, `durationMs: 3060`.
  - Câu trả lời hiển thị đầy đủ tại `uid=45_2` kèm 8 mốc thời gian (`12:09`, `5:48`, `6:39`, `9:20`, `9:51`, `19:10`, `5:00`, `8:20`).

---

## <a id="01-10"></a>8. Feature `10-Upload-tu-lieu` (`01-10-01..03`)
- `01-10-01` (**PASS**): Mở và đóng chỉ đọc 3 modal: `dialog "Tải Video Lên"` (`uid=17_0`), `dialog "Đăng ký khuôn mặt"` (`uid=26_0`), `dialog "Đăng ký địa danh"` (`uid=29_0`).
- `01-10-02`, `01-10-03` (**NOT_RUN**): Ngoài phạm vi chỉ đọc (không tải file/tạo dữ liệu mới lên hệ thống thật).

---

## <a id="01-11"></a>9. Feature `11-Quan-ly-tai-khoan-Dang-xuat` (`01-11-01..03`)
- Menu `Tài khoản người dùng` (`uid=47_0`) hiển thị `menuitem "VTV"` (`uid=47_1`) và `menuitem "Đăng xuất"` (`uid=47_2`).
- Nhấn `Đăng xuất` chuyển hướng về `/login`. Truy cập `/warehouse-management` sau khi đăng xuất tự động chuyển hướng về `/login?next=%2Fwarehouse-management`.

