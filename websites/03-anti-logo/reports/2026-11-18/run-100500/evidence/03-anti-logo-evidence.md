# Bằng chứng kiểm thử Website 03 — Anti-Logo (`run-100500`)

- **Run_ID:** `run-100500`
- **Ngày giờ:** `2026-11-18T10:05:00+07:00` (Asia/Ho_Chi_Minh)
- **URL gốc:** `https://anti-logo.cmcati.vn/`
- **Công cụ:** `chrome-devtools` MCP

---

## 1. Dữ liệu Snapshot Thanh Tiếp tục Gán nhãn (`03-13`)
```json
{
  "hasResumeBar": true,
  "resumeBarText": "CH1 — Tiếp tục gán nhãn — Frame #52440 — Đã lưu lúc 10:01:40 AM",
  "buttons": [
    "Tiếp tục",
    "Frame chỉnh sửa cuối",
    "Đã review",
    "Chưa review đầu tiên"
  ],
  "hasQuickView": true,
  "optionsCount": 6
}
```

## 2. Dữ liệu Công cụ OBB / SAM / VLM (`03-14`)
```json
{
  "layout": { "hasToggle": true, "currentReviewMode": "compact" },
  "dataManagement": {
    "hasChangedFramesBtn": true,
    "changedFramesText": "Changed frames (7)",
    "hasExportBtn": true,
    "exportBtnText": "Export to Server (7)"
  },
  "obbTools": {
    "hasRotLeft": true,
    "hasRotRight": true,
    "hasAngleReset": true,
    "hasConvertObb": true,
    "hasRotateMode": true,
    "hasAngleInput": true
  },
  "aiTools": {
    "hasThumbVlmBtn": true,
    "thumbVlmText": "🤖 Auto VLM + SAM BBox",
    "hasBboxVlmBtn": true,
    "bboxVlmText": "🤖 Auto VLM + SAM",
    "hasSamClickMode": true,
    "samClickText": "🎯 Click SAM: TẮT"
  }
}
```

