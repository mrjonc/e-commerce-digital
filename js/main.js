document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector("i");

  // 1. Verifica se há tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  // 2. Evento de clique para alternar o tema
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isLightMode = document.body.classList.contains("dark-mode");

    // Troca o ícone conforme o tema
    if (isLightMode) {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "light");
    }
  });
});
