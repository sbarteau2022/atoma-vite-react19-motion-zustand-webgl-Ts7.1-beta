export function readAccountToken(){
  const token=new URLSearchParams(window.location.hash.slice(1)).get("token")||"";
  // StrictMode invokes state initializers twice. Clear on the next task so both
  // initializers receive the same value, without persisting the bearer secret.
  if(window.location.hash)queueMicrotask(()=>window.history.replaceState(null,"",window.location.pathname+window.location.search));
  return /^[a-f0-9]{64}$/.test(token)?token:"";
}
export async function requestAccountAction(path:string,data:Record<string,unknown>){
  const response=await fetch(`/api/${path}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data),signal:AbortSignal.timeout(30000)});
  const result=await response.json();
  if(!response.ok)throw Error(result.error||"Unable to complete this request. Try again.");
  return result;
}
