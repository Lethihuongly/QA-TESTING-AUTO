# Retest `BUG-04-02` — Kiểm tra cả luồng gốc và luồng output trên kênh đang hoạt động

- **Mã Bug:** `BUG-04-02`
- **Case_ID liên quan:** `04-05-01`, `04-05-02`, `04-05-03`
- **Run_ID:** `2026-11-10/run-090400`
- **Thời điểm kiểm tra:** `2026-11-10T16:09:59+07:00`
- **URL:** `https://safevision.cmcati.vn/channels/a2884000-4624-4b57-b340-7b8c0e2cb657` (`VTV10`) và `https://safevision.cmcati.vn/channels/5d5a7da4-478e-40a3-be39-bef238c2772a` (`VTV3`)
- **Trạng thái hiện tại:** **FIXED TRÊN KÊNH ĐANG CHẠY AI (`VTV10`) — CẢ LUỒNG GỐC & LUỒNG OUTPUT ĐỀU PHÁT MƯỢT `1280x720`**

## 1. Kết quả kiểm tra trên kênh đang chạy giám sát AI (`VTV10` — `Phiên bef9dc85`, `RUNNING`)
- **Xác định tên luồng trực tiếp từ UI (không mặc định theo thứ tự thẻ `<video>`):**
  - `video[0]` (`LUỒNG STREAM GỐC`): `1280x720`, `readyState = 4`, `paused = false`, `playbackRatio = 1.000`, `effectiveFps = 25.0 FPS`, `droppedFrames = 0`.
  - `video[1]` (`LUỒNG DELAYED — ĐANG GIÁM SÁT` / Output): `1280x720`, `readyState = 4`, `paused = false`, `playbackRatio = 0.998`, `effectiveFps = 24.5 FPS`, `droppedFrames = 0` (nguồn HLS: `/api/output_stream/bef9dc85-dd60-452c-bcb9-6b6e0939e8e2/playlist.m3u8`).

## 2. Kết quả đối chiếu trên các kênh đang `IDLE` phiên AI (ví dụ `VTV3`)
- Theo `GET /api/v1/streams`, hiện chỉ có `1` phiên giám sát AI đang chạy (`activeStreams = 1` trên `VTV10`).
- Trên `VTV3`, `LUỒNG STREAM GỐC` phát trực tiếp bình thường (`1280x720`, `readyState = 4`, `currentTime = 74s`), còn khung Output hiển thị trạng thái chờ rõ ràng: `"IDLE — Output Stream Chưa Phát: Nhấn 'Bắt đầu giám sát' để mở luồng HLS output (đã blur / chèn QC trễ 20s)."`.

