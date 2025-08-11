// Force animations even if OS has reduced motion (accessible override)
document.documentElement.classList.add('anim-on');

// Idle glow after 5s of inactivity
(function () {
  let idleTimer;
  const buttons = document.querySelectorAll('.btn');

  function startIdleGlow(){ buttons.forEach(b => b.classList.add('idle-glow')); }
  function stopIdleGlow(){ buttons.forEach(b => b.classList.remove('idle-glow')); }
  function resetIdleTimer(){
    stopIdleGlow();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startIdleGlow, 5000); // 5s idle
  }

  ['mousemove','keydown','touchstart','scroll'].forEach(evt=>{
    window.addEventListener(evt, resetIdleTimer, { passive:true });
  });
  resetIdleTimer();
})();

// Magnetic hover (subtle)
(function(){
  const strength = 6; // px pull toward cursor
  function onMove(e){
    const t = e.currentTarget.getBoundingClientRect();
    const cx = t.left + t.width/2, cy = t.top + t.height/2;
    const ex = (e.clientX ?? (e.touches?.[0]?.clientX||cx));
    const ey = (e.clientY ?? (e.touches?.[0]?.clientY||cy));
    const nx = Math.max(-1, Math.min(1, (ex - cx)/(t.width/2)));
    const ny = Math.max(-1, Math.min(1, (ey - cy)/(t.height/2)));
    e.currentTarget.style.transform = `translate(${nx*strength}px, ${ny*strength}px)`;
  }
  function reset(e){ e.currentTarget.style.transform = ""; }

  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', reset);
    btn.addEventListener('touchstart', reset, {passive:true});
  });
})();

// Keyboard shortcuts: R, P, C
addEventListener('keydown', e=>{
  if (['INPUT','TEXTAREA'].includes((e.target||{}).tagName)) return;
  const k = e.key.toLowerCase();
  if (k==='r') location.href='/resume';
  if (k==='p') location.href='/projects';
  if (k==='c') location.href='/contact';
});
