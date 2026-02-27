/* ===========================================
   TRANSLATIONS — i18n for EN / NL
   =========================================== */

const TRANSLATIONS = {
  /* ===========================================
   English
   =========================================== */
  en: {
    // ── Nav ──────────────────────────────────────
    'nav.about':       './about',
    'nav.projects':    './projects',
    'nav.skills':      './skills',
    'nav.experience':  './experience',
    'nav.contact':     './contact',

    // ── Hero ─────────────────────────────────────
    'hero.scroll': 'scroll to explore',

    // ── About ─────────────────────────────────────
    'about.p1':     `Hey, I'm <span class="c-blue">Ruben van der Veen</span>. I'm 21 and an Electrical Engineering student at NHL Stenden in the Netherlands, with a background in Mechatronics Engineering at Firda. I enjoy building things: from designing parts for 3D printing to embedded systems, self hosted Linux infrastructure and AI-powered automation pipelines.`,
    'about.p2':     'In my free time I like to do a lot of different things, such as:',
    'about.list.1': 'Tinkering with my homelab',
    'about.list.2': 'Working on hardware projects like a DIY powerbank or programmable Christmas lights',
    'about.list.3': 'Exploring music',
    'about.list.4': 'Enjoying drives, car meets, or working on my own cars',

    // ── Neofetch — key labels ─────────────────────
    'nf.key.name':      'Name',
    'nf.key.created':   'Created',
    'nf.key.location':  'Location',
    'nf.key.education': 'Education',
    'nf.key.languages': 'Languages',
    'nf.key.interests': 'Interests',

    // ── Neofetch — values ─────────────────────────
    'nf.val.location':  'Ferwert, Netherlands',
    'nf.val.created':   '13-07-2004 (21 years ago)',
    'nf.val.education': 'HBO Electrical Engineering\n           MBO Mechatronics Engineering',
    'nf.val.languages': 'Dutch (mother tongue)\n           English',
    'nf.val.interests': 'Electronics, Self-hosting,\n           3D printing & Cars',

    // ── Skills — category titles ──────────────────
    'skills.cat.technical': '# Technical',
    'skills.cat.soft':      '# Soft Skills',
    'skills.cat.tools':     '# Tools & Technologies',

    // ── Skills — dividers ─────────────────────────
    'skills.div.eda':    'EDA & Simulation',
    'skills.div.design': 'CAD Design',
    'skills.div.dev':    'Development',
    'skills.div.docs':   'Documentation',
    'skills.div.infra':  'Digital Infrastructure',

    // ── Skills — technical items ──────────────────
    'skills.tech.1': 'Electronics & Embedded Systems',
    'skills.tech.2': 'Digital Logic Design (VHDL)',
    'skills.tech.3': 'PCB Design & Prototyping',
    'skills.tech.4': '3D designing & 3D printing',
    'skills.tech.5': 'Self-hosting & Linux Administration',
    'skills.tech.6': 'Networking — DNS, VPN, Reverse Proxies',
    'skills.tech.7': 'Workflow Automation (n8n)',
    'skills.tech.8': 'C Programming',

    // ── Skills — soft items ───────────────────────
    'skills.soft.1': 'Creativity',
    'skills.soft.2': 'Project Management',
    'skills.soft.3': 'Time Management',
    'skills.soft.4': 'Problem Solving',
    'skills.soft.5': 'Data Analysis',
    'skills.soft.6': 'Communication & Collaboration',
    'skills.soft.7': 'Technical Documentation (IEEE standard)',

    // ── Contact ───────────────────────────────────
    'contact.intro':               "Want to get in touch or collaborate? Here's where to find me:",
    'contact.name.label':          'Name',
    'contact.name.placeholder':    'Your name',
    'contact.email.label':         'Email Address',
    'contact.email.placeholder':   'your@email.com',
    'contact.message.label':       'Message',
    'contact.message.placeholder': 'Your message goes here...',
    'contact.submit':              '$ send --message',
    'contact.sending':             '$ sending...',
    'contact.required':            '// all fields required',
    'contact.success':             "// message sent. I'll get back to you soon",
    'contact.error':               '// failed to send. Try email instead',

    // ── Footer ────────────────────────────────────
    'footer.text': 'Built with HTML, CSS, JS & Claude — self-hosted on Proxmox',

    // ── Section commands ─────────────────────────
    'section.about.cmd':      '$ <span class="cmd">nano</span> about.txt',
    'section.projects.cmd':   '$ <span class="cmd">ls</span> -la ~/projects/',
    'section.skills.cmd':     '$ <span class="cmd">nano</span> skills.txt',
    'section.experience.cmd': '$ <span class="cmd">nano</span> experience.log',
    'section.contact.cmd':    '$ <span class="cmd">contact</span> --help',

    // ── Hero typewriter ───────────────────────────
    'hero.tw.title':       'Electrical Engineering Student',
    'hero.tw.subtitle':    'Maker  ·  Self-hosting Enthusiast  ·  Car Enthusiast',
    'hero.tw.ls_projects': 'ls projects/',

    // ── Experience timeline ───────────────────────
    'timeline.work':       '// work',
    'timeline.education':  '// education',

    // ── Projects ──────────────────────────────────
    'projects.filter.all':  'all',
    'projects.expand.more': '$ ls --all  (+{n} more)',
    'projects.expand.less': '$ ls --featured',

    // ── Project detail page ───────────────────────
    'project.back': '← cd ../projects/',
  },

  /* ===========================================
   Dutch (Nederlands)
   =========================================== */
  nl: {
    // ── Nav ──────────────────────────────────────
    'nav.about':      './over-mij',
    'nav.projects':   './projecten',
    'nav.skills':     './vaardigheden',
    'nav.experience': './ervaring',
    'nav.contact':    './contact',

    // ── Hero ─────────────────────────────────────
    'hero.scroll': 'Scroll om meer te leren',

    // ── About ─────────────────────────────────────
    'about.p1':     'Hoi, ik ben <span class="c-blue">Ruben van der Veen</span>. Ik ben 21 jaar oud en studeer Elektrotechniek aan de NHL Stenden Hogeschool in Nederland, met een achtergrond in Mechatronica Engineering bij Firda. Ik vind het leuk om dingen te bouwen: van het ontwerpen van onderdelen voor 3D-printen tot embedded systemen, zelf gehoste Linux-infrastructuur en AI-gestuurde automatiseringspijplijnen.',
    'about.p2':     'In mijn vrije tijd doe ik veel verschillende dingen, zoals:',
    'about.list.1': 'Werken aan mijn homelab',
    'about.list.2': 'Werken aan hardwareprojecten zoals een DIY powerbank of programmeerbare kerstverlichting',
    'about.list.3': 'Ontdekken van muziek',
    'about.list.4': 'Genieten van autoritten, car meets of werken aan mijn eigen auto\'s',

    // ── Neofetch — key labels ─────────────────────
    'nf.key.name':      '',
    'nf.key.created':   '',
    'nf.key.location':  '',
    'nf.key.education': '',
    'nf.key.languages': '',
    'nf.key.interests': '',

    // ── Neofetch — values ─────────────────────────
    'nf.val.location':  'Ferwert, Nederland',
    'nf.val.created':   '23-07-2004 (21 jaar geleden)',
    'nf.val.education': 'HBO Elektrotechniek\n           MBO Mechatronica Engineering',
    'nf.val.languages': 'Nederlands (moedertaal)\n           Engels',
    'nf.val.interests': 'Elektronica, Zelf-hosting,\n           3D-printen & Auto\'s',

    // ── Skills — category titles ──────────────────
    'skills.cat.technical': '# Technisch',
    'skills.cat.soft':      '# Zachte Vaardigheden',
    'skills.cat.tools':     '# Gereedschappen & Technologieën',

    // ── Skills — dividers ─────────────────────────
    'skills.div.eda':    'EDA & Simulatie',
    'skills.div.design': 'CAD Ontwerpen',
    'skills.div.dev':    '',
    'skills.div.docs':   'Documentatie software',
    'skills.div.infra':  'Digitale Infrastructuur',

    // ── Skills — technical items ──────────────────
    'skills.tech.1': 'Elektronica & Embedded Systems',
    'skills.tech.2': 'Digtale Logica Ontwerp (VHDL)',
    'skills.tech.3': 'PCB Ontwerp & Prototyping',
    'skills.tech.4': '3D ontwerpen & 3D printen',
    'skills.tech.5': 'Zelf-hosting & Linux Administratie',
    'skills.tech.6': 'Netwerken — DNS, VPN, Reverse Proxies',
    'skills.tech.7': 'Workflow Automatisering (n8n)',
    'skills.tech.8': 'C programmeren',

    // ── Skills — soft items ───────────────────────
    'skills.soft.1': 'Creatief denken',
    'skills.soft.2': 'Projectmanagement',
    'skills.soft.3': 'Tijdmanagement',
    'skills.soft.4': 'Probleemoplossend vermogen',
    'skills.soft.5': 'Data-analyse',
    'skills.soft.6': 'Communicatie & Samenwerking',
    'skills.soft.7': 'Technische documentatie (IEEE standaard)',

    // ── Contact ───────────────────────────────────
    'contact.intro':               'Wil je contact opnemen of samenwerken? Hier kun je me vinden:',
    'contact.name.label':          'Naam',
    'contact.name.placeholder':    'Jou naam',
    'contact.email.label':         'Email Adres',
    'contact.email.placeholder':   'Jouw@email.com',
    'contact.message.label':       'Bericht',
    'contact.message.placeholder': 'Voer hier je bericht in...',
    'contact.submit':              'stuur --bericht',
    'contact.sending':             'sturen...',
    'contact.required':            '// alle velden zijn verplicht',
    'contact.success':             '// Bericht is verzonden. Ik zal spoedig contact met je opnemen.',
    'contact.error':               '// Verzenden mislukt. Probeer een email te sturen.',

    // ── Footer ────────────────────────────────────
    'footer.text': 'Gemaakt met HTML, CSS, JS & Claude — zelf gehost op Proxmox',

    // ── Section commands ─────────────────────────
    'section.about.cmd':      '$ <span class="cmd">nano</span> over-mij.txt',
    'section.projects.cmd':   '$ <span class="cmd">ls</span> -la ~/projecten/',
    'section.skills.cmd':     '$ <span class="cmd">nano</span> vaardigheden.txt',
    'section.experience.cmd': '$ <span class="cmd">nano</span> ervaring.log',
    'section.contact.cmd':    '',

    // ── Hero typewriter ───────────────────────────
    'hero.tw.title':       'Elektrotechniek student',
    'hero.tw.subtitle':    'Maker  ·  Self-hosting hobbyist  ·  Auto liefhebber',
    'hero.tw.ls_projects': 'ls projecten/',

    // ── Experience timeline ───────────────────────
    'timeline.work':       '// werk',
    'timeline.education':  '// opleiding',

    // ── Projects ──────────────────────────────────
    'projects.filter.all':  'alles',
    'projects.expand.more': '$ ls --alles  (+{n} meer)',
    'projects.expand.less': '$ ls --uitgelicht',

    // ── Project detail page ───────────────────────
    'project.back': '← cd ../projecten/',
  },
};

/* ── Helpers ─────────────────────────────────── */

function getCurrentLang() {
  return localStorage.getItem('lang') || 'en';
}

/** Return translated string, falling back to English if NL is empty/missing. */
function t(key) {
  const lang = getCurrentLang();
  const val  = TRANSLATIONS[lang]?.[key];
  return (val !== undefined && val !== '') ? val : (TRANSLATIONS.en[key] ?? key);
}

/** Apply a language: persist, update DOM, notify listeners. */
function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  // Plain-text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n);
    if (val) el.textContent = val;
  });

  // HTML elements (contain inline tags)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = t(el.dataset.i18nHtml);
    if (val) el.innerHTML = val;
  });

  // Input / textarea placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = t(el.dataset.i18nPlaceholder);
    if (val) el.placeholder = val;
  });

  // Update toggle button active states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Notify renderNeofetch, expand button, etc.
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

/* ── Init on DOM ready ───────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Wire up EN / NL toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  // Apply saved (or default) language
  setLanguage(getCurrentLang());
});
