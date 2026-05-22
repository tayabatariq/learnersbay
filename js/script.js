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