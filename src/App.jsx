import React, { useCallback, useState } from 'react';
import CertificateForm from './components/CertificateForm';
import CertificatePreview from './components/CertificatePreview';
import VerificationPage from './components/VerificationPage';
import { COMPANY_NAME, DATE_RANGE_OPTIONS } from './config/certificateConfig';

const defaultPeriod = DATE_RANGE_OPTIONS[0];

const initialData = {
  referenceNo: '',
  date: '',
  studentName: '',
  collegeName: '',
  registrationNo: '',
  university: '',
  course: '',
  duration: '',
  periodPreset: defaultPeriod.label,
  startDate: defaultPeriod.start,
  endDate: defaultPeriod.end,
};

export default function App() {
  const [data, setData] = useState(initialData);
  const [generated, setGenerated] = useState(false);
  const [canvas, setCanvas] = useState(null);

  const isVerification = window.location.hash.startsWith('#/verify');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
    setGenerated(false);
    setCanvas(null);
  };

  const handleGenerate = () => {
    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      alert('Internship end date must be after the start date.');
      return;
    }
    setGenerated(true);
  };

  const handleCanvasReady = useCallback((nextCanvas) => {
    setCanvas(nextCanvas);
  }, []);

  if (isVerification) {
    return <VerificationPage />;
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <div className="brand-kicker">Certificate Generator</div>
          <h1>{COMPANY_NAME}</h1>
        </div>
        <span className="header-badge">Local / Static</span>
      </header>

      <div className="generator-layout">
        <CertificateForm
          data={data}
          onChange={handleChange}
          onGenerate={handleGenerate}
        />

        {generated ? (
          <CertificatePreview
            data={data}
            onCanvasReady={handleCanvasReady}
          />
        ) : (
          <section className="panel empty-panel">
            <h2>Preview will appear here</h2>
            <p>Fill the form and click “Generate Certificate”.</p>
          </section>
        )}
      </div>

      {canvas && (
        <div className="status-bar">
          <span>✅ Certificate ready</span>
          <span>QR verification data embedded successfully.</span>
        </div>
      )}
    </main>
  );
}
