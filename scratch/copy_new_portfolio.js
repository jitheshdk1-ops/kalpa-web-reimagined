const fs = require('fs');
const path = require('path');

const targetDir = 'assets/images/portfolio';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const basePath = 'C:/Users/Jithesh/.gemini/antigravity/brain/a1aeb94d-2bf4-41b2-8c2f-60055d9d3a65/.user_uploaded/';

const newFiles = [
  { src: 'media_1794297914274_b72f5543.jpg', dest: 'portfolio-01-greensynth.jpg' },
  { src: 'media_1794297914275_072df54b.jpg', dest: 'portfolio-02-hro.jpg' },
  { src: 'media_1794297914275_747e1de8.jpg', dest: 'portfolio-03-didyuh-white.jpg' },
  { src: 'media_1794297914280_e449b230.jpg', dest: 'portfolio-04-farmbandi.jpg' },
  { src: 'media_1794297914283_71e497b3.jpg', dest: 'portfolio-05-didyuh-dark.jpg' },
  { src: 'media_1794297914289_19110c1d.jpg', dest: 'portfolio-06-hrudayam.jpg' },
  { src: 'media_1794297914289_62c3a816.jpg', dest: 'portfolio-07-marines-crown.jpg' },
  { src: 'media_1794297914290_49f4f245.jpg', dest: 'portfolio-08-parishudd.jpg' },
  { src: 'media_1794297914296_2d22f496.jpg', dest: 'portfolio-09-rk-foods.jpg' },
  { src: 'media_1794297914298_a444dcf0.jpg', dest: 'portfolio-10-swaram.jpg' },
  { src: 'media_1794297914300_e7cbfd83.jpg', dest: 'portfolio-11-atinav.jpg' }
];

newFiles.forEach(({ src, dest }) => {
  const s = path.join(basePath, src);
  const d = path.join(targetDir, dest);
  fs.copyFileSync(s, d);
  console.log(`Copied ${src} -> ${dest} (${fs.statSync(d).size} bytes)`);
});
