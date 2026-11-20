# BUG REPORT — BUG-02-02 (RETEST CÒN TÁI HIỆN — ĐỢT `run-152048`)

- **Mã Bug**: `BUG-02-02`
- **Tiêu đề**: [Sport Highlight] Truy cập URL chi tiết trận đấu với UUID không tồn tại hiển thị đúng Toast lỗi 404 nhưng tiêu đề và khung video vẫn treo trạng thái "Đang tải..."
- **Mức độ (Severity / Priority)**: Low / P3 (UX / Hiển thị trạng thái lỗi)
- **Trạng thái**: Còn tái hiện trong đợt kiểm thử `2026-11-05 / run-152048`
- **Test Case liên quan**: `02-04-03` (`04-Xem-Chi-tiet-Tran-dau`)
- **URL**: `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000`

## 1. Bằng chứng xác minh trong đợt `run-152048`
- Snapshot `uid=110_73..110_80`: Hiển thị Toast lỗi `"Đã xảy ra lỗi - Match was not found."`.
- Snapshot `uid=110_31..110_37`: Các nút player (`Phát`, `Phát lại đoạn`, `Tắt âm lượng`, `Toàn màn hình`) đều `disabled`.
- Snapshot `uid=110_4`: Tiêu đề trang vẫn hiển thị `"Đang tải..."`.
- Snapshot `uid=110_30`: Khung video vẫn hiển thị `"Đang tải video..."`.

