/**
 * EXPERIENCE DATA
 * ===============
 * Add, remove, or edit entries here. Each object renders as one timeline item.
 * Entries with the same `year` are grouped under a single year marker and
 * separated by a divider. The list is sorted by year descending (newest first);
 * entries within the same year appear in the order defined here.
 *
 * Fields:
 *   type          {string}   — "work" (default) | "education" — which track to show in
 *   year          {string}   — "YYYY" — start year shown as the large label
 *   yearEnd       {string}   — End year or "present" — shown below the start year
 *                              as a range (e.g. "– 2026" or "– present"). Omit for
 *                              single-year entries.
 *   title         {string}   — Role, event, or activity name
 *                              (optional — omit or set '' to hide the header row)
 *   organization  {string}   — Company, institution, or context (optional)
 *   period        {string}   — Date range string, e.g. "Sep 2024 – present" (optional)
 *   description   {string}   — Main body paragraph shown on the timeline
 *   tags          {string[]} — Keyword chips shown below the description (optional)
 *   images        {string[]} — Paths to images shown in a 2-column grid below the
 *                              description. Click to open in a lightbox. (optional)
 *   titleNL       {string}   — Dutch title       ('' or omit = fall back to English)
 *   descriptionNL {string}   — Dutch description ('' or omit = fall back to English)
 */

const EXPERIENCE = [
  // Example entry — uncomment and fill in to get started:
  {
    type: "education",
    year: "2024",
    yearEnd: "present",
    title: "HBO - Electrical Engineering student",
    organization: "NHL Stenden",
    period: "Sep 2024 – present",
    description: "NHL Stenden projects.",
    tags: ["NHL Stenden", "Tag2"],
    images: [],
    titleNL: "Student Elektrotechniek",
    descriptionNL: "NHL stenden projecten.",
  },
  {
    type: "education",
    year: "2020",
    yearEnd: "2024",
    title: "MBO - Mechatronics Engineering student",
    organization: "Firda",
    period: "Sep 2020 – Sep 2024",
    description: "Alot",
    tags: ["Engineering", "Mechatronics", "Welding"],
    images: [],
    titleNL: "Mechatronica Engineering student",
    descriptionNL: "Veel",
  },
  {
    type: "work",
    year: "2023",
    yearEnd: "present",
    title: "Part-time reliability engineer",
    organization: "Hellema Hallum",
    period: "Feb 2023 – now",
    description: "Alot",
    tags: ["Engineering", "Testing"],
    images: [],
    titleNL: "Part-time reliability engineer",
    descriptionNL: "Veel",
  },
  {
    type: "work",
    year: "2021",
    yearEnd: "2022",
    title: "Internship Hellema Hallum",
    organization: "Hellema Hallum",
    period: "Feb 2021 – Dec 2022",
    description: "Alot",
    tags: ["Engineering", "Testing"],
    images: [],
    titleNL: "Stage Hellema Hallum",
    descriptionNL: "Veel",
  },
];
