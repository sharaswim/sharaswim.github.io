(function () {
  const oldSentence =
    'Продолжувањето е потврдено. Месечната членарина ќе се додаде на 1 октомври.';

  function updateText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;

    while ((node = walker.nextNode())) {
      if (String(node.nodeValue || '').includes(oldSentence)) nodes.push(node);
    }

    nodes.forEach(function (textNode) {
      const card = textNode.parentElement &&
        textNode.parentElement.closest('.membership-card, article, section');
      const match = String(card && card.textContent || '').match(/Одлука за\s+([^:]+):/);

      textNode.nodeValue = match && match[1]
        ? 'Продолжувањето е потврдено. Членарината за ' + match[1] +
          ' ќе се додаде на почетокот на тој период.'
        : 'Продолжувањето е потврдено. Членарината ќе се додаде на почетокот на потврдениот период.';
    });
  }

  function start() {
    updateText(document.body);
    new MutationObserver(function () {
      updateText(document.body);
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
