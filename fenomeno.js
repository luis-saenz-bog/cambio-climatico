const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('[data-tabs]').forEach(g=>{const t=$('#'+g.dataset.tabs);g.querySelectorAll('button').forEach(b=>b.onclick=()=>{g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');t.textContent=b.dataset.t})});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});$$('.fade').forEach(e=>io.observe(e));
const cv=$('#fx'),cx=cv.getContext('2d'),K=document.body.classList.contains('nino');let ps=[];
function rs(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;ps=Array.from({length:K?60:Math.min(220,cv.width/4)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,v:K?.4+Math.random():6+Math.random()*6,l:10+Math.random()*12,r:1+Math.random()*3}))}
rs();addEventListener('resize',rs);
(function f(){cx.clearRect(0,0,cv.width,cv.height);if(K){cx.fillStyle='rgba(232,99,26,.4)';ps.forEach(p=>{cx.beginPath();cx.arc(p.x+Math.sin(p.y/30)*8,p.y,p.r,0,7);cx.fill();p.y-=p.v;if(p.y<-5){p.y=cv.height+5;p.x=Math.random()*cv.width}})}else{cx.strokeStyle='rgba(220,240,250,.55)';cx.lineWidth=1.2;cx.beginPath();ps.forEach(p=>{cx.moveTo(p.x,p.y);cx.lineTo(p.x-2,p.y+p.l);p.y+=p.v;if(p.y>cv.height){p.y=-20;p.x=Math.random()*cv.width}});cx.stroke()}requestAnimationFrame(f)})();
const sl=$('#ths');
function th(){const v=+sl.value;$('#thv').textContent=(v>0?'+':'')+v.toFixed(1)+' °C';const k=v>=.5?['El Niño','elnino.html','aguas más cálidas: tiende a haber menos lluvia en Nicaragua.']:v<=-.5?['La Niña','lanina.html','aguas más frías: tiende a haber más lluvia en Nicaragua.']:['Neutral',null,'sin fenómeno: el patrón de lluvias es el habitual.'];$('#thr').innerHTML='<b>'+k[0]+'</b>: '+k[2]+(k[1]?' <a href="'+k[1]+'">Ver página →</a>':'')}
sl.oninput=th;th();
$$('#ak input').forEach(c=>c.onchange=()=>{const n=$$('#ak input:checked').length,t=$$('#ak input').length;$('#ap').style.width=n/t*100+'%';$('#an').textContent=n+' de '+t+' acciones'});
let qi=0,sc=0;
function show(){const q=QZ[qi];if(!q){$('#qb').innerHTML='<h3>Puntos: '+sc+' / '+QZ.length+'</h3><p>'+(sc>=3?'¡Muy bien!':'Repasa la página y vuelve a intentarlo.')+'</p><button class="p" onclick="qi=0;sc=0;show()">Reintentar</button>';return}
$('#qb').innerHTML='<p>Pregunta '+(qi+1)+' de '+QZ.length+'</p><h3>'+q[0]+'</h3>'+q[1].map((o,i)=>'<button class="opt" data-i="'+i+'">'+o+'</button>').join('');
$$('.opt').forEach(b=>b.onclick=()=>{const ok=+b.dataset.i===q[2];if(ok)sc++;$$('.opt').forEach(x=>{x.disabled=true;if(+x.dataset.i===q[2])x.classList.add('ok')});if(!ok)b.classList.add('no');$('#qb').insertAdjacentHTML('beforeend','<p>'+(ok?'':'')+q[3]+'</p><button class="p" id="nx">Siguiente</button>');$('#nx').onclick=()=>{qi++;show()}})}
show();
