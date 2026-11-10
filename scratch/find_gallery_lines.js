const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8');

const lines = js.split('\n');
lines.forEach((l, i) => {
  if (l.includes('portfolio') || l.includes('gallery')) {
    console.log(`${i+1}: ${l}`);
  }
});
