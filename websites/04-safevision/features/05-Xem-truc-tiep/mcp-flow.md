# Quy trình MCP: SafeVision / Xem-truc-tiep

Đây là hướng dẫn cho agent trong Antigravity, không phải chương trình tự chạy.

1. Đọc `test-cases.md` cùng thư mục. Nếu bước hoặc expected còn chung chung, khảo sát UI và hoàn thiện thiết kế trước.
2. Chọn đúng tab `https://safevision.cmcati.vn/`; không dùng UID của tab khác.
3. Lấy snapshot mới; dùng UID hiện tại để thao tác. Sau chuyển trang hoặc DOM thay đổi, lấy lại snapshot.
4. Thực hiện từng case đã đủ dữ liệu. Dùng dữ liệu mẫu đã xác nhận.
5. **Quy trình kiểm tra video có bị giật/lag hay không (`TC-04-05-04`)**:
   - **Cách 1 — Quan sát trực tiếp qua công cụ có sẵn trên giao diện SafeVision**:
     - Trên thanh công cụ góc dưới của cả 2 khung video (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`), nhấn nút **`button[title="Bật/Tắt HLS Telemetry Monitor HUD"]`** để bật bảng đo HLS Telemetry trực tiếp trên video.
     - Ngoài ra có thể mở **`button[title="Mở Menu Cấu hình & Thiết lập"]`** → xem khung **`TERMINAL LOGS`**: nếu luồng bị hụt buffer hoặc giật, hệ thống sẽ ghi log `[VIDEO] waiting — buffer underrun (readyState=..., bufAhead=...s)`.
   - **Cách 2 — Đo định lượng tự động bằng `evaluate_script` (`scripts/check-video-lag.js`)**:
     - Gọi `mcp_chrome-devtools_evaluate_script` trên tab SafeVision với hàm trong `scripts/check-video-lag.js` (chạy trong `8000ms`, lấy mẫu mỗi `500ms` đồng thời trên cả 2 thẻ `<video>`).
     - Đối chiếu kết quả trả về cho từng luồng (`LUỒNG STREAM GỐC` và `LUỒNG DELAYED — ĐANG GIÁM SÁT`):
       - `verdict === "SMOOTH"`: Video mượt (`playbackRatio` từ `0.90`–`1.10`, `waitingEvents = 0`, `freezeTicks < 2`, `dropRatePercent < 5%`, `effectiveFps >= 20`).
       - `verdict === "LAG_OR_STUTTER"`: Video bị giật/khựng (`playbackRatio < 0.90`, `waitingEvents > 0`, `freezeTicks >= 2`, hoặc `dropRatePercent >= 5%`).
       - `verdict === "FROZEN"`: Video đứng hình hoàn toàn (`deltaVideoSec <= 0.1` hoặc `decodedFrames === 0`).
6. Ghi từng case vào `reports/YYYY-MM-DD/run-HHMMSS/results.csv`; không sửa kết quả lịch sử.
7. PASS chỉ khi mọi expected của case được quan sát; FAIL khi sai expected; BLOCKED khi không thể thực hiện; NOT_RUN khi chưa chạy.
8. Nếu có bug, dùng `templates/bug-report.md`. Không tự kết luận nguyên nhân từ phỏng đoán.
