import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const slidesDir = 'assets/images/slides';
const publicSlidesDir = 'public/assets/images/slides';

// Remove unused zip file from public/assets/images/slides if present
const zipInPublic = path.join(publicSlidesDir, 'Red_wine_bottles_with_light_47283c65_frames.zip');
if (fs.existsSync(zipInPublic)) {
  const zipSize = fs.statSync(zipInPublic).size;
  fs.unlinkSync(zipInPublic);
  console.log(`Removed unused frames zip from public slides: ${(zipSize / (1024 * 1024)).toFixed(2)} MB freed`);
}

const files = fs.readdirSync(slidesDir).filter(f => f.endsWith('.png')).sort();
console.log(`Found ${files.length} PNG frames to compress in ${slidesDir}...`);

let totalBefore = 0;
let totalAfter = 0;
const startTime = Date.now();

for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const srcPath = path.join(slidesDir, f);
  const origSize = fs.statSync(srcPath).size;
  totalBefore += origSize;

  // Compress into buffer
  const compressedBuffer = await sharp(srcPath)
    .png({ compressionLevel: 9, effort: 7 })
    .toBuffer();

  const newSize = compressedBuffer.length;
  totalAfter += newSize;

  // Overwrite in assets/images/slides
  fs.writeFileSync(srcPath, compressedBuffer);

  // Also write to public/assets/images/slides
  const publicDest = path.join(publicSlidesDir, f);
  fs.writeFileSync(publicDest, compressedBuffer);

  if ((i + 1) % 25 === 0 || i === files.length - 1) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const pct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
    console.log(`[${i + 1}/${files.length}] Processed... Current reduction: ${pct}% (${elapsed}s elapsed)`);
  }
}

const mbBefore = (totalBefore / (1024 * 1024)).toFixed(2);
const mbAfter = (totalAfter / (1024 * 1024)).toFixed(2);
const totalSaved = ((totalBefore - totalAfter) / (1024 * 1024)).toFixed(2);
const totalPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);

console.log('\n==========================================');
console.log(`COMPRESSION COMPLETE in ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
console.log(`Total size before: ${mbBefore} MB`);
console.log(`Total size after:  ${mbAfter} MB`);
console.log(`Total saved:       ${totalSaved} MB (${totalPct}% reduction)`);
console.log('==========================================');
