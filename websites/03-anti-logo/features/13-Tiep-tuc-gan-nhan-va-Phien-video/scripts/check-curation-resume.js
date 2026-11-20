// Script kiểm tra tính năng Curation Resume & Video Session Quick View (03-13)
(() => {
  const resumeDiv = document.querySelector('[data-curation-resume]');
  const quickView = document.querySelector('[data-curation-quick-view]');
  const select = quickView?.querySelector('select');
  const buttons = resumeDiv ? Array.from(resumeDiv.querySelectorAll('button')).map((b, i) => ({
    index: i,
    text: b.innerText.trim(),
    hasClick: typeof b.onclick === 'function' || b.getAttribute('onclick') !== null
  })) : [];

  const sessionOptions = select ? Array.from(select.options).map(o => ({
    text: o.text.trim(),
    value: o.value
  })) : [];

  return {
    feature: '03-13-Curation-Resume-Quick-View',
    url: window.location.href,
    resumeBar: {
      present: Boolean(resumeDiv),
      text: resumeDiv?.childNodes[0]?.nodeValue?.trim() || '',
      buttons
    },
    quickView: {
      present: Boolean(quickView),
      optionsCount: sessionOptions.length,
      options: sessionOptions
    }
  };
})();

