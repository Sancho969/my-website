// ===== Splash Screen =====
window.addEventListener("load", () => {
  const splash = document.querySelector(".splash");
  if (!splash) return;
  setTimeout(() => splash.classList.add("hidden"), 2000);
  splash.addEventListener("transitionend", e => {
    if (e.propertyName === "opacity" && splash.classList.contains("hidden"))
      splash.style.display = "none";
  });
});

// ===== Matrix Effect =====
(function(){
  const canvas = document.getElementById('matrix');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let fontSize = 16, cols, drops;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789@#&*(){}[]<>?/\\|+-=';

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize) + 1;
    drops = new Array(cols).fill(0);
  }
  window.addEventListener('resize', resize);
  resize();

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

    if(target === "about") runAboutTypewriter();
  });
});

// ===== Home Page Typewriter =====
const typewriterHome = document.getElementById("typewriter-home");
if(typewriterHome){
  let announcements = [];
  try { announcements = JSON.parse(typewriterHome.getAttribute("data-text")); } 
  catch(e){ console.error("Invalid JSON for home typewriter"); }

  let msgIndex = 0, charIndex = 0, isDeleting = false;
  const typeSpeed = 100, pauseTime = 2000;

  function typeEffectHome() {
    const currentText = announcements[msgIndex];
    typewriterHome.textContent = currentText.substring(0,charIndex);
    if(isDeleting) charIndex--; else charIndex++;
    if(!isDeleting && charIndex === currentText.length) setTimeout(()=>isDeleting=true, pauseTime);
    else if(isDeleting && charIndex===0){ isDeleting=false; msgIndex=(msgIndex+1)%announcements.length; }
    setTimeout(typeEffectHome, isDeleting? typeSpeed/2 : typeSpeed);
  }
  typeEffectHome();
}

// ===== About Page Typewriter =====
function runAboutTypewriter(){
  const aboutTypewriter = document.getElementById("about-typewriter");
  if(!aboutTypewriter) return;
  aboutTypewriter.textContent = "";
  const text = "What do you want to know about me?";
  let i=0;
  function typeWriter(){
    if(i<text.length){
      aboutTypewriter.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }
  typeWriter();
}

// ===== Chat Functionality =====
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");
const chatResponses = {
  "education": "I studied Computing and am currently at the University of Derby.",
  "music": "I play piano and trumpet, and have performed in school choirs and bands.",
  "hobbies": "I enjoy football, basketball, volleyball, video games, and digital animations.",
  "programming languages": "HTML, CSS, JavaScript, Python.",
  "skills": "I have skills in computing, graphic design, animation, problem-solving, and teamwork."
};

if(chatForm && chatInput && chatBox){
  chatForm.addEventListener("submit", e=>{
    e.preventDefault();
    const question = chatInput.value.toLowerCase();
    const pUser = document.createElement("p");
    pUser.textContent = "You: "+chatInput.value;
    chatBox.appendChild(pUser);

    let answered = false;
    for(const key in chatResponses){
      if(question.includes(key)){
        const pBot = document.createElement("p");
        pBot.textContent = "Victor: "+chatResponses[key];
        chatBox.appendChild(pBot);
        answered=true;
        break;
      }
    }
    if(!answered){
      const pBot = document.createElement("p");
      pBot.textContent = "Victor: I'm not sure about that. Ask me something else!";
      chatBox.appendChild(pBot);
    }
    chatInput.value="";
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// ===== Dark Mode =====
function toggleTheme(){
  document.body.classList.toggle('dark-mode');
  const modeText = document.getElementById('mode');
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme','dark'); modeText.innerText='LIGHT MODE';
  } else{
    localStorage.setItem('theme','light'); modeText.innerText='DARK MODE';
  }
}
window.toggleTheme = toggleTheme;
if(localStorage.getItem('theme')==='dark'){
  document.body.classList.add('dark-mode');
  const modeText = document.getElementById('mode');
  if(modeText) modeText.innerText='LIGHT MODE';
}

// ===== Contact Form =====
emailjs.init('YOUR_PUBLIC_KEY'); 
const contactFormElement = document.getElementById('contactForm');
if(contactFormElement){
  contactFormElement.addEventListener('submit', e=>{
    e.preventDefault();
    emailjs.sendForm('service_XXXX','template_XXXX', contactFormElement)
      .then(()=> { 
        document.getElementById('formMessage').style.display='block'; 
        contactFormElement.reset(); 
      })
      .catch(()=> alert("Error sending message. Try again."));
  }); // <-- Close the addEventListener function here
} // <-- Close the if block



// ===== Set Copyright Year =====
const copyright = document.getElementById('copyright-year');
if(copyright) {
  copyright.textContent = new Date().getFullYear();
}
