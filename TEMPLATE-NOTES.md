# GateMate Certificate Template Notes

The generator uses `public/gatemate-master-template.png` as the fixed certificate artwork.

The master is freshly rebuilt from `certificate-original.jpg` and only the following variable areas are cleared:
- Reference number text area
- Issue date text area
- Student-name area below the ribbon
- Previous paragraph text area
- Previous QR-code area

The border, logos, ribbon, signatures, seal/rosette, heading and other fixed artwork are preserved from the original reference certificate.

Dynamic certificate fields are rendered by `src/utils/certificateCanvas.js`; their coordinates remain centralized in `src/config/certificateConfig.js`.
