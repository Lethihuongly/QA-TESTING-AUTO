# Hướng dẫn kiểm thử 4 website bằng Antigravity + Chrome DevTools MCP

Ngày chuẩn bị: 03/11/2026. Dành cho tester mới trên Windows.

## 1. Bạn sẽ làm theo luồng nào?

Antigravity chat nhận yêu cầu → gọi Chrome DevTools MCP → thao tác Chrome → so sánh kết quả với test case → ghi báo cáo.

SelectorsHub là công cụ hỗ trợ lấy/kiểm tra CSS selector và XPath khi cần. Nó không tự kết nối MCP và không tự tạo bộ kiểm thử hoàn chỉnh.

Bộ này là thư mục khởi tạo và hướng dẫn chạy qua agent. Chưa kết nối Antigravity trên máy bạn, chưa đăng nhập hay thực thi test 4 web trong lần chuẩn bị này. Tin nhắn hiện tại không có bảng checklist đầy đủ; danh mục chức năng là bản đề xuất dựa trên nội dung đã trao đổi. Đặc biệt SafeVision và các mục upload/cấu hình cần xác nhận UI/quyền trước khi dùng.

## 2. Mở bộ thư mục

1. Giải nén CMC-QA-TESTING.zip vào ví dụ `C:\QA`.
2. Mở Antigravity → File → Open Folder → chọn `C:\QA\CMC-QA-TESTING`.
3. Trong Explorer, mở `websites`. Có 4 thư mục web theo thứ tự: VTV Tư liệu, Sport Highlight, Anti-Logo, SafeVision.
4. Mỗi web có `checklist.csv`, `features`, `reports` và `CHANGELOG.md`.
5. Mỗi chức năng có `test-cases.md`, `mcp-flow.md`, `selectors.json` và `scripts/`.

| File/thư mục | Dùng để làm gì? |
| --- | --- |
| checklist.csv | Danh sách chức năng và mức ưu tiên; mở bằng Excel hoặc editor |
| test-cases.md | Các bước test và kết quả mong đợi; hoàn thiện trước khi chạy |
| mcp-flow.md | Quy trình để chat Antigravity thực hiện bằng MCP |
| selectors.json | Thông tin phần tử đã xác minh; ban đầu để trống |
| scripts/ | Chỗ để script thực thi sau khi đã khảo sát và chọn cách chạy |
| reports/ | Kết quả riêng cho từng ngày và từng lần chạy |
| prompts/ | Câu lệnh dùng lại: khảo sát, test hằng ngày, thêm chức năng |
| templates/ | Mẫu báo cáo kết quả, bug và quy trình thêm tính năng |

File `.md` là tài liệu văn bản. File `.json` là cấu hình/dữ liệu. File `.ts` là mã TypeScript, cần môi trường thực thi phù hợp; đổi đuôi file không biến tài liệu thành script.

## 3. Kết nối MCP vào Antigravity

### Bước A — kiểm tra công cụ

Cài Google Chrome và Node.js bản LTS từ trang chính thức https://www.google.com/chrome/ và https://nodejs.org/ nếu chưa có. Mở terminal trong IDE rồi chạy lần lượt:

```powershell
node --version
npm --version
npx --version
```

Cả ba cần trả về phiên bản. Nếu không nhận lệnh, mở lại IDE sau khi cài và kiểm tra PATH. Dùng Node LTS đáp ứng yêu cầu của phiên bản chrome-devtools-mcp đang cài; xem README chính thức khi gặp lỗi unsupported Node.

### Bước B — mở đúng cấu hình

Theo tài liệu Antigravity hiện tại: tại đầu panel chat agent, chọn `…` → `MCP Servers` → `Manage MCP Servers` → `View raw config` (một số bản đặt tên `Open MCP Config`). Ưu tiên file IDE mở ra, tránh tự đoán vị trí theo hướng dẫn cũ.

Tài liệu hiện tại nêu cấu hình toàn cục tại `~/.gemini/config/mcp_config.json`, hoặc cấu hình workspace `.agents/mcp_config.json`. Bản IDE cũ có thể có vị trí khác; nút mở config là căn cứ trên máy bạn.

