const fs = require('fs');
const path = require('path');

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
  const full = path.join(basePath, name);
  const exists = fs.existsSync(full);
  const size = exists ? fs.statSync(full).size : 0;
  console.log(`${i+1}. ${name} - exists: ${exists}, size: ${size} bytes`);
});
