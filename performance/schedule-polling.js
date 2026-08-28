// Read-only availability refresh. No membership balances or personal data cache.
function SharaSchedulePollV1(url,month,onTerms){
  let active=true,inFlight=false,lastStarted=-Infinity,controller=null;
  async function refresh(){
    if(!active||document.visibilityState!=='visible'||inFlight||Date.now()-lastStarted<15000)return;
    inFlight=true;lastStarted=Date.now();controller=new AbortController();
    const requestController=controller,timeout=window.setTimeout(()=>requestController.abort(),30000);
    try{
      const response=await fetch(`${url}?startMonth=${encodeURIComponent(month)}&timestamp=${Date.now()}`,{cache:'no-store',signal:requestController.signal});
      if(!response.ok)throw Error('Availability request failed');
      const result=await response.json();
      if(active&&result?.success&&Array.isArray(result.terms))onTerms(result.terms);
    }catch(error){
      // Preserve the last displayed availability; the server validates each
      // registration, and the next visible refresh can try again.
    }finally{window.clearTimeout(timeout);inFlight=false;if(controller===requestController)controller=null;}
  }
  refresh();const interval=window.setInterval(refresh,60000);
  window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',refresh);
  return function(){active=false;window.clearInterval(interval);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);if(controller)controller.abort();};
}
