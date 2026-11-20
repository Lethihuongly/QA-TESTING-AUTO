# Script kiểm tra các luồng SDI Input (`check-sdi-inputs.js`)

Script [`check-sdi-inputs.js`](file:///c:/Users/cati2/Downloads/CMC-QA-TESTING/CMC-QA-TESTING/websites/03-anti-logo/features/12-Kiem-tra-luong-SDI-Input/scripts/check-sdi-inputs.js) dùng để kiểm tra tự động qua `chrome-devtools` MCP (`evaluate_script`) xem các luồng đầu vào SDI trong mục **`Live SDI inputs (auto-detected)` (`select#sdiInputs`)** trên `https://anti-logo.cmcati.vn/` có hoạt động hay không.

## Các hạng mục được script kiểm tra tự động:
1. **UI DOM (`select#sdiInputs` & `select#defaultVideos`):**
   - Kiểm tra số lượng `<option>` SDI được nhận diện, trạng thái `selected`, `disabled`, độ phân giải (`1920x1080`), `FPS` (`50`), `rtspUrl` và thông báo khóa `#activeStreamLockNotice`.
2. **API SDI trên cả 3 kênh:**
   - `GET /v2/api/sdi_inputs`
   - `GET /channels/api/1/sdi_inputs` (`Channel 01` — cổng `17861`)
   - `GET /channels/api/2/sdi_inputs` (`Channel 02` — cổng `17862`)
   - `GET /channels/api/3/sdi_inputs` (`Channel 03` — cổng `17863`)
   - `GET /channels/api/state`
3. **Kiểm tra luồng HLS nội bộ (`/v2/api/hls/.../index.m3u8`):**
   - Với luồng SDI đang `ACTIVE`, tự động truy vấn manifest chính và variant playlist (`video1_stream.m3u8`) để đếm số phân đoạn `.ts` và `EXT-X-MEDIA-SEQUENCE`.
4. **Đo chất lượng phát thực tế trên `<video>` (`4 giây`):**
   - Đo `playbackRatio`, `decodedFrames`, `effectiveFps`, `readyState` và trạng thái `AI lane`.

