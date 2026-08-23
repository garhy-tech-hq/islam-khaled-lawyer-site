try {
  const savedTheme = localStorage.getItem("gt-legal-theme");
  if (["day", "sunset", "night"].includes(savedTheme)) {
    document.documentElement.dataset.theme = savedTheme;
  }
} catch {}
