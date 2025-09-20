// Apply saved theme on page load
window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme"); // "dark" or "light"
  const modeLabel = document.getElementById("mode");
  const checkbox = document.querySelector('input[type="checkbox"]');

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (modeLabel) modeLabel.innerHTML = "LIGHT MODE";
    if (checkbox) checkbox.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    if (modeLabel) modeLabel.innerHTML = "DARK MODE";
    if (checkbox) checkbox.checked = false;
  }
});

// Toggle theme and save to localStorage
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  const modeLabel = document.getElementById("mode");
  if (modeLabel) modeLabel.innerHTML = isDark ? "LIGHT MODE" : "DARK MODE";

  const checkbox = document.querySelector('input[type="checkbox"]');
  if (checkbox) checkbox.checked = isDark;
}
// Hamburger menu toggle
function toggleMenu() {
  document.getElementById("navbar").classList.toggle("show");
}

// Dropdown toggle
function toggleDropdown(button) {
  const dropdown = button.parentElement;
  document.querySelectorAll('.dropdown').forEach(d => {
    if (d !== dropdown) d.classList.remove('active');
  });
  dropdown.classList.toggle('active');
}

// Dark mode toggle with localStorage
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  if(document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "on");
  } else {
    localStorage.setItem("darkMode", "off");
  }
}

// Preserve dark mode on page load
window.addEventListener("load", () => {
  if(localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
  }
});
