import React, { useEffect, useRef, useState } from 'react';
import DownloadButtons from './DownloadButtons';
import { drawCertificate } from '../utils/certificateCanvas';

export default function CertificatePreview({ data, onCanvasReady }) {
  const internalCanvasRef = useRef(null);
  const [readyCanvas, setReadyCanvas] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setReadyCanvas(null);

    async function render() {
      try {
        const canvas = internalCanvasRef.current;
        if (!canvas) return;

        await drawCertificate(canvas, data);
        if (!cancelled) {
          setReadyCanvas(canvas);
          onCanvasReady(canvas);
        }
      } catch (error) {
        console.error('Certificate render failed:', error);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [data, onCanvasReady]);

  return (
    <section className="panel preview-panel">
      <div className="panel-title preview-title">
        <div>
          <h2>Certificate Preview</h2>
          <p>The original certificate artwork stays fixed; only the entered fields change.</p>
        </div>
      </div>

      <div className="certificate-frame">
        <canvas ref={internalCanvasRef} className="certificate-canvas" />
      </div>

      <DownloadButtons canvas={readyCanvas} referenceNo={data.referenceNo} />
    </section>
  );
}
