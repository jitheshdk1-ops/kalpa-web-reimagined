const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const head = html.match(/<head>([\s\S]*?)<\/head>/);
if (head) {
  console.log(head[1]);
}
