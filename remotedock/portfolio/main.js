/* ===========================================
   TYPEWRITER
   =========================================== */

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runTypewriter() {
  const out    = document.getElementById('typewriter-output');
  const cursor = document.getElementById('tw-cursor');

  const projectList = (typeof PROJECTS !== 'undefined')
    ? PROJECTS.map(p => p.title.toLowerCase().replace(/ /g, '-') + '/').join('  ')
    : '';

  const LINES = [
    { text: 'ruben@portfolio:~$ ',            cls: 'tw-prompt'                                    },
    { text: 'whoami',                                    cls: 'tw-cmd',    typed: true, speed: 70 },
    { text: '\n'                                                                                  },
    { text: 'Ruben van der Veen',                        cls: 'tw-name'                           },
    { text: '\n'                                                                                  },
    { text: t('hero.tw.title'),    cls: 'tw-title'   },
    { text: '\n'                                                                                  },
    { text: t('hero.tw.subtitle'), cls: 'tw-output' },
    { text: '\n\n'                                                                                },
    { text: 'ruben@portfolio:~$ ',                       cls: 'tw-prompt'                         },
    { text: t('hero.tw.ls_projects'),                    cls: 'tw-cmd',    typed: true, speed: 60 },
    { text: '\n'                                                                                  },
    { text: projectList,                                 cls: 'tw-output'                         },
    { text: '\n\n'                                                                                },
    { text: 'ruben@portfolio:~$ ',                       cls: 'tw-prompt'                         },
    { text: 'ls links/',                                 cls: 'tw-cmd',    typed: true, speed: 60 },
    { text: '\n'                                                                                  },
    { trigger: 'show-links'                                                                       },
    { text: '\n'                                                                                  },
    { text: 'ruben@portfolio:~$ ',                       cls: 'tw-prompt'                         },
  ];

  for (const line of LINES) {
    if (line.trigger === 'show-links') {
      const heroLinks = document.getElementById('hero-links');
      if (heroLinks) {
        out.appendChild(heroLinks);   // move into output flow at this position
        heroLinks.classList.add('visible');
      }
      continue;
    }
    if (!line.cls) {
      out.insertAdjacentText('beforeend', line.text);
      continue;
    }

    const span = document.createElement('span');
    span.className = line.cls;
    out.appendChild(span);

    if (line.typed) {
      for (const ch of line.text) {
        span.textContent += ch;
        await sleep(line.speed);
      }
    } else {
      span.textContent = line.text;
    }
  }

  // Inline blinking cursor after the last prompt
  cursor.style.display = 'none';
  const inlineCursor = document.createElement('span');
  inlineCursor.className = 'tw-cursor';
  inlineCursor.textContent = '█';
  out.appendChild(inlineCursor);

}


/* ===========================================
   NEOFETCH
   =========================================== */

function renderNeofetch() {
  const el = document.getElementById('neofetch-content');
  if (!el) return;

  // Pad key labels to fixed width for alignment
  const pad = (s, n) => s + ' '.repeat(Math.max(0, n - s.length));

  const rows = [
    ['', '', `<span class="nf-title">ruben</span><span class="nf-sep">@</span><span class="nf-title">portfolio:~$</span><span style="color:var(--white)"> neofetch</span>`],
    ['', '', `<span class="nf-rule">──────────────────</span>`],
    ['nf-key', pad(t('nf.key.name'),      9), 'Ruben van der Veen'],
    ['nf-key', pad(t('nf.key.created'),   9), t('nf.val.created')],
    ['nf-key', pad(t('nf.key.location'),  9), `<span style="color:var(--orange)">${t('nf.val.location')}</span>`],
    ['nf-key', pad(t('nf.key.education'), 9), t('nf.val.education')],
    ['nf-key', pad(t('nf.key.languages'), 9), t('nf.val.languages')],
    ['nf-key', pad(t('nf.key.interests'), 9), t('nf.val.interests')],
    ['', '', `<span class="nf-rule">──────────────────</span>`],
    ['', '', `<span style="color:#ff5f57">███</span><span style="color:#febc2e">███</span><span style="color:#28c840">███</span><span style="color:#79c0ff">███</span><span style="color:#d2a8ff">███</span><span style="color:#ffa657">███</span>`],
  ];

  el.innerHTML = rows.map(([keyClass, key, val]) => {
    if (!keyClass) return val;
    return `<span class="${keyClass}">${key}</span><span class="nf-sep">: </span><span class="nf-val">${val}</span>`;
  }).join('\n');
}


