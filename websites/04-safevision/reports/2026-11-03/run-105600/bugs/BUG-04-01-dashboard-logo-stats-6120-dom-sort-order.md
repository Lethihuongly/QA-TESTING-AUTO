# BUG-04-01 — Khối `THỐNG KÊ PHÂN LOẠI LOGO` trên Dashboard bị đảo thứ tự sắp xếp (đẩy nhãn số `"0"`, `"1"`, `"3"` với `0%` lên đầu) và render toàn bộ `6,120` dòng (`48,965` DOM nodes)

## 1. Thông tin định danh

- **Bug ID:** `BUG-04-01`
- **Website:** `SafeVision` (`04-safevision`)
- **Chức năng:** `04-02` — Dashboard (`Bảng Điều Khiển Tổng Quan`)
- **Test Case liên quan:** `04-02-03`
- **Mức độ nghiêm trọng (Severity):** `Medium`
- **Mức độ ưu tiên (Priority):** `P1`
- **Ngày giờ phát hiện:** `2026-11-03 10:49:04 (+07:00)`
- **Môi trường:** `https://safevision.cmcati.vn/` (Chrome Desktop, Windows)

---

## 2. Các bước tái hiện (Steps to Reproduce)

1. Đăng nhập vào SafeVision và truy cập trang Dashboard `https://safevision.cmcati.vn/` (hoặc nhấn vào logo `VTV Logo AI DETECTION` ở góc trên bên trái).
2. Chờ trang tải xong và quan sát khối `THỐNG KÊ PHÂN LOẠI LOGO`.
3. Đối chiếu thứ tự hiển thị trên giao diện với dữ liệu `topLogos` từ API `GET https://safevision-api.cmcati.vn/api/v1/dashboard/stats`.

---

## 3. Kết quả mong đợi vs Kết quả thực tế

- **Kết quả mong đợi (Expected):**
  - Khối `THỐNG KÊ PHÂN LOẠI LOGO` hiển thị các nhãn có số lần phát hiện cao nhất ở đầu danh sách theo đúng thứ tự từ API (`logo`: `121,919` lần — `56%`, `VTV6`: `17,391` lần — `8%`, `3soc`: `16,446` lần — `8%`, `VTV3`: `4,460` lần — `2%`, ...).
  - Giới hạn số lượng hiển thị (ví dụ Top 10–20 hoặc có phân trang/virtual scroll) và lọc bỏ các nhãn rác dạng timestamp/số.
- **Kết quả thực tế (Actual):**
  - 30 vị trí đầu tiên của khối `THỐNG KÊ PHÂN LOẠI LOGO` hiển thị toàn các nhãn số (`"0"`, `"1"`, `"3"`, `"10"`, `"13"`, ..., `"6024"`) chỉ có `1–4 lần phát hiện` (`0%`), trong khi nhãn đứng đầu thực sự là `"logo"` (`121,919 lần phát hiện`, `56%`) bị đẩy xuống vị trí thứ 31.
  - Nguyên nhân kỹ thuật: API `GET /api/v1/dashboard/stats` trả về `topLogos` gồm `6,120` phần tử (trong đó có hàng nghìn nhãn dạng số/timestamp như `"0"`, `"1"`, `"1789619908560"`). Frontend gom mảng này vào một Object JavaScript `{ [logo]: count }`, khiến động cơ JS tự động sắp xếp toàn bộ các khóa số nguyên (`array index keys`) lên đầu Object trước các khóa chuỗi (`"logo"`, `"VTV6"`).
  - Đồng thời, việc render trực tiếp cả `6,120` dòng vào DOM tạo ra `48,965` phần tử DOM chỉ riêng trong thẻ này.

---

## 4. Bằng chứng kỹ thuật (Evidence)

- **Dữ liệu gốc từ `GET /api/v1/dashboard/stats` (`topLogos.slice(0, 3)`):**
  ```json
  [
    {"rejected": 0, "logo": "logo", "approved": 9, "count": 121919},
    {"rejected": 0, "logo": "VTV6", "approved": 458, "count": 17391},
    {"rejected": 0, "logo": "3soc", "approved": 1, "count": 16446}
  ]
  ```
- **Dữ liệu thực tế hiển thị ở đầu khối `THỐNG KÊ PHÂN LOẠI LOGO` (`Snapshot uid=78_19..78_64`):**
  ```json
  {
    "totalDomNodesInMain": 49290,
    "itemCount": 6120,
    "sampleItems": [
      "0 1 lần phát hiện 0%",
      "1 2 lần phát hiện 0%",
      "3 2 lần phát hiện 0%",
      "10 1 lần phát hiện 0%"
    ],
    "lastItems": [
      "1789619908447 1 lần phát hiện 0%",
      "1789619908560 1 lần phát hiện 0%"
    ]
  }
  ```
- **Ảnh chụp màn hình:** Thiếu file ảnh minh chứng do lỗi MCP `take_screenshot`: `Error: Access denied: path "..." is not within any of the configured workspace roots.`

