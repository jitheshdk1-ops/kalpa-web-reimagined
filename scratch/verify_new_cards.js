const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const trackStart = html.indexOf('id="portfolio-gallery-track"');
const trackEnd = html.indexOf('<!-- 4 Process Focus Areas', trackStart);
const trackHtml = html.substring(trackStart, trackEnd);

const cardMatches = trackHtml.match(/<div class="portfolio-card">[\s\S]*?<\/div>/g);
console.log(`Cards count in track: ${cardMatches ? cardMatches.length : 0}`);

let allValid = true;
cardMatches.forEach((c, i) => {
  const src = c.match(/src="([^"]+)"/)[1];
  const alt = c.match(/alt="([^"]+)"/)[1];
  const exists = fs.existsSync(src);
  console.log(`Card ${i + 1}: ${src} [exists: ${exists}] (${alt})`);
  if (!exists) allValid = false;
});

if (cardMatches.length === 12 && allValid) {
  console.log('\n>>> SUCCESS: All 12 cards configured and all assets verified! <<<');
} else {
  console.error('\n>>> FAILED verification! <<<');
  process.exit(1);
}
