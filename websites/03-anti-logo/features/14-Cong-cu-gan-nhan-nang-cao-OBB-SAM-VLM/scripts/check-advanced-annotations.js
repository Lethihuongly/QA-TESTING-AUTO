// Script kiểm tra công cụ gán nhãn nâng cao OBB, SAM, VLM & Export (03-14)
(() => {
  const toggle = document.getElementById('singleLargeReviewToggle');
  const changedBtn = document.getElementById('changedFramesBtn');
  const exportBtn = document.getElementById('exportReportedZipBtn');

  const vlmBtn = document.getElementById('thumbModeVlmBtn');
  const bboxVlmBtn = document.getElementById('bboxVlmInferBtn');
  const rotLeft = document.getElementById('bboxRotateLeft');
  const rotRight = document.getElementById('bboxRotateRight');
  const angleReset = document.getElementById('bboxAngleReset');
  const convertObb = document.getElementById('bboxConvertObb');
  const rotateMode = document.getElementById('bboxRotateMode');
  const angleInput = document.getElementById('bboxAngleInput');
  const samClickMode = document.getElementById('bboxSamClickMode');
  const undo = document.getElementById('bboxUndo');
  const redo = document.getElementById('bboxRedo');
  const help = document.getElementById('bboxShortcutHelp');

  return {
    feature: '03-14-Advanced-Annotation-Tools',
    layout: {
      hasToggle: Boolean(toggle),
      currentReviewMode: document.body.dataset.pcdReview || 'compact'
    },
    dataManagement: {
      hasChangedFramesBtn: Boolean(changedBtn),
      changedFramesText: changedBtn?.innerText.trim() || '',
      hasExportBtn: Boolean(exportBtn),
      exportBtnText: exportBtn?.innerText.trim() || ''
    },
    obbTools: {
      hasRotLeft: Boolean(rotLeft),
      hasRotRight: Boolean(rotRight),
      hasAngleReset: Boolean(angleReset),
      hasConvertObb: Boolean(convertObb),
      hasRotateMode: Boolean(rotateMode),
      hasAngleInput: Boolean(angleInput),
      currentAngleValue: angleInput?.value || ''
    },
    aiTools: {
      hasThumbVlmBtn: Boolean(vlmBtn),
      thumbVlmText: vlmBtn?.innerText.trim() || '',
      hasBboxVlmBtn: Boolean(bboxVlmBtn),
      bboxVlmText: bboxVlmBtn?.innerText.trim() || '',
      hasSamClickMode: Boolean(samClickMode),
      samClickText: samClickMode?.innerText.trim() || ''
    },
    historyAndHelp: {
      hasUndo: Boolean(undo),
      hasRedo: Boolean(redo),
      hasShortcutHelp: Boolean(help)
    }
  };
})();

