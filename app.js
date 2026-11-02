const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// lluvia
const cv=$('#rain'),cx=cv.getContext('2d');let drops=[],RI=.5;
function rs(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;drops=Array.from({length:Math.min(260,cv.width/4)*RI*1.2},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,l:10+Math.random()*14,v:6+Math.random()*7}))}
rs();addEventListener('resize',rs);
(function f(){cx.clearRect(0,0,cv.width,cv.height);cx.strokeStyle='rgba(190,225,245,.5)';cx.lineWidth=1.2;cx.beginPath();
for(const d of drops){cx.moveTo(d.x,d.y);cx.lineTo(d.x-2,d.y+d.l);d.y+=d.v;if(d.y>cv.height){d.y=-20;d.x=Math.random()*cv.width}}cx.stroke();requestAnimationFrame(f)})();
// contadores
$$('[data-n]').forEach(e=>{let n=+e.dataset.n,i=0;const t=setInterval(()=>{e.textContent=++i;if(i>=n)clearInterval(t)},250)});
// sonido
let ac,src,on=false;
$('#snd').onclick=()=>{try{if(!ac){ac=new AudioContext();const b=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;src=ac.createBufferSource();src.buffer=b;src.loop=true;const f=ac.createBiquadFilter();f.type='bandpass';f.frequency.value=3000;const g=window.gn=ac.createGain();g.gain.value=.24*RI;src.connect(f);f.connect(g);g.connect(ac.destination);src.start()}
on=!on;on?ac.resume():ac.suspend();$('#snd').textContent=on?'Lluvia: sí':'Lluvia: no'}catch(e){}};
// aparición + logros
const seen=new Set(),io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');seen.add(e.target.id);if(seen.size>=3)$('#b1').classList.add('got')}}),{threshold:.15});
$$('.fade').forEach(e=>io.observe(e));
// pestañas
function tabs(id,fn){$$('#'+id+' button').forEach(b=>b.onclick=()=>{$$('#'+id+' button').forEach(x=>x.classList.remove('on'));b.classList.add('on');fn(b)})}
tabs('gh',b=>$('#ght').textContent=b.dataset.t);
// mapa
const R={p:['Región Pacífica','Más seca: unos 1,000–2,000 mm al año aprox. Alberga el Corredor Seco y gran parte de la población; sufre sequías y canícula marcada.',35],c:['Región Central','Zonas montañosas con lluvia intermedia y clima más fresco; clave para el café y el frijol; riesgo de deslizamientos.',55],k:['Región Caribe','La más lluviosa del país: varios miles de mm al año aprox., con selvas, ríos grandes y alta exposición a huracanes.',100]};
$$('.reg').forEach(p=>p.onclick=()=>{const r=R[p.dataset.r];$('#reg').innerHTML='<h3>'+r[0]+'</h3><p>'+r[1]+'</p><div class="gauge"><i style="width:'+r[2]+'%"></i></div><small>Lluvia anual relativa</small>';$('#b2').classList.add('got')});
// antes/después
$('#ba').oninput=e=>$('#bat').textContent=e.target.value<50?'Antes: lluvias más predecibles; el inicio de la temporada lluviosa permitía planificar la siembra.':'Ahora: inicios tardíos, canículas más largas y aguaceros más fuertes dificultan planificar y dañan cultivos.';
// curiosidades
$('#fun').innerHTML=['Una gota de lluvia tarda unos minutos en caer desde la nube.','Nicaragua tiene costas en dos océanos: Pacífico y Caribe.','El Lago Cocibolca es el mayor lago de Centroamérica.','Un árbol grande puede transpirar cientos de litros de agua al día.','La canícula es una pausa de lluvias en pleno invierno nicaragüense.','El olor de la tierra mojada se llama petricor.','Los residuos orgánicos en vertederos generan metano, un gas que calienta mucho más que el CO₂ a corto plazo.','Un solo plástico atorado en un drenaje puede ayudar a inundar una calle.'].map((t,i)=>'<div class="card"><h3>Dato '+(i+1)+'</h3><p>'+t+'</p></div>').join('');
// avatar
const T=['¿Sabías que las alteraciones en los patrones de lluvia afectan directamente la agricultura?','La protección de los bosques ayuda a regular el ciclo del agua.','Las lluvias extremas son cada vez más frecuentes debido al cambio climático.','El Niño suele traer menos lluvia a Nicaragua; La Niña, más.','Ahorrar agua también es acción climática ','La basura en los drenajes hace que la lluvia inunde las calles.','Separar la basura reduce el metano de los vertederos '];let ti=0;$('#ea').onclick=()=>$('#eb').textContent=T[ti++%T.length];
// quiz
const Q=[['¿Qué gas es el principal responsable del calentamiento global?',['Oxígeno','Dióxido de carbono','Nitrógeno'],1],['¿Qué es el efecto invernadero?',['Gases que retienen calor','Una lluvia fuerte','Un tipo de cultivo'],0],['¿Cuándo es la temporada lluviosa en Nicaragua (aprox.)?',['Nov–abril','Mayo–octubre','Solo en enero'],1],['¿Qué región de Nicaragua recibe más lluvia?',['Caribe','Pacífico','Ninguna'],0],['¿Cómo afecta El Niño a Nicaragua?',['Más inundaciones','Más sequías','Nada'],1],['¿Y La Niña?',['Suele aumentar la lluvia','Elimina la lluvia','Enfría el café'],0],['¿Qué es la canícula?',['Pausa de lluvias en pleno invierno','Un huracán','Un río'],0],['¿Qué cultivo es base de la dieta y es sensible a la sequía?',['Frijol','Plástico','Cemento'],0],['¿Qué ayuda a regular el ciclo del agua?',['Proteger bosques','Quemar bosques','Tapar ríos'],0],['¿Qué huracanes golpearon Nicaragua en 2020?',['Eta e Iota','Mitch y Katrina','Sandy y Ian'],0]];
let qi=0,sc=0;
function showQ(){if(qi>=Q.length){$('#qs').textContent='Quiz terminado';$('#qb').innerHTML='<h3>Puntuación: '+sc+' / '+Q.length+'</h3><p>'+(sc>=20?'¡Excelente, eres experto en clima!':sc>=12?'¡Buen trabajo, sigue aprendiendo!':'Repasa las secciones y vuelve a intentarlo.')+'</p><button onclick="qi=0;sc=0;showQ()">Reintentar</button><p><input id="nm" placeholder="Tu nombre" maxlength="16"> <button class="p" onclick="saveRank()">Guardar en ranking</button></p>';$('#b3').classList.add('got');if(sc>=20)$('#b4').classList.add('got');return}
const q=Q[qi];$('#qs').textContent='Pregunta '+(qi+1)+' de '+Q.length;$('#qb').innerHTML='<h3>'+q[0]+'</h3>'+q[1].map((o,i)=>'<button class="opt" data-i="'+i+'">'+o+'</button>').join('');
$$('.opt').forEach(b=>b.onclick=()=>{const c=+b.dataset.i===q[2];if(c)sc++;$$('.opt').forEach(x=>{x.disabled=true;if(+x.dataset.i===q[2])x.classList.add('ok')});if(!c)b.classList.add('no');$('#qb').insertAdjacentHTML('beforeend','<p>'+(c?'¡Correcto!':'La respuesta correcta está en verde.')+'</p><button class="p" id="nx">Siguiente</button>');$('#nx').onclick=()=>{qi++;showQ()}})}
showQ();

