const fs = require('fs');
const path = require('path');

function getJpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  let i = 0;
  if (buffer[i] !== 0xFF || buffer[i + 1] !== 0xD8) return null; // Not JPEG
  i += 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) return null;
    const marker = buffer[i + 1];
    if (marker === 0xC0 || marker === 0xC2) { // SOF0 or SOF2
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    const length = buffer.readUInt16BE(i + 2);
    i += 2 + length;
  }
  return null;
}

const userUploads = [
  'media_1794296778410_a6546c92.jpg',
  'media_1794296778410_c8110a29.jpg',
  'media_1794296778412_be40e7d3.jpg',
  'media_1794296778415_44756276.jpg',
  'media_1794296778421_ef46b9ed.jpg',
  'media_1794296778423_cb5706dc.jpg',
  'media_1794296778425_8b4a2bc8.jpg',
  'media_1794296778430_ff9e83fe.jpg',
  'media_1794296778506_bd7bcd62.jpg',
  'media_1794296778508_95bf8b82.jpg'
];

const basePath = 'C:/Users/Jithesh/.gemini/antigravity/brain/a1aeb94d-2bf4-41b2-8c2f-60055d9d3a65/.user_uploaded/';

userUploads.forEach((name, i) => {
  const dim = getJpegDimensions(path.join(basePath, name));
  console.log(`${i+1}. ${name} ->`, dim);
});
