# Retest Bug BUG-03-04 — Anti-Logo

- **Mã Bug:** `BUG-03-04`
- **Mã Test Case:** `03-04-04`, `03-05-02`
- **Chức năng:** `04-Preview` & `05-Multi-channel`
- **Mức độ nghiêm trọng:** `P0`
- **Ngày kiểm tra lại:** `2026-11-13`
- **Run_ID:** `run-115540`
- **Trạng thái:** **PASS_SMOOTH / LIVE**

## Mô tả lỗi ban đầu
Luồng phát trực tiếp bị giật lag, rớt frame cao hoặc không đồng bộ giữa trạng thái worker và giao diện người dùng.

## Kết quả kiểm tra lại thực tế (2026-11-13)
1. Kênh 02 và Kênh 03 hiện đang phát trực tiếp luồng Virtual SDI thực tế (`THETHAO_TINTUC_HD` và `HAY_TV`), ghi nhận hơn 4.6 triệu frames.
2. Kiểm tra định lượng phát video trên Kênh 02 bằng script đo kiểm chuyên dụng:
   - `wallSec`: 4.01s
   - `deltaVideoSec`: 4.01s
   - `playbackRatio`: 1.000
   - `decodedFrames`: 200
   - `effectiveFps`: 49.8 FPS (chuẩn 50 FPS)
   - `readyState`: 4 (HAVE_ENOUGH_DATA), `paused`: false.
3. Kiểm tra giải mã Frame 0 trên 15 file video cục bộ: 15/15 file giải mã thành công (`HTTP 200 image/jpeg`, `allVideosOk=true`).

## Kết luận
Hạ tầng SDI và luồng phát hoạt động rất mượt mà. Trạng thái xác nhận: **PASS_SMOOTH / LIVE**.