/* ===========================================
   PROJECTS
   =========================================== */

function collectTags() {
  const seen = new Set();
  PROJECTS.forEach(p => p.tags.forEach(t => seen.add(t)));
  return [...seen].sort();
}

function renderFilters() {
  const wrap = document.getElementById('project-filters');
  collectTags().forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = tag;
    btn.textContent = tag;
    wrap.appendChild(btn);
  });

  wrap.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    wrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    // When filtering by a specific tag, always expand to show all matches
    applyVisibility(activeFilter, activeFilter !== 'all' ? true : projectsExpanded);
  });
}

// ── State ──────────────────────────────────────────
let activeFilter     = 'all';
let projectsExpanded = false;

function applyVisibility(tag, expanded) {
  document.querySelectorAll('.project-card').forEach(card => {
    const matchesTag  = tag === 'all' || card.dataset.tags.split(',').includes(tag);
    const isFeatured  = card.dataset.featured === 'true';
    const show        = matchesTag && (expanded || isFeatured);
    card.style.display = show ? '' : 'none';
  });

  const btn = document.getElementById('projects-expand-btn');
  if (!btn) return;
  const hiddenCount = [...document.querySelectorAll('.project-card')]
    .filter(c => c.dataset.featured === 'false').length;
  if (expanded || tag !== 'all') {
    btn.textContent = t('projects.expand.less');
    btn.dataset.state = 'expanded';
  } else {
    btn.textContent = t('projects.expand.more').replace('{n}', hiddenCount);
    btn.dataset.state = 'collapsed';
  }
}

function renderProjects() {
  const grid   = document.getElementById('projects-grid');
  const sorted = [...PROJECTS].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    // Sort by date descending (most recent first), fall back to title
    if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date);
    return a.title.localeCompare(b.title);
  });

  sorted.forEach(p => {
    const [statusCls, statusLabel] = STATUS_MAP[p.status] ?? STATUS_MAP.completed;
    const slug = p.title.toLowerCase().replace(/\s+/g, '-');

    // Card thumbnail: prefer images[0], fall back to image field
    const thumb = (p.images && p.images.length) ? p.images[0] : p.image;
    const imageHtml = thumb
      ? `<div class="project-image"><img src="${thumb}" alt="${p.title}" loading="lazy"></div>`
      : `<div class="project-image project-image-empty">[ no image yet ]</div>`;

    const linksHtml = [
      p.github && `<a href="${p.github}" target="_blank" rel="noopener" class="project-link">→ github</a>`,
      p.link   && `<a href="${p.link}"   target="_blank" rel="noopener" class="project-link">→ open</a>`,
    ].filter(Boolean).join('');

    const tagsHtml = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

    const card = document.createElement('div');
    card.className        = 'project-card';
    card.dataset.tags     = p.tags.join(',');
    card.dataset.featured = String(p.featured);

    card.innerHTML = `
      <a href="project.html?id=${slug}" class="card-link-overlay" aria-label="View ${p.title} details"></a>
      <div class="card-header">
        <div class="pin-housing">
          <span class="pin-contact"></span>
          <span class="pin-contact"></span>
          <span class="pin-contact"></span>
        </div>
        <span class="card-title">${slug}/</span>
      </div>
      ${imageHtml}
      <div class="project-body">
        <div class="project-header">
          <span class="project-title">${p.title}</span>
          <span class="project-status ${statusCls}"><span class="led"></span>${statusLabel}</span>
        </div>
        <div class="project-subtitle">${p.subtitle}</div>
        <div class="project-description">${p.description}</div>
        <div class="project-tags">${tagsHtml}</div>
        <div class="project-links">${linksHtml}</div>
      </div>`;

    if (!p.featured) card.style.display = 'none';
    grid.appendChild(card);
  });

  // ── Expand / collapse button ──────────────────────
  const hiddenCount = sorted.filter(p => !p.featured).length;
  if (hiddenCount > 0) {
    const section = document.getElementById('projects');
    const expandBtn = document.createElement('button');
    expandBtn.id           = 'projects-expand-btn';
    expandBtn.className    = 'expand-btn';
    expandBtn.dataset.state = 'collapsed';
    expandBtn.textContent  = t('projects.expand.more').replace('{n}', hiddenCount);
    expandBtn.addEventListener('click', () => {
      projectsExpanded = !projectsExpanded;
      applyVisibility(activeFilter, projectsExpanded);
    });
    section.appendChild(expandBtn);
  }
}


