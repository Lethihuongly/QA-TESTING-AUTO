# BUG REPORT

## Thông tin chung
- **Mã bug:** BUG-01-04
- **Ngày phát hiện:** 2026-11-05
- **Người phát hiện:** QA Agent (MCP)
- **Website:** 01 - VTV Tư liệu (`https://vtvtulieu.cmcati.vn/`)
- **Chức năng:** 03 - Tìm kiếm (`01-03-03`)
- **Mức độ nghiêm trọng (Severity):** High
- **Mức độ ưu tiên (Priority):** P1
- **Trạng thái:** Open (New)

---

## Môi trường
- **URL:** `https://vtvtulieu.cmcati.vn/results?q=xyz_khong_ton_tai_9999&search_ocr=true&search_caption=true&search_asr=true&search_face=true`
- **Trình duyệt:** Chrome (điều khiển qua Chrome DevTools MCP)
- **Hệ điều hành:** Windows

---

## Mô tả lỗi
Khi người dùng tìm kiếm một từ khóa không có dữ liệu khớp trong kho (ví dụ: `"xyz_khong_ton_tai_9999"`), API `GET https://vtvtulieu-api.cmcati.vn/api/v1/videos/search?keyword=xyz_khong_ton_tai_9999&page_id=1&page_size=20` bị treo khoảng 60 giây rồi thất bại với lỗi mạng/CORS (`net::ERR_FAILED`, `No 'Access-Control-Allow-Origin' header is present on the requested resource`). Giao diện hiển thị màn hình lỗi `Something went wrong` kèm nút `Try Again` thay vì hiển thị trạng thái rỗng (`"Không tìm thấy kết quả nào!"`).

---

## Điều kiện tiên quyết (Preconditions)
1. Người dùng đã đăng nhập hợp lệ vào hệ thống VTV Tư liệu (`https://vtvtulieu.cmcati.vn/`).

---

## Dữ liệu test (Test Data)
- Từ khóa tìm kiếm: `xyz_khong_ton_tai_9999`

---

## Các bước tái hiện (Steps to Reproduce)
1. Mở trang chủ `https://vtvtulieu.cmcati.vn/` hoặc trang kết quả `/results`.
2. Nhập từ khóa `xyz_khong_ton_tai_9999` vào ô `Search input`.
3. Nhấn phím `Enter` hoặc nhấn nút tìm kiếm (`Search current query` / `Initiate search`).
4. Quan sát trạng thái tải trên giao diện, tab Network và tab Console sau ~60 giây.

---

## Kết quả mong đợi (Expected Result)
- API `/api/v1/videos/search` phản hồi nhanh với mã `200 OK` và danh sách rỗng (`total: 0`).
- Giao diện hiển thị thông báo trạng thái rỗng: `"Không tìm thấy kết quả nào!"` và gợi ý `"Hãy thử tìm kiếm với từ khóa khác hoặc sử dụng hình ảnh để tìm kiếm."` theo đúng đặc tả test case `01-03-03`.

---

## Kết quả thực tế (Actual Result)
- Giao diện treo ở trạng thái `"Đang tìm kiếm video phù hợp..."` trong khoảng 60 giây.
- Sau ~60 giây, giao diện hiển thị khối lỗi:
  - Heading `h3`: `"Something went wrong"` (`uid=11_0`)
  - Button: `"Try Again"` (`uid=11_1`)
  - Toast notification: `"Something went wrong"` (`uid=11_2`)
- **Network:** Request `reqid=87` (`GET https://vtvtulieu-api.cmcati.vn/api/v1/videos/search?keyword=xyz_khong_ton_tai_9999&page_id=1&page_size=20&search_ocr=true&search_caption=true&search_asr=true&search_face=true`) bị `failed` (`net::ERR_FAILED`).
- **Console:**
  - `msgid=68` [error]: `Access to XMLHttpRequest at 'https://vtvtulieu-api.cmcati.vn/api/v1/videos/search?keyword=xyz_khong_ton_tai_9999&page_id=1&page_size=20&search_ocr=true&search_caption=true&search_asr=true&search_face=true' from origin 'https://vtvtulieu.cmcati.vn' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
  - `msgid=69` [error]: `GET https://vtvtulieu-api.cmcati.vn/api/v1/videos/search?keyword=xyz_khong_ton_tai_9999&page_id=1&page_size=20&search_ocr=true&search_caption=true&search_asr=true&search_face=true net::ERR_FAILED`

---

## Tần suất (Frequency)
- Luôn xảy ra khi truy vấn từ khóa không tồn tại gây timeout ở tầng API/Gateway.

---

## Bằng chứng (Evidence)
- **Snapshot:** `uid=8_0` (`"Đang tìm kiếm video phù hợp..."`), `uid=11_0..11_2` (`"Something went wrong"`, `"Try Again"`).
- **Network & Console:** `reqid=87`, `msgid=68`, `msgid=69`.
- **Screenshot:** Chưa lưu được file ảnh do giới hạn sandbox của MCP (`Error: Access denied: path "C:\\Users\\cati2\\Downloads\\CMC-QA-TESTING\\CMC-QA-TESTING\\websites\\01-vtv-tu-lieu\\reports\\2026-11-05\\run-115830\\screenshots\\01-01-01-login-page.png" (canonical: "C:\\Users\\cati2\\Downloads\\CMC-QA-TESTING\\CMC-QA-TESTING\\websites\\01-vtv-tu-lieu\\reports\\2026-11-05\\run-115830\\screenshots\\01-01-01-login-page.png") is not within any of the configured workspace roots.`).

---

## Hướng dẫn quay Jam & Nội dung copy sang Notion cho Dev
### Các bước ngắn để Tester quay Jam:
1. Mở `https://vtvtulieu.cmcati.vn/results`, bật sẵn tab DevTools Network.
2. Nhập `xyz_khong_ton_tai_9999` vào ô tìm kiếm và nhấn `Enter`.
3. Quay lại cảnh trang treo `"Đang tìm kiếm video phù hợp..."` và sau ~60s chuyển sang `"Something went wrong"` cùng dòng request `/api/v1/videos/search` bị đỏ (`CORS error` / `ERR_FAILED`).

### Nội dung copy nhanh sang Notion:
```markdown
**[BUG-01-04][VTV Tư liệu] Tìm kiếm từ khóa không tồn tại bị treo ~60s rồi báo lỗi "Something went wrong" (CORS / Gateway Timeout)**
- **Mức độ:** High (P1)
- **URL:** https://vtvtulieu.cmcati.vn/results?q=xyz_khong_ton_tai_9999&search_ocr=true&search_caption=true&search_asr=true&search_face=true
- **Bước tái hiện:** Nhập từ khóa không tồn tại `xyz_khong_ton_tai_9999` vào ô tìm kiếm -> Nhấn Enter -> Chờ ~60s.
- **Expected:** API trả `200 OK` (0 kết quả), UI hiển thị `"Không tìm thấy kết quả nào!"`.
- **Actual:** Request `GET /api/v1/videos/search?keyword=xyz_khong_ton_tai_9999...` treo ~60s rồi lỗi `net::ERR_FAILED` (thiếu header CORS trên phản hồi lỗi/timeout), UI hiển thị `h3 "Something went wrong"` và nút `"Try Again"`.
```

