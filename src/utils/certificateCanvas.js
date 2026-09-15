import { CERTIFICATE_SIZE, COURSE_PARAGRAPHS, FONT, POSITIONS } from '../config/certificateConfig';
import { formatDate } from './date';
import { makeQrDataUrl } from './qr';
import { drawJustifiedLine, wrapSegments } from './text';

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawRightText(ctx, text, x, y, font) {
  ctx.font = font;
  ctx.textAlign = 'right';
  ctx.fillStyle = '#111111';
  ctx.fillText(text, x, y);
}

function drawCenteredFittedText(ctx, text, x, y, maxWidth) {
  let fontSize = 40;
  const family = '"Times New Roman", serif';

  while (fontSize > 25) {
    ctx.font = `italic ${fontSize}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    fontSize -= 1;
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#111111';
  ctx.fillText(text, x, y);
}

function getCourseParagraphTemplate(course) {
  return COURSE_PARAGRAPHS[course] || COURSE_PARAGRAPHS['AI Architect'];
}

function makeParagraphSegments(data) {
  const start = formatDate(data.startDate);
  const end = formatDate(data.endDate);

  return getCourseParagraphTemplate(data.course).map((part) => {
    const match = part.match(/^\{(.*)\}$/);
    if (!match) return { text: part, bold: false };

    const values = {
      duration: data.duration,
      course: data.course,
      start,
      end,
      college: data.collegeName,
      university: data.university,
      registration: data.registrationNo,
    };

    return { text: values[match[1]] ?? '', bold: true };
  });
}

export async function drawCertificate(canvas, data) {
  canvas.width = CERTIFICATE_SIZE.width;
  canvas.height = CERTIFICATE_SIZE.height;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // All fixed certificate artwork comes from this cleaned master image.
  const template = await loadImage('/gatemate-master-template.png');
  ctx.drawImage(template, 0, 0, CERTIFICATE_SIZE.width, CERTIFICATE_SIZE.height);

  // Top reference/date.
  ctx.font = FONT.reference;
  ctx.fillStyle = '#111111';
  ctx.textAlign = 'left';
  ctx.fillText(`Ref. No.: ${data.referenceNo}`, POSITIONS.reference.x, POSITIONS.reference.y);

  drawRightText(
    ctx,
    `Date: ${formatDate(data.date)}`,
    POSITIONS.date.x,
    POSITIONS.date.y,
    FONT.reference
  );

  // Student name exactly in the original name band.
  drawCenteredFittedText(
    ctx,
    data.studentName,
    POSITIONS.studentName.centerX,
    POSITIONS.studentName.baselineY,
    POSITIONS.studentName.maxWidth
  );

  // Course-specific paragraph. Supplied data is bold at the same base font size.
  const wrapped = wrapSegments(
    ctx,
    makeParagraphSegments(data),
    POSITIONS.paragraph.maxWidth,
    FONT.paragraph,
    FONT.paragraphBold
  );

  const visibleLines = wrapped.slice(0, POSITIONS.paragraph.maxLines);
  visibleLines.forEach((line, index) => {
    const isLastLine = index === visibleLines.length - 1;
    drawJustifiedLine(
      ctx,
      line,
      POSITIONS.paragraph.x,
      POSITIONS.paragraph.topY + index * POSITIONS.paragraph.lineHeight,
      POSITIONS.paragraph.maxWidth,
      FONT.paragraph,
      FONT.paragraphBold,
      !isLastLine
    );
  });

  // One clean generated QR. Original QR is absent from the cleaned template.
  const qrDataUrl = await makeQrDataUrl(data, POSITIONS.qr.size);
  const qrImage = await loadImage(qrDataUrl);
  ctx.drawImage(qrImage, POSITIONS.qr.x, POSITIONS.qr.y, POSITIONS.qr.size, POSITIONS.qr.size);

  return canvas;
}
