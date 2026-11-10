import sharp from 'sharp';

const input = 'assets/images/slides/frame_000001.png';

const bufLossless7 = await sharp(input).png({ compressionLevel: 9, effort: 7 }).toBuffer();
const bufLossless10 = await sharp(input).png({ compressionLevel: 9, effort: 10 }).toBuffer();
const bufPalette85 = await sharp(input).png({ quality: 85, compressionLevel: 9, effort: 7, palette: true }).toBuffer();

console.log('Lossless effort 7 size:', (bufLossless7.length / 1024).toFixed(1), 'KB');
console.log('Lossless effort 10 size:', (bufLossless10.length / 1024).toFixed(1), 'KB');
console.log('Palette 85 effort 7 size:', (bufPalette85.length / 1024).toFixed(1), 'KB');
