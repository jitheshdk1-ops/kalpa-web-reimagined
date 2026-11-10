import sharp from 'sharp';
import fs from 'fs';

const input = 'assets/images/slides/frame_000001.png';
const origSize = fs.statSync(input).size;
console.log('Original PNG size:', (origSize / 1024).toFixed(1), 'KB');

// Test 1: Lossless maximum PNG compression
await sharp(input)
  .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
  .toFile('scratch/test_lossless.png');
const losslessSize = fs.statSync('scratch/test_lossless.png').size;
console.log('Lossless PNG (level 9, effort 10):', (losslessSize / 1024).toFixed(1), 'KB', `(${((1 - losslessSize/origSize)*100).toFixed(1)}% reduction)`);

// Test 2: Palette quantized PNG (quality 85)
await sharp(input)
  .png({ quality: 85, compressionLevel: 9, effort: 10, palette: true })
  .toFile('scratch/test_palette85.png');
const pal85Size = fs.statSync('scratch/test_palette85.png').size;
console.log('Palette PNG (quality 85):', (pal85Size / 1024).toFixed(1), 'KB', `(${((1 - pal85Size/origSize)*100).toFixed(1)}% reduction)`);

// Test 3: Palette quantized PNG (quality 75)
await sharp(input)
  .png({ quality: 75, compressionLevel: 9, effort: 10, palette: true })
  .toFile('scratch/test_palette75.png');
const pal75Size = fs.statSync('scratch/test_palette75.png').size;
console.log('Palette PNG (quality 75):', (pal75Size / 1024).toFixed(1), 'KB', `(${((1 - pal75Size/origSize)*100).toFixed(1)}% reduction)`);

// Test 4: WebP (quality 85)
await sharp(input)
  .webp({ quality: 85, effort: 6 })
  .toFile('scratch/test_webp85.webp');
const webp85Size = fs.statSync('scratch/test_webp85.webp').size;
console.log('WebP (quality 85):', (webp85Size / 1024).toFixed(1), 'KB', `(${((1 - webp85Size/origSize)*100).toFixed(1)}% reduction)`);
