"use strict";

/*
  The website cards are read from websites.list (same folder).
  Each line looks like:   https://example.com : "🎲 My Site"
  - A leading emoji in the name becomes the card icon.
  - Blank lines and lines starting with # are ignored.
  - TetOS is always shown last, whatever line it is on.
*/
let websites = [];

const grid = document.getElementById("website-grid");
const search = document.getElementById("search");
const noResults = document.getElementById("no-results");

const LEADING_EMOJI = /^\p{Extended_Pictographic}[\uFE0F\u200D\p{Extended_Pictographic}]*/u;

// Turn websites.list text into card objects.
function parseWebsites(text) {
  const sites = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^(\S+)\s*:\s*"(.*)"$/);
    if (!match) continue;
    const [, url, name] = match;
    const emoji = name.match(LEADING_EMOJI);
    const site = { name, url, icon: emoji ? emoji[0] : "" };
    if (/tetos/i.test(name)) site.style = "tetos";
    sites.push(site);
  }
  // TetOS always goes last.
  return [...sites.filter((s) => !s.style), ...sites.filter((s) => s.style)];
}

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

fetch("websites.list", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(response.status);
    return response.text();
  })
  .then((text) => {
    websites = parseWebsites(text);
    renderWebsites();
  })
  .catch(() => {
    noResults.textContent = "Could not load websites.list. Open this page from a web server (or GitHub Pages), not by double-clicking the file.";
    noResults.hidden = false;
  });
