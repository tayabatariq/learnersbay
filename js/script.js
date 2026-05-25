const btn = document.getElementById('hamBtn');
const nav = document.getElementById('mobileNav');
btn.addEventListener('click', () => {
  btn.classList.toggle('open');
  nav.classList.toggle('open');
});

/* ── Testimonial Slider ── */
(function () {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  const slides = track.querySelectorAll('.testimonial-slide');
  const dotsWrap = document.getElementById('tDots');
  let current = 0;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 't-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function goTo(n) {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.t-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  document.getElementById('tPrev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('tNext').addEventListener('click', () => goTo(current + 1));
})();

/* ── FAQ Accordion ── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('faq-open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('faq-open');
      i.querySelector('.faq-icon').textContent = '+';
      i.querySelector('.faq-a').style.display = 'none';
    });
    if (!isOpen) {
      item.classList.add('faq-open');
      item.querySelector('.faq-icon').textContent = '✕';
      item.querySelector('.faq-a').style.display = 'block';
    }
  });
});

/* Scroll-in animation — place before </body> */
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
galleryItems.forEach(el => galleryObserver.observe(el));


/* ── COOKIE SCRIPT — place before </body> ── */
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.getElementById('cookieBanner').classList.remove('visible');
  document.getElementById('cookieOverlay').classList.remove('visible');
}
function rejectCookies() {
  localStorage.setItem('cookieConsent', 'rejected');
  document.getElementById('cookieBanner').classList.remove('visible');
  document.getElementById('cookieOverlay').classList.remove('visible');
}

// Auto-show on first visit
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!localStorage.getItem('cookieConsent')) {
      document.getElementById('cookieBanner').classList.add('visible');
      document.getElementById('cookieOverlay').classList.add('visible');
    }
  }, 800);
});

/* ── HERO SLIDER — place before </body> ── */
const lbSlides = document.querySelectorAll('.lb-hero-slide');
const lbDots   = document.getElementById('lbDots');
const lbBar    = document.getElementById('lbBar');
let lbCur = 0, lbTimer;

lbSlides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'lb-hero-dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', 'Slide ' + (i + 1));
  d.onclick = () => { lbGoTo(i); lbReset(); };
  lbDots.appendChild(d);
});

function lbGoTo(n) {
  lbSlides[lbCur].classList.remove('active');
  lbDots.children[lbCur].classList.remove('active');
  lbCur = (n + lbSlides.length) % lbSlides.length;
  lbSlides[lbCur].classList.add('active');
  lbDots.children[lbCur].classList.add('active');
  lbBar.classList.remove('run');
  lbBar.style.transition = 'none';
  lbBar.style.width = '0%';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    lbBar.style.transition = 'width 2s linear';
    lbBar.classList.add('run');
  }));
}

function lbReset() {
  clearInterval(lbTimer);
  lbTimer = setInterval(() => lbGoTo(lbCur + 1), 2000);
}

lbGoTo(0);
lbReset();