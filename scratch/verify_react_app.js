import fs from 'fs';
import path from 'path';

console.log('--- Verifying React App Migration ---');

// 1. Check directories
const requiredDirs = [
  'src/components/common',
  'src/components/sections',
  'src/hooks',
  'src/pages',
  'src/styles',
  'public/assets/images',
  'public/assets/images/clients',
  'public/assets/images/portfolio',
  'public/assets/images/slides'
];

let dirsOk = true;
requiredDirs.forEach(d => {
  const exists = fs.existsSync(d);
  console.log(`Directory [${d}]: ${exists ? 'EXISTS' : 'MISSING'}`);
  if (!exists) dirsOk = false;
});

// 2. Check components
const requiredFiles = [
  'src/components/common/Header.jsx',
  'src/components/common/Footer.jsx',
  'src/components/sections/Hero.jsx',
  'src/components/sections/TrustedPartners.jsx',
  'src/components/sections/ValueProposition.jsx',
  'src/components/sections/BentoGrid.jsx',
  'src/components/sections/Services.jsx',
  'src/components/sections/Portfolio.jsx',
  'src/hooks/useHeroCanvas.js',
  'src/hooks/useScrollAnimation.js',
  'src/pages/Home.jsx',
  'src/App.jsx',
  'src/main.jsx',
  'src/styles/main.css',
  'vite.config.js',
  'package.json',
  'index.html'
];

let filesOk = true;
requiredFiles.forEach(f => {
  const exists = fs.existsSync(f);
  console.log(`File [${f}]: ${exists ? 'EXISTS' : 'MISSING'}`);
  if (!exists) filesOk = false;
});

// 3. Check assets in public
const requiredAssets = [
  'public/assets/images/kalpa-logo.png',
  'public/assets/images/kalpa-footer-logo.png',
  'public/assets/images/google-review.png',
  'public/assets/images/mockup-branding.svg',
  'public/assets/images/mockup-uiux.svg',
  'public/assets/images/mockup-packaging.svg',
  'public/assets/images/mockup-marketing.svg',
  'public/assets/images/card-impact.svg',
  'public/assets/images/card-creative.svg',
  'public/assets/images/clients/client-logo-01.png',
  'public/assets/images/clients/client-logo-12.png',
  'public/assets/images/portfolio/portfolio-01-greensynth.jpg',
  'public/assets/images/portfolio/portfolio-11-atinav.jpg',
  'public/assets/images/slides/frame_000001.png',
  'public/assets/images/slides/frame_000190.png'
];

let assetsOk = true;
requiredAssets.forEach(a => {
  const exists = fs.existsSync(a);
  console.log(`Asset [${a}]: ${exists ? 'EXISTS' : 'MISSING'}`);
  if (!exists) assetsOk = false;
});

// 4. Check dist build output
const distIndex = path.join('dist', 'index.html');
const distExists = fs.existsSync(distIndex);
console.log(`Build output [dist/index.html]: ${distExists ? 'FOUND' : 'MISSING'}`);

if (dirsOk && filesOk && assetsOk && distExists) {
  console.log('\n>>> COMPLETE REACT MIGRATION VERIFIED SUCCESSFULLY! <<<');
} else {
  console.error('\n>>> SOME VERIFICATION CHECKS FAILED! <<<');
  process.exit(1);
}
