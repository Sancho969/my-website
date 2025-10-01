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

  function resize(force = false) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Only resize if width changed (ignore height-only changes from mobile scroll)
    if (!force && w === canvas.width) return;

    canvas.width = w;
    canvas.height = h;
    cols = Math.floor(canvas.width / fontSize) + 1;
    drops = new Array(cols).fill(0);
  }

  // Run once at start
  resize(true);

  // Listen to resize but ignore height-only changes
  window.addEventListener('resize', () => resize(false));

  function getMatrixColor() {
    return document.body.classList.contains('dark-mode')
      ? 'rgba(180,40,200,0.95)'
      : 'rgba(0,0,0,0.6)';
  }

  function draw() {
    ctx.fillStyle = document.body.classList.contains('dark-mode')
      ? 'rgba(0,0,0,0.08)'
      : 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = getMatrixColor();
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.2;
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
  const currentTextObj = announcements[msgIndex];
  const currentText = typeof currentTextObj === 'object' ? currentTextObj.text : currentTextObj;
  const color = typeof currentTextObj === 'object' && currentTextObj.color ? currentTextObj.color : '#ffcc00';
  
  typewriterHome.style.color = color; // <-- set color here
  typewriterHome.textContent = currentText.substring(0,charIndex);

  if(isDeleting) charIndex--; 
  else charIndex++;

  if(!isDeleting && charIndex === currentText.length) setTimeout(()=>isDeleting=true, pauseTime);
  else if(isDeleting && charIndex===0){ 
    isDeleting=false; 
    msgIndex=(msgIndex+1)%announcements.length; 
  }

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
emailjs.init('PHRzf6HvJtCOh-FvL'); 
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.sendForm("service_8we21yj", "template_98d4y8u", this)
    .then(() => {
      document.getElementById("formMessage").style.display = "block";
      document.getElementById("formMessage").style.color = "green";
      document.getElementById("formMessage").textContent = "✅ Thank you! I’ll get back to you soon.";
      this.reset();
    }, (error) => {
      console.error("EmailJS error:", error);
      document.getElementById("formMessage").style.display = "block";
      document.getElementById("formMessage").style.color = "red";
      document.getElementById("formMessage").textContent = "❌ Oops! Something went wrong. Try again.";
    });
});
// <-- Close the if block



// ===== Set Copyright Year =====
const copyright = document.getElementById('copyright-year');
if(copyright) {
  copyright.textContent = new Date().getFullYear();
}

function toggleMenu() {
  const navCenter = document.querySelector('.nav-center');
  navCenter.classList.toggle('show'); // toggles visibility
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-center').classList.remove('show');
  });
});
// Toggle dropdown on button click (for mobile)
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Show the selected year content
function showMediaYear(event, yearId) {
  event.preventDefault();

  // Hide all media-year content
  document.querySelectorAll('.media-year').forEach(div => div.style.display = 'none');

  // Show the selected year
  document.getElementById(yearId).style.display = 'block';

  // Close dropdown after selection
  document.getElementById('media-dropdown').style.display = 'none';
}

// Show the selected Pictures year content
function showPicturesYear(event, yearId) {
  event.preventDefault();

  // Hide all pictures-year content
  document.querySelectorAll('.pictures-year').forEach(div => div.style.display = 'none');

  // Show the selected year
  document.getElementById(yearId).style.display = 'block';

  // Close dropdown after selection
  document.getElementById('pictures-dropdown').style.display = 'none';
}

// Open Lightbox
document.querySelectorAll('.pictures-grid img').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');

    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    caption.textContent = img.alt;
  });
});

// Close Lightbox
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}
let currentImages = [];
let currentIndex = 0;

// Open Lightbox
document.querySelectorAll('.pictures-grid img').forEach((img, idx, nodeList) => {
  img.addEventListener('click', () => {
    // Save all images in this grid
    currentImages = Array.from(img.parentElement.querySelectorAll('img'));
    currentIndex = currentImages.indexOf(img);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');

    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    caption.textContent = img.alt;
  });
});

// Close Lightbox
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// Navigate Lightbox
function changeLightbox(direction){
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('caption');

  currentIndex += direction;
  if(currentIndex < 0) currentIndex = currentImages.length - 1;
  if(currentIndex >= currentImages.length) currentIndex = 0;

  lightboxImg.src = currentImages[currentIndex].src;
  caption.textContent = currentImages[currentIndex].alt;
}

// Event Listeners
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', ()=>changeLightbox(-1));
document.getElementById('lightbox-next').addEventListener('click', ()=>changeLightbox(1));

// Keyboard support
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if(lightbox.style.display !== 'flex') return;

  if(e.key === 'ArrowLeft') changeLightbox(-1);
  else if(e.key === 'ArrowRight') changeLightbox(1);
  else if(e.key === 'Escape') closeLightbox();
});

document.querySelectorAll('.video-card video').forEach(video => {
  video.addEventListener('mouseenter', () => {
    if (!video.paused) return; // already playing
    video.play();
  });

  video.addEventListener('mouseleave', () => {
    if (!document.fullscreenElement) video.pause();
  });
});
// Video Lightbox
const videoLightbox = document.getElementById("video-lightbox");
const videoPlayer = document.getElementById("video-lightbox-player");
const videoClose = document.getElementById("video-lightbox-close");

document.querySelectorAll(".hover-video").forEach(video => {
  video.addEventListener("click", () => {
    videoLightbox.style.display = "flex";
    videoPlayer.src = video.querySelector("source").src; // load clicked video
    videoPlayer.play();
  });
});

videoClose.addEventListener("click", () => {
  videoLightbox.style.display = "none";
  videoPlayer.pause();
  videoPlayer.src = ""; // reset
});


