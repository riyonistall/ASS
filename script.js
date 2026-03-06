/* ═══════════════════════════════════════════════
   RIYON'S BEAUTIFUL A.S.S. — SCRIPT.JS
   ═══════════════════════════════════════════════ */

/* ─── Loader ─── */
(function initLoader() {
  spawnLoaderParticles();
  cycleAssLetterFonts();

  // After bar fills + small pause → switch to main site
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.classList.add('hidden');
      const site = document.getElementById('mainSite');
      site.classList.remove('hidden');
      spawnFloatingEmojis();
      observeCards();
    }, 900);
  }, 5000); // 5s total loader time
})();

/* ─── ASS loader letter font cycling ─── */
function cycleAssLetterFonts() {
  const wildFonts = [
    "'Bangers', cursive",
    "'Lobster', cursive",
    "'Press Start 2P', monospace",
    "'Righteous', cursive",
    "'Ultra', serif",
    "'Black Ops One', cursive",
    "'Creepster', cursive",
    "'Monoton', cursive",
    "'Russo One', sans-serif",
    "'Boogaloo', cursive",
    "'Fredoka One', cursive",
  ];

  const discoColors = [
    '#ff0000','#ff4400','#ff8800','#ffcc00','#ffff00',
    '#88ff00','#00ff44','#00ffcc','#00ccff','#0066ff',
    '#6600ff','#cc00ff','#ff00cc','#ff0066',
    '#ff6b6b','#4ecdc4','#ffe66d','#bd93f9','#ff79c6','#8be9fd',
  ];

  const letters = document.querySelectorAll('.ass-letter');

  letters.forEach((letter, idx) => {
    const startDelay = 1000 + idx * 300;
    setTimeout(() => {
      let cycle = 0;
      const totalCycles = wildFonts.length * 2;
      const intervalMs = 80;

      letter.style.display = 'inline-block';

      const timer = setInterval(() => {
        const font = wildFonts[cycle % wildFonts.length];
        const color = discoColors[Math.floor(Math.random() * discoColors.length)];
        letter.style.fontFamily = font;
        letter.style.color = color;
        letter.style.textShadow = `0 0 30px ${color}, 0 0 60px ${color}88`;

        letter.style.transform = `scale(${1 + Math.random() * 0.25}) rotate(${(Math.random() - 0.5) * 10}deg)`;

        cycle++;

        if (cycle >= totalCycles) {
          clearInterval(timer);
          letter.style.fontFamily = "'Fredoka One', cursive";
          letter.style.color = '#ffffff';
          letter.style.textShadow = '0 0 40px #ffffff88';
          letter.style.transform = 'scale(1.15) rotate(0deg)';
          setTimeout(() => {
            letter.style.transform = 'scale(1) rotate(0deg)';
          }, 200);
        }
      }, intervalMs);
    }, startDelay);
  });
}

function spawnLoaderParticles() {
  const container = document.getElementById('particles');
  const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#bd93f9', '#ff79c6', '#8be9fd'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      opacity: ${Math.random() * 0.7 + 0.2};
      animation-duration: ${Math.random() * 6 + 4}s;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(p);
  }
}

/* ─── Floating emojis in hero ─── */
function spawnFloatingEmojis() {
  const emojis = ['🍑','❤️','✨','🔥','💎','👑','😂','🚀','💪','🎯','⚡','🌟','😎','💫','🎉'];
  const container = document.getElementById('floatingEmojis');
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'float-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      font-size: ${Math.random() * 1.5 + 1}rem;
      animation-duration: ${Math.random() * 10 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(el);
  }
}

/* ─── Scroll to cards ─── */
function scrollToCards() {
  document.getElementById('cardsSection').scrollIntoView({ behavior: 'smooth' });
}

/* ─── Card entrance animations on scroll ─── */
function observeCards() {
  const cards = document.querySelectorAll('.friend-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(60px) scale(0.92)';
    card.style.transition = 'opacity 0.6s ease, transform 0.7s cubic-bezier(.17,.67,.35,1.25)';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.dataset.delay || 0);
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
          spawnCardParticles(card);
        }, delay);
        io.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card, i) => {
    card.dataset.delay = i * 180;
    io.observe(card);
  });
}