/* ===========================================
   EXPERIENCE TIMELINE
   =========================================== */

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;
  container.innerHTML = '';

  if (typeof EXPERIENCE === 'undefined' || !EXPERIENCE.length) {
    container.innerHTML = '<p class="tl-empty c-dim">// no entries yet</p>';
    return;
  }

  const lang     = getCurrentLang();
  const PX_PER_YEAR = 120;
  const CURR     = new Date().getFullYear();
  const yn       = y => (y === 'present' ? CURR : parseInt(y, 10));

  // All unique year values across all entries, sorted descending (present first)
  const yearVals = [...new Set(EXPERIENCE.flatMap(e => [e.year, e.yearEnd].filter(Boolean)))]
    .sort((a, b) => yn(b) - yn(a));

  const maxYN  = yn(yearVals[0]);
  const minYN  = yn(yearVals[yearVals.length - 1]);
  const totalH = (maxYN - minYN) * PX_PER_YEAR;
  const toY    = y => (maxYN - yn(y)) * PX_PER_YEAR;

  const workEntries = EXPERIENCE.filter(e => (e.type || 'work') === 'work');
  const eduEntries  = EXPERIENCE.filter(e => e.type === 'education');
  const workYears   = new Set(workEntries.flatMap(e => [e.year, e.yearEnd].filter(Boolean)));
  const eduYears    = new Set(eduEntries.flatMap(e => [e.year, e.yearEnd].filter(Boolean)));

  // Track label header
  const hdr = document.createElement('div');
  hdr.className = 'tl-gantt-hdr';
  hdr.innerHTML = `
    <span class="tl-track-label">${t('timeline.work')}</span>
    <span></span>
    <span class="tl-track-label">${t('timeline.education')}</span>
  `;
  container.appendChild(hdr);

  // Outer flex row
  const gantt    = document.createElement('div');
  gantt.className = 'tl-gantt';

  const workTrack = document.createElement('div');
  workTrack.className = 'tl-gtrack tl-gtrack-work';
  workTrack.style.height = totalH + 'px';

  const spine = document.createElement('div');
  spine.className = 'tl-spine';
  spine.style.height = totalH + 'px';

  const eduTrack = document.createElement('div');
  eduTrack.className = 'tl-gtrack tl-gtrack-edu';
  eduTrack.style.height = totalH + 'px';

  // Year markers, dots, and horizontal connectors on the spine
  yearVals.forEach(year => {
    const y       = toY(year);
    const hasWork = workYears.has(year);
    const hasEdu  = eduYears.has(year);

    const ym = document.createElement('div');
    ym.className = 'tl-ym';
    ym.style.top = y + 'px';
    ym.textContent = year;
    spine.appendChild(ym);

    if (hasWork) {
      const c = document.createElement('div');
      c.className = 'tl-conn tl-conn-left';
      c.style.top = y + 'px';
      spine.appendChild(c);
    }
    if (hasEdu) {
      const c = document.createElement('div');
      c.className = 'tl-conn tl-conn-right';
      c.style.top = y + 'px';
      spine.appendChild(c);
    }
  });

  // Place entry bars and content in each track
  function renderEntries(entries, track) {
    entries.forEach(entry => {
      const topY   = toY(entry.yearEnd || entry.year);
      const botY   = toY(entry.year);
      const height = botY - topY;
      const titleText = (lang === 'nl' && entry.titleNL)       ? entry.titleNL       : entry.title;
      const descText  = (lang === 'nl' && entry.descriptionNL) ? entry.descriptionNL : entry.description;

      // Vertical bar for this entry's duration
      const bar = document.createElement('div');
      bar.className = 'tl-gbar';
      bar.style.top    = topY + 'px';
      bar.style.height = height + 'px';
      track.appendChild(bar);

      // Content block
      const tagsHtml = (entry.tags && entry.tags.length)
        ? `<div class="timeline-tags">${entry.tags.map(tg => `<span class="tag">${tg}</span>`).join('')}</div>`
        : '';

      const content = document.createElement('div');
      content.className = 'tl-gcontent';
      content.style.top    = topY + 'px';
      content.style.height = height + 'px';
      content.innerHTML = `<div class="tl-ginner">
        ${titleText        ? `<span class="tl-title">${titleText}</span>`                  : ''}
        ${entry.organization ? `<span class="tl-org">${entry.organization}</span>`         : ''}
        ${entry.period     ? `<span class="tl-period">${entry.period}</span>`              : ''}
        ${descText         ? `<p class="tl-desc">${descText}</p>`                          : ''}
        ${tagsHtml}
      </div>`;
      track.appendChild(content);
    });
  }

  renderEntries(workEntries, workTrack);
  renderEntries(eduEntries,  eduTrack);

  gantt.appendChild(workTrack);
  gantt.appendChild(spine);
  gantt.appendChild(eduTrack);
  container.appendChild(gantt);
}


