// Text helpers for the certificate canvas.

// Draw text segments in their original order while preserving bold values.
export function drawSegmentsLine(ctx, segments, x, y, normalFont, boldFont) {
  let cursorX = x;

  for (const segment of segments) {
    if (!segment.text) continue;

    ctx.font = segment.bold ? boldFont : normalFont;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#111111';
    ctx.fillText(segment.text, cursorX, y);
    cursorX += ctx.measureText(segment.text).width;
  }
}

// Word-wrap while retaining the bold state for manually entered values.
export function wrapSegments(ctx, segments, maxWidth, normalFont, boldFont) {
  const output = [];
  let current = [];
  let currentWidth = 0;

  const pushCurrent = () => {
    if (current.length) output.push(current);
    current = [];
    currentWidth = 0;
  };

  for (const segment of segments) {
    const words = segment.text.match(/\S+/g) || [];

    for (const word of words) {
      ctx.font = segment.bold ? boldFont : normalFont;

      const wordWidth = ctx.measureText(word).width;
      const spaceWidth = ctx.measureText(' ').width;
      const additionalWidth = current.length ? spaceWidth : 0;

      if (current.length && currentWidth + additionalWidth + wordWidth > maxWidth) {
        pushCurrent();
      }

      current.push({
        text: word,
        bold: segment.bold,
      });

      currentWidth +=
        (current.length > 1 ? spaceWidth : 0) + wordWidth;
    }
  }

  pushCurrent();
  return output;
}

// Fully justify every non-final paragraph line so its left and right edges
// line up exactly with the paragraph area's width. The final line stays natural.
export function drawJustifiedLine(
  ctx,
  words,
  x,
  y,
  maxWidth,
  normalFont,
  boldFont,
  justify = true
) {
  if (!words?.length) return;

  // Measure the natural line using the correct font for every word.
  const measured = words.map((word) => {
    ctx.font = word.bold ? boldFont : normalFont;
    return {
      ...word,
      width: ctx.measureText(word.text).width,
    };
  });

  // Use the normal paragraph font for the normal inter-word space.
  ctx.font = normalFont;
  const spaceWidth = ctx.measureText(' ').width;

  const naturalTextWidth = measured.reduce(
    (total, word) => total + word.width,
    0
  );

  const gapCount = Math.max(measured.length - 1, 0);
  const naturalLineWidth =
    naturalTextWidth + spaceWidth * gapCount;

  const extraPerGap =
    justify && gapCount > 0 && naturalLineWidth < maxWidth
      ? (maxWidth - naturalLineWidth) / gapCount
      : 0;

  let cursorX = x;

  measured.forEach((word, index) => {
    ctx.font = word.bold ? boldFont : normalFont;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#111111';
    ctx.fillText(word.text, cursorX, y);

    cursorX += word.width;

    if (index < measured.length - 1) {
      cursorX += spaceWidth + extraPerGap;
    }
  });
}