/* ─── Card hover particles ─── */
function spawnCardParticles(card) {
  const colors = {
    cardAli:       ['#ff6b6b', '#ff9999', '#ff4444'],
    cardSiddharth: ['#4ecdc4', '#88ffff', '#00bfbf'],
    cardSatyam:    ['#ffe66d', '#fff0a0', '#ffd000'],
  };
  const palette = colors[card.id] || ['#ffffff'];
  const container = card.querySelector('.card-particles');

  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${palette[Math.floor(Math.random() * palette.length)]};
      animation-duration: ${Math.random() * 3 + 2}s;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(p);
  }
}

/* ─── Modals ─── */
const modalMap = {
  ali:        'modalAli',
  siddharth:  'modalSiddharth',
  satyam:     'modalSatyam',
};

function openModal(id) {
  const overlay = document.getElementById(modalMap[id]);
  if (!overlay) return;

  // Ripple effect on card
  const card = document.getElementById('card' + id.charAt(0).toUpperCase() + id.slice(1));
  if (card) createRipple(card);

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Entrance confetti
  burstConfetti(id);
}

function closeModal(id) {
  const overlay = document.getElementById(modalMap[id]);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    Object.keys(modalMap).forEach(id => closeModal(id));
  }
});

/* ─── Ripple on click ─── */
function createRipple(card) {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute; top: 50%; left: 50%;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transform: translate(-50%,-50%) scale(0);
    animation: rippleOut 0.6s ease forwards;
    pointer-events: none; z-index: 10;
  `;
  card.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

// Inject ripple keyframe once
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleOut {
    to { transform: translate(-50%,-50%) scale(20); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ─── Confetti burst ─── */
function burstConfetti(id) {
  const colors = {
    ali:       ['#ff6b6b','#ff9999','#ff4444','#ffffff'],
    siddharth: ['#4ecdc4','#88ffff','#00bfbf','#ffffff'],
    satyam:    ['#ffe66d','#fff0a0','#ffd000','#ffffff'],
  };
  const palette = colors[id] || ['#ffffff'];

  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const angle = Math.random() * 360;
    const dist  = Math.random() * 250 + 80;
    const color = palette[Math.floor(Math.random() * palette.length)];

    p.style.cssText = `
      position: fixed;
      top: 50%; left: 50%;
      width: ${size}px; height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
    `;
    document.body.appendChild(p);

    const rad = (angle * Math.PI) / 180;
    const dx  = Math.cos(rad) * dist;
    const dy  = Math.sin(rad) * dist;

    p.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0) rotate(${Math.random()*720}deg)`, opacity: 0 },
    ], {
      duration: Math.random() * 600 + 500,
      easing: 'cubic-bezier(.2,.8,.4,1)',
    }).onfinish = () => p.remove();
  }
}

/* ─── Smooth card tilt effect ─── */
document.querySelectorAll('.friend-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-14px) scale(1.03) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── Easter egg: click the title letters ─── */
document.addEventListener('DOMContentLoaded', () => {
  const assTitle = document.querySelectorAll('.word-ass');
  if (assTitle.length) {
    assTitle[0].addEventListener('click', () => {
      showToast("😂 You clicked A.S.S.! Riyon approves!");
    });
  }
});

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%;
    transform: translateX(-50%) translateY(30px);
    background: linear-gradient(135deg, #bd93f9, #ff79c6);
    color: #0a0a14; font-family: 'Rajdhani', sans-serif;
    font-weight: 700; font-size: 1rem;
    padding: 0.85rem 2rem; border-radius: 100px;
    z-index: 9999; opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    white-space: nowrap; pointer-events: none;
    box-shadow: 0 8px 30px rgba(189,147,249,0.4);
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => t.remove(), 400);
  }, 3000);
}

