# Lịch sử thay đổi

| Ngày | Tính năng | Thay đổi | Case ảnh hưởng | Kết quả retest |
| --- | --- | --- | --- | --- |
| 2026-11-03 | Toàn bộ (01-01 đến 01-11) | Khảo sát UI thực tế bằng `chrome-devtools` MCP, hoàn thiện 33 test cases, cập nhật `selectors.json` đã kiểm chứng và chạy kiểm thử lượt đầu (`run-092745`). | `01-01-01` .. `01-11-03` | 28 PASS, 2 FAIL (`BUG-01-01`, `BUG-01-02`), 0 BLOCKED, 3 NOT_RUN (`01-10-01`..`01-10-03`) |
