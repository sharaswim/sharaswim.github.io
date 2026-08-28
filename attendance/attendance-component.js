// Additive React component for the existing compiled Shara Swim portal.
// b and D are the existing React/hooks and JSX runtime in index-termfix-v1.js.
function SharaAttendanceV1({attendance:att}) {
  const initial=att&&att.today?att.today.slice(0,7):'2026-09';
  const [chosen,setChosen]=b.useState(initial<'2026-09'?'2026-09':initial>'2027-05'?'2027-05':initial);
  if(!att||!att.available)return null;
  const h=D.jsx,hs=D.jsxs,m=att.months.find(x=>x.month===chosen)||att.months[0];if(!m)return null;
  const label=x=>new Intl.DateTimeFormat('mk-MK',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(x+'-01T12:00:00Z'));
  const colors={present:'#096642',absent:'#a02626',excused:'#805000',unmarked:'#52647a',planned:'#52647a',cancelled:'#52647a'};
  return hs('section',{'aria-label':'Присуство по месеци',className:'shara-attendance-v1',style:{marginTop:'18px',borderTop:'1px solid #dbe5f0',paddingTop:'16px'},children:[
    h('h4',{children:'Присуство по месеци'}),
    h('select',{'aria-label':'Избери месец за присуство',value:m.month,onChange:event=>setChosen(event.target.value),style:{width:'100%',minHeight:'44px',border:'1px solid #cbd8e7',borderRadius:'9px',padding:'8px',background:'#fff',color:'#0b2a5b'},children:att.months.map(x=>h('option',{value:x.month,children:label(x.month)},x.month))}),
    hs('p',{style:{lineHeight:1.8},children:['Присутен: ',h('strong',{children:m.counts.present}),' · Отсутен: ',h('strong',{children:m.counts.absent}),h('br',{}),'Оправдано отсуство: ',h('strong',{children:m.excusedUsed+'/1'}),' · Неевидентирани: ',m.counts.unmarked]}),
    h('div',{style:{maxHeight:'400px',overflow:'auto'},children:m.rows.length?h('ul',{style:{listStyle:'none',padding:0,margin:0},children:m.rows.map(r=>hs('li',{style:{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #e6edf5'},children:[hs('span',{children:[r.date.slice(8,10)+'.'+r.date.slice(5,7)+'.'+r.date.slice(0,4),h('br',{}),h('small',{children:r.term})]}),h('strong',{style:{color:colors[r.status]||'#52647a',fontSize:'13px'},children:r.label})]},r.date+'|'+r.groupId))}):h('p',{children:'Нема закажани тренинзи за овој месец.'})}),
    h('p',{style:{fontSize:'12px',lineHeight:1.6,color:'#52647a'},children:att.policy}),
    h('small',{children:'Неевидентирано значи дека клубот сè уште не го означил присуството, не дека детето отсуствувало.'})
  ]});
}
