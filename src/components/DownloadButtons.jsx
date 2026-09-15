import React, { useState } from 'react';
import { downloadDocx, downloadPdf } from '../utils/export';

export default function DownloadButtons({ canvas, referenceNo }) {
  const [busy, setBusy] = useState(false);

  const safeRef = referenceNo.trim().replace(/[^a-zA-Z0-9_-]+/g, '_') || 'certificate';

  const handlePdf = () => {
    if (!canvas) return;
    downloadPdf(canvas, `GateMate-${safeRef}.pdf`);
  };

  const handleDocx = async () => {
    if (!canvas) return;
    try {
      setBusy(true);
      await downloadDocx(canvas, `GateMate-${safeRef}.docx`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="download-actions">
      <button className="secondary-btn" type="button" onClick={handlePdf} disabled={!canvas}>
        Download PDF
      </button>
      <button className="secondary-btn" type="button" onClick={handleDocx} disabled={!canvas || busy}>
        {busy ? 'Preparing DOCX...' : 'Download DOCX'}
      </button>
    </div>
  );
}
