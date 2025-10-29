/* NAVBAR ACTIVE LINK ON SCROLL */
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 150;

  sections.forEach((sec) => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll("nav a").forEach((a) => a.classList.remove("active"));
      document.querySelector(`nav a[href*=${sec.id}]`)?.classList.add("active");
    }
  });
});

/* SMOOTH SCROLL */
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* TESTIMONIAL SLIDER */
let slideIndex = 0;
function showSlides() {
  let slides = document.querySelectorAll(".testimonial");
  slides.forEach(s => s.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("fade-in");
  setTimeout(showSlides, 4000); // Change every 4s
}
if (document.querySelector(".testimonial")) {
  showSlides();
}

/* SCROLL REVEAL ANIMATION */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* CONTACT FORM VALIDATION */
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  let name = document.getElementById('name').value.trim();
  let email = document.getElementById('email').value.trim();
  let phone = document.getElementById('phone').value.trim();

  if (name === '' || email === '' || phone === '') {
    alert('Please fill all required fields.');
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert('Name should only contain letters.');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email.');
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  alert('Form submitted successfully!');
  this.reset();
});

/* SMOOTH FADE-IN ON PAGE LOAD */
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".banner");
  const slides = document.querySelector(".slides");
  if (!banner || !slides) return;

  const images = slides.querySelectorAll("img");
  const total = images.length;
  let index = 0;

  // Preload images to avoid first-transition hiccup
  images.forEach(img => {
    const pre = new Image();
    pre.src = img.src;
  });

  // Build dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "dots";
  for (let i = 0; i < total; i++) {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => {
      index = i;
      updateSlide(true);
      resetTimer();
    });
    dotsContainer.appendChild(d);
  }
  banner.appendChild(dotsContainer);
  const dots = dotsContainer.querySelectorAll(".dot");

  // Core updater
  function updateSlide(withTransition = true) {
    // Toggle transition only when animating (prevents jump on first paint)
    slides.style.transition = withTransition ? "transform 700ms cubic-bezier(.22,.61,.36,1)" : "none";
    slides.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach(d => d.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % total;
    updateSlide(true);
  }

  // Autoplay
  let timer = setInterval(nextSlide, 4500);
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 4500);
  }

  // Pause on hover (desktop)
  banner.addEventListener("mouseenter", () => clearInterval(timer));
  banner.addEventListener("mouseleave", resetTimer);

  // Pause when tab not visible (smoother when returning)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      resetTimer();
    }
  });

  // Handle case-sensitive file names (optional sanity check in console)
  images.forEach(img => {
    img.addEventListener("error", () => {
      console.warn("Image not found:", img.src);
    });
  });

  // First paint without transition, then enable smooth moves
  requestAnimationFrame(() => updateSlide(false));
});
