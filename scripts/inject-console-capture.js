const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
const outDir = path.join(__dirname, '..', '.next', 'server', 'app');

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('dashboard-console-capture.js')) {
      return;
    }
    
    content = content.replace('</head>', `${scriptTag}</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected console capture script into: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function walkDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.html')) {
        injectScript(filePath);
      }
    });
  } catch (error) {
    console.error(`Error walking directory ${dir}:`, error.message);
  }
}

if (fs.existsSync(outDir)) {
  console.log('Injecting console capture script into build files...');
  walkDir(outDir);
  console.log('Console capture script injection complete!');
} else {
  console.log('Build directory not found. Skipping script injection.');
}