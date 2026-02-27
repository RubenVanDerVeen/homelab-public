# Portfolio — File Overview

Personal portfolio site for `portfolio.rvdv-lab.nl`.
Served by an `nginx:alpine` Docker container on RemoteDock (VM 101).
Deploy with: `bash deploy.sh`

> **Note — public repo omissions**
> This is the sanitized public copy. The following are intentionally absent:
> - `deploy.sh` — contains server-specific SSH host and path details
> - `Images/` — contains personal photos; image fields in `projects.js` reference these paths but the files themselves are not published
> - `main.js` contact form webhook URL is replaced with a placeholder — swap in your own n8n (or other) webhook URL before deploying

---

## Files

### `index.html`
The single-page app shell. Contains all sections: hero, about, skills, experience, projects, and contact.
Translatable text uses `data-i18n`, `data-i18n-html`, and `data-i18n-placeholder` attributes — the `translations.js` helpers swap the content when the language is changed.

### `style.css`
All styling for the site. Organised top-to-bottom by section, matching the order in `index.html`.
Uses CSS custom properties (`--bg`, `--accent`, `--border`, etc.) defined in `:root` for the dark/PCB colour theme.

### `main.js`
Runs on `DOMContentLoaded` and wires everything up:
- `renderProjects()` — reads `projects.js` and builds the project cards + expand toggle
- `renderTimeline()` — reads `experience.js` and builds the gantt-style experience timeline
- `initLightbox()` — shared image lightbox used by timeline and project detail pages
- `initScrollReveal()` — fade-in animation for sections as they scroll into view
- `initSectionLEDs()` — activates the PCB-style LED components in section headers
- Contact form — sends a `POST` to the n8n webhook, shows status feedback

### `project.html`
Detail page for individual projects. Loaded as `project.html?id=<slug>`.
Rendered by `project.js` using the matching entry from `projects.js`.

### `project.js`
Reads the `?id=` query parameter, finds the matching project in `projects.js`, and renders the full detail view (long description, features list, image gallery, tags, links).

### `projects.js`
Data file for the projects section. Exports a global `PROJECTS` array.
Each object is one project card. Fields are documented at the top of the file.
Featured projects (3) are shown by default; the rest are hidden behind the expand button.
Add NL translations via `subtitleNL`, `longDescriptionNL`, and `featuresNL` fields.

### `experience.js`
Data file for the experience timeline. Exports a global `EXPERIENCE` array.
Each object is one timeline entry. Fields are documented at the top of the file.
Entries with `type: "work"` appear on the left track; `type: "education"` on the right.
`year` is the start year, `yearEnd` is the end year (`"present"` for ongoing).
The gantt layout in `main.js` uses these to calculate proportional heights (120 px/year).

### `translations.js`
All UI strings for EN and NL. Exports a `TRANSLATIONS` object and three helpers:
- `t(key)` — returns the translated string, falling back to English if the NL value is empty
- `getCurrentLang()` — reads the active language from `localStorage`
- `setLanguage(lang)` — applies a language to all `data-i18n` elements and fires a `languagechange` event so dynamic sections (timeline, projects) can re-render

NL values are mostly empty strings — fill them in to activate Dutch for that string.

### `favicon.svg`
IC chip (DIP package) icon in green/dark theme. Inlined SVG used as the browser tab icon.

### `deploy.sh` *(not in this repo)*
Rsync script that pushes all portfolio files to the RemoteDock server.
Contains server-specific SSH host and path details so it is kept out of the public repo.

---

## `Images/` *(not in this repo)*

Personal photos and project screenshots referenced by `projects.js` via the `images` field.
Not published — add your own images here and update the `images` arrays in `projects.js` accordingly.
