# [VTV Tư liệu] [Tìm kiếm] Tìm kiếm từ khóa theo nội dung/tiêu đề trên `/results` luôn trả về 0 kết quả dù kho tư liệu đã có dữ liệu hoàn tất

- **Thời gian / URL / phiên bản build**: `2026-11-03 09:36 - 09:38 +07:00` | `https://vtvtulieu.cmcati.vn/results?q=th%E1%BB%9Di+s%E1%BB%B1&search_ocr=true&search_caption=true&search_asr=true&search_face=true`
- **Môi trường / trình duyệt / tài khoản (không ghi mật khẩu)**: Windows / Google Chrome (qua `chrome-devtools` MCP) / Tài khoản `VTV`
- **Mức độ ảnh hưởng / ưu tiên**: Cao (High) / P0-P1 (Chức năng cốt lõi của hệ thống tìm kiếm tư liệu không trả về kết quả)
- **Tiền điều kiện / ID dữ liệu test**:
  - Đã đăng nhập hợp lệ.
  - Kho tư liệu (`/warehouse-management`, API `GET /api/v1/videos?manual_upload=true&page_id=1&page_size=50`) hiện có **151 video**, trong đó có **17 video** chứa từ `"Thời sự"` trong tên file và ít nhất **36 video** có `status="COMPLETED"`, `statusData="COMPLETED"`, ví dụ:
    - `d6395178-fd4b-486c-84a6-8aec70670098`: *"Bản tin thời sự tối 12/2022 - 1/2023: Hội nghị kiểm sát, ngân hàng, Quốc hội và phát triển kinh tế"* (`topics: ["Thời sự"]`)
    - `be08b277-678b-4b51-868e-10dd4d92d6b2`: *"Chủ tịch Quốc hội thăm thương binh, mưa lũ gây sạt lở nghiêm trọng tại Bắc Bộ"* (`sourceFilename: "Thời sự toàn cảnh trưa 19-7- Huy động lực lượng khắc phục thiệt hại do lũ quét - VTV24.mp4"`, `topics: ["Thời sự"]`)
- **Các bước tái hiện**:
  1. Tại Trang chủ `https://vtvtulieu.cmcati.vn/`, nhập từ khóa `"thời sự"` vào ô `Search input` và bấm nút `Initiate search` (hoặc bấm vào thẻ gợi ý `"An ninh quốc gia"`).
  2. Quan sát kết quả trên trang `/results` và gói tin mạng `GET /api/v1/videos/search`.
  3. Thử lặp lại với các từ khóa xuất hiện trong tiêu đề/nội dung các video đã `COMPLETED`: `"Hà Nội"`, `"Đà Nẵng"`, `"Quốc hội"`, `"ngân hàng"`, `"VTV"`.
- **Kết quả mong đợi**:
  - Trang `/results` hiển thị danh sách các video/phân đoạn có nội dung, tiêu đề, OCR hoặc lời thoại khớp với từ khóa tìm kiếm.
- **Kết quả thực tế**:
  - Giao diện hiển thị `"Không tìm thấy kết quả nào!"` cho tất cả các từ khóa trên (kể cả các nút gợi ý tìm kiếm ngay trên Trang chủ).
  - API `GET https://vtvtulieu-api.cmcati.vn/api/v1/videos/search?keyword=th%E1%BB%9Di+s%E1%BB%B1&page_id=1&page_size=20` trả về HTTP `200` nhưng `items: []`, `total: 0`.
  - Ngoài ra, mặc dù URL trình duyệt có các tham số `&search_ocr=true&search_caption=true&search_asr=true&search_face=true`, request thực tế gửi tới `/api/v1/videos/search` chỉ truyền `keyword`, `page_id`, `page_size` (và kể cả khi truyền đủ các cờ `search_*` vào API thì API vẫn trả về `total: 0`).
- **Tần suất tái hiện**: 100% (luôn xảy ra).
- **Console / request liên quan (đã loại token, cookie, mật khẩu)**:
  - Request: `GET https://vtvtulieu-api.cmcati.vn/api/v1/videos/search?keyword=th%E1%BB%9Di+s%E1%BB%B1&page_id=1&page_size=20` (`reqid=68`)
  - Response (`200 OK`):
    ```json
    {"data":{"query":"thời sự","items":[],"total":0,"page":1,"page_size":20,"took_ms":1351},"duration":0,"message":"Success","page":0,"pageSize":0,"status":200,"timestamp":1793673367217,"totalRows":0}
    ```
- **Minh chứng**: Snapshot `uid=7_3`, `uid=9_3`, `uid=12_3`; Network `reqid=65`, `reqid=68`. (Thiếu file ảnh chụp màn hình do `take_screenshot` với `filePath` bị chặn bởi cấu hình workspace roots của MCP).
- **Case liên quan / kết quả retest**: `01-03-02` — **FAIL**.

