const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');
const js = fs.readFileSync('js/main.js', 'utf8');

console.log('--- Checking HTML Reveal Structure ---');
const sections = [
  { name: 'Hero', regex: /hero-inner.*reveal-group/ },
  { name: 'Partners', regex: /id="partners"/ },
  { name: 'About Studio', regex: /value-prop-inner.*reveal-group/ },
  { name: 'Bento Grid', regex: /bento-grid.*reveal-group/ },
  { name: 'Services / Our Expertise', regex: /services-sticky-inner.*reveal-group/ },
  { name: 'Behind The Creative Work (Header)', regex: /portfolio-header.*reveal-group/ },
  { name: 'Behind The Creative Work (Gallery Viewport)', regex: /portfolio-gallery-viewport.*reveal-item/ },
  { name: 'Behind The Creative Work (Process)', regex: /portfolio-process-row.*reveal-group/ },
  { name: 'Footer', regex: /site-footer[\s\S]*?reveal-group/ }
];

let allPassed = true;

sections.forEach(sec => {
  const present = sec.regex.test(html);
  console.log(`Section [${sec.name}]: found in HTML? ${present}`);
  if (!present) allPassed = false;
});

// Check reveal classes in HTML
const revealItems = (html.match(/reveal-item/g) || []).length;
const revealCards = (html.match(/reveal-card/g) || []).length;
const revealGroups = (html.match(/reveal-group/g) || []).length;

console.log(`\nCounts in HTML:`);
console.log(`- .reveal-group: ${revealGroups}`);
console.log(`- .reveal-item: ${revealItems}`);
console.log(`- .reveal-card: ${revealCards}`);

if (revealItems < 15 || revealCards < 8 || revealGroups < 5) {
  console.error('FAIL: Expected higher count of reveal elements across all sections.');
  allPassed = false;
}

// Check CSS rules
console.log('\n--- Checking CSS Reveal System ---');
const requiredCSS = [
  '.reveal-item',
  '.reveal-card',
  '.reveal-group',
  '.reveal-item.visible',
  '.reveal-card.visible',
  'cubic-bezier(0.25, 1, 0.5, 1)',
  'prefers-reduced-motion'
];

requiredCSS.forEach(rule => {
  const has = css.includes(rule);
  console.log(`CSS contains "${rule}": ${has}`);
  if (!has) allPassed = false;
});

// Check JS implementation
console.log('\n--- Checking JS Reveal Observer ---');
const requiredJS = [
  'initScrollReveals',
  'IntersectionObserver',
  'threshold: 0.1',
  'unobserve'
];

requiredJS.forEach(token => {
  const has = js.includes(token);
  console.log(`JS contains "${token}": ${has}`);
  if (!has) allPassed = false;
});

if (allPassed) {
  console.log('\n>>> ALL SCROLL REVEAL TESTS PASSED SUCCESSFULLY! <<<');
} else {
  console.log('\n>>> SOME TESTS FAILED! <<<');
  process.exit(1);
}
