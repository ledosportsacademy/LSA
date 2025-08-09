const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

// Directories
const frontendDir = path.join(__dirname, 'frontend');
const distDir = path.join(__dirname, 'frontend', 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Minify JavaScript files
async function minifyJS() {
  const jsFiles = ['api.js', 'app.js', 'loading.js', 'optimize.js'];
  
  for (const file of jsFiles) {
    const filePath = path.join(frontendDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const result = await minify(content);
      fs.writeFileSync(path.join(distDir, file), result.code);
      console.log(`✅ Minified ${file}`);
    } catch (err) {
      console.error(`❌ Error minifying ${file}:`, err);
    }
  }
}

// Minify CSS files
function minifyCSS() {
  const cssFiles = ['style.css', 'loading.css'];
  const cleanCSS = new CleanCSS({ level: 2 });
  
  for (const file of cssFiles) {
    const filePath = path.join(frontendDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const result = cleanCSS.minify(content);
      fs.writeFileSync(path.join(distDir, file), result.styles);
      console.log(`✅ Minified ${file}`);
    } catch (err) {
      console.error(`❌ Error minifying ${file}:`, err);
    }
  }
}

// Copy HTML file
function copyHTML() {
  const htmlFile = 'index.html';
  const filePath = path.join(frontendDir, htmlFile);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Update file paths to use minified versions
  const updatedContent = content
    .replace(/"style\.css"/g, '"dist/style.css"')
    .replace(/"loading\.css"/g, '"dist/loading.css"')
    .replace(/"api\.js"/g, '"dist/api.js"')
    .replace(/"app\.js"/g, '"dist/app.js"')
    .replace(/"loading\.js"/g, '"dist/loading.js"')
    .replace(/"optimize\.js"/g, '"dist/optimize.js"');
  
  fs.writeFileSync(path.join(frontendDir, 'index.prod.html'), updatedContent);
  console.log(`✅ Created production HTML file`);
}

// Run all tasks
async function run() {
  console.log('🔄 Starting minification process...');
  await minifyJS();
  minifyCSS();
  copyHTML();
  console.log('✨ Minification complete!');
}

run().catch(err => console.error('Error during minification:', err));