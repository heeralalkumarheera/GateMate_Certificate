import React from 'react';
import { COMPANY_NAME } from '../config/certificateConfig';
import { decodeCertificateData } from '../utils/qr';
import { formatDate } from '../utils/date';

function getEncodedData() {
  const hash = window.location.hash || '';

  // New compact format: #/verify/<encoded-data>
  const compactMatch = hash.match(/^#\/verify\/(.+)$/);
  if (compactMatch) return compactMatch[1];

  // Backward compatibility with previous certificates: #/verify?data=<encoded-data>
  const query = hash.includes('?') ? hash.split('?')[1] : '';
  return new URLSearchParams(query).get('data');
}

export default function VerificationPage() {
  const encoded = getEncodedData();
  const data = decodeCertificateData(encoded);
  const valid = Boolean(data?.ref && data?.name);

  return (
    <main className="verification-page">
      <div className="verification-card">
        {valid ? (
          <>
            <div className="verified-icon">✓</div>
            <div className="verification-kicker">GateMate Learning Private Limited</div>
            <h1>Certificate Verified</h1>
            <p className="verified-line">✅ Above candidate have successfully completed Internship.</p>

            <div className="verification-details">
              <div><span>Reference No.</span><strong>{data.ref}</strong></div>
              <div><span>Candidate Name</span><strong>{data.name}</strong></div>
              <div><span>Course</span><strong>{data.course}</strong></div>
              <div><span>Duration</span><strong>{data.duration}</strong></div>
              <div><span>College</span><strong>{data.college}</strong></div>
              <div><span>Registration No.</span><strong>{data.registration}</strong></div>
              <div><span>University</span><strong>{data.university}</strong></div>
              <div><span>Internship Period</span><strong>{formatDate(data.start)} to {formatDate(data.end)}</strong></div>
              <div><span>Issue Date</span><strong>{formatDate(data.issueDate)}</strong></div>
            </div>

            <p className="company-note">
              QR verification data is embedded directly in this certificate QR. No backend or database is required for this basic version.
            </p>
            <p className="company-note">Issued by {COMPANY_NAME}.</p>
          </>
        ) : (
          <>
            <div className="invalid-icon">!</div>
            <h1>Invalid Verification Link</h1>
            <p>Please scan a valid GateMate certificate QR code.</p>
          </>
        )}
      </div>
    </main>
  );
}
