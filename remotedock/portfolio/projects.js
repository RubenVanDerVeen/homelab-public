/*
  PROJECTS DATA
  =============
  Add, remove, or edit projects here. Each object renders a card automatically.
 
  Fields:
    title           {string}      — Project name
    subtitle        {string}      — One-line description shown below the title
    description     {string}      — 2–3 sentence summary (shown on card)
    date            {string}      — "YYYY-MM" — used for recency sorting
    longDescription {string}      — Full write-up shown on the detail page
    features        {string[]}    — Bullet-point highlights on the detail page
    tags            {string[]}    — Used for the filter buttons; keep consistent
    image           {string|null} — Card thumbnail image path, or null
    images          {string[]}    — Gallery images for the detail page
    github          {string|null} — GitHub URL, or null
    link            {string|null} — Any other external link, or null
    status          {string}      — "active" | "completed" | "wip"
    featured        {boolean}     — Featured cards are shown by default
 */

const STATUS_MAP = {
  active:    ['status-active',    'active'],
  completed: ['status-completed', 'completed'],
  wip:       ['status-wip',       'wip'],
};

const PROJECTS = [
  {
    title: "Homelab",
    subtitle: "Self-hosted infrastructure on Proxmox",
    description: "Complete homelab running on a single IT12 Mini PC with Proxmox VE. Hosts 10+ Docker VMs running services including Jellyfin, Home Assistant, Nginx Proxy Manager, Pi-hole, n8n, Ollama, and more. Full split-DNS setup with Cloudflare and automatic container updates.",
    date: "2026-01",
    longDescription: `Running a full homelab on a single IT12 Mini PC (Intel i9-13900H, 64 GB DDR5). Proxmox VE manages 10+ VMs and LXC containers, each isolated by purpose: media, automation, AI inference, backups, and remote access. Everything is containerised with Docker Compose, with Watchtower handling automatic updates every Sunday at 03:00.

The network stack uses Nginx Proxy Manager for SSL termination, Pi-hole for local DNS and ad-blocking, and Cloudflare for external DNS and tunnelling. Remote access is via Twingate (VPN) and RustDesk (self-hosted remote desktop). A Proxmox Backup Server running in a privileged LXC container backs up all VMs daily to a TrueNAS NFS share.`,
    features: [
      "10+ Docker VMs on Proxmox VE — isolated by purpose (media, automation, AI, backups)",
      "Split-DNS with Pi-hole + Nginx Proxy Manager + Let's Encrypt SSL",
      "External access via Cloudflare Tunnel and Twingate VPN",
      "Daily automated backups via PBS → TrueNAS NFS (3 daily, 3 weekly retention)",
      "Automatic container updates via Watchtower every Sunday",
      "Self-hosted remote desktop with RustDesk (signalling + relay)",
      "Local LLM inference with Ollama (llama3.2) on CPU",
    ],
    tags: ["Proxmox", "Docker", "Linux", "Networking", "Self-hosting"],
    image: null,
    images: [],
    github: "https://github.com/RubenVanDerVeen/homelab-public",
    link: null,
    status: "active",
    featured: true,
    subtitleNL: '',
    longDescriptionNL: '',
    featuresNL: [],
  },
  {
    title: "n8n Automation",
    subtitle: "AI-powered email workflows",
    description: "Automated email pipelines using n8n, a locally-run Ollama LLM, and the Gmail API. Includes a real-time school email summarizer that triggers on every new email, and a scheduled daily personal inbox digest delivered via push notification.",
    date: "2026-02",
    longDescription: `A set of n8n workflows that use a locally-hosted Ollama LLM (llama3.2) to process and summarise Gmail. School emails (forwarded from Outlook) trigger a real-time pipeline that summarises the email in 3–5 bullet points and sends a push notification via ntfy. A second workflow runs every day at 17:00 and sends a full digest of the day's personal inbox with importance flags.

A third workflow powers the contact form on this portfolio — receiving submissions from the browser and forwarding them to ntfy. All automation runs fully self-hosted: n8n on GeneralDock, Ollama on AI-Stack, and ntfy on GeneralDock, all inside the homelab.`,
    features: [
      "Real-time school email summariser — Gmail trigger → Ollama → ntfy push notification",
      "Daily personal inbox digest at 17:00 — importance flags + per-email summaries",
      "Portfolio contact form webhook — routes submissions from browser to ntfy",
      "Fully self-hosted: n8n + Ollama + ntfy, no third-party AI services",
      "CORS-configured n8n webhook for cross-origin browser fetch",
    ],
    tags: ["n8n", "Ollama", "LLM", "Automation"],
    image: null,
    images: [],
    github: "https://github.com/RubenVanDerVeen/homelab-public",
    link: null,
    status: "active",
    featured: true,
    subtitleNL: '',
    longDescriptionNL: '',
    featuresNL: [],
  },
  {
    title: "Portfolio Website",
    subtitle: "Terminal & PCB-aesthetic personal site",
    description: "This portfolio website — built with plain HTML, CSS, and JavaScript. Features a PCB-inspired design with IC chip components, animated oscilloscope, typewriter terminal, and a contact form wired to n8n.",
    date: "2026-02",
    longDescription: `A static single-page portfolio with a custom terminal and PCB aesthetic — no frameworks, no build tools. The page background carries PCB traces with section LED nodes that light up as you scroll. The hero section contains two IC chip components: a DIP-12 typewriter terminal and a 24-QFP oscilloscope.

Project cards use a Dupont pin-header motif instead of the usual macOS window chrome. The contact form POSTs to an n8n webhook that forwards the message to ntfy. The entire site is self-hosted on RemoteDock (nginx:alpine container) and served via Nginx Proxy Manager with Let's Encrypt SSL.`,
    features: [
      "Pure HTML/CSS/JS — no frameworks or build step",
      "PCB substrate aesthetic with scroll-reactive section LED nodes",
      "IC chip components: DIP-12 typewriter hero + 24-QFP oscilloscope",
      "Contact form wired to n8n webhook → ntfy push notification",
      "Self-hosted on Proxmox via nginx:alpine + Nginx Proxy Manager",
      "Project detail pages with image gallery and feature lists",
    ],
    tags: ["Web", "JavaScript", "Self-hosting"],
    image: "Images/project_portfolio_mainimage.png",
    images: ["Images/project_portfolio_mainimage.png",
             "Images/project_portfolio_about.png",
    ],
    github: "https://github.com/RubenVanDerVeen/homelab-public",
    link: null,
    status: "active",
    featured: true,
    subtitleNL: '',
    longDescriptionNL: '',
    featuresNL: [],
  },
  {
    title: "ECG Monitor",
    subtitle: "Biomedical signal acquisition and processing",
    description: "Design of an analog ECG signal acquisition system using operational amplifier circuits, combined with digital signal processing in MATLAB. The system captures, filters, and analyzes electrocardiogram signals including noise suppression and individual wave identification.",
    date: "2025-09",
    longDescription: `This project covers the full signal chain of an ECG monitor, from electrode input to
      filtered output. The analog front-end is built around an instrumentation amplifier (LM358-based) to pick up
      the small biopotential signals from the body. A 50 Hz notch filter removes mains interference and a
      Butterworth low-pass filter further cleans the signal. All circuits were first designed and verified in
      LTSpice. On the software side, MATLAB scripts synthesize realistic ECG signals by superimposing the individual
      cardiac waves (P, Q, QRS, S, T, U) and apply IIR notch filtering. Simulink block diagrams model the complete
      signal processing pipeline. Presentations were delivered at weeks 3 and 5 with a final presentation at the end
      of the project.`,
    features: [
      "Instrumentation amplifier front-end for ECG signal acquisition",
      "50 Hz notch filter to suppress mains interference",
      "Butterworth low-pass filter for noise reduction",
      "LTSpice schematic simulation and AC analysis",
      "MATLAB ECG signal synthesis with P, Q, QRS, S, T and U wave components",
      "IIR notch filter implementation in MATLAB",
      "Simulink block diagram modeling of the full signal chain",
    ],
    tags: ["Electronics", "Embedded", "Sensors","MATLAB", "LTSpice"],
    image: null,
    images: [],
    github: null,
    link: null,
    status: "completed",
    featured: false,
    subtitleNL: '',
    longDescriptionNL: '',
    featuresNL: [],
  },
  {
    title: "Milli-Ohm Meter",
    subtitle: "Precision analog instrumentation amplifier",
    description: "Design, PCB fabrication, and calibration of a precision measurement amplifier by team Ohmies (Group 2). The project went through multiple hardware revisions to meet strict performance specifications, supported by full simulation, testing, and acceptance documentation.",
    date: "2025-09",
    longDescription: `The Meetversterker project challenged the team to engineer a precision analog measurement
      amplifier from requirements specification to calibrated hardware. Starting from a formal PvE (requirements
      specification) and PvA (plan of action), the Ohmies team produced four PCB revisions (V1.0 through V2.3), each
      iteration improving performance and addressing design issues. Circuit behaviour was first verified in LTSpice
      simulation, while block diagrams in Draw.io documented the functional architecture. Engineering calculations
      justified component choices. Once the hardware was built, a formal test and calibration procedure was
      executed, resulting in test reports, a calibration report, and an acceptance document. The project was managed
      with structured logbooks, weekly meeting minutes, and time tracking throughout the September 2025 – February
      2026 period.`,
    features: [
      "Four PCB design iterations (V1.0 through V2.3)",
      "Functional block diagram architecture",
      "LTSpice circuit simulation and verification",
      "Engineering calculations for component selection",
      "Formal test plan with acceptance criteria",
      "Calibration report and acceptance documentation",
      "Structured project management with logbooks and meeting minutes",
    ],
    tags: ["Electronics", "PCB Design", "Measurement", "Analog Design"],
    image: null,
    images: [],
    github: null,
    link: null,
    status: "completed",
    featured: false,
    subtitleNL: '',
    longDescriptionNL: '',
    featuresNL: [],
  },
  {
    title: "VHDL Washing Machine",
    subtitle: "VHDL digital state machine",
    description: "Full hardware description of a digital washing machine controller written in VHDL. The system implements a finite state machine that controls all washing machine functions including water valves, motor, heating element, pump, and multiple wash programs.",
    date: "2025-02",
    longDescription: `This project involved designing a complete digital controller for a washing machine using
      VHDL (VHSIC Hardware Description Language). The design is structured as a finite state machine where each
      state corresponds to a phase in the wash cycle (filling, heating, washing, rinsing, spinning, draining).
      Separate VHDL modules handle the water valve, motor direction, heating element, and pump outputs. The design
      evolved through 14 versions, with HDL Designer used for visual schematic entry and ModelSim used for
      simulation and waveform verification at each stage. A formal test plan, bill of materials, requirements
      specification (PvE), and project plan (PvA) were produced alongside the technical work. The project ran from
      February to April 2025.`,
    features: [
      "Finite state machine controlling all washing machine actuators",
      "Modular VHDL design: water valve, motor, heater, pump, spin, rinse, drain",
      "14 design iterations from initial prototype to final version",
      "HDL Designer visual schematic entry",
      "ModelSim simulation with waveform verification",
      "Formal test plan and acceptance documentation",
      "Requirements specification and bill of materials",
    ],
    tags: ["VHDL", "FPGA", "Digital Logic", "State Machine"],
    image: null,
    images: [],
    github: null,
    link: null,
    status: "completed",
    featured: false,
    subtitleNL: '',
    longDescriptionNL: '',
    featuresNL: [],
  },
  {
    title: "Electric Three-Wheeler",
    subtitle: "E-Mobility group project",
    description: "Design and construction of a battery-powered electric three-wheeler vehicle as part of an e-mobility challenge. The project combined mechanical engineering, 3D-printed components, and Arduino-based electronic control systems, culminating in a live race demonstration.",
    date: "2024-09",
    longDescription: `A group project (Group 4) for the E-Mobility course in which the team designed and built a
      functional electric three-wheeler from scratch. The vehicle features relay-driven H-bridge motor control for
      forward and reverse operation, a servo-based steering system, and a 7-segment display driven via shift
      registers for status feedback. Mechanical parts including the gearbox and drivetrain were modeled in CAD and
      3D printed. Multiple Arduino subsystems were developed and integrated, with code evolving through several
      versions. The project concluded with a documented track race (October 2024).`,
    features: [
      "H-bridge relay motor control for forward/reverse driving",
      "Servo-controlled steering system",
      "7-segment display with shift register driver and button input",
      "3D-printed gearbox and drivetrain components",
      "Multiple Arduino subsystems with iterative firmware development",
      "Live track race demonstration with video documentation",
    ],
    tags: ["Arduino", "Electronics", "3D Printing", "Motor Control"],
    image: null,
    images: [],
    github: null,
    link: null,
    status: "completed",
    featured: false,
    subtitleNL: '',
    longDescriptionNL: '',
    featuresNL: [],
  },
  {
    title: "DigiAgro MDP",
    subtitle: "Digital precision agriculture system",
    description: "Multidisciplinary project combining drone-based aerial monitoring, a robotic gripper, and a plant disease detection system to modernize and automate agricultural processes. The project was developed by a cross-disciplinary team covering electronics, mechanical engineering, and business.",
    date: "2025-04",
    longDescription: `DigiAgro is a multidisciplinary project (MDP) addressing challenges in modern agriculture.
      The team of six students developed a system for automated crop monitoring and handling, with a focus on
      detecting diseases in potato plants. Three parallel research tracks were carried out: an electronics track
      designing a camera and sensor system, a mechanical track building a robotic gripper for crop handling, and a
      business track analyzing market viability and stakeholder value. A Proof of Principle (PoP) was built for the
      disease detection pipeline. The project followed professional project management practices, including a formal
      plan of action, Gantt chart, weekly journals, meeting minutes, time tracking per team member, and individual
      portfolios with peer review. A final poster and presentation concluded the project.`,
    features: [
      "Drone-mounted camera system for aerial crop field monitoring",
      "Robotic gripper design for automated crop handling",
      "Potato plant disease detection Proof of Principle",
      "Cross-disciplinary approach: electronics, mechanical, and business tracks",
      "Formal project management: PvA, Gantt chart, time registration",
      "Individual portfolios, peer reviews, and competency reflection",
      "Final poster and professional team presentation",
    ],
    tags: ["Robotics", "Agriculture", "Embedded Systems", "AI"],
    image: null,
    images: [],
    github: null,
    link: null,
    status: "completed",
    featured: false,
    subtitleNL: '',
    longDescriptionNL: '',
    featuresNL: [],
  },
];
