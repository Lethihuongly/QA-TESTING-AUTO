# BUG REPORT — BUG-02-02 (RETEST CÒN TÁI HIỆN)

- **Mã Bug**: `BUG-02-02`
- **Tiêu đề**: [Sport Highlight] Truy cập URL chi tiết trận đấu với UUID không tồn tại hiển thị đúng Toast lỗi 404 nhưng tiêu đề và khung video vẫn treo trạng thái "Đang tải..."
- **Mức độ (Severity / Priority)**: Low / P3 (UX / Hiển thị trạng thái lỗi)
- **Trạng thái**: Còn tái hiện trong đợt kiểm thử `2026-11-05 / run-115830`
- **Test Case liên quan**: `02-04-03` (`04-Xem-Chi-tiet-Tran-dau`)
- **URL**: `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000`
- **Môi trường**: Chrome (Windows), kiểm thử qua `chrome-devtools` MCP

---

## 1. Tiền điều kiện & Dữ liệu test
- **Tiền điều kiện**: Mở trình duyệt và truy cập hệ thống Sport Highlight (`https://sport-highlight.cmcati.vn`).
- **Dữ liệu test**: Đường dẫn chứa UUID trận đấu không tồn tại trên hệ thống:
  `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000`

---

## 2. Các bước tái hiện (Steps to Reproduce)
1. Điều hướng trực tiếp tới URL `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000`.
2. Chờ 4 request API trả về mã lỗi `404 Not Found` và quan sát thông báo Toast cùng giao diện trang chi tiết.

---

## 3. Kết quả mong đợi (Expected Result)
- Hệ thống hiển thị thông báo lỗi `Không tìm thấy trận đấu` (Toast) và vô hiệu hóa các nút điều khiển phát video.
- Đồng thời, sau khi API đã trả về `404 Not Found` (kết thúc trạng thái loading), tiêu đề trang và vùng trình phát video cần chuyển sang trạng thái lỗi/rỗng rõ ràng (ví dụ: `"Không tìm thấy trận đấu"` hoặc `"Dữ liệu trận đấu không tồn tại"`), không giữ mãi chữ `"Đang tải..."`.

---

## 4. Kết quả thực tế (Actual Result)
- **Phần đạt yêu cầu (PASS `02-04-03`)**:
  - 4 request API trả về `404 Not Found` và hiển thị đầy đủ 4 Toast thông báo lỗi (`uid=64_64..64_75`):
    - `"Không tìm thấy trận đấu"`
    - `"Không tìm thấy danh sách sự kiện của trận đấu"`
    - `"Không tìm thấy danh sách đoạn cắt của trận đấu"`
    - `"Không tìm thấy thông tin luồng phát"`
  - Các nút điều khiển player (`Phát tất cả`, `Tua lùi 10 giây`, `Phát`, `Tua tiến 10 giây`) đều bị `disabled` (`uid=64_18..64_26`).
- **Phần lỗi UX còn tái hiện (`BUG-02-02`)**:
  - Tiêu đề trang (`uid=64_4`) vẫn giữ nguyên chuỗi `"Đang tải..."`.
  - Overlay giữa khung trình phát video (`uid=64_30`) vẫn hiển thị `"Đang tải video..."` dù quá trình gọi API đã kết thúc với mã lỗi 404.

---

## 5. Tần suất & Bằng chứng kỹ thuật
- **Tần suất**: 100% (5/5 lần thử).
- **Bằng chứng Network & Snapshot (`run-115830`)**:
  - Snapshot `uid=64_4`: `StaticText "Đang tải..."`
  - Snapshot `uid=64_30`: `StaticText "Đang tải video..."`
  - Snapshot `uid=64_64..64_75`: 4 Toast `Không tìm thấy trận đấu` / `luồng phát` / `sự kiện` / `đoạn cắt`.
- **Ghi chú về ảnh chụp màn hình**: Công cụ MCP `take_screenshot` trả về `Error: Access denied: path "..." is not within any of the configured workspace roots.` nên chưa lưu được file ảnh trực tiếp vào thư mục báo cáo.

---

## 6. Hướng dẫn ngắn để Tester quay Jam (20 giây)
1. Bật tiện ích **Jam** (chế độ quay Tab + bật DevTools Network nếu cần).
2. Dán URL `https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000` vào thanh địa chỉ và nhấn `Enter`.
3. Chờ 2–3 giây cho 4 Toast báo lỗi màu đỏ hiện lên ở góc màn hình.
4. Di chuột chỉ vào tiêu đề góc trên bên trái vẫn đang ghi **"Đang tải..."** và giữa khung video vẫn ghi **"Đang tải video..."**, sau đó dừng quay Jam.

---

## 7. Nội dung copy nhanh sang Notion cho Dev

```markdown
### [BUG-02-02] [Sport Highlight] Trang chi tiết trận đấu giữ chữ "Đang tải..." và "Đang tải video..." sau khi API trả về 404 Not Found
- **Mức độ**: Low / P3 (UX)
- **URL**: https://sport-highlight.cmcati.vn/matches/00000000-0000-0000-0000-000000000000
- **Mô tả**: Khi mở một UUID trận đấu không tồn tại, các API chi tiết trận đấu trả về `404 Not Found` và UI đã hiện đúng 4 Toast báo lỗi ("Không tìm thấy trận đấu"...), khóa các nút phát. Tuy nhiên state loading của tiêu đề trận đấu và khung video không được tắt khi vào nhánh `catch/error`, khiến UI treo chữ `"Đang tải..."` ở header và `"Đang tải video..."` ở giữa khung player.
- **Kỳ vọng**: Khi API lấy thông tin trận đấu trả về `404`, tắt trạng thái loading và hiển thị trạng thái lỗi `"Không tìm thấy trận đấu"` (hoặc nút quay về `/matches`).
```

