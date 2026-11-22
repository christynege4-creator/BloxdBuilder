try {
  const settings = JSON.parse(localStorage.getItem("bloxd.settings") || "{}");
  if (settings.theme === "light") {
    document.documentElement.classList.add("theme-light");
  }
} catch {
  // The home page settings controls report invalid saved settings.
}