Nếu chưa có server nào, chép cấu hình dưới đây. Nếu đã có, chỉ thêm mục `chrome-devtools` bên trong `mcpServers`, giữ server cũ và chú ý dấu phẩy:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

File mẫu cũng nằm trong `config/mcp_config.example.json`. Không đặt user/mật khẩu website trong cấu hình MCP. Lưu, refresh/reload server trong màn hình quản lý; nếu cần, mở lại IDE.

Nếu Windows báo không tìm thấy `npx`, kiểm tra `where.exe npx`. Có thể thử `command: "npx.cmd"` hoặc đường dẫn thực tế từ máy, không chép đường dẫn của người khác.

`@latest` tiện khi thiết lập lần đầu. Sau khi chạy ổn, ghi phiên bản thực tế vào báo cáo môi trường; có thể thay bằng phiên bản cụ thể `chrome-devtools-mcp@X.Y.Z` đã xác minh để giảm thay đổi ngoài ý muốn.

### Bước C — kiểm tra kết nối bằng thao tác thật

Dán vào chat:

> Chỉ dùng server chrome-devtools. Liệt kê các công cụ hiện có. Mở http://vtvtulieu.cmcati.vn/ bằng MCP và lấy snapshot để đọc tiêu đề trang. Chưa nhập thông tin đăng nhập. Báo tên công cụ đã dùng và kết quả thực tế. Nếu không kết nối được, báo nguyên văn lỗi; không tự đổi sang browser agent tích hợp.

Thành công khi có lời gọi công cụ thực tế và Chrome mở đúng trang, đọc được UI. Chỉ thấy server trong danh sách chưa đủ. Chrome có thể chỉ khởi động khi gọi công cụ trình duyệt đầu tiên.

Dùng cửa sổ Chrome do MCP mở. Đăng nhập thủ công ở cửa sổ này là cách đơn giản cho lần đầu. Đăng nhập tài khoản Google vào Chrome không phải điều kiện bắt buộc để đăng nhập website. Không mặc định mất session là do Chrome Guest; cần kiểm tra cookie/redirect và đúng profile/tab.

File `.env.example` chỉ là mẫu trống, MCP không tự đọc file này. Nếu sau này viết script, phải chủ động lập trình phần đọc biến môi trường. Không lưu mật khẩu vào tài liệu chia sẻ, báo cáo hoặc selectors.json.

## 4. Làm lần lượt từng website

Lần đầu thực hiện một web cho đến khi ổn rồi chuyển web tiếp theo. Quản lý chung 4 web không có nghĩa phải để agent thao tác đồng thời 4 tab.

### Web 01 — VTV Tư liệu

1. Mở `websites/01-vtv-tu-lieu/checklist.csv`.
2. Dán `prompts/01-khao-sat.md` vào chat và ghi rõ đường dẫn web 01.
3. Đăng nhập trong Chrome của MCP; nhờ agent xác nhận vào được trang sau đăng nhập.
4. Hoàn thiện trước các case: đăng nhập hợp lệ, tìm kiếm, mở tư liệu, xem chi tiết/phát video. Ví dụ tìm “thời sự”: kiểm tra từ khóa và danh sách liên quan; không cố định số kết quả vì dữ liệu có thể thay đổi.
5. Tiếp theo: phân trang/lọc nếu có, lịch sử upload, khuôn mặt/địa danh, phân tích video, hỏi đáp và đăng xuất. Hỏi đáp chỉ chạy với dữ liệu mẫu và nếu được phép sử dụng tài nguyên xử lý.
6. Upload và test đăng nhập sai tách riêng: dùng dữ liệu test và chính sách tài khoản phù hợp, tránh thử mật khẩu sai lặp lại mỗi ngày trên tài khoản chung.
7. Dán prompt test hằng ngày, thay đường dẫn web 01. Đọc báo cáo, xác minh bug trước khi chuyển dev.

Ví dụ case đủ cụ thể: đăng nhập sẵn → nhập từ khóa có thật → gửi tìm kiếm → đợi trạng thái tải kết thúc → đối chiếu từ khóa/điều kiện lọc và mục kết quả → mở một mục → đối chiếu tiêu đề/ID tại trang chi tiết. Nếu chưa có dữ liệu chuẩn để kết luận liên quan, ghi hạn chế thay vì tự PASS phần chất lượng tìm kiếm.

