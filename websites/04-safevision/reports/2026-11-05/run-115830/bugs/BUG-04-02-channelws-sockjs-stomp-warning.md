# BUG REPORT — BUG-04-02 (PHẦN CẢNH BÁO WEBSOCKET CÒN TỒN ĐỌNG)

- **Mã Bug**: `BUG-04-02` (Cập nhật trạng thái Retest đợt `2026-11-05 / run-115830`)
- **Tiêu đề**: [SafeVision] Đã khắc phục lỗi phát Luồng Stream Gốc HLS (503/CORS), nhưng Console vẫn báo `[ChannelWS] SockJS or Stomp not loaded` khi mở trang Chi tiết kênh ở trạng thái IDLE
- **Mức độ (Severity / Priority)**: Low / P3 (Cảnh báo kỹ thuật / WebSocket client library)
- **Trạng thái**:
  - **Lỗi chính (Luồng Stream Gốc HLS 503/CORS)**: **ĐÃ KHẮC PHỤC** (Video HLS phát mượt `1280x720`, `25 fps`, `State: PLAYING`, `ReadyState: 4/4`).
  - **Cảnh báo kỹ thuật phụ (`[ChannelWS]`)**: **CÒN TÁI HIỆN** trên Console khi mở trang chi tiết kênh.
- **Test Case liên quan**: `04-05-02`, `04-05-03` (`05-Xem-Truc-tiep-Kenh`)
- **URL**: `https://safevision.cmcati.vn/channels/fc3be0d7-0d57-4f0b-b7e4-d59995262336` (Kênh `VTV4`)

---

## 1. Tiền điều kiện & Dữ liệu test
- **Tiền điều kiện**: Đăng nhập hệ thống SafeVision (`https://safevision.cmcati.vn`).
- **Dữ liệu test**: Mở trang chi tiết một kênh bất kỳ đang ở trạng thái `IDLE`, ví dụ:
  - Kênh `VTV4`: `https://safevision.cmcati.vn/channels/fc3be0d7-0d57-4f0b-b7e4-d59995262336`
  - Kênh `VTV9`: `https://safevision.cmcati.vn/channels/26d010ea-346e-4247-80e6-a23a27d043a2`

---

## 2. Các bước tái hiện (Steps to Reproduce)
1. Từ Dashboard (`/`) hoặc Danh sách kênh (`/channels`), bấm vào xem chi tiết kênh `VTV4`.
2. Mở DevTools -> tab **Console** và quan sát khu vực trạng thái kết nối ở khung bên phải (`Output Stream`).

---

## 3. Kết quả mong đợi (Expected Result)
- Thư viện `SockJS` / `Stomp` được nạp đầy đủ hoặc chỉ khởi tạo kết nối WebSocket khi cần thiết mà không sinh cảnh báo thiếu thư viện trên Console.

---

## 4. Kết quả thực tế (Actual Result)
- Luồng Stream Gốc bên trái (`https://vtvgolive-vtv02.vtvdigital.vn/.../master.m3u8`) phát mượt bình thường (`1280x720`).
- Trên DevTools Console xuất hiện cảnh báo:
  `[warn] [ChannelWS] SockJS or Stomp not loaded` (`msgid=8`).
- Trên giao diện khung phải (khi kênh đang `IDLE`), badge hiển thị `WS offline` (`uid=74_64`).

---

## 5. Nội dung copy nhanh sang Notion cho Dev

```markdown
### [BUG-04-02 - Phần phụ] [SafeVision] Console cảnh báo `[ChannelWS] SockJS or Stomp not loaded` tại trang Chi tiết kênh
- **Mức độ**: Low / P3 (Technical Warning)
- **URL**: https://safevision.cmcati.vn/channels/fc3be0d7-0d57-4f0b-b7e4-d59995262336
- **Ghi chú Retest**: Lỗi chính của BUG-04-02 (luồng HLS gốc 503/CORS) đã được fix hoàn toàn, video VTV4 phát mượt 1280x720 @ 25fps.
- **Hiện tượng còn lại**: Khi vào trang `/channels/:id`, Console log ghi nhận warning `[ChannelWS] SockJS or Stomp not loaded` do client gọi khởi tạo ChannelWS khi script `SockJS/Stomp` chưa được bundle hoặc chưa nạp vào trang.
```

