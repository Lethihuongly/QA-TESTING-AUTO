# CHANGELOG — 02 Sport Highlight

Mọi thay đổi đối với danh sách chức năng, kịch bản kiểm thử (`test-cases.md`), luồng MCP (`mcp-flow.md`) hoặc bộ định vị (`selectors.json`) của website **Sport Highlight** đều được ghi nhận tại đây.

---

## [2026-11-03] — Khảo sát UI thực tế & Kiểm thử lượt đầu bằng `chrome-devtools` MCP

### Đã cập nhật (`UPDATED`)
- Hoàn thiện toàn bộ `test-cases.md` từ `DRAFT` sang `READY` cho 8 chức năng (`01-Dang-nhap` đến `08-Tai-khoan-dang-xuat`) với dữ liệu thực tế (`Troyes vs Le Mans`, `Le Mans vs Toulouse`, `Benfica vs Celtic`, `Real Madrid`).
- Cập nhật và kiểm chứng toàn bộ `selectors.json` (`verified: true`, kèm `matchCount` thực tế qua `evaluate_script`).
- Cập nhật `checklist.csv` với kết quả chạy kiểm thử lượt đầu (`run-100025`).

### Báo cáo & Bug phát hiện (`ADDED`)
- Tạo báo cáo `reports/2026-11-03/run-100025/results.csv` và `summary.md` (19 PASS, 2 FAIL, 0 BLOCKED, 3 NOT_RUN).
- Ghi nhận 2 bug tại `reports/2026-11-03/run-100025/bugs/`:
  - `BUG-02-01-ai-processing-heartbeat-timeout.md`: Lỗi tiến trình AI (`AI_HEARTBEAT_TIMEOUT: No AI heartbeat for more than 180 seconds`) trên trận `sev vs ray` và hàng loạt trận mới kết thúc ghi hình bị kẹt `processing_run.status = "pending"` (`0` phân đoạn), trong khi giao diện chỉ hiển thị `"Hiện chưa có phân đoạn nào"` mà không báo trạng thái lỗi/đang chờ AI.
  - `BUG-02-02-invalid-match-id-infinite-loading-text.md`: Khi truy cập `/matches/{invalid_id}` (`404 Match was not found.`), sau khi hiện toast lỗi, tiêu đề trang và khung video vẫn hiển thị vĩnh viễn `"Đang tải..."` / `"Đang tải video..."`.

---

## [2026-04-20] — Khởi tạo bộ khung kiểm thử (`v1.0.0`)

### Đã thêm (`ADDED`)
- Tạo `README.md` và `checklist.csv` quản lý 8 nhóm chức năng (`02-01` đến `02-08`).
- Khởi tạo 8 thư mục chức năng dưới `features/`:
  - `01-Dang-nhap`
  - `02-Danh-sach-tran-dau`
  - `03-Tim-kiem-loc-phan-trang`
  - `04-Chi-tiet-tran-dau`
  - `05-Phat-video`
  - `06-Highlight`
  - `07-Upload-ghi-hinh`
  - `08-Tai-khoan-dang-xuat`
- Mỗi thư mục chức năng gồm bộ 3 file tiêu chuẩn: `test-cases.md`, `mcp-flow.md`, `selectors.json`.
