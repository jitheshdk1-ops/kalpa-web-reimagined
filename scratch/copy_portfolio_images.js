const fs = require('fs');
const path = require('path');

const targetDir = 'assets/images/portfolio';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const basePath = 'C:/Users/Jithesh/.gemini/antigravity/brain/a1aeb94d-2bf4-41b2-8c2f-60055d9d3a65/.user_uploaded/';

const files = [
  { src: 'media_1794296778410_a6546c92.jpg', dest: 'portfolio-01-ayurbrahma.jpg' },
  { src: 'media_1794296778410_c8110a29.jpg', dest: 'portfolio-02-karavali.jpg' },
  { src: 'media_1794296778412_be40e7d3.jpg', dest: 'portfolio-03-yammiz.jpg' },
  { src: 'media_1794296778415_44756276.jpg', dest: 'portfolio-04-occult.jpg' },
  { src: 'media_1794296778421_ef46b9ed.jpg', dest: 'portfolio-05-tapovana.jpg' },
  { src: 'media_1794296778423_cb5706dc.jpg', dest: 'portfolio-06-vedhavista.jpg' },
  { src: 'media_1794296778425_8b4a2bc8.jpg', dest: 'portfolio-07-marines-crown.jpg' },
  { src: 'media_1794296778430_ff9e83fe.jpg', dest: 'portfolio-08-yadynamic.jpg' },
  { src: 'media_1794296778506_bd7bcd62.jpg', dest: 'portfolio-09-skynest.jpg' },
  { src: 'media_1794296778508_95bf8b82.jpg', dest: 'portfolio-10-sne-ayurbrahma.jpg' }
];

files.forEach(({ src, dest }) => {
  const srcPath = path.join(basePath, src);
  const destPath = path.join(targetDir, dest);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${src} -> ${destPath} (${fs.statSync(destPath).size} bytes)`);
});
