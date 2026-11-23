# Instructions for AI Agents and Editors

## Project rules

- This is a static website launcher. It must work by opening `index.html`
  directly. Do not add a Node.js server, build step, or required network service.
- Keep HTML, CSS, and JavaScript in their separate files.
- Keep all current website entries and URLs unless the user asks to change one.
- The page is intentionally read-only: one search box and clickable website
  cards. Do not add forms, list controls, sorting, counts, categories, or
  unrelated sections unless the user asks.
- Keep `tet0.png` and `tet1.png` in the project folder; they are used on TetOS.

The cards are generated from the `websites` array in `script.js`. `websites.list`
is the matching human-readable copy; editing it alone does not change the page.
This keeps `index.html` usable as a local file without a server to read external
text files.

## Add a website

1. Open `script.js` in a text editor.
2. Find `const websites = [` near the top.
3. Add one object inside the array. For example, put this just before the TetOS
   entry:

   ```js
   { name: "My Site", url: "https://example.com", icon: "✦" },
   ```

4. Add a comma after the object before it. Save `script.js` and refresh
   `index.html`.
5. Add the matching website to `websites.list` using this format:

   ```text
   https://example.com : "My Site"
   ```

If a name starts with the same emoji as its `icon`, as the current entries do,
the page shows that emoji once, as the icon, and leaves it out of the title.
The array and `websites.list` keep the full name.

The order of objects in the JavaScript array is the order of the cards. There is
no sort feature on the page. Search only filters which cards are visible.

## Decorate a special website

TetOS is the example special card. Its entry uses the `style` value `tetos`:

```js
{ name: "TetOS", url: "https://jenishpr100.github.io/TetOS", style: "tetos" }
```

The card receives the CSS class `.website-card--tetos`. Its dedicated design
block is clearly marked in `style.css`:

```css
/* SPECIAL WEBSITE DECORATION: edit this block to change the TetOS card. */
```

That block controls the TetOS colors, size, background glow, artwork, title, and
hover effect. Edit those rules to redecorate TetOS. The character images are
`tet0.png` and `tet1.png`. A second set of rules near the bottom of `style.css`
(inside the `max-width: 720px` media query) restacks the card for phones.

To give another website its own design:

1. Add `style: "my-site"` to that website's object in `script.js`.
2. Add a CSS block for `.website-card--my-site` in `style.css`.
3. For local images, place the files beside `index.html` and reference them in
   `script.js` or `style.css`.

## File guide

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and search box |
| `style.css` | Colors, type, layout (light and dark), and special card designs |
| `script.js` | Website entries, card creation, and search |
| `websites.list` | Human-readable copy of website links and names |
| `tet0.png` | Left TetOS character artwork |
| `tet1.png` | Right TetOS character artwork |

Keep all these files together so the styles and artwork load when `index.html`
is opened.
