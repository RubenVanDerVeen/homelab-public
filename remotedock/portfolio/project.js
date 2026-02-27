/* ===========================================
   PROJECT DETAIL PAGE
   Reads ?id=<slug> from URL, renders full project view.
   Depends on projects.js + translations.js being loaded first.
   =========================================== */

(function () {
  const slug    = new URLSearchParams(window.location.search).get('id') || '';
  const project = PROJECTS.find(p =>
    p.title.toLowerCase().replace(/\s+/g, '-') === slug
  );

  // ── Not found ────────────────────────────────────
  if (!project) {
    document.title = 'Project not found — Ruben van der Veen';
    document.getElementById('detail-slug').textContent = 'projects/404.md';
    document.getElementById('detail-body').innerHTML = `
      <p class="c-dim" style="margin-top:2rem;">
        // project <span class="c-orange">${slug || '(unknown)'}</span> not found
      </p>
      <a href="index.html#projects" class="back-link" style="margin-top:1rem;">← cd ../projects/</a>`;
    return;
  }

  // ── Update page title & header ────────────────────
  const displaySlug = project.title.toLowerCase().replace(/\s+/g, '-');
  document.title = `${project.title} — Ruben van der Veen`;
  document.getElementById('detail-slug').textContent = `projects/${displaySlug}.md`;

  // ── Gallery (static — same in all languages) ─────
  const galleryImages = (project.images && project.images.length)
    ? project.images
    : (project.image ? [project.image] : []);

  const galleryHtml = galleryImages.length
    ? galleryImages.map(src =>
        `<img src="${src}" alt="${project.title}" loading="lazy">`
      ).join('')
    : `<div class="detail-gallery-empty">[ no images yet ]</div>`;

  // ── Tags + links (static) ─────────────────────────
  const tagsHtml = project.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');

  const linksHtml = [
    project.github && `<a href="${project.github}" target="_blank" rel="noopener" class="project-link">→ github</a>`,
    project.link   && `<a href="${project.link}"   target="_blank" rel="noopener" class="project-link">→ open</a>`,
  ].filter(Boolean).join('');

  // ── Render translatable content ───────────────────
  function renderProject() {
    const lang = (typeof getCurrentLang === 'function') ? getCurrentLang() : 'en';

    const [statusCls, statusLabel] = STATUS_MAP[project.status] ?? STATUS_MAP.completed;

    // Subtitle: use NL override if available, else fall back to EN
    const subtitle = (lang === 'nl' && project.subtitleNL) ? project.subtitleNL : project.subtitle;

    // Long description: NL override or EN, then split into paragraphs
    const rawDesc = (lang === 'nl' && project.longDescriptionNL)
      ? project.longDescriptionNL
      : (project.longDescription || project.description);
    const longDescHtml = rawDesc
      .split(/\n\n+/)
      .map(p => `<p>${p.trim()}</p>`)
      .join('');

    // Features: NL override or EN
    const featureList = (lang === 'nl' && project.featuresNL && project.featuresNL.length)
      ? project.featuresNL
      : (project.features || []);
    const featuresHtml = featureList.length
      ? `<ul class="detail-features">${featureList.map(f => `<li>${f}</li>`).join('')}</ul>`
      : '';

    document.getElementById('detail-body').innerHTML = `
      <div class="detail-grid">

        <div class="detail-gallery">
          ${galleryHtml}
        </div>

        <div class="detail-content">
          <div class="detail-meta">
            <span class="project-title" style="font-size:1.15rem;">${project.title}</span>
            <span class="project-status ${statusCls}">
              <span class="led"></span>${statusLabel}
            </span>
          </div>

          <div class="project-subtitle">${subtitle}</div>

          <div class="detail-long-desc">
            ${longDescHtml}
          </div>

          ${featuresHtml}

          <div class="project-tags">${tagsHtml}</div>

          ${linksHtml ? `<div class="project-links">${linksHtml}</div>` : ''}
        </div>

      </div>`;

    // Re-attach lightbox handlers after re-render
    attachLightbox();
  }

  // ── Lightbox ──────────────────────────────────────
  const lightbox = document.createElement('div');
  lightbox.id    = 'lightbox';
  lightbox.innerHTML = '<img id="lightbox-img" src="" alt=""><span id="lightbox-close">✕</span>';
  document.body.appendChild(lightbox);

  const lbImg   = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function attachLightbox() {
    document.querySelectorAll('.detail-gallery img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });
  }

  lightbox.addEventListener('click', e => { if (e.target !== lbImg) closeLightbox(); });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // ── Navbar scroll behaviour ───────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Initial render + language-change re-render ────
  renderProject();
  window.addEventListener('languagechange', renderProject);
})();