/* ─── Gratitude section scroll reveal ─── */
function revealOnScroll() {
  const targets = document.querySelectorAll('.gratitude-text, .group-photo-frame, .group-caption');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    io.observe(el);
  });
}

// Run reveal after site becomes visible
const siteObserver = new MutationObserver(() => {
  const site = document.getElementById('mainSite');
  if (site && !site.classList.contains('hidden')) {
    revealOnScroll();
    siteObserver.disconnect();
  }
});
siteObserver.observe(document.getElementById('mainSite'), { attributes: true, attributeFilter: ['class'] });

/* ─── Photo Lightbox ─── */
function openPhotoPopup(src, name) {
  const lb   = document.getElementById('photoLightbox');
  const img  = document.getElementById('lightboxImg');
  const label = document.getElementById('lightboxName');
  if (!lb) return;
  img.src = src; img.alt = name; label.textContent = name;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePhotoPopup() {
  const lb = document.getElementById('photoLightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePhotoPopup();
});

/* ─── H.H.I. Card Reveal ─── */
function revealHhi(name) {
  const blur    = document.getElementById('blur'    + name.charAt(0).toUpperCase() + name.slice(1));
  const overlay = document.getElementById('overlay' + name.charAt(0).toUpperCase() + name.slice(1));
  if (!blur || !overlay) return;
  blur.classList.add('revealed');
  overlay.classList.add('hidden');
}

let harshiniStep = 0;
const harshiniSteps = [
  'your sure? 😏',
  'are you really sure? 🤔',
  'pakka sure bro? 🫵',
];
function stepHarshini() {
  const btn = document.getElementById('harshiniBtn');
  if (!btn) return;

  // shake animation on each click
  btn.classList.remove('shake');
  void btn.offsetWidth; // reflow to restart animation
  btn.classList.add('shake');

  if (harshiniStep < harshiniSteps.length) {
    btn.textContent = harshiniSteps[harshiniStep];
    harshiniStep++;
  } else {
    revealHhi('harshini');
  }
}

/* ─── Side Mute Button → "listen to it please" popup ─── */
(function initSideMuteBtn() {
  const btn   = document.getElementById('sideMuteBtn');
  const popup = document.getElementById('listenPopup');
  if (!btn || !popup) return;

  let hideTimer;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => popup.classList.remove('show'), 2500);
  });
})();

/* ─── Music Player ─── */
(function initMusic() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;

  audio.volume = 0.65;
  audio.muted = true;
  audio.play().catch(() => {});

  // Unmute silently on first user interaction
  function unmute() {
    audio.muted = false;
    document.removeEventListener('click',      unmute);
    document.removeEventListener('keydown',    unmute);
    document.removeEventListener('touchstart', unmute);
  }
  document.addEventListener('click',      unmute);
  document.addEventListener('keydown',    unmute);
  document.addEventListener('touchstart', unmute);
})();

/* ─── Click anywhere → random emoji pop ─── */
(function initClickEmoji() {
  const emojiPopStyle = document.createElement('style');
  emojiPopStyle.textContent = `
    @keyframes emojiPopUp {
      0%   { transform: translate(-50%, -50%) scale(0) rotate(-20deg); opacity: 1; }
      50%  { transform: translate(-50%, -120%) scale(1.4) rotate(10deg); opacity: 1; }
      100% { transform: translate(-50%, -220%) scale(0.8) rotate(5deg); opacity: 0; }
    }
  `;
  document.head.appendChild(emojiPopStyle);

  const pool = ['🍻','🍆','🍑'];

  document.addEventListener('click', (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (['button','a','input','select','textarea'].includes(tag)) return;
    if (e.target.closest('.friend-card,.modal-box,.music-btn,.meet-btn,.scroll-arrow')) return;

    const el = document.createElement('span');
    el.textContent = pool[Math.floor(Math.random() * pool.length)];
    el.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: 2.4rem;
      pointer-events: none;
      z-index: 99999;
      animation: emojiPopUp 0.75s cubic-bezier(.17,.67,.35,1.4) forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
  });
})();

