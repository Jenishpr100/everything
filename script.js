"use strict";

/*
  ADD OR EDIT WEBSITES HERE.
  Keep the entries in the order you want them to appear.
  See README.md before adding a custom design.
*/
const websites = [
  { name: "🎲 Guessing Number", url: "https://jenishpr100.github.io/GuessingNumber/", icon: "🎲" },
  { name: "⏳ Timestamp Calculator", url: "https://jenishpr100.github.io/Timestamp-Calculator/", icon: "⏳" },
  { name: "🧾 Job Application", url: "https://jenishpr100.github.io/JobApplication/", icon: "🧾" },
  { name: "🕐 Stop Watch", url: "https://jenishpr100.github.io/StopWatch/", icon: "🕐" },
  { name: "🌍 Africa Map", url: "https://jenishpr100.github.io/Africa/", icon: "🌍" },
  { name: "🎰 Gambling", url: "https://jenishpr100.github.io/gambling/", icon: "🎰" },
  { name: "📢 Spam Practice", url: "https://jenishpr100.github.io/SpamPractice/", icon: "📢" },
  { name: "🔫 Russian Roulette", url: "https://jenishpr100.github.io/RussianRoulette/index.html", icon: "🔫" },
  { name: "🤖 Guessing With AI", url: "https://jenishpr100.github.io/GuessingWithAI/", icon: "🤖" },
  { name: "🗣️ Translator", url: "https://jenishpr100.github.io/Translator//", icon: "🗣️" },
  { name: "TetOS", url: "https://jenishpr100.github.io/TetOS", style: "tetos" }
];

const grid = document.getElementById("website-grid");
const search = document.getElementById("search");
const noResults = document.getElementById("no-results");

// Names in the list start with the same emoji as their icon, so show it only once.
function displayName(site) {
  return site.icon && site.name.startsWith(site.icon) ? site.name.slice(site.icon.length).trim() : site.name;
}

function createWebsiteCard(site) {
  const label = displayName(site);
  const card = document.createElement("a");
  card.className = "website-card";
  if (site.style) card.classList.add(`website-card--${site.style}`);
  card.href = site.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.setAttribute("aria-label", `Open ${label} in a new tab`);

  const icon = document.createElement("span");
  icon.className = "website-icon";
  icon.setAttribute("aria-hidden", "true");

  if (site.style === "tetos") {
    for (const imageName of ["tet0.png", "tet1.png"]) {
      const image = document.createElement("img");
      image.src = imageName;
      image.alt = "";
      icon.append(image);
    }
  } else {
    icon.textContent = site.icon || site.name.trim().charAt(0).toUpperCase();
  }

  const copy = document.createElement("span");
  copy.className = "website-copy";

  const name = document.createElement("span");
  name.className = "website-name";
  name.textContent = label;

  const address = document.createElement("span");
  address.className = "website-url";
  address.textContent = site.url.replace(/^https?:\/\//i, "");
  copy.append(name, address);

  const arrow = document.createElement("span");
  arrow.className = "website-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  card.append(icon, copy, arrow);
  return card;
}

function renderWebsites() {
  const query = search.value.trim().toLocaleLowerCase();
  const matches = websites.filter((site) => `${site.name} ${site.url}`.toLocaleLowerCase().includes(query));
  grid.replaceChildren(...matches.map(createWebsiteCard));
  noResults.hidden = matches.length > 0;
}

search.addEventListener("input", renderWebsites);
document.addEventListener("keydown", (event) => {
  const activeElement = document.activeElement;
  const typing = activeElement && /INPUT|TEXTAREA/.test(activeElement.tagName);
  if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !typing) {
    event.preventDefault();
    search.focus();
  }
});

renderWebsites();
