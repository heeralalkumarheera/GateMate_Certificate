// ============================================================
// GateMate Certificate Generator - Easy-to-edit settings
// ============================================================

export const CERTIFICATE_SIZE = {
  width: 1536,
  height: 1086,
};

// Add/remove courses here. Add the same course key in COURSE_PARAGRAPHS below.
export const COURSE_OPTIONS = [
  'GenAI',
  'Python',
  'Web Development',
  'Robotics',
  'AI Architect',
];

// Add/remove duration choices here.
export const DURATION_OPTIONS = [
  '2-Week',
  '3-Week',
  '4-Week',
  '5-Week',
  '6-Week',
];

// Add/remove ready-made internship periods here.
// Choose "Custom Period..." in the form to enter any dates manually.
export const DATE_RANGE_OPTIONS = [
  { label: '01 September 2026 to 15 September 2026', start: '2026-09-01', end: '2026-09-15' },
  { label: '05 September 2026 to 19 September 2026', start: '2026-09-05', end: '2026-09-19' },
  { label: '10 September 2026 to 24 September 2026', start: '2026-09-10', end: '2026-09-24' },
  { label: '15 September 2026 to 15 October 2026', start: '2026-09-15', end: '2026-10-15' },
  { label: '01 October 2026 to 15 October 2026', start: '2026-10-01', end: '2026-10-15' },
  { label: '05 October 2026 to 19 October 2026', start: '2026-10-05', end: '2026-10-19' },
  { label: 'Custom Period...', custom: true },
];

export const COMPANY_NAME = 'GateMate Learning Private Limited';
export const VERIFICATION_PATH = '#/verify';

// ------------------------------------------------------------
// 1536 x 1086 certificate coordinates.
// Keep these centralized so adjustments are easy.
// ------------------------------------------------------------
export const POSITIONS = {
  reference: { x: 184, y: 124 },
  date: { x: 1282, y: 124 },

  // Matches the original "Archna Ray" placement.
  studentName: {
    centerX: 768,
    baselineY: 578,
    maxWidth: 560,
  },

  // Fixed paragraph area: below divider line, above signature/QR area.
  paragraph: {
    x: 306,
    topY: 621,
    maxWidth: 838,
    lineHeight: 28,
    maxLines: 6,
  },

  // Single generated QR. The original QR is erased in the master template.
  qr: {
    x: 715,
    y: 805,
    size: 170,
  },
};

export const FONT = {
  reference: 'italic 22px "Times New Roman", serif',
  name: 'italic 40px "Times New Roman", serif',
  paragraph: 'italic 19px Arial, sans-serif',
  paragraphBold: 'bold italic 19px Arial, sans-serif',
};

// ------------------------------------------------------------
// One structured paragraph per course.
// Supported placeholders:
// {duration} {course} {start} {end} {college} {university} {registration}
// All placeholder values are drawn bold at the SAME 19px size.
// ------------------------------------------------------------
export const COURSE_PARAGRAPHS = {
  GenAI: [
    'The candidate successfully completed the ', '{duration}', ' ', '{course}',
    ' Internship Program (Internship-I) at GateMate Learning Private Limited from ', '{start}',
    ' to ', '{end}', '. The candidate was enrolled at ', '{college}', ' under the ', '{university}',
    ' with Registration No. ', '{registration}', ', and gained practical knowledge of Generative AI, ',
    'AI & LLMs, prompt engineering, RAG, AI application development, API integration, ',
    'and practical AI projects.'
  ],

  Python: [
    'The candidate successfully completed the ', '{duration}', ' ', '{course}',
    ' Internship Program (Internship-I) at GateMate Learning Private Limited from ', '{start}',
    ' to ', '{end}', '. The candidate was enrolled at ', '{college}', ' under the ', '{university}',
    ' with Registration No. ', '{registration}', ', and developed practical skills in Python programming, ',
    'data types, control flow, functions, OOP, exception handling, file handling, automation, ',
    'and practical Python projects.'
  ],

  'Web Development': [
    'The candidate successfully completed the ', '{duration}', ' ', '{course}',
    ' Internship Program (Internship-I) at GateMate Learning Private Limited from ', '{start}',
    ' to ', '{end}', '. The candidate was enrolled at ', '{college}', ' under the ', '{university}',
    ' with Registration No. ', '{registration}', ', and gained practical knowledge of HTML5, CSS3, responsive design, JavaScript, DOM, ',
    'APIs, React basics, and practical website development.'
  ],

  Robotics: [
    'The candidate successfully completed the ', '{duration}', ' ', '{course}',
    ' Internship Program (Internship-I) at GateMate Learning Private Limited from ', '{start}',
    ' to ', '{end}', '. The candidate was enrolled at ', '{college}', ' under the ', '{university}',
    ' with Registration No. ', '{registration}', ', and studied robotics fundamentals, sensors, actuators, microcontrollers, automation, ',
    'IoT integration, and practical robotics projects.'
  ],

  'AI Architect': [
    'The candidate successfully completed the ', '{duration}', ' ', '{course}',
    ' Internship Program (Internship-I) at GateMate Learning Private Limited from ', '{start}',
    ' to ', '{end}', '. The candidate was enrolled at ', '{college}', ' under the ', '{university}',
    ' with Registration No. ', '{registration}', ', and gained practical knowledge of AI & LLMs, prompt engineering, AI applications, ',
    'RAG, multi-agent systems, API integration, and practical AI architecture projects.'
  ],
};
