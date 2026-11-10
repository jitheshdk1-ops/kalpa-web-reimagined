import sharp from 'sharp';

const input = 'assets/images/slides/frame_000001.png';

console.time('effort 7');
await sharp(input).png({ compressionLevel: 9, effort: 7 }).toBuffer();
console.timeEnd('effort 7');

console.time('effort 10');
await sharp(input).png({ compressionLevel: 9, effort: 10 }).toBuffer();
console.timeEnd('effort 10');

console.time('palette 85 effort 7');
await sharp(input).png({ quality: 85, compressionLevel: 9, effort: 7, palette: true }).toBuffer();
console.timeEnd('palette 85 effort 7');
