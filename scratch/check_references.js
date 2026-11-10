const fs = require('fs');

const js = fs.readFileSync('js/main.js', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

console.log('js includes portfolio-card:', js.includes('portfolio-card'));
console.log('css includes portfolio-card:', css.includes('portfolio-card'));
console.log('framerusercontent in index.html:', (html.match(/framerusercontent/g) || []).length);
console.log('framerusercontent in css:', (css.match(/framerusercontent/g) || []).length);
console.log('framerusercontent in js:', (js.match(/framerusercontent/g) || []).length);
