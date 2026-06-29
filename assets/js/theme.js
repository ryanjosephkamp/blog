const THEME_KEY = "paper-minimal-theme";
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const site = document.querySelector(".site");
const themeInputs = [...document.querySelectorAll("input[name='theme']")];

function setTheme(choice) {
  const resolved =
    choice === "system" ? (systemDark.matches ? "dark" : "light") : choice;
  document.documentElement.dataset.themeChoice = choice;
  document.documentElement.dataset.resolvedTheme = resolved;

  if (site) {
    site.dataset.themeChoice = choice;
    site.dataset.resolvedTheme = resolved;
  }

  localStorage.setItem(THEME_KEY, choice);

  for (const input of themeInputs) {
    input.checked = input.value === choice;
  }
}

for (const input of themeInputs) {
  input.addEventListener("change", () => setTheme(input.value));
}

systemDark.addEventListener("change", () => {
  const currentChoice =
    site?.dataset.themeChoice || localStorage.getItem(THEME_KEY) || "system";
  if (currentChoice === "system") {
    setTheme("system");
  }
});

setTheme(localStorage.getItem(THEME_KEY) || "system");
