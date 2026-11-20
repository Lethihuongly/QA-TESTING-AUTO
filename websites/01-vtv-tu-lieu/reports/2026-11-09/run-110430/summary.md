# Báo cáo Kiểm thử — Website 01: VTV Tư liệu (CMC Video Miner)

## 1. Thông tin chung

| Hạng mục | Giá trị |
|---|---|
| **Website** | Website 01 — VTV Tư liệu (`CMC Video Miner`) |
| **URL** | `https://vtvtulieu.cmcati.vn/` |
| **Ngày giờ chạy** | `2026-11-09 11:04:34 — 11:22:50 (+07:00)` |
| **Mã lần chạy (Run ID)** | `run-110430` |
| **Công cụ thực thi** | `chrome-devtools` MCP (`pageId: 1`) |
| **Chế độ kiểm thử** | Chế độ chỉ đọc (`Read-Only`) |
| **Trạng thái Screenshot MCP** | `take_screenshot` trả lỗi `Access denied: path "..." is not within any of the configured workspace roots` — toàn bộ bằng chứng được ghi nhận qua DOM Snapshot, `evaluate_script`, Console Logs và Network Requests |

---

## 2. Thống kê kết quả

| Chỉ số | Số lượng | Tỷ lệ (%) | So với lần chạy trước (`2026-11-06/run-094700`) |
|---|---:|---:|---|
| **Tổng số Test Case** | **33** | `100.0%` | Không đổi (`33`) |
| **PASS** | **31** | `93.9%` (`100.0%` số TC thực thi) | Không đổi (`31 PASS`) |
| **FAIL** | **0** | `0.0%` | Giữ vững `0 FAIL` (`BUG-01-01` & `BUG-01-02` tiếp tục ổn định sau khi fix) |
| **BLOCKED** | **0** | `0.0%` | Không đổi (`0`) |
| **NOT_RUN** | **2** | `6.1%` | Không đổi (`01-10-02`, `01-10-03` ngoài phạm vi chỉ đọc) |

### Thống kê theo Tính năng (11 Features)

| Mã Feature | Tên tính năng | Tổng TC | PASS | FAIL | BLOCKED | NOT_RUN |
|---|---|---:|---:|---:|---:|---:|
| `01-Dang-nhap` | Đăng nhập & Xác thực | 3 | 3 | 0 | 0 | 0 |
| `02-Trang-chu` | Trang chủ & Gợi ý tìm kiếm | 3 | 3 | 0 | 0 | 0 |
| `03-Tim-kiem` | Tìm kiếm văn bản & hình ảnh | 3 | 3 | 0 | 0 | 0 |
| `04-Lich-su-upload` | Lịch sử Upload | 3 | 3 | 0 | 0 | 0 |
| `05-Xem-video` | Xem Video & Phân đoạn | 3 | 3 | 0 | 0 | 0 |
| `06-Phan-tich-clip` | Phân tích Clip (5 Tabs AI) | 3 | 3 | 0 | 0 | 0 |
| `07-Quan-ly-kho-video` | Quản lý Kho Video | 3 | 3 | 0 | 0 | 0 |
| `08-Quan-ly-khuon-mat-dia-danh` | Quản lý Khuôn mặt & Địa danh | 3 | 3 | 0 | 0 | 0 |
| `09-Trinh-hoi-dap-AI` | Trình hỏi đáp AI (Chatbot Video) | 3 | 3 | 0 | 0 | 0 |
| `10-Upload-Dang-ky-du-lieu` | Upload & Đăng ký dữ liệu (Read-only modal check) | 3 | 1 | 0 | 0 | 2 |
| `11-Quan-ly-tai-khoan` | Quản lý Tài khoản & Đăng xuất | 3 | 3 | 0 | 0 | 0 |
| **Tổng cộng** | **11 Features** | **33** | **31** | **0** | **0** | **2** |

---

## 3. Kết quả kiểm tra lại các Bug cũ (Regression Verification)

| Mã Bug | Mô tả | Trạng thái lần này | Bằng chứng xác nhận |
|---|---|---|---|
| **BUG-01-01** | Phân trang tìm kiếm `/results` không chuyển sang trang 2 | **ĐÃ FIX (PASS `01-03-02`)** | Tại `/results?q=C%C3%B4ng+ngh%E1%BB%87+chuy%E1%BB%83n+%C4%91%E1%BB%95i+s%E1%BB%91` (`Đã tìm thấy 79 kết quả`), nhấn nút trang `2` (`uid=13_208`) cập nhật URL sang `&page_id=2`, gọi `GET /api/v1/videos/search?...&page_id=2&page_size=20 [200]` (`reqid=81`), nút trang `2` active (`aria-current="page"`) và hiển thị 20 video mới (video đầu: *"Webina số 8 về công nghệ bán dẫn và tiềm năng công nghệ lượng tử của Việt Nam"*). |
| **BUG-01-02** | Trình hỏi đáp AI (`POST /api/v1/videos/{id}/chat`) trả lỗi 502 / không phản hồi | **ĐÃ FIX (PASS `01-09-02`)** | Trên `/watch?video_id=be08b277-678b-4b51-868e-10dd4d92d6b2`, nhấn câu hỏi gợi ý *"Video này nói về nội dung gì?"* (`uid=41_14`) gửi `POST /api/v1/videos/be08b277.../chat` trả về `200 OK` (`reqid=693`) sau `9.06s` kèm bản tóm tắt chi tiết và 8 nút mốc thời gian (`12:09`, `5:48`, `6:39`, `9:20`, `9:51`, `19:10`, `5:00`, `8:20`). Nhấn mốc `5:48` tua `<video>` chính xác tới `currentTime = 348.92s`. |

---

## 4. Nhận xét & Đánh giá

- **Độ ổn định hệ thống**: Website 01 (`VTV Tư liệu`) đạt **100% PASS** trên toàn bộ 31/31 Test Case thực thi (`0 FAIL`, `0 BLOCKED`), không phát sinh lỗi Console hay lỗi API 5xx.
- **Kết nối Realtime & Media**: Kết nối WebSocket STOMP (`Connected to notification STOMP server`) hoạt động ổn định; trình phát HTML5 `<video>` tải metadata và seek phân đoạn mượt mà (`readyState = 4`, `duration = 1317.48s`).