/* ===========================================
   LIGHTBOX (shared by timeline images)
   =========================================== */

function openLightbox(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('open');
}

function initLightbox() {
  const lb    = document.getElementById('lightbox');
  const close = document.getElementById('lightbox-close');
  const img   = document.getElementById('lightbox-img');
  if (!lb) return;

  const closeFn = () => lb.classList.remove('open');
  close?.addEventListener('click', closeFn);
  lb.addEventListener('click', e => { if (e.target !== img) closeFn(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFn(); });
}


/* ===========================================
   PCB BACKGROUND
   =========================================== */

function initPCBBackground() {
  const canvas = document.getElementById('pcb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Constants ────────────────────────────────────
  const GRID      = 52;          // grid cell size (px)
  const BUS_X     = 32;          // left-side vertical bus x-position
  const CHAMFER   = 10;          // 45° corner size on L-shaped routes
  const DIM       = 'rgba(40, 200, 64, ';  // base colour prefix

  // IDs of section node elements (for branch trace targets)
  const NODE_IDS = ['node-about', 'node-projects', 'node-skills', 'node-experience', 'node-contact'];

  // ── Canvas resize ─────────────────────────────────
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = Math.round(window.innerWidth  * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildRoutes();
  }

  // ── Route generation — L-shaped PCB traces ────────
  // Each route has: segments (H/V/45°), end-pads, optional via at corner
  let routes = [];

  function buildRoutes() {
    routes = [];
    const cols = Math.ceil(window.innerWidth  / GRID);
    const rows = Math.ceil(window.innerHeight / GRID);
    const count = Math.floor((cols * rows) / 2.2);

    for (let i = 0; i < count; i++) {
      const x1 = Math.floor(Math.random() * cols) * GRID;
      const y1 = Math.floor(Math.random() * rows) * GRID;

      // Short routes (1–3 grid cells) look more PCB-like
      const dx = (Math.floor(Math.random() * 5) + 1) * GRID * (Math.random() < 0.5 ? 1 : -1);
      const dy = (Math.floor(Math.random() * 5) + 1) * GRID * (Math.random() < 0.5 ? 1 : -1);
      const x2 = x1 + dx;
      const y2 = y1 + dy;

      // Skip routes that go off screen
      if (x2 < 0 || x2 > window.innerWidth || y2 < 0 || y2 > window.innerHeight) continue;

      const segs = [];

      if (x1 === x2) {
        segs.push({ x1, y1, x2, y2 });
      } else if (y1 === y2) {
        segs.push({ x1, y1, x2, y2 });
      } else {
        // L-shape with a 45° chamfer at the corner
        // Corner is at (x2, y1): go H first, then V
        const cx = x2, cy = y1;
        const chamX = cx + (x1 < x2 ? -CHAMFER :  CHAMFER);
        const chamY = cy + (y2 > y1 ?  CHAMFER : -CHAMFER);

        segs.push({ x1,    y1,    x2: chamX, y2: cy    }); // H
        segs.push({ x1: chamX, y1: cy, x2: cx,   y2: chamY }); // 45°
        segs.push({ x1: cx,   y1: chamY, x2,    y2    }); // V
      }

      const via = (x1 !== x2 && y1 !== y2 && Math.random() < 0.45)
        ? { x: x2, y: y1 }
        : null;

      routes.push({ segs, pads: [{ x: x1, y: y1 }, { x: x2, y: y2 }], via });
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ── Animated current packets ───────────────────────
  const MAX_PACKETS = 10;
  let packets = [];

  function spawnPacket() {
    if (packets.length >= MAX_PACKETS || !routes.length) return;
    const route = routes[Math.floor(Math.random() * routes.length)];
    const seg   = route.segs[Math.floor(Math.random() * route.segs.length)];
    packets.push({ seg, t: 0, speed: 0.003 + Math.random() * 0.005, alpha: 0.5 + Math.random() * 0.5 });
  }

  for (let i = 0; i < 6; i++) spawnPacket();

  // ── Draw helpers ───────────────────────────────────

  function drawVia(x, y, baseAlpha) {
    // Annular ring — outer copper fill, inner drill hole
    ctx.beginPath();
    ctx.arc(x, y, 5.5, 0, Math.PI * 2);
    ctx.fillStyle   = DIM + (baseAlpha * 0.25) + ')';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 5.5, 0, Math.PI * 2);
    ctx.strokeStyle = DIM + (baseAlpha * 0.6) + ')';
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    // Inner drill hole (shows board colour)
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14,14,14,0.95)';
    ctx.fill();
  }

  function drawPad(x, y, baseAlpha) {
    // SMD pad — small filled circle
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = DIM + (baseAlpha * 0.5) + ')';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.strokeStyle = DIM + (baseAlpha * 0.7) + ')';
    ctx.lineWidth   = 0.75;
    ctx.stroke();
  }

  function drawSeg(seg, alpha, width, glow) {
    ctx.beginPath();
    ctx.moveTo(seg.x1, seg.y1);
    ctx.lineTo(seg.x2, seg.y2);
    ctx.strokeStyle = DIM + alpha + ')';
    ctx.lineWidth   = width;
    if (glow) { ctx.shadowColor = '#28c840'; ctx.shadowBlur = glow; }
    ctx.stroke();
    if (glow) ctx.shadowBlur = 0;
  }

  // ── Main bus (vertical trace on left edge) ─────────

  function drawBus() {
    const scrollFrac = window.scrollY /
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    // Lit portion extends from top to scrollFrac of the viewport height, plus a small lead-in
    const litY = Math.min(window.innerHeight, window.innerHeight * scrollFrac + window.innerHeight * 0.18);

    // Dim unlit portion
    ctx.beginPath();
    ctx.moveTo(BUS_X, 0);
    ctx.lineTo(BUS_X, window.innerHeight);
    ctx.strokeStyle = 'rgba(40,200,64,0.25)';
    ctx.lineWidth   = 2;
    ctx.stroke();

    // Bright lit portion
    if (litY > 0) {
      ctx.beginPath();
      ctx.moveTo(BUS_X, 0);
      ctx.lineTo(BUS_X, litY);
      ctx.strokeStyle = 'rgba(40,200,64,0.55)';
      ctx.lineWidth   = 2;
      ctx.shadowColor = '#28c840';
      ctx.shadowBlur  = 8;
      ctx.stroke();
      ctx.shadowBlur  = 0;
    }

    // Bus pad every 3 grid cells
    const rows = Math.ceil(window.innerHeight / GRID);
    for (let r = 0; r <= rows; r += 3) {
      const py     = r * GRID;
      const isLit  = py <= litY;
      drawPad(BUS_X, py, isLit ? 0.55 : 0.15);
    }
  }

  // ── Branch traces from bus → section node LEDs ─────

  function drawBranches() {
    NODE_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > canvas.height) return; // off screen

      const nodeY  = Math.round(rect.top + rect.height / 2);
      const nodeX  = Math.round(rect.left);
      const active = el.closest('section')?.classList.contains('section-active');
      const alpha  = active ? 0.85 : 0.18;
      const width  = active ? 1.5  : 1;
      const glow   = active ? 7    : 0;

      // Horizontal branch: BUS_X → node left edge
      // Use a short 45° departure from the bus for a more PCB-like look
      const deparY  = nodeY;
      const deparX  = BUS_X + 12;                       // a short H run off the bus
      const seg1    = { x1: BUS_X + 2, y1: deparY, x2: deparX, y2: deparY };   // tiny H off bus
      const seg2    = { x1: deparX, y1: deparY, x2: nodeX - 2, y2: deparY }; // main H to node

      drawSeg(seg1, alpha, width, glow);
      drawSeg(seg2, alpha, width, glow);

      // Pad at bus junction
      drawPad(BUS_X, deparY, alpha);
      // Pad at node end
      drawPad(nodeX - 2, nodeY, alpha);
    });
  }

  // ── Main draw loop ─────────────────────────────────

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // ── Background trace network ──
    ctx.lineWidth   = 1;
    routes.forEach(route => {
      route.segs.forEach(seg => drawSeg(seg, 0.48, 1.5, 0));
      route.pads.forEach(p  => drawPad(p.x, p.y, 0.55));
      if (route.via) drawVia(route.via.x, route.via.y, 0.75);
    });

    // ── Bus ──
    drawBus();

    // ── Section branches ──
    drawBranches();

    // ── Animated current packets ──
    for (let i = packets.length - 1; i >= 0; i--) {
      const pk = packets[i];
      pk.t += pk.speed;
      if (pk.t > 1) { packets.splice(i, 1); spawnPacket(); continue; }

      const x = pk.seg.x1 + (pk.seg.x2 - pk.seg.x1) * pk.t;
      const y = pk.seg.y1 + (pk.seg.y2 - pk.seg.y1) * pk.t;

      const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
      g.addColorStop(0,   `rgba(40, 200, 64, ${pk.alpha})`);
      g.addColorStop(0.4, `rgba(40, 200, 64, ${pk.alpha * 0.3})`);
      g.addColorStop(1,   'rgba(40, 200, 64, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}


/* ===========================================
   SECTION LEDs — IntersectionObserver
   =========================================== */

function initSectionLEDs() {
  const sections = document.querySelectorAll('section:not(#hero)');
  const io = new IntersectionObserver(
    entries => entries.forEach(e =>
      e.target.classList.toggle('section-active', e.isIntersecting)
    ),
    { threshold: 0.15 }
  );
  sections.forEach(s => io.observe(s));
}


/* ===========================================
   OSCILLOSCOPE
   =========================================== */

function initOscilloscope() {
  const canvas = document.getElementById('osc-canvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  const COLOR  = '#39d353';
  let   phase  = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function drawGrid() {
    const w = canvas.width, h = canvas.height;
    ctx.strokeStyle = 'rgba(40, 200, 64, 0.15)';
    ctx.lineWidth   = 0.5;
    const divX = w / 10, divY = h / 6;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(i * divX, 0); ctx.lineTo(i * divX, h); ctx.stroke();
    }
    for (let i = 0; i <= 6; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * divY); ctx.lineTo(w, i * divY); ctx.stroke();
    }
    // Centre tick marks
    ctx.strokeStyle = 'rgba(40, 200, 64, 0.30)';
    ctx.lineWidth   = 1;
    const cx = w / 2, cy = h / 2;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(i * divX, cy - 3); ctx.lineTo(i * divX, cy + 3); ctx.stroke();
    }
    for (let i = 0; i <= 6; i++) {
      ctx.beginPath(); ctx.moveTo(cx - 3, i * divY); ctx.lineTo(cx + 3, i * divY); ctx.stroke();
    }
  }

  function drawWave() {
    const w = canvas.width, h = canvas.height;
    const amp = h * 0.36, cy = h / 2, cycles = 3;

    // Wide glow pass
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(57, 211, 83, 0.10)';
    ctx.lineWidth   = 10;
    for (let x = 0; x <= w; x++) {
      const y = cy - amp * Math.sin((x / w) * cycles * Math.PI * 2 + phase);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Bright inner line
    ctx.beginPath();
    ctx.strokeStyle  = COLOR;
    ctx.lineWidth    = 1.5;
    ctx.shadowColor  = COLOR;
    ctx.shadowBlur   = 7;
    for (let x = 0; x <= w; x++) {
      const y = cy - amp * Math.sin((x / w) * cycles * Math.PI * 2 + phase);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawGrid();
    drawWave();
    phase += 0.035;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}


/* ===========================================
   SCROLL REVEAL
   =========================================== */

function initScrollReveal() {
  const sections = document.querySelectorAll('section:not(#hero)');
  // Apply hidden state via JS — sections are visible by default if JS fails
  sections.forEach(s => s.classList.add('will-animate'));

  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0, rootMargin: '0px 0px -60px 0px' }
  );
  sections.forEach(s => io.observe(s));
}


/* ===========================================
   NAVBAR SCROLL TINT
   =========================================== */

function initNavbar() {
  const nav = document.getElementById('navbar');
  const update = () => {
    nav.style.borderBottomColor = window.scrollY > 20
      ? 'var(--border)'
      : 'transparent';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ===========================================
   INIT
   =========================================== */

/* ===========================================
   CONTACT FORM — n8n webhook → ntfy
   =========================================== */

function initContactForm() {
  const form   = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submit = form.querySelector('.form-submit');

  const WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      status.textContent = t('contact.required');
      status.className = 'form-status error';
      return;
    }

    submit.disabled     = true;
    submit.textContent  = t('contact.sending');
    status.textContent  = '';
    status.className    = 'form-status';

    try {
      const res = await fetch(WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error('server error');

      status.textContent = t('contact.success');
      status.className   = 'form-status success';
      form.reset();
    } catch {
      status.textContent = t('contact.error');
      status.className   = 'form-status error';
    } finally {
      submit.disabled    = false;
      submit.textContent = t('contact.submit');
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  renderNeofetch();
  renderFilters();
  renderProjects();
  renderTimeline();
  initScrollReveal();
  initSectionLEDs();
  initNavbar();
  // initPCBBackground(); — disabled, to be redesigned
  initOscilloscope();
  runTypewriter();
  initContactForm();
  initLightbox();
});

window.addEventListener('languagechange', () => {
  renderNeofetch();
  renderTimeline();
  // Update expand button text for the current state
  const expandBtn = document.getElementById('projects-expand-btn');
  if (expandBtn) applyVisibility(activeFilter, projectsExpanded);
});