/* ===== v2 interactividad ===== */
const EC=m=>$('#eb').textContent=m;
const toast=m=>{const t=document.createElement('div');t.className='tt';t.textContent=m;$('#toast').append(t);setTimeout(()=>t.remove(),3200)};
new MutationObserver(ms=>ms.forEach(m=>{const e=m.target;if(e.classList.contains('got')&&!e.dataset.t){e.dataset.t=1;toast('Logro: '+e.textContent)}})).observe($('#bd'),{subtree:true,attributes:true,attributeFilter:['class']});
addEventListener('scroll',()=>{const h=document.documentElement;$('#pg').style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+'%'});
// lluvia y tormenta
$('#rint').oninput=e=>{RI=e.target.value/100;rs();if(window.gn)gn.gain.value=.24*RI};
let storm=false;const fl=$('#fl');
$('#lt').onclick=e=>{storm=!storm;e.target.classList.toggle('on',storm);$('.hero').classList.toggle('dark',storm);RI=storm?1:.5;$('#rint').value=RI*100;rs();if(storm)$('#b6').classList.add('got')};
setInterval(()=>{if(!storm)return;fl.classList.add('z');setTimeout(()=>fl.classList.remove('z'),150);setTimeout(()=>{fl.classList.add('z');setTimeout(()=>fl.classList.remove('z'),90)},260)},3500);
$('.hero').addEventListener('click',e=>{if(e.target.closest('button,a,input,label'))return;const r=document.createElement('i'),b=e.currentTarget.getBoundingClientRect();r.className='rip';r.style.left=e.clientX-b.left+'px';r.style.top=e.clientY-b.top+'px';e.currentTarget.append(r);setTimeout(()=>r.remove(),900)});
// ciclo del agua
const vis=new Set();
tabs('wc',b=>{$('#wct').textContent=b.dataset.t;const e=$('#wce');e.innerHTML='<svg class="ic"><use href="#i-'+b.dataset.e+'"/></svg>';e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop');vis.add(b.dataset.e);if(vis.size==4)$('#b7').classList.add('got')});
// simulador
function sim(){const t=+$('#tmp').value;$('#tv').textContent='+'+t.toFixed(1)+' °C';
const v={'Sequías':20+t*22,'Lluvias extremas':15+t*25,'Riesgo para cosechas':15+t*20,'Presión sobre ecosistemas':15+t*22};
$('#sm').innerHTML=Object.entries(v).map(([k,x])=>'<div style="margin-top:10px">'+k+'<div class="gauge"><i style="width:'+Math.min(100,x)+'%"></i></div></div>').join('');
$('#st').textContent=t<1?'Cambios todavía manejables con adaptación.':t<2?'Los extremos se vuelven más frecuentes y las cosechas sufren más.':'Escenario de alto riesgo: sequías e inundaciones severas y graves pérdidas agrícolas.'}
$('#tmp').oninput=sim;sim();
// acciones
const A=['Cerrar la llave mientras me cepillo','Sembrar o cuidar un árbol','Recolectar agua de lluvia','Separar la basura','Apagar luces y equipos','Compartir lo aprendido'];
$('#ak').innerHTML=A.map(a=>'<label class="card ck"><input type="checkbox"> '+a+'</label>').join('');
$$('#ak input').forEach(c=>c.onchange=()=>{const n=$$('#ak input:checked').length;$('#ap').style.width=n/A.length*100+'%';$('#an').textContent=n+' de '+A.length+' acciones';if(n==A.length){$('#b5').classList.add('got');EC('¡Gracias por actuar! Cada acción cuenta ')}});
// dato aleatorio
$('#rnd').onclick=()=>{const c=$$('#fun .card');c.forEach(x=>x.classList.remove('hi'));const x=c[Math.random()*c.length|0];x.classList.add('hi');x.scrollIntoView({block:'center',behavior:'smooth'});EC(x.querySelector('p').textContent)};
// EcoClima contextual
const SM={s2:'Toca el mapa: cada región recibe lluvia distinta.',s4:'Entra a las páginas de El Niño y La Niña.',cont:'Mira cómo la contaminación viaja con la lluvia.',sim:'Mueve el control y mira cómo crece el riesgo.',s12:'¿Listo para el quiz? ¡Suerte!',des:'Aquí verás cómo la basura empeora el clima y las inundaciones.',s13:'Piensa qué puedes hacer tú desde hoy '};
const eo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&SM[e.target.id])EC(SM[e.target.id])}),{threshold:.4});
Object.keys(SM).forEach(k=>eo.observe($('#'+k)));
// quiz de 20 preguntas con opciones mezcladas
const EX=[['¿Qué océano influye en el clima del occidente de Nicaragua?',['Pacífico','Ártico','Índico'],0],['¿Qué es el Corredor Seco?',['Zona con sequías recurrentes','Un río','Una carretera'],0],['¿Qué gas, además del CO₂, calienta la atmósfera?',['Metano','Helio','Argón'],0],['¿Qué fenómeno deja más lluvia al enfriarse el Pacífico?',['La Niña','El Niño','Un eclipse'],0],['¿Qué cultivo sufre la roya con clima irregular?',['Café','Arroz','Sorgo'],0],['¿Qué provoca deslizamientos en laderas?',['Lluvia intensa y suelos deforestados','Viento suave','Luna llena'],0],['¿Qué ecosistema regula inundaciones y alberga aves?',['Humedales','Desiertos','Glaciares'],0],['¿Qué es la reforestación?',['Plantar árboles','Talar bosques','Quemar pasto'],0],['¿Cuál es una energía renovable?',['Solar','Carbón','Diésel'],0],['¿Qué ayuda a ahorrar agua en casa?',['Cosechar agua de lluvia','Dejar la llave abierta','Lavar con manguera'],0],['¿Qué gas liberan los vertederos al descomponerse la materia orgánica?',['Metano','Neón','Oxígeno'],0],['¿Por qué la basura en los drenajes aumenta las inundaciones?',['Bloquea el paso del agua','Atrae más nubes','Enfría el agua'],0],['¿Qué se puede hacer con restos de comida para reducir basura?',['Compostarlos','Quemarlos','Tirarlos al río'],0],['¿Qué problema causa quemar basura a cielo abierto?',['Emite humo y gases contaminantes','Produce lluvia','Limpia el aire'],0],['¿Qué significan las 3R?',['Reducir, reutilizar, reciclar','Reír, rezar, recordar','Regar, rozar, recoger'],0],['¿Qué es la lluvia ácida?',['Lluvia con contaminantes del aire disueltos','Lluvia muy fría','Lluvia de granizo'],0],['¿Qué arrastra la lluvia fuerte hacia ríos y lagos?',['Contaminantes del suelo y la calle','Solo aire limpio','Nada'],0],['¿Qué puede reducir la contaminación del aire?',['Energías renovables y transporte limpio','Más quemas','Más humo'],0]];
const raw=[...Q,...EX];Q.length=0;
raw.forEach(([q,o,c])=>{const a=o.map((t,i)=>[t,i===c]).sort(()=>Math.random()-.5);Q.push([q,a.map(x=>x[0]),a.findIndex(x=>x[1])])});
qi=0;sc=0;showQ();
// ranking
const esc=s=>s.replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
function rk(){try{return JSON.parse(localStorage.getItem('rkN')||'[]')}catch(e){return[]}}
function renderRank(r=rk()){$('#rk').innerHTML='<h3>Ranking (en este navegador)</h3>'+(r.length?'<ol>'+r.map(x=>'<li>'+esc(x.n)+' — '+x.s+' / '+Q.length+'</li>').join('')+'</ol>':'<p>Aún no hay puntuaciones. ¡Sé el primero!</p>')}
function saveRank(){const n=($('#nm').value||'Anónimo').slice(0,16);let r=rk();r.push({n,s:sc});r.sort((a,b)=>b.s-a.s);r=r.slice(0,5);try{localStorage.setItem('rkN',JSON.stringify(r))}catch(e){}renderRank(r);$('#nm').disabled=true}
renderRank();

