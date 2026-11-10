const fs = require('fs');
const path = require('path');

function getJpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  let i = 0;
  if (buffer[i] !== 0xFF || buffer[i + 1] !== 0xD8) return null;
  i += 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) return null;
    const marker = buffer[i + 1];
    if (marker === 0xC0 || marker === 0xC2) {
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
  'media_1794297914274_b72f5543.jpg',
  'media_1794297914275_072df54b.jpg',
  'media_1794297914275_747e1de8.jpg',
  'media_1794297914280_e449b230.jpg',
  'media_1794297914283_71e497b3.jpg',
  'media_1794297914289_19110c1d.jpg',
  'media_1794297914289_62c3a816.jpg',
  'media_1794297914290_49f4f245.jpg',
  'media_1794297914296_2d22f496.jpg',
  'media_1794297914298_a444dcf0.jpg',
  'media_1794297914300_e7cbfd83.jpg'
];

const basePath = 'C:/Users/Jithesh/.gemini/antigravity/brain/a1aeb94d-2bf4-41b2-8c2f-60055d9d3a65/.user_uploaded/';

userUploads.forEach((name, i) => {
  const p = path.join(basePath, name);
  const exists = fs.existsSync(p);
  const dim = exists ? getJpegDimensions(p) : null;
  console.log(`${i+1}. ${name} ->`, dim, exists ? `${fs.statSync(p).size} bytes` : 'NOT FOUND');
});