### Web 02 — Sport Highlight

Lặp lại khảo sát và hoàn thiện ở `websites/02-sport-highlight`.

Ưu tiên: đăng nhập → danh sách trận → tìm kiếm/lọc → mở chi tiết trận → xem trạng thái ghi hình hoặc phát video khi dữ liệu sẵn sàng → đăng xuất. Chọn tên trận có thật trong danh sách làm dữ liệu test. Trận chưa ghi hình không đủ điều kiện kiểm tra playback; đánh BLOCKED case playback hoặc chọn trận có video, không coi mọi trường hợp chưa có video là lỗi.

Highlight và upload/ghi hình chỉ hoàn thiện sau khi thấy đúng tính năng và xác định dữ liệu test.

### Web 03 — Anti-Logo

Dùng `websites/03-anti-logo`. Ưu tiên đăng nhập, dashboard, danh sách kênh, preview, multi-channel, AI/Flag/logs theo quyền thực tế.

Không Start/Stop hoặc sửa kênh đang LIVE trong smoke hằng ngày. Với xem nhiều kênh, ghi kênh/nguồn, thời gian quan sát, hiện tượng đen/giật và log liên quan; không kết luận backend lỗi chỉ từ một lần khung hình đen.

Đối chiếu Flag với log/frame cùng thời điểm; số lượng frame/log là dữ liệu động. Start/Stop, blur/FPS/ROI, chỉnh BBox/nhãn và upload cần case thử riêng trên kênh test được chỉ định.

### Web 04 — SafeVision

Dùng `websites/04-safevision`. Danh mục ban đầu cần khảo sát nhiều hơn: đăng nhập → danh sách kênh → chi tiết kênh → xem trực tiếp → cảnh báo/tìm kiếm nếu có → đăng xuất.

Đánh dấu rõ kênh online/offline, thời gian cập nhật và quyền tài khoản. Chỉ kiểm tra đúng tính năng nhìn thấy; mục không có trên UI cần xác nhận là không tồn tại hay không đủ quyền. Cấu hình không nằm trong lượt chỉ đọc hằng ngày.

## 5. Dùng SelectorsHub khi khó tìm phần tử

1. Cài từ liên kết chính thức tại https://selectorshub.com/ trên trình duyệt dùng để inspect.
2. Mở web → F12 → tab Elements → chọn biểu tượng chọn phần tử → bấm nút/ô cần kiểm tra.
3. Tại vùng bên cạnh Elements, mở tab SelectorsHub (có thể nằm trong dấu `»`).
4. Lấy CSS hoặc XPath tương đối; kiểm tra selector khớp đúng một phần tử trong phạm vi mong muốn. Có thể lấy HTML bằng chuột phải phần tử trong Elements → Copy → Copy outerHTML.
5. Gửi selector/HTML tối thiểu cho Antigravity, loại bỏ token hoặc giá trị mật khẩu. Nhờ agent kiểm chứng lại trên trang hiện tại.
6. Lưu vào selectors.json: tên phần tử, loại selector, giá trị, trang, số phần tử khớp, ngày xác minh và ghi chú iframe/shadow DOM nếu có.

Ưu tiên thuộc tính ổn định như data-testid/id/name nếu có; tránh XPath tuyệt đối và class sinh ngẫu nhiên. Ví dụ minh họa `button[type="submit"]` chưa được kiểm chứng trên bất kỳ web nào ở đây.

MCP thường thao tác bằng UID từ snapshot; UID có thể đổi sau reload và không phải CSS/XPath bền vững. SelectorHub không bắt buộc cho mọi nút. Extension cài ở Chrome thường có thể không xuất hiện trong profile do MCP mở; cần kiểm tra đúng profile. Không đổi profile giữa chừng rồi mặc định session và extension đi theo.

## 6. Chạy lại mỗi ngày

Mở bộ thư mục → kiểm tra MCP → đọc prompt 02 → điền web 01 và chạy → xem báo cáo → lặp web 02, 03, 04. Bạn chủ động gửi yêu cầu trong chat; bộ này chưa cài lịch tự chạy nền.

