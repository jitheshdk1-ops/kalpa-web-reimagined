const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8');

const pStart = js.indexOf("document.getElementById('portfolio')");
const pCode = js.substring(pStart, pStart + 4000);

const hasHardcoded12 = pCode.match(/\b12\b/g);
console.log('Instances of 12 in portfolio JS:', hasHardcoded12);

console.log('totalImages definition:', pCode.match(/const totalImages[^\n]+/));
