document.querySelectorAll('.yt').forEach(v=>{const id=v.dataset.id;v.innerHTML='<img loading="lazy" alt="" onerror="this.style.display=\x27none\x27" src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg"><button class="play" aria-label="Reproducir video"><svg class="ic"><use href="#i-play"/></svg></button>';
v.onclick=()=>{v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="Video de YouTube" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';v.onclick=null}});

(()=>{const n=document.querySelector('nav');if(!n)return;const b=document.createElement('button');b.id='th';b.setAttribute('aria-label','Cambiar tema claro u oscuro');
b.innerHTML='<svg class="ic sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/></svg><svg class="ic moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
b.onclick=()=>{const d=document.documentElement,t=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=t;try{localStorage.setItem('th',t)}catch(e){}};
n.insertBefore(b,document.getElementById('snd')||null);})();
