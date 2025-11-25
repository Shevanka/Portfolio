document.addEventListener("DOMContentLoaded", () => {
  // --- 1. THEME TOGGLE & SETUP ---
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check local storage for theme preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
  }

  // Event Listener for Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // --- 2. MOBILE MENU TOGGLE ---
  const mobileMenuBtn = document.getElementById("mobile-menu");
  const navList = document.getElementById("nav-list");

  if (mobileMenuBtn && navList) {
    mobileMenuBtn.addEventListener("click", () => {
      navList.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll("#nav-list a").forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("active");
      });
    });
  }

  // --- 3. SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --- 4. SCROLL TO TOP BUTTON ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    };
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 5. INITIALIZE PARTICLES ---
  initCanvas();
});

// --- PARTICLE ANIMATION FUNCTION ---
function initCanvas() {
  const canvas = document.getElementById("canvas-bg");
  if (!canvas) return; // Exit safely if canvas is missing

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.directionX = Math.random() * 0.4 - 0.2;
      this.directionY = Math.random() * 0.4 - 0.2;
      this.size = Math.random() * 2 + 1;
    }
    update(color) {
      if (this.x > canvas.width || this.x < 0)
        this.directionX = -this.directionX;
      if (this.y > canvas.height || this.y < 0)
        this.directionY = -this.directionY;
      this.x += this.directionX;
      this.y += this.directionY;
      this.draw(color);
    }
    draw(color) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  function createParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = document.body.classList.contains("dark-mode");
    const particleColor = isDark
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(0, 0, 0, 0.5)";
    const lineColor = isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update(particleColor);
    }
    connect(lineColor);
  }

  function connect(color) {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance =
          (particlesArray[a].x - particlesArray[b].x) ** 2 +
          (particlesArray[a].y - particlesArray[b].y) ** 2;
        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  createParticles();
  animate();
}
