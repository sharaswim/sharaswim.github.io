(function(){
  const oldText='Месечната членарина ќе се додаде на 1 октомври.';
  const fallback='Членарината ќе се додаде на почетокот на потврдениот период.';

  function replaceText(root){
    if(!root||typeof document==='undefined')return;

    const walker=document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT
    );

    const nodes=[];
    let node;

    while((node=walker.nextNode())){
      if(String(node.nodeValue||'').includes(oldText)){
        nodes.push(node);
      }
    }

    nodes.forEach(function(textNode){
      const scope=textNode.parentElement &&
        textNode.parentElement.closest('.membership-card,article,section');

      const match=scope &&
        String(scope.textContent||'').match(/Одлука за\s+([^:]+):/);

      const message=match&&match[1]
        ? 'Членарината за '+match[1]+' ќе се додаде на почетокот на тој период.'
        : fallback;

      textNode.nodeValue=String(textNode.nodeValue)
        .replace(oldText,message);
    });
  }

  function start(){
    if(!document.body)return;

    replaceText(document.body);

    new MutationObserver(function(){
      replaceText(document.body);
    }).observe(document.body,{
      childList:true,
      subtree:true
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  }else{
    start();
  }
})();