// línea de tiempo
tabs('tl',b=>$('#tlt').textContent=b.dataset.t);
// descomposición
$('#dc').innerHTML=[['Cáscara de fruta','semanas a pocos meses',4],['Papel','2 a 6 meses',8],['Bolsa plástica','décadas',40],['Lata de aluminio','80 a 200 años aprox.',70],['Botella plástica','cientos de años aprox.',85],['Vidrio','más de 1,000 años aprox.',100]].map(([n,t,w])=>'<div style="margin-top:10px">'+n+' <small>— '+t+'</small><div class="gauge nogg"><i style="width:'+w+'%"></i></div></div>').join('');
// simulador de drenajes
function dr(){const r=+$('#rain2').value,c=+$('#clog').value;$('#rv').textContent=r+' mm';$('#cv2').textContent=c+' %';const l=Math.min(100,r*(.35+1.3*c/100)/2);$('#wl').style.height=l+'%';$('#rm').textContent=l<35?'El agua drena sin problemas.':l<70?'Se forman charcos y el tránsito se complica.':'¡Inundación! Drenajes limpios y menos basura reducen este riesgo.'}
$('#rain2').oninput=dr;$('#clog').oninput=dr;dr();
// juego de clasificación
const GI=[['Cáscara de banano','o'],['Botella plástica','r'],['Periódico','r'],['Botella de vidrio','r'],['Batería usada','p'],['Restos de comida','o'],['Envoltura de dulce','n'],['Computadora vieja','p']];
const GB={o:'Orgánico',r:'Reciclable',p:'Peligroso / electrónico',n:'No reciclable'};
let gi=0,gs=0,gq=[];
function gstart(){gq=[...GI].sort(()=>Math.random()-.5);gi=0;gs=0;gshow()}
function gshow(){if(gi>=gq.length){$('#gm').innerHTML='<h3>Puntos: '+gs+' / '+gq.length+'</h3><p>'+(gs>=7?'¡Eres un clasificador experto!':'Sigue practicando, ¡cada residuo cuenta!')+'</p><button class="p" onclick="gstart()">Jugar de nuevo</button>';if(gs>=7)$('#b8').classList.add('got');return}
const it=gq[gi];$('#gm').innerHTML='<p>Objeto '+(gi+1)+' de '+gq.length+'</p><h3 style="font-size:24px">'+it[0]+'</h3><div class="tabs">'+Object.entries(GB).map(([k,v])=>'<button class="gb" data-k="'+k+'">'+v+'</button>').join('')+'</div><p id="gf"></p>';
$$('.gb').forEach(b=>b.onclick=()=>{const ok=b.dataset.k===it[1];if(ok)gs++;$$('.gb').forEach(x=>x.disabled=true);$('#gf').textContent=ok?'¡Correcto!':'Iba en: '+GB[it[1]];EC(ok?'¡Bien hecho!':'Casi. Revisa el cubo correcto ');setTimeout(()=>{gi++;gshow()},1100)})}
gstart();

tabs('ct',b=>$('#ctt').textContent=b.dataset.t);tabs('cp',b=>$('#cpt').textContent=b.dataset.t);
