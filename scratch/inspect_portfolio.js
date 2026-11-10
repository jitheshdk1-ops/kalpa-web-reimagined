const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const trackStart = html.indexOf('id="portfolio-gallery-track"');
console.log(html.substring(trackStart + 2200, trackStart + 3500));