P0: luồng cốt lõi cần kiểm tra trước. P1: chức năng thường dùng. P2: ca mở rộng. Độ ưu tiên trong CSV là đề xuất cần điều chỉnh theo nghiệp vụ.

Không dùng một ô trạng thái duy nhất để lưu lịch sử nhiều ngày. Mỗi lượt có thư mục báo cáo mới; CSV checklist giữ danh mục, CSV results giữ kết quả từng case.

| Trạng thái | Ý nghĩa |
| --- | --- |
| PASS | Đã chạy và có bằng chứng đáp ứng expected |
| FAIL | Đã chạy và sai expected |
| BLOCKED | Thiếu điều kiện/dữ liệu/quyền hoặc công cụ khiến không thể thực thi |
| NOT_RUN | Chưa thực hiện |

Nếu chụp ảnh được nhưng không ghi file được, vẫn có thể kết luận case dựa vào quan sát phù hợp, song phải nêu thiếu file ảnh. Không ghi đường dẫn ảnh giả.

## 7. Khi dev thêm chức năng

Dán prompt 03 kèm release note. Thêm thư mục số tiếp theo, không đổi tên toàn bộ cây cũ. Cập nhật checklist, test case, selector, quy trình; chọn lại case smoke/regression theo ảnh hưởng. Chạy case mới và case liên quan, ghi CHANGELOG và báo cáo lượt mới.

## 8. MCP và script tự động khác nhau thế nào?

MCP cho phép agent thao tác trình duyệt khi bạn giao việc trong chat. Các mcp-flow.md là quy trình dùng lại; mỗi lần chạy vẫn phụ thuộc agent, phiên đăng nhập và kết nối.

Nếu muốn một lệnh chạy ổn định hoặc chạy theo lịch, cần bước tiếp theo: chọn công cụ thực thi, viết script có assertion/dữ liệu/log/timeout, chạy thử rồi mới lên lịch. Có thể nghiên cứu CLI của Chrome DevTools theo đúng phiên bản đang dùng, hoặc thống nhất framework khác nếu cần. Không coi file prompt là script tự chạy; chưa cần học TypeScript để bắt đầu luồng MCP này.

## 9. Xử lý lỗi thường gặp

| Hiện tượng | Việc cần làm |
| --- | --- |
| Không có tools chrome-devtools | Kiểm tra JSON, command, server đã enable; refresh; đọc log server |
| npx/npm không được nhận | Kiểm tra Node LTS, PATH, mở lại IDE; dùng where.exe npx |
| Timeout tải package | Kiểm tra proxy/VPN/firewall và quyền truy cập npm theo mạng công ty |
| Browser agent tích hợp lỗi driver | Không nhầm với chrome-devtools MCP; xác nhận đúng tên tool được gọi |
| Đăng nhập quay về login | Ghi URL, redirect, lỗi UI; kiểm tra cookie/session trên đúng Chrome do MCP mở; không đưa cookie/token vào báo cáo |
| UID không còn hợp lệ | Lấy snapshot mới rồi tìm lại phần tử |
| Access denied khi ghi screenshot | Dùng thư mục reports trong workspace đã mở; nếu vẫn bị chặn, ghi lỗi nguyên văn và kiểm tra workspace roots của server; không coi lưu ảnh thành công |
| Menu khác bản hướng dẫn | Mở MCP manager/config bằng giao diện thực tế; tên nút có thể khác theo bản IDE |

## 10. Nguồn chính thức đã đối chiếu

- Antigravity MCP, cấu hình và thao tác IDE: https://antigravity.google/docs/mcp
- Chrome DevTools MCP, yêu cầu và cấu hình khởi đầu: https://github.com/ChromeDevTools/chrome-devtools-mcp
- Danh sách công cụ/tham số theo bản đang dùng: https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md
- SelectorsHub, cách mở tab trong DevTools: https://selectorshub.com/how-to-use-selectorshub/

Nội dung phụ thuộc phiên bản có thể thay đổi; ưu tiên giao diện và tài liệu tương ứng trên máy bạn.
