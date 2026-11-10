import sharp from 'sharp';
import fs from 'fs';

for (const num of ['000001', '000050', '000100', '000150']) {
  const file = `assets/images/slides/frame_${num}.png`;
  const orig = fs.statSync(file).size;
  const buf = await sharp(file).png({ compressionLevel: 9, effort: 7 }).toBuffer();
  console.log(`frame_${num}.png: ${(orig/1024).toFixed(1)} KB -> ${(buf.length/1024).toFixed(1)} KB (${((1 - buf.length/orig)*100).toFixed(1)}% reduction)`);
}
