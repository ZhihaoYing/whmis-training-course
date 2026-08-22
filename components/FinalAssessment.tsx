'use client';
import {useMemo,useState} from 'react';
const bank=[
['What does WHMIS help communicate?',['Hazardous product safety information','Payroll information','Scheduling','Building permits'],0],
['Which SDS section covers first aid?',['2','4','7','8'],1],
['Which SDS section covers PPE/exposure controls?',['4','5','6','8'],3],
['Which pictogram is associated with fire hazards?',['Flame','Gas Cylinder','Biohazard','Corrosion'],0],
['What should you check before using a hazardous product?',['Label and applicable procedures','Container colour only','What a coworker remembers','Nothing'],0],
['Where is spill information commonly found in an SDS?',['Section 3','Section 6','Section 10','Section 16'],1],
['Where is handling and storage information found?',['Section 7','Section 2','Section 4','Section 11'],0],
['Who should participate in WHMIS education and training?',['Workers who may work with hazardous products','Visitors only','Suppliers only','No one'],0],
['What should you do if a label is missing or damaged?',['Report it and follow workplace procedures','Guess the product','Ignore it','Use smell to identify it'],0],
['What does a hazard statement describe?',['Nature of the hazard','Supplier address only','Price','Course score'],0],
['What is a signal word used for?',['Communicating relative hazard severity','Showing expiry date','Showing product colour','Showing employee name'],0],
['What should PPE selection be based on?',['Product, task, exposure, SDS and procedures','One universal PPE set','Colour preference','Weather only'],0],
['What is a safe first approach to a spill?',['Protect yourself and follow spill procedures','Touch it','Rush to clean it','Ignore it'],0],
['Which source gives detailed product safety information?',['SDS','Time sheet','Invoice','Work schedule'],0],
['Which source gives quick hazard information on the container?',['Label','Payroll slip','Calendar','Receipt'],0],
['Which pictogram can indicate acute toxicity?',['Skull and Crossbones','Gas Cylinder','Flame Over Circle','Biohazard only'],0],
['What should you do before storing a hazardous product?',['Check label, SDS and procedures','Use any empty shelf','Choose by container size','Copy another shelf'],0],
['Who is responsible for making SDSs accessible in the workplace?',['Employer','Customer','Neighbour','Visitor'],0],
['What should workers do with workplace procedures?',['Follow them','Ignore them','Replace them with memory','Use only when convenient'],0],
['What is the main goal of WHMIS training?',['Support safe use of hazardous products','Teach chemistry experiments','Replace all workplace procedures','Remove labels'],0],
['Where is fire-fighting information found in an SDS?',['Section 5','Section 8','Section 12','Section 15'],0],
['What is the best response if you need more detailed product information?',['Check the SDS','Guess','Ask social media','Use the container colour'],0],
['Which action supports safe work?',['Report hazards and incidents appropriately','Ignore damaged labels','Use unknown chemicals','Skip procedures'],0],
['What does a pictogram do?',['Provides a quick visual signal of a hazard type','Shows price','Shows employee ID','Shows shift time'],0]
] as const;
export default function FinalAssessment(){const questions=useMemo(()=>[...bank].sort(()=>Math.random()-.5).slice(0,20),[]); const [ans,setAns]=useState<Record<number,number>>({}),[done,setDone]=useState(false); const score=questions.reduce((n,q,i)=>n+(ans[i]===q[2]?1:0),0); if(done){const pct=Math.round(score/20*100),pass=pct>=80;return <div className="quiz"><div className="eyebrow">Final result</div><h1>{pass?'Assessment Passed':'Assessment Not Passed'}</h1><p className="lead">Score: {pct}%</p><div className={`feedback ${pass?'ok':'bad'}`}>{pass?'You met the 80% passing requirement. A production system would now record completion and issue a certificate.':'Review the course material and try again.'}</div></div>}return <div><div className="hero-card"><div className="eyebrow">Final Assessment</div><h1>20 Questions</h1><p className="lead">Answer all questions. A score of 80% or higher is required to pass.</p></div>{questions.map((q,i)=><div className="quiz section" key={i}><div className="quiz-kicker">Question {i+1} of 20</div><div className="question">{q[0]}</div>{q[1].map((o,j)=><label className="option" key={o}><input type="radio" name={`f${i}`} checked={ans[i]===j} onChange={()=>setAns(a=>({...a,[i]:j}))}/><span>{o}</span></label>)}</div>)}<div className="bottom-nav"><button className="btn btn-primary" disabled={Object.keys(ans).length<20} onClick={()=>setDone(true)}>Submit Final Assessment</button></div></div>}
