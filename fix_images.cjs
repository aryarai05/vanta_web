const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, 'src/data/content.ts');
let content = fs.readFileSync(contentPath, 'utf8');

// Replace pexels URLs with picsum URLs using the photo ID as the seed for consistency
content = content.replace(/https:\/\/images\.pexels\.com\/photos\/(\d+)\/[^'"]+/g, (match, id) => {
  return `https://picsum.photos/seed/${id}/1200/800`;
});

fs.writeFileSync(contentPath, content);
console.log('Images replaced!');
