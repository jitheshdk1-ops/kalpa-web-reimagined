const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const trackStart = html.indexOf('id="portfolio-gallery-track"');
const trackEnd = html.indexOf('<!-- 4 Process Focus Areas', trackStart);
const trackHtml = html.substring(trackStart, trackEnd);

const cardMatches = trackHtml.match(/<div class="portfolio-card">[\s\S]*?<\/div>/g);
console.log(`Cards count in track: ${cardMatches ? cardMatches.length : 0}`);

const framerCount = (trackHtml.match(/framerusercontent/g) || []).length;
console.log(`framer images count: ${framerCount}`);

if (cardMatches && cardMatches.length === 12 && framerCount === 12) {
  console.log('REVERT VERIFIED: Exactly 12 original Framer project cards restored.');
} else {
  console.error('FAIL: Revert check failed.');
  process.exit(1);
}
