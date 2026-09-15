import { jsPDF } from 'jspdf';
import { Document, ImageRun, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

export function canvasToPng(canvas) {
  return canvas.toDataURL('image/png');
}

export function downloadPdf(canvas, filename = 'GateMate-Certificate.pdf') {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  pdf.addImage(canvasToPng(canvas), 'PNG', 0, 0, 297, 210, undefined, 'FAST');
  pdf.save(filename);
}

export async function downloadDocx(canvas, filename = 'GateMate-Certificate.docx') {
  const dataUrl = canvasToPng(canvas);
  const base64 = dataUrl.split(',')[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 16838,
              height: 11906,
            },
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        children: [
          new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [
              new ImageRun({
                data: bytes,
                transformation: {
                  width: 1122,
                  height: 793,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
