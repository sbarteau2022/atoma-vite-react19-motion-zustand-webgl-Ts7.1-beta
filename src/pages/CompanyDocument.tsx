import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {companyDocuments} from '../content/companyDocuments';
import dependencies from '../content/dependencyInventory.json';

function StatusCheck(){
 const [busy,setBusy]=useState(false),[result,setResult]=useState<{health:string;email:string;checked:string}|null>(null);
 async function check(){
  if(busy)return;setBusy(true);
  const read=async(path:string)=>{const response=await fetch(path,{cache:'no-store',signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('Unavailable');return response.json()};
  try{
   const [health,email]=await Promise.allSettled([read('/api/health'),read('/api/auth-status')]);
   setResult({health:health.status==='fulfilled'&&health.value?.ok===true&&health.value.profiles===true&&health.value.research===true?`Both databases reachable · AI binding ${health.value.ai===true?'present':'absent'}`:'Health check unavailable or incomplete',email:email.status==='fulfilled'&&typeof email.value?.emailAvailable==='boolean'?`Account email configuration ${email.value?.emailAvailable?'present':'unavailable'}`:'Email configuration check unavailable',checked:new Date().toLocaleString()});
  }finally{setBusy(false)}
 }
 return <section className="notice-status panel" aria-labelledby="live-check"><h2 id="live-check">Check the website now</h2><p>This sends two read-only requests. It does not invoke AI or send email.</p><button className="btn btn-white" disabled={busy} onClick={check}>{busy?'Checking…':'Run live check ↗'}</button><div role="status" aria-live="polite">{result&&<><p>{result.health}</p><p>{result.email}</p><small>Checked in your local time: {result.checked}</small></>}</div></section>;
}
function NoticeLink({href,children}:{href:string;children:React.ReactNode}){
 return href.startsWith('/')&&!href.startsWith('/api/')?<Link to={href}>{children}</Link>:<a href={href} {...(href.startsWith('https:')?{target:'_blank',rel:'noreferrer'}:{})}>{children}</a>;
}
export default function CompanyDocument(){
 const {pathname}=useLocation();
 const document=companyDocuments.find(item=>item.path===pathname)!;
 useEffect(()=>{const previous=window.document.title;window.document.title=`${document.label} · Atoma Engineering Labs`;window.scrollTo(0,0);return()=>{window.document.title=previous}},[document]);
 return <article className="company-document">
  <header className="page-head"><div className="micro">{document.category.toUpperCase()}</div><h1>{document.title}</h1><p className="lede">{document.summary}</p><div className="notice-meta"><span>Published draft</span><time dateTime="2026-10-24">Updated October 24, 2026</time></div></header>
  <div className="notice-layout"><aside className="notice-nav" aria-label="On this page"><span className="micro">ON THIS PAGE</span><nav>{document.sections.map(section=><a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav><Link to="/contact">Ask the builder ↗</Link></aside>
   <div className="notice-body">{document.sections.map(section=><section className="notice-section" key={section.id} id={section.id}><h2>{section.title}</h2>{section.paragraphs.map(text=><p key={text}>{text}</p>)}{section.links&&<ul className="notice-links">{section.links.map(link=><li key={link.href}><NoticeLink href={link.href}>{link.label} ↗</NoticeLink></li>)}</ul>}</section>)}
   {pathname==='/status'&&<StatusCheck/>}
   {pathname==='/sources'&&<section className="notice-section" aria-labelledby="packages"><h2 id="packages">Package notices</h2><div className="notice-table-wrap" tabIndex={0} role="region" aria-label="Direct dependency notices; scroll horizontally on small screens"><table className="notice-table"><thead><tr><th scope="col">Package</th><th scope="col">Version</th><th scope="col">License</th><th scope="col">Use</th></tr></thead><tbody>{dependencies.map(item=><tr key={item.name}><th scope="row"><a href={item.url} target="_blank" rel="noreferrer">{item.name}</a></th><td>{item.version}</td><td>{item.license}</td><td>{item.usage}</td></tr>)}</tbody></table></div></section>}
   <section className="notice-contact panel"><div className="micro">QUESTIONS & CORRECTIONS</div><h2>A direct line to the builder.</h2><p>These published drafts describe the current website and will be refined as the project develops. Contact Stewart Barteau about corrections, requests or unclear wording.</p><a href="mailto:sbarteau2022@gmail.com">sbarteau2022@gmail.com ↗</a><nav aria-label="Related notices"><Link to="/privacy">Privacy</Link><Link to="/disclosures">Disclosures</Link><Link to="/terms">Terms</Link><Link to="/security">Security</Link></nav></section>
   </div></div>
 </article>;
}
