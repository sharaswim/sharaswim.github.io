// Rebuild the attendance portal from the preserved original bundle.
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
function once(s,a,b){if(s.split(a).length!==2)throw Error('Source marker changed; review before rebuilding.');return s.replace(a,b);}
let code=fs.readFileSync(path.join(root,'assets/index-termfix-v1.js'),'utf8');
code=once(code,"откако пријавата ќе биде одобрена од клубот.`})]})]},e.registrationId)","откако пријавата ќе биде одобрена од клубот.`})]}),(0,D.jsx)(SharaAttendanceV1,{attendance:e.attendance})]},e.registrationId)");
code=once(code,"e.paymentMonths!==9&&(0,D.jsxs)(`p`,{className:`absence-policy`,children:[(0,D.jsx)(Vv,{}),(0,D.jsx)(`span`,{children:e.absencePolicy||`Месечно имате право на 1 оправдано отсуство. Оправданиот час се префрла, а секое следно отсуство се смета како реализиран час.`})]}),",'');
code+='\n'+fs.readFileSync(path.join(__dirname,'attendance-component.js'),'utf8');
new vm.Script(code);fs.writeFileSync(path.join(root,'assets/index-attendance-v1.js'),code);
const file=path.join(root,'index.html');let html=fs.readFileSync(file,'utf8');if(html.includes('/assets/index-termfix-v1.js'))html=once(html,'/assets/index-termfix-v1.js','/assets/index-attendance-v1.js');else if(!html.includes('/assets/index-attendance-v1.js'))throw Error('Unknown entry bundle.');fs.writeFileSync(file,html);
