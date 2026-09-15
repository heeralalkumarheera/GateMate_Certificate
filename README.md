# GateMate Certificate Generator

Lightweight React + Vite certificate generator for GateMate Learning Private Limited.

## What this version does

- Keeps the supplied certificate artwork as a fixed master template.
- Editable fields: Reference No., Issue Date, Student Name, Course, Duration, Internship Period, College Name, Registration No., University.
- Course dropdown with separate course-specific certificate paragraphs.
- Duration dropdown from 2-Week to 6-Week.
- Internship Period dropdown with ready-made ranges plus Custom Period.
- Student name is positioned like the original sample certificate.
- Top reference/date have equal visual inward padding.
- Original certificate QR and old paragraph text are fully removed from the master template.
- Generates exactly one clean QR at the original bottom-center QR position, slightly lowered for spacing.
- QR contains the complete certificate/student data directly. No backend/database is used.
- QR opens `#/verify` and shows:
  `✅ Above candidate have successfully completed Internship.`
  plus the embedded certificate details.
- Download as PDF or DOCX.

## Setup

Requirements: Node.js 18+ recommended.

1. Extract the ZIP and open the folder in VS Code.
2. Open the terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Start the local development server:

```bash
npm run dev
```

5. Open the localhost URL shown by Vite.

## Easy updates

### Add or remove courses

Edit:

`src/config/certificateConfig.js`

Add the course name to `COURSE_OPTIONS` and add the same key to `COURSE_PARAGRAPHS`.

### Add or remove durations

Edit `DURATION_OPTIONS` in the same file.

### Add date ranges

Edit `DATE_RANGE_OPTIONS` in the same file. The form always keeps a `Custom Period...` option.

### Fine-tune certificate positions

Use the `POSITIONS` object in `src/config/certificateConfig.js`.

- `reference` = top-left reference number
- `date` = top-right issue date
- `studentName` = name position/size
- `paragraph` = paragraph position/width/line spacing
- `qr` = QR position/size

## QR verification note

This version embeds data directly in the QR and needs no backend/database. On a deployed site the QR opens the public verification page.

While the app is running on `localhost`, a phone scanning a QR that contains a localhost URL cannot normally open the laptop's localhost. For real phone-to-site QR testing, deploy the same static app to a public HTTPS host.

## Project structure

```text
gatemate-certificate-generator/
├── public/
│   ├── certificate-original.jpg
│   └── gatemate-master-template.png
├── src/
│   ├── components/
│   ├── config/
│   │   └── certificateConfig.js
│   └── utils/
│       ├── certificateCanvas.js
│       ├── date.js
│       ├── export.js
│       ├── qr.js
│       └── text.js
├── App.jsx
├── main.jsx
├── styles.css
├── package.json
└── vite.config.js
```

### Phone QR testing on local Wi-Fi

For testing the QR from a phone before deployment, start Vite with `npm run dev -- --host` and open the LAN address shown by Vite on the phone. The QR will then contain that accessible host instead of `localhost`.


### Latest visual tuning
- Paragraph text is fully justified to the same width as the certificate divider area.
- Generated QR is positioned slightly lower and rendered at higher pixel resolution with a proper quiet zone.
- QR payload still embeds the complete student/certificate details; no backend or database is used.
