/* ============================================
   AA RENT CAR – script.js
   ============================================ */

'use strict';

/* ---- NAVBAR: transparent → solid on scroll ---- */
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();


/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ---- ACTIVE NAV LINK on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let currentId = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 100) currentId = section.id;
  });
  navLinksList.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });


/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const order = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${order * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));


/* ---- VEHICLE FILTER TABS ---- */
const filterBtns   = document.querySelectorAll('.filter-btn');
const vehicleCards = document.querySelectorAll('.vehicle-card');
const catLabels    = document.querySelectorAll('.category-label-inline');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // Toggle vehicle cards
    vehicleCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
      }
    });

    // Toggle category labels
    catLabels.forEach(label => {
      const cat = label.dataset.cat;
      const match = filter === 'all' || filter === cat;
      if (match) {
        label.classList.remove('hidden');
        label.classList.remove('visible');
        setTimeout(() => label.classList.add('visible'), 30);
      } else {
        label.classList.add('hidden');
      }
    });
  });
});


/* ---- CONTACT FORM → WhatsApp redirect ---- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.querySelector('input[type="text"]').value.trim();
    const phone   = contactForm.querySelector('input[type="tel"]').value.trim();
    const vehicle = contactForm.querySelector('select').value;
    const message = contactForm.querySelector('textarea').value.trim();

    let text = `Hola, me llamo *${name || 'Cliente'}*`;
    if (phone)   text += ` y mi número es ${phone}`;
    if (vehicle) text += `.\n\nEstoy interesado en: *${vehicle}*`;
    if (message) text += `.\n\n${message}`;
    text += `.\n\n¡Gracias!`;

    const waUrl = `https://wa.me/18299059714?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  });
}


/* ---- SMOOTH SCROLL for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ---- FLOATING WA BUTTON ---- */
const floatWa = document.querySelector('.float-wa');

function toggleFloatWa() {
  if (window.scrollY > 300) {
    floatWa.style.opacity = '1';
    floatWa.style.transform = 'translateY(0)';
  } else {
    floatWa.style.opacity = '0';
    floatWa.style.transform = 'translateY(20px)';
  }
}

floatWa.style.transition = 'opacity .4s ease, transform .4s ease, max-width .3s ease, box-shadow .3s ease';
floatWa.style.opacity = '0';
floatWa.style.transform = 'translateY(20px)';

window.addEventListener('scroll', toggleFloatWa, { passive: true });