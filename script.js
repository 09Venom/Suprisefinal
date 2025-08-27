// Sparkles for Scene 2 and Scene 3
const canvasScene2 = document.getElementById("sparkles-scene2");
const ctxScene2 = canvasScene2 ? canvasScene2.getContext("2d") : null;
const canvasScene3 = document.getElementById("sparkles-scene3");
const ctxScene3 = canvasScene3 ? canvasScene3.getContext("2d") : null;

if (canvasScene2) canvasScene2.width = window.innerWidth;
if (canvasScene2) canvasScene2.height = window.innerHeight;
if (canvasScene3) canvasScene3.width = window.innerWidth;
if (canvasScene3) canvasScene3.height = window.innerHeight;

let sparklesScene2 = [];
let sparklesScene3 = [];
let animatingSparklesScene2 = false;
let animatingSparklesScene3 = false;

function createSparkle(scene) {
  const canvas = scene === 'scene2' ? canvasScene2 : canvasScene3;
  const sparkles = scene === 'scene2' ? sparklesScene2 : sparklesScene3;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 3 + 1;
  const speed = Math.random() * 0.5 + 0.2;
  const hue = Math.floor(Math.random() * 360);
  sparkles.push({ x, y, size, speed, hue });
}

function animateSparkles(scene) {
  const canvas = scene === 'scene2' ? canvasScene2 : canvasScene3;
  const ctx = scene === 'scene2' ? ctxScene2 : ctxScene3;
  const sparkles = scene === 'scene2' ? sparklesScene2 : sparklesScene3;
  const animating = scene === 'scene2' ? animatingSparklesScene2 : animatingSparklesScene3;

  if (!animating || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < sparkles.length; i++) {
    let s = sparkles[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${s.hue}, 100%, 70%)`;
    ctx.fill();

    s.y -= s.speed;
    s.x += Math.sin(s.y * 0.05) * 0.5;

    if (s.y < -s.size) {
      sparkles.splice(i, 1);
      i--;
    }
  }

  while (sparkles.length < 200) {
    createSparkle(scene);
  }

  requestAnimationFrame(() => animateSparkles(scene));
}

window.addEventListener("resize", () => {
  if (canvasScene2) canvasScene2.width = window.innerWidth;
  if (canvasScene2) canvasScene2.height = window.innerHeight;
  if (canvasScene3) canvasScene3.width = window.innerWidth;
  if (canvasScene3) canvasScene3.height = window.innerHeight;
});

// Scene 2 Sparkles
document.getElementById('scene2').addEventListener('change', function() {
  if (this.checked && !animatingSparklesScene2) {
    animatingSparklesScene2 = true;
    animateSparkles('scene2');
  } else {
    animatingSparklesScene2 = false;
    sparklesScene2 = [];
    if (ctxScene2) ctxScene2.clearRect(0, 0, canvasScene2.width, canvasScene2.height);
  }
});

// Scene 3 Sparkles
document.getElementById('scene3').addEventListener('change', function() {
  if (this.checked && !animatingSparklesScene3) {
    animatingSparklesScene3 = true;
    animateSparkles('scene3');
  } else {
    animatingSparklesScene3 = false;
    sparklesScene3 = [];
    if (ctxScene3) ctxScene3.clearRect(0, 0, canvasScene3.width, canvasScene3.height);
  }
});

/* Main Carousel */
let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

const speedWheel = 0.02;
const speedDrag = -0.1;

const getZindex = (array, index) => (
  array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i))
);

const $items = document.querySelectorAll('.carousel-item');
const $cursors = document.querySelectorAll('.cursor');

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty('--zIndex', zIndex);
  item.style.setProperty('--active', $items.length > 0 ? (index - active) / $items.length : 0);
};

const animateCarousel = () => {
  if (!document.getElementById('scene3').checked) return;
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor(progress / 100 * ($items.length - 1));
  $items.forEach((item, index) => displayItems(item, index, active));
};

$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i / $items.length) * 100;
    animateCarousel();
  });
});

const handleWheel = (e) => {
  if (!document.getElementById('scene3').checked) return;
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animateCarousel();
};

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown || !document.getElementById('scene3').checked) return;
  const x = e.clientX || (e.touches && e.touches.length > 0 ? e.touches[0].clientX : 0);
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animateCarousel();
};

const handleMouseDown = (e) => {
  if (!document.getElementById('scene3').checked) return;
  isDown = true;
  startX = e.clientX || (e.touches && e.touches.length > 0 ? e.touches[0].clientX : 0);
};

const handleMouseUp = () => {
  isDown = false;
};

/* Page 4 */
const febHolidays = [
  "Dear Apsara 💅",
  "You're my home👺",
  "I love your voice 😉",
  "I love everything about you🌝",
  "I like you in kurti🌹",
  "I like you in saari👽",
  "I like in all dress🥳",
  "I love seeing your eyes 💗",
  "Stare at you 👀",
  "Your bak bak 🤩",
  "Your presence gives me goosebump 😍",
  "I fall in love with you again and again🤪",
  "You're my soulmate🤗",
  "I love holding your hands🥵",
  "Prettiest woman ever👠",
  "Mrs baniye meri hot girl👀🌹",
  "Sabse special person ho aap🤭",
  "I want to be in front of you 😘",
  "Tenu pyar krda aa me🥳",
  "Jaan to vadd ke👺",
  "Apsara meri oxygen 😭💗",
  "I will fill your wishlist 👠",
  "I wanna take you out somewhere💗",
  "My strength power 😉",
  "US mean We🥰",
  "choti don meri 😋",
  "This is small gift for you👀💗",
  "Your eyes drive me crazy👀💅",
  "Waiting for that day😋",
  "Where we'll hold hands🌝🔪",
  "Meri queen😒🔪"
];

const ulEl = document.querySelector(".page4-ul");
let daynumber = 0;
let activeIndex = daynumber;
const rotate = -360 / febHolidays.length;

function initPage4() {
  if (!ulEl) {
    console.error("Page 4 UL element not found");
    return;
  }
  febHolidays.forEach((holiday, idx) => {
    const liEl = document.createElement("li");
    liEl.style.setProperty("--day_idx", idx);
    liEl.innerHTML = `<time datetime="2023-05-${idx + 1}">${idx + 1}</time><span>${holiday}</span>`;
    ulEl.append(liEl);
  });
  ulEl.style.setProperty("--rotateDegrees", rotate);
  adjustDay(0);
}

function adjustDay(nr) {
  if (!ulEl) return;
  daynumber += nr;
  activeIndex = (activeIndex + nr + febHolidays.length) % febHolidays.length;
  ulEl.style.setProperty("--currentDay", daynumber);
  const activeEl = document.querySelector(".page4-ul li.active");
  if (activeEl) activeEl.classList.remove("active");
  const newActiveEl = document.querySelector(`.page4-ul li:nth-child(${activeIndex + 1})`);
  if (newActiveEl) newActiveEl.classList.add("active");
}

/* Navigation */
function showPage4() {
  document.querySelector(".main-carousel").style.display = "none";
  document.querySelector(".page4-content").style.display = "grid";
  document.querySelector(".page4-content").classList.add("active");
  initPage4();
}

function showMainCarousel() {
  document.querySelector(".page4-content").style.display = "none";
  document.querySelector(".page4-content").classList.remove("active");
  document.querySelector(".main-carousel").style.display = "block";
  animateCarousel();
}

/* Event Listeners */
document.addEventListener("DOMContentLoaded", () => {
  animateCarousel();
  const intentionBtn = document.querySelector(".intention-btn");
  if (intentionBtn) {
    intentionBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPage4();
    });
  }
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", showMainCarousel);
  }
  const prevBtn = document.querySelector('.page4-controls button[aria-label="Previous message"]');
  const nextBtn = document.querySelector('.page4-controls button[aria-label="Next message"]');
  if (prevBtn) prevBtn.addEventListener("click", () => adjustDay(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => adjustDay(1));
});

document.addEventListener("keydown", (e) => {
  if (document.querySelector(".page4-content").classList.contains("active")) {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        adjustDay(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        adjustDay(1);
        break;
      default:
        return;
    }
  }
});

document.addEventListener('wheel', handleWheel);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('touchstart', handleMouseDown);
document.addEventListener('touchmove', handleMouseMove);
document.addEventListener('touchend', handleMouseUp);