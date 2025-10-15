
// Orchestrated glitches: text glitches and layout glitches should NOT run simultaneously.
// Randomized intervals for each; before starting, check that the other is not active.
let textGlitchActive = false;
let layoutGlitchActive = false;

function doTextGlitch() {
  if (textGlitchActive || layoutGlitchActive) return;
  textGlitchActive = true;
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav a');
  // Add RGB shift to header (glitch-clip transform)
  header.classList.add('flicker');
  header.style.transform = `translateX(${(Math.random()*6-3).toFixed(2)}px)`;
  navLinks.forEach((a,i)=>{
    a.classList.add('flicker');
    a.style.transform = `translateY(${(Math.random()*2-1).toFixed(2)}px)`;
  });
  // short burst
  setTimeout(()=>{
    header.classList.remove('flicker');
    header.style.transform='';
    navLinks.forEach(a=>{ a.classList.remove('flicker'); a.style.transform=''; });
    textGlitchActive = false;
  }, 800 + Math.random()*800);
}

function doLayoutGlitch() {
  if (layoutGlitchActive || textGlitchActive) return;
  layoutGlitchActive = true;
  const lg = document.querySelector('.layout-glitch');
  lg.classList.add('active');
  // quick active period, then remove
  setTimeout(()=>{ lg.classList.remove('active'); layoutGlitchActive = false; }, 220 + Math.random()*260);
}

// schedule loops with differing intervals so they rarely collide naturally,
// and ensure check inside prevents overlap.
function scheduleGlitches() {
  // text glitch every 2.5-6.5s
  setInterval(()=>{ doTextGlitch(); }, 2500 + Math.random()*4000);
  // layout glitch every 5-12s
  setInterval(()=>{ doLayoutGlitch(); }, 5000 + Math.random()*7000);
}

// subtle floating for side images
function floatSides(){
  const imgs = document.querySelectorAll('.side-col img');
  imgs.forEach((img, idx)=>{
    setInterval(()=>{
      img.style.transition='transform 3s ease-in-out';
      const dx = (Math.random()*8-4).toFixed(2);
      const dy = (Math.random()*8-4).toFixed(2);
      img.style.transform = `translate(${dx}px, ${dy}px) rotate(${(Math.random()*2-1).toFixed(2)}deg)`;
    }, 3000 + idx*250);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  scheduleGlitches();
  floatSides();
  // pause ticker on hover
  const ticker = document.querySelector('.ticker-inner');
  const tickerWrap = document.querySelector('.ticker');
  tickerWrap.addEventListener('mouseenter', ()=> ticker.style.animationPlayState='paused');
  tickerWrap.addEventListener('mouseleave', ()=> ticker.style.animationPlayState='running');
});
