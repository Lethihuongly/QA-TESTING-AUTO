# Retest `BUG-03-03` — Đối chiếu trạng thái API từng kênh (`/channels/api/{1..3}/sdi_inputs`, `/channels/api/state`) với UI

- **Mã Bug:** `BUG-03-03`
- **Case_ID liên quan:** `03-03-02`, `03-03-03`, `03-05-01`, `03-05-02`, `03-12-03`
- **Run_ID:** `2026-11-10/run-090400`
- **Thời điểm kiểm tra:** `2026-11-10T09:59:33+07:00` → `2026-11-10T10:06:08+07:00`
- **URL:** `https://anti-logo.cmcati.vn/channel/1`, `/channel/2`, `/channel/3`, `/channels`
- **Trạng thái hiện tại:** **FIXED / RESOLVED (ĐÃ KHẮC PHỤC — CẢ 3 WORKER ĐỀU LIVE HTTP 200)**

## 1. Bối cảnh & Bước kiểm tra
- Ở đợt chạy trước (`2026-11-09/run-110430`), `/channels/api/2/sdi_inputs` và `/channels/api/3/sdi_inputs` trả `502 Bad Gateway` (`ClientConnectorError: Cannot connect to host 127.0.0.1:17862/17863`).
- Trong đợt chạy `2026-11-10/run-090400`, chúng tôi truy vấn trực tiếp các API và mở lần lượt `/channel/1`, `/channel/2`, `/channel/3`, `/channels` để đối chiếu với UI.

## 2. Kết quả Thực tế (Actual)
- **Phản hồi API:**
  - `GET /channels/api/1/sdi_inputs` → `HTTP 200`
  - `GET /channels/api/2/sdi_inputs` → `HTTP 200`
  - `GET /channels/api/3/sdi_inputs` → `HTTP 200`
  - `GET /channels/api/state` → `HTTP 200`:
    - `Channel 01`: `ok=true, status=200, state="LIVE", source="virtual-sdi-BONGDA_HD", mediaPath="vtv-pcd-virtual-sdi-BONGDA_HD-6d0e7e0d", publisherReadiness=true`
    - `Channel 02`: `ok=true, status=200, state="LIVE", source="virtual-sdi-THETHAO_TINTUC_HD", mediaPath="vtv-pcd-virtual-sdi-THETHAO_TINTUC_HD-7d9e28ff", publisherReadiness=true`
    - `Channel 03`: `ok=true, status=200, state="LIVE", source="virtual-sdi-HAY_TV", mediaPath="vtv-pcd-virtual-sdi-HAY_TV-5757be76", publisherReadiness=true`
- **Đối chiếu UI trên `/channel/2`, `/channel/3` và `/channels`:**
  - `/channel/2`: Phát trực tiếp `vid_virtualsdiTHETHA_5spb8x` (`1920x1080`, `readyState=4`, `paused=false`, `AI lane: ACTIVE`, `aiFlagOneCount=28253`).
  - `/channel/3`: Phát trực tiếp `vid_virtualsdiHAYTV_4tr8dk` (`1920x1080`, `readyState=4`, `paused=false`, `AI lane: ACTIVE`, `aiFlagOneCount=23715`).
  - `/channels`: Hiển thị đồng thời cả 3 khung kênh `LIVE` và phát mượt cả 3 luồng video `1920x1080 @ 50 FPS`.

## 3. Kết luận QA
- **`BUG-03-03` đã được khắc phục (`FIXED`)**: Cả 3 worker kênh 1, 2, 3 đều hoạt động bình thường (`HTTP 200`, `LIVE`) và đồng bộ chính xác với giao diện người dùng.

