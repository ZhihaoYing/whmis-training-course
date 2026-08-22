import Link from 'next/link';
import {modules} from '../lib/course';
export default function CourseShell({slug,children}:{slug:string;children:React.ReactNode}){
 const idx=modules.findIndex(m=>m.slug===slug); const pct=Math.round(((idx+1)/modules.length)*100);
 return <div className="page-shell"><div className="topbar"><div className="brand"><span className="brand-mark">W</span><span>WHMIS 2015 & SDS Training</span></div><div className="top-meta"><span>{idx>=0?`${idx+1} / ${modules.length}`:''}</span><div className="progress-mini"><span style={{width:`${pct}%`}}/></div></div></div><div className="layout"><aside className="sidebar"><div className="side-title">Course modules</div><nav className="nav-list">{modules.map(m=><Link key={m.slug} href={`/course/${m.slug}`} className={`nav-item ${m.slug===slug?'active':''}`}><span className="nav-dot"/><span><b>{m.label}</b><br/>{m.title}</span></Link>)}<Link href="/course/final-assessment" className={`nav-item ${slug==='final-assessment'?'active':''}`}><span className="nav-dot"/><span><b>Final</b><br/>Final Assessment</span></Link></nav></aside><main className="main">{children}</main></div></div>
}
