const fs = require('fs');
const js = fs.readFileSync('js/main.js', 'utf8');

const pStart = js.indexOf('// --- Framer Folioblox 3D Curved Cylindrical Carousel Gallery ---');
const pEnd = js.indexOf('// --- Scroll-Triggered Staggered Reveals ---');

console.log(js.substring(pStart, pEnd));
