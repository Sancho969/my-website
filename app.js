// ===== Splash Screen =====
window.addEventListener("load", () => {
  const splash = document.querySelector(".splash");
  if (!splash) return;

  // Wait for 2s (logo zoom) then start fade
  setTimeout(() => {
    splash.classList.add("hidden");
  }, 2000);

  splash.addEventListener("transitionend", e => {
    if (e.propertyName === "opacity" && splash.classList.contains("hidden")) {
      splash.style.display = "none";
    }
  });
});

function toggleMenu() {
  document.querySelector('.nav-center').classList.toggle('show');
}


// ===== Matrix Effect =====
(function(){
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  let fontSize = 16;
  let cols, drops;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789@#&*(){}[]<>?/\\|+-=';

function resize() {
  // Use visualViewport if available to avoid mobile address bar changes
  const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.height = height;

  cols = Math.floor(canvas.width / fontSize) + 1;
  drops = new Array(cols).fill(0);
}

// Call once at start
resize();

// Only resize on orientation change, not scroll
window.addEventListener('orientationchange', resize);


  function getMatrixColor() {
    return document.body.classList.contains('dark-mode') ? 'rgba(180,40,200,0.95)' : 'rgba(0,0,0,0.6)';
  }

  function draw() {
    ctx.fillStyle = document.body.classList.contains('dark-mode') ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = getMatrixColor();
    ctx.font = fontSize + 'px monospace';

    for(let i=0;i<drops.length;i++){
      const text = chars.charAt(Math.floor(Math.random()*chars.length));
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);
      if(drops[i]*fontSize > canvas.height && Math.random()>0.975) drops[i]=0;
      drops[i]+=0.2;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== Tab Switching =====
const tabs = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.tab-section');
tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const target = tab.getAttribute('data-tab');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    tabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ===== Typewriter =====
const announcements = [
  {text:"A Nigerian Born Computing Student", color:"#ffcc00"},
  {text:"💻 Graphics Designer", color:"#ffcc00"}
];
let msgIndex=0,charIndex=0,isDeleting=false,typeSpeed=100,pauseTime=2000;
const typewriter=document.getElementById("typewriter");

function typeEffect(){
  const current = announcements[msgIndex];
  typewriter.style.color = current.color;
  typewriter.textContent = current.text.substring(0,charIndex);
  if(isDeleting){ charIndex--; } else { charIndex++; }

  if(!isDeleting && charIndex===current.text.length) setTimeout(()=>isDeleting=true,pauseTime);
  else if(isDeleting && charIndex===0){ isDeleting=false; msgIndex=(msgIndex+1)%announcements.length; }

  setTimeout(typeEffect,isDeleting? typeSpeed/2:typeSpeed);
}
typeEffect();

// ===== Dark Mode =====
function toggleTheme(){
  document.body.classList.toggle('dark-mode');
  const modeText = document.getElementById('mode');
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme','dark'); modeText.innerText='LIGHT MODE';
  } else {
    localStorage.setItem('theme','light'); modeText.innerText='DARK MODE';
  }
}

window.addEventListener('DOMContentLoaded',()=>{ 
  if(localStorage.getItem('theme')==='dark'){
    document.body.classList.add('dark-mode');
    document.getElementById('mode').innerText='LIGHT MODE';
  }
});

// ===== Contact Form =====
emailjs.init('YOUR_PUBLIC_KEY'); 
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  emailjs.sendForm('service_XXXX','template_XXXX', this)
    .then(()=> { document.getElementById('formMessage').style.display='block'; contactForm.reset(); })
    .catch(()=> alert("Error sending message. Try again."));
});

// ===== Set Year =====
document.getElementById('copyright-year').innerText = new Date().getFullYear();

