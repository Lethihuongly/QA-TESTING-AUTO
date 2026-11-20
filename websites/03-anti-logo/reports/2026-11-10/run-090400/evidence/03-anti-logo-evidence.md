# Bằng chứng Kiểm thử Thực tế — Website 03: Anti-Logo (`2026-11-10/run-090400`)

> **Lưu ý về ảnh chụp màn hình (`screenshots/`):** Lời gọi `take_screenshot` của `chrome-devtools` MCP trả lỗi nguyên văn:
> `Error: Access denied: path "..." is not within any of the configured workspace roots.`
> Toàn bộ bằng chứng DOM Snapshot, API JSON, kết quả chạy `check-sdi-inputs.js` và `check-video-lag.js` (đã loại bỏ thông tin nhạy cảm) được lưu đầy đủ dưới đây.

---

## 1. Kết quả kiểm tra Feature 12 (`check-sdi-inputs.js` + Giải quyết URL tương đối + Frame 0 của 11 file Videos)
- **Thời điểm:** `2026-11-10T02:59:32.901Z` (`09:59:32 +07:00`)
- **`videosSummary` (`/v2/api/videos` & `/v2/api/video_frame_preview`):**
  - `apiHttpStatus: 200`, `videoDir: "/home/ttdat/pcd-4090-v3-staging/runtime/videos"`, `videoDirExists: true`
  - `totalOptionsInUi: 11`, `uniqueValuesInUi: 11`, `defaultVideosDisabled: true`
  - `probedCount: 11`, `decodablePassCount: 11`, `decodableFailCount: 0` (`image/jpeg`, `5493–13669 bytes`, `32–220 ms`).
  - Danh sách 11 file trong `#defaultVideos`:
    1. `FULL MATCH ATALANTA vs BAYERN MUNICH Hum Xem mo hoi tren dat Italia Champions League 25 26 [Im3kja-TGog]_part_001.mp4` (`200`, `5509 B`, `187 ms`)
    2. `FULL MATCH [4K] NAPOLI vs FRANKFURT McTominay gong ganh tuyen giua khi vang De Bruyne UCL 25 26 [EHMSFwTFWxo]_part_001.mp4` (`200`, `5493 B`, `199 ms`)
    3. `Full 4K LEVERKUSEN vs PSG Qua Bong Vang Dembele pho dien tai nang UCL 25 26 [rjgd_BHnK-A]_part_001.mp4` (`200`, `5497 B`, `220 ms`)
    4. `atalanta_bayern_450_525_75s_verify.mp4` (`200`, `13632 B`, `115 ms`)
    5. `cmc-13375c99b9e398ad3a58-ASTON_VILLA_vs_BAYERN_MUNICH_-_Th_m_n_h_a_th_nh_c_n_c_m_ng_c_a_Harry_Kane_-_UCL_24-25_GOUnLoVJl1w_.mp4` (`200`, `5549 B`, `216 ms`)
    6. `cmc-43e19b344ea714cdfb81-LYON_vs_PSG_Highlight_fbIrelvQ2E8_.mp4` (`200`)
    7. `cmc-5f8c064b681097cc1373-LYON_vs_METZ_Highlight_Ligue_1_rkpWWTgW4YY_.mp4` (`200`)
    8. `cmc-e8813d2253211614d3fa-ARSENAL_vs_ATLETICO_MADRID_Highlight_OmhxyeMXBrw_.mp4` (`200`)
    9. `pcd-p0-crypto-source-880s-35s.mp4` (`200`, `11633 B`, `68 ms`)
    10. `pcd-p0-crypto-source-cfr34.mp4` (`200`, `11633 B`, `32 ms`)
    11. `pcd-pan-investigation-aston-84s.mp4` (`200`, `13669 B`, `57 ms`)
- **Trạng thái 6 mục trong `/v2/api/sdi_inputs` (phân biệt `ACTIVE_PLAYING` và `READY_LOCKED_BY_ACTIVE_STREAM`):**
  1. `sdi_channel:1` (`virtual-sdi-BONGDA_HD`): `ACTIVE_PLAYING` trên Channel 1 (`HTTP 200`, master `/v2/api/hls/vtv-pcd-virtual-sdi-BONGDA_HD-6d0e7e0d/index.m3u8` → variant `video1_stream.m3u8`, `seq=85713`, `60` segment).
  2. `sdi_channel:2` (`virtual-sdi-THETHAO_TINTUC_HD`): `ACTIVE_PLAYING` trên Channel 2 (`HTTP 200`, master `/v2/api/hls/vtv-pcd-virtual-sdi-THETHAO_TINTUC_HD-7d9e28ff/index.m3u8` → variant `video1_stream.m3u8`, `seq=85723`, `60` segment).
  3. `sdi_channel:3` (`virtual-sdi-HAY_TV`): `ACTIVE_PLAYING` trên Channel 3 (`HTTP 200`, master `/v2/api/hls/vtv-pcd-virtual-sdi-HAY_TV-5757be76/index.m3u8` → variant `video1_stream.m3u8`, `seq=85717`, `60` segment).
  4. `virtual_sdi:BONGDA_HD`: `READY_LOCKED_BY_ACTIVE_STREAM` (`apiStatus="READY"`, `uiDisabled=true`).
  5. `virtual_sdi:THETHAO_TINTUC_HD`: `READY_LOCKED_BY_ACTIVE_STREAM` (`apiStatus="READY"`, `uiDisabled=true`).
  6. `virtual_sdi:HAY_TV`: `READY_LOCKED_BY_ACTIVE_STREAM` (`apiStatus="READY"`, `uiDisabled=true`).

## 2. Bằng chứng Console Messages
- `msgid=27 [issue] A form field element should have an id or name attribute (count: 28)`
- `msgid=28 [issue] No label associated with a form field (count: 18)`
- **0 lỗi JavaScript runtime hay network 4xx/5xx.**

