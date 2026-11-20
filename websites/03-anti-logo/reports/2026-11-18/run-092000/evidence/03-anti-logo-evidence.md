# Bằng chứng kiểm thử Website 03 — Anti-Logo (`run-092000`)

- **Run_ID:** `run-092000`
- **Ngày giờ thực thi:** `2026-11-18T09:20:00+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://anti-logo.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Dữ liệu Snapshot Thanh Tiếp tục Gán nhãn (`03-13`)
```json
{
  "hasResumeBar": true,
  "resumeBarText": "CH1 — Tiếp tục gán nhãn — Frame #52320 — Đã lưu lúc 9:11:07 AM",
  "buttons": [
    "Tiếp tục",
    "Frame chỉnh sửa cuối",
    "Đã review",
    "Chưa review đầu tiên"
  ],
  "hasQuickView": true,
  "optionsCount": 6,
  "options": [
    { "text": "Chọn phiên", "value": "" },
    { "text": "FULL MATCH ATALANTA vs BAYERN MUNICH ... — gen 5 — LIVE", "value": "..." },
    { "text": "FULL MATCH ATALANTA vs BAYERN MUNICH ... — gen 4 — STOPPED", "value": "..." }
  ]
}
```

## 2. Dữ liệu Modal Review & Bộ Công Cụ OBB / SAM / VLM (`03-14`)
```json
{
  "modalOpened": true,
  "title": "Frame #52320",
  "status": "23 BBox — Click box để chọn/kéo/resize hoặc bật \"➕ Vẽ Box mới\"",
  "vlmBtn": {
    "present": true,
    "text": "🤖 Auto VLM + SAM BBox",
    "title": "1-Click chạy VLM + MobileSAM + YOLO OBB tự động phát hiện & cập nhật BBox"
  },
  "bboxVlmBtn": {
    "present": true,
    "text": "🤖 Auto VLM + SAM",
    "title": "Chạy tự động pipeline VLM + MobileSAM + YOLO OBB và cập nhật BBox cho tester"
  },
  "obbControls": {
    "rotLeft": true,
    "rotRight": true,
    "angleReset": true,
    "convertObb": true,
    "rotateMode": true,
    "angleInputValue": "-9.6"
  },
  "samClickMode": { "present": true, "text": "🎯 Click SAM: TẮT" },
  "historyControls": { "undo": true, "redo": true },
  "helpButton": true,
  "closeButton": true
}
```

## 3. Trạng Thái Hoạt Động Các Kênh SDI
- **Channel 01:** `state: "IDLE"`
- **Channel 02:** `state: "LIVE"`, `video: "virtual-sdi-THETHAO_TINTUC_HD"`, `frames_written: 25749463`, `1920x1080 @ 50 FPS`
- **Channel 03:** `state: "LIVE"`, `video: "virtual-sdi-HAY_TV"`, `frames_written: 25749407`, `1920x1080 @ 50 FPS`
- **API Response State:** HTTP 200 OK

