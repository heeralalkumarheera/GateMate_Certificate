import QRCode from 'qrcode';
import LZString from 'lz-string';

function getBaseUrl() {
  const url = new URL(window.location.href);
  url.hash = '';
  url.search = '';
  return url.toString().replace(/\/$/, '');
}

// Compact keys reduce QR density while keeping ALL certificate data embedded.
function makeCompactPayload(data) {
  return {
    r: data.referenceNo.trim(),
    n: data.studentName.trim(),
    c: data.collegeName.trim(),
    g: data.registrationNo.trim(),
    u: data.university.trim(),
    k: data.course.trim(),
    d: data.duration.trim(),
    s: data.startDate,
    e: data.endDate,
    i: data.date,
  };
}

export function encodeCertificateData(data) {
  return LZString.compressToEncodedURIComponent(
    JSON.stringify(makeCompactPayload(data))
  );
}

export function decodeCertificateData(encoded) {
  try {
    if (!encoded) return null;
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;

    const p = JSON.parse(json);
    return {
      ref: p.r || '',
      name: p.n || '',
      college: p.c || '',
      registration: p.g || '',
      university: p.u || '',
      course: p.k || '',
      duration: p.d || '',
      start: p.s || '',
      end: p.e || '',
      issueDate: p.i || '',
    };
  } catch {
    return null;
  }
}

export function buildVerificationUrl(data) {
  const encoded = encodeCertificateData(data);
  return `${getBaseUrl()}#/verify/${encoded}`;
}

export async function makeQrDataUrl(data, size = 170) {
  return QRCode.toDataURL(buildVerificationUrl(data), {
    width: size,
    margin: 4,
    errorCorrectionLevel:'L',
    type: 'image/png',
  });
}
