# Lịch sử thay đổi

| Ngày | Tính năng | Thay đổi | Case ảnh hưởng | Kết quả retest |
| --- | --- | --- | --- | --- |
| 2026-11-03 | `04-01` .. `04-09` | Khảo sát UI thực tế bằng `chrome-devtools` MCP, hoàn thiện toàn bộ `test-cases.md` và `selectors.json`, chạy kiểm thử lượt đầu (`reports/2026-11-03/run-105600/`) | `04-01-01` .. `04-09-03` (27 cases) | 21 PASS, 3 FAIL (`BUG-04-01`, `BUG-04-02`, `BUG-04-03`), 0 BLOCKED, 3 NOT_RUN (ngoài phạm vi lượt đầu) |
