document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector("i");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    if (isDark) {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "light");
    }
  });
});
