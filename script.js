const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.05 });

reveals.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 50
    ? 'rgba(65, 61, 61, 0.99)'
    : 'rgba(39, 115, 190, 0.96)';
});

// unduh section
// Carousel
const slides = [
  { src: 'unduh playstore.png', label: 'Screenshot 1 dari 2' },
  { src: 'unduh appstore.png', label: 'Screenshot 2 dari 2' }
];
let cur = 0;
const cPhones = [document.getElementById('p0'), document.getElementById('p1'), document.getElementById('p2')];

function getIdx(offset) { return (cur + offset + slides.length) % slides.length; }

function setImg(el, idx) {
  const img = el.querySelector('img');
  img.src = slides[idx].src;
  img.alt = slides[idx].label;
}

function updateCarousel() {
  setImg(cPhones[0], getIdx(-1));
  setImg(cPhones[1], cur);
  setImg(cPhones[2], getIdx(1));
  document.getElementById('cap').textContent = slides[cur].label;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
}

document.getElementById('prev').onclick = () => { cur = getIdx(-1); updateCarousel(); };
document.getElementById('next').onclick = () => { cur = getIdx(1); updateCarousel(); };
document.querySelectorAll('.dot').forEach(d => {
  d.onclick = () => { cur = parseInt(d.dataset.i); updateCarousel(); };
});

let carouselTimer = setInterval(() => { cur = getIdx(1); updateCarousel(); }, 3500);
const carouselWrap = document.querySelector('.carousel-wrap');
if (carouselWrap) {
  carouselWrap.addEventListener('mouseenter', () => clearInterval(carouselTimer));
  carouselWrap.addEventListener('mouseleave', () => {
    carouselTimer = setInterval(() => { cur = getIdx(1); updateCarousel(); }, 3500);
  });
}

updateCarousel();