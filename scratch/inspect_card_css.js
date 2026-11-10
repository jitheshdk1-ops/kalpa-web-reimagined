const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

const matches = css.match(/\.portfolio-card[\s\S]*?\{[\s\S]*?\}/g);
if (matches) {
  matches.forEach(m => console.log(m));
}

const imgMatches = css.match(/\.portfolio-card\s+img[\s\S]*?\{[\s\S]*?\}/g);
if (imgMatches) {
  imgMatches.forEach(m => console.log(m));
}
