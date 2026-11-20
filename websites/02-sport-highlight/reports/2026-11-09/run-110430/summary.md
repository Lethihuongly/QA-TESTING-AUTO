# Báo cáo Kiểm thử — Website 02: Sport Highlight (CMCATI Highlight)

## 1. Thông tin chung

| Hạng mục | Giá trị |
|---|---|
| **Website** | Website 02 — Sport Highlight (`CMCATI Highlight`) |
| **URL** | `https://sport-highlight.cmcati.vn/matches` |
| **Ngày giờ chạy** | `2026-11-09 11:05:57 — 11:30:07 (+07:00)` |
| **Mã lần chạy (Run ID)** | `run-110430` |
| **Công cụ thực thi** | `chrome-devtools` MCP (`pageId: 2`) |
| **Chế độ kiểm thử** | Chế độ chỉ đọc (`Read-Only`) |
| **Phiên bản bundle mới phát hiện** | `/_next/static/chunks/02105~~nej92~.js` (thay thế `02105~12p3696.js` của ngày `2026-11-06`) |

---

## 2. Thống kê kết quả

| Chỉ số | Số lượng | Tỷ lệ (%) | So với lần chạy trước (`2026-11-06/run-094700`) |
|---|---:|---:|---|
| **Tổng số Test Case** | **24** | `100.0%` | Không đổi (`24`) |
| **PASS** | **20** | `83.3%` (`95.2%` số TC thực thi) | Không đổi (`20 PASS`) |
| **FAIL** | **1** | `4.2%` | `02-04-03` (`BUG-02-02` đã có cải thiện hiển thị toast lỗi 404 nhưng vẫn treo trạng thái loading & lặp polling 404) |
| **BLOCKED** | **0** | `0.0%` | Không đổi (`0`) |
| **NOT_RUN** | **3** | `12.5%` | Không đổi (`02-07-01..03` ngoài phạm vi chỉ đọc) |

### Thống kê theo Tính năng (8 Features)

| Mã Feature | Tên tính năng | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN |
|---|---|---:|---:|---:|---:|---:|
| `01-Dang-nhap` | Đăng nhập & Xác thực | 3 | 3 | 0 | 0 | 0 |
| `02-Danh-sach-tran-dau` | Danh sách trận đấu & Phân trang | 3 | 3 | 0 | 0 | 0 |
| `03-Tim-kiem-Loc-tran-dau` | Tìm kiếm & Lọc trận đấu | 3 | 3 | 0 | 0 | 0 |
| `04-Chi-tiet-tran-dau` | Chi tiết trận đấu & Phân đoạn | 3 | 2 | 1 | 0 | 0 |
| `05-Xem-video-Timeline` | Xem Video HLS & Timeline | 3 | 3 | 0 | 0 | 0 |
| `06-Highlight-Export` | Quản lý & Xem Highlight đã xuất | 3 | 3 | 0 | 0 | 0 |
| `07-Chinh-sua-Phan-doan` | Chỉnh sửa phân đoạn & Xuất Highlight | 3 | 0 | 0 | 0 | 3 |
| `08-Quan-ly-tai-khoan` | Quản lý Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | 0 |
| **Tổng cộng** | **8 Features** | **24** | **20** | **1** | **0** | **3** |

---

## 3. Kết quả kiểm tra lại các Bug (Regression & Code Change Analysis)

Đội phát triển đã triển khai bản build mới `/_next/static/chunks/02105~~nej92~.js` với các thay đổi đáng chú ý:

| Mã Bug | Mô tả | Trạng thái lần này | Chi tiết xác minh |
|---|---|---|---|
| **BUG-02-01** | HLS `stream.m3u8` trả về 404 trên trận đấu đã hoàn thành | **ĐÃ FIX (PASS `02-05-01`)** | Trên trận `Troyes vs Le Mans` (`/matches/775f9ccd-6933-422b-9b76-5cd13a553ba1`), luồng HLS `/api/matches/.../hls/stream.m3u8` và các segment `.ts` trả về `200 OK`; `<video>` phát mượt ở độ phân giải `1920x1080`, `readyState = 4`, `duration = 10800s` (`03:00:00`). |
| **BUG-02-04** | (1) Đảo ngược `min > max` khi kéo biên phân đoạn trùng lắp; (2) Biến mất block trên Timeline khi `> 500` phân đoạn | **ĐÃ FIX PHẦN 2 / CÒN PHẦN 1** | - **Phần 2 (ĐÃ FIX)**: Trong chunk `02105~~nej92~.js`, dev đã gỡ bỏ hàm cắt bớt 500 bucket `t9(q, z, 500)` khỏi `renderedBlocks` (`(0,n.jsx)(no,{renderedBlocks:q,renderedEventHighlights:W,...})`). Toàn bộ `815` phân đoạn của trận `Troyes vs Le Mans` hiện hiển thị đầy đủ trên Timeline, không còn bị ẩn khi bỏ chọn.<br>- **Phần 1 (CÒN TỒN TẠI)**: Hàm `eE(e,t,n,r)` vẫn lọc `s.filter(e=>e.start_ms<t.end_ms)` và `s.filter(e=>e.end_ms>t.start_ms)`, gây `min > max` nếu hai phân đoạn cùng `segment_type` chồng lấp thời gian. |
| **BUG-02-02** | Truy cập `/matches/{uuid-không-tồn-tại}` bị treo `"Đang tải..."` và lặp polling 404 mỗi 5s | **ĐÃ FIX MỘT PHẦN — VẪN FAIL (`02-04-03`)** | - **Cải thiện mới**: Giao diện đã hiển thị toast cảnh báo `"Đã xảy ra lỗi / Match was not found."` (`uid=55_75, 55_76`).<br>- **Lỗi còn tồn tại**: Trang không chuyển sang màn hình Empty/Error 404 mà vẫn giữ nguyên tiêu đề `"Đang tải..."` (`uid=55_4`), badge `"Đang đồng bộ trực tiếp"` (`uid=55_5`), vùng player `"Đang tải video..."` (`uid=55_30`) và tiếp tục gọi lặp `GET /api/matches/00000000-0000-0000-0000-000000000000` + `/segments` trả về `404` mỗi 5 giây (`reqid=403, 404, 411, 412`), sinh ra nhiều toast lỗi trùng lặp. |
| **BUG-02-03** | Chuyển trang (`Tiếp`) trên `/matches` làm mất bộ lọc `TRẠNG THÁI` | **VẪN TỒN TẠI (Sub-bug ở `02-03-03`)** | Khi chọn `TRẠNG THÁI = Đã kết thúc` (`GET /api/matches?...&status=completed [200]`, `reqid=177`) rồi nhấn `Tiếp`, ứng dụng gọi `reqid=178` (`page=2&...&status=completed [200]`) nhưng ngay sau đó đẩy URL `/matches?page=2` (thiếu `&status=completed`), làm component remount và gọi `reqid=181` (`GET /api/matches?page=2&page_size=12&order_by=created_at&order_dir=desc [200]`), reset bộ lọc về `"Tất cả"` (`174 trận đấu`). |

---

## 4. Danh sách file Bug chi tiết

- [BUG-02-02.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-09/run-110430/bugs/BUG-02-02.md) — Trang chi tiết trận đấu không tồn tại vẫn giữ trạng thái `"Đang tải..."` và lặp polling 404 mỗi 5 giây dù đã thêm toast `"Match was not found."`
- [BUG-02-03.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-09/run-110430/bugs/BUG-02-03.md) — Phân trang danh sách trận đấu (`/matches?page=2`) làm mất bộ lọc `TRẠNG THÁI` (`status=completed`)
- [BUG-02-04.md](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/02-sport-highlight/reports/2026-11-09/run-110430/bugs/BUG-02-04.md) — Logic giới hạn biên phân đoạn `eE` (`clampSegmentBounds`) bị đảo ngược `min > max` khi hai phân đoạn cùng loại chồng lấp thời gian (Phần 2 ẩn block `> 500` phân đoạn đã được fix)

