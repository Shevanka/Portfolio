// --- NEW: DARK MODE TOGGLE (Safer Version) ---

// Wait for the HTML document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", (event) => {
  // Now it's safe to find these elements
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Exit if the toggle button isn't found
  if (!themeToggle) {
    console.error("Error: Could not find element with id 'theme-toggle'");
    return;
  }

  // 1. Check for saved theme in localStorage on page load
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.checked = true;
  }

  // 2. Add event listener to the toggle
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      // Add dark mode class and save preference
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      // Remove dark mode class and save preference
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });
});

// --- SMOOTH SCROLL FOR NAV LINKS ---
// (This was here before, but now we also make it close the mobile menu)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// --- NEW: MOBILE MENU TOGGLE ---
const menuToggle = document.getElementById("menu-toggle");

// --- NEW: SCROLL TO TOP BUTTON ---
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show or hide the button based on scroll position
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Scroll to top when the button is clicked
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// --- NEW: DARK MODE TOGGLE ---
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// 1. Check for saved theme in localStorage on page load
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.checked = true;
}

// 2. Add event listener to the toggle
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    // Add dark mode class and save preference
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    // Remove dark mode class and save preference
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});

// --- NEW: DYNAMIC BACKGROUND ANIMATION ---

const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Particle Class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.directionX = Math.random() * 0.4 - 0.2; // Speed X
    this.directionY = Math.random() * 0.4 - 0.2; // Speed Y
    this.size = Math.random() * 2 + 1; // Size between 1 and 3
  }

  // Method to draw individual particle
  draw(color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // Method to check particle position and update
  update(color) {
    // Check if particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;

    // Draw particle
    this.draw(color);
  }
}

// Create particle array
function initParticles() {
  particlesArray = [];
  // Calculate number of particles based on screen area (responsive)
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Animation Loop
function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  // Check current theme for colors
  const isDarkMode = document.body.classList.contains("dark-mode");
  const particleColor = isDarkMode
    ? "rgba(255, 255, 255, 0.5)"
    : "rgba(0, 0, 0, 0.5)";
  const lineColor = isDarkMode
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(particleColor);
  }

  connectParticles(lineColor);
}

// Draw lines between particles that are close enough
function connectParticles(color) {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);

      // If particles are close (distance < 20000 approx 140px)
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000;
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

// Start animation
initParticles();
animateParticles();
