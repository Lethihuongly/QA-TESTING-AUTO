# BUG-04-02 — 4/5 kênh đang báo `"Đang phát"` / `"RUNNING"` (`VTV10`, `VTV7`, `VTV8`, `VTV9`) bị lỗi CORS luồng gốc, lỗi `503` luồng AI output (kẹt `"LOADING"`) và toàn bộ kênh báo `"WS offline"`

## 1. Thông tin định danh

- **Bug ID:** `BUG-04-02`
- **Website:** `SafeVision` (`04-safevision`)
- **Chức năng:** `04-05` — Xem trực tiếp (`LUỒNG STREAM GỐC` & `LUỒNG DELAYED — ĐANG GIÁM SÁT`)
- **Test Case liên quan:** `04-05-03`
- **Mức độ nghiêm trọng (Severity):** `High`
- **Mức độ ưu tiên (Priority):** `P1`
- **Ngày giờ phát hiện:** `2026-11-03 10:51:36 (+07:00)`
- **Môi trường:** `https://safevision.cmcati.vn/channels/a2884000-4624-4b57-b340-7b8c0e2cb657` (Chrome Desktop, Windows)

---

## 2. Các bước tái hiện (Steps to Reproduce)

1. Đăng nhập vào `https://safevision.cmcati.vn/channels`.
2. Quan sát các kênh đang hiển thị trạng thái `"Đang phát"` và mở chi tiết kênh `VTV10` (`/channels/a2884000-4624-4b57-b340-7b8c0e2cb657`).
3. Quan sát khung trình phát video (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`), huy hiệu trạng thái WebSocket (`WS offline`) và kiểm tra Console / Network.

---

## 3. Kết quả mong đợi vs Kết quả thực tế

- **Kết quả mong đợi (Expected):**
  - Các kênh đang ở trạng thái `"Đang phát"` / `"RUNNING"` phát được luồng video gốc và luồng delayed (như kênh `VTV3`), hoặc nếu phiên stream cũ đã hết hạn thì backend phải chuyển trạng thái sang `stopped`/`error`.
  - Kết nối WebSocket realtime hoạt động bình thường (`WS online`).
- **Kết quả thực tế (Actual):**
  - Trên `VTV10` (phiên `c98b40f0-13fb-4c9e-82fb-6f7d2dc76963`) và các kênh `VTV7` (`55525ec7...`), `VTV8` (`7f2c3a73...`), `VTV9` (`76238201...`):
    1. **Lỗi CORS ở `LUỒNG STREAM GỐC`:** Trình duyệt gọi trực tiếp `https://vtvgolive-vtv02.vtvdigital.vn/.../master.m3u8` từ origin `https://safevision.cmcati.vn` và bị chặn bởi chính sách CORS (`No 'Access-Control-Allow-Origin' header is present on the requested resource`).
    2. **Lỗi HTTP `503` lặp vô hạn ở `LUỒNG DELAYED`:** Request `GET https://safevision-ai.cmcati.vn/api/output_stream/c98b40f0-13fb-4c9e-82fb-6f7d2dc76963/playlist.m3u8` trả về `503 Service Unavailable` liên tục (>240 lần), khiến cả 2 thẻ `<video>` có `readyState = 0` và giao diện kẹt ở trạng thái `"LOADING"`.
    3. **Lỗi `"WS offline"` trên tất cả các kênh:** Console báo `[warn] [ChannelWS] SockJS or Stomp not loaded` và huy hiệu trạng thái trên mọi trang chi tiết kênh (kể cả `VTV3`) đều hiển thị `"WS offline"`.

---

## 4. Bằng chứng kỹ thuật (Evidence)

- **Console Logs (`list_console_messages`):**
  ```text
  msgid=207 [log] [DEBUG] Initializing HLS player for: https://vtvgolive-vtv02.vtvdigital.vn/S1yBpQR7d7ZW6ZbdGJmCGg/1792606478/hls/vtv/live/vtv10/free/master.m3u8
  msgid=208 [warn] [ChannelWS] SockJS or Stomp not loaded
  msgid=209 [log] [DEBUG] Initializing HLS player for: https://safevision-ai.cmcati.vn/api/output_stream/c98b40f0-13fb-4c9e-82fb-6f7d2dc76963/playlist.m3u8
  msgid=210 [error] Access to fetch at 'https://vtvgolive-vtv02.vtvdigital.vn/S1yBpQR7d7ZW6ZbdGJmCGg/1792606478/hls/vtv/live/vtv10/free/master.m3u8' from origin 'https://safevision.cmcati.vn' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  msgid=212 [error] Failed to load resource: the server responded with a status of 503 () [240 times]
  ```
- **Ảnh chụp màn hình:** Thiếu file ảnh minh chứng do lỗi MCP `take_screenshot`: `Error: Access denied: path "..." is not within any of the configured workspace roots.`

