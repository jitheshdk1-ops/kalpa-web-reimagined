const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8');

const pStart = js.indexOf('portfolio-gallery');
console.log(js.substring(pStart - 100, pStart + 1500));
