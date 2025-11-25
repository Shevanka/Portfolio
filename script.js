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

// --- (Your existing JavaScript code continues below) ---
// --- SMOOTH SCROLL FOR NAV LINKS ---
// ...
