const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = './public';
const files = fs.readdirSync(directory);

console.log('Starting conversion...');

const pngFiles = files.filter(f => f.startsWith('ezgif-frame-') && f.endsWith('.png'));

async function convert() {
  for (const file of pngFiles) {
    const inputPath = path.join(directory, file);
    const outputPath = path.join(directory, file.replace('.png', '.webp'));
    
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
  }
  console.log('Conversion complete!');
}

convert().catch(err => {
  console.error('Error during conversion:', err);
  process.exit(1);
});
