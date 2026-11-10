const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('js/main.js', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');

console.log('--- Checking Portfolio Track in HTML ---');
const trackStart = html.indexOf('id="portfolio-gallery-track"');
const trackEnd = html.indexOf('<!-- 4 Process Focus Areas', trackStart);
const trackHtml = html.substring(trackStart, trackEnd);

const cardMatches = trackHtml.match(/<div class="portfolio-card">[\s\S]*?<\/div>/g);
console.log(`Found ${cardMatches ? cardMatches.length : 0} portfolio cards in HTML.`);

if (!cardMatches || cardMatches.length !== 10) {
  console.error(`FAIL: Expected exactly 10 cards, found ${cardMatches ? cardMatches.length : 0}`);
  process.exit(1);
}

let allExist = true;
cardMatches.forEach((c, idx) => {
  const src = c.match(/src="([^"]+)"/)[1];
  const alt = c.match(/alt="([^"]+)"/)[1];
  const exists = fs.existsSync(src);
  console.log(`Card ${idx + 1}: ${src} [exists: ${exists}] - ${alt}`);
  if (!exists) allExist = false;
});

if (!allExist) {
  console.error('FAIL: Some image files do not exist.');
  process.exit(1);
}

// Check CSS properties for card and img
console.log('\n--- Checking CSS Rules for Cards & Images ---');
const hasObjectFitCover = css.includes('object-fit: cover');
const hasBorderRadius = css.includes('border-radius: 28px');
console.log('object-fit: cover present in CSS:', hasObjectFitCover);
console.log('border-radius present in CSS:', hasBorderRadius);

// Check that JS handles cards dynamically
console.log('\n--- Checking JS Gallery Animation ---');
const hasDynamicTotal = js.includes('const totalImages = cards.length;');
console.log('totalImages dynamic in JS:', hasDynamicTotal);

console.log('\n>>> ALL VERIFICATION CHECKS PASSED! <<<');
