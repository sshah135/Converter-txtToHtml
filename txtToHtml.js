const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf'); // We'll use the 'rimraf' package to delete directories
const markdownIt = require('markdown-it')(); // Require and initialize the markdown-it package


// Function to convert Markdown to HTML
function markdownToHtml(markdown) {
  // Configure markdown-it for rendering bold text with double asterisks or double underscores
  markdownIt.use(require('markdown-it-container'), 'hljs', {
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        // Opening tag for a block of highlighted code
        return '<div class="hljs">';
      } else {
        // Closing tag for a block of highlighted code
        return '</div>';
      }
    },
  });

  // Use markdown-it to render Markdown as HTML
  return markdownIt.render(markdown);
}

// Function to convert text to HTML with paragraphs
function textToHtml(text) {
  const paragraphs = text.split('\n\n').map(para => `<p>${para.trim()}</p>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Filename</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  ${paragraphs}
</body>
</html>`;
}

// Function to process a single file
function processFile(inputFile, outputDir) {
  try {
    const fileExtension = path.extname(inputFile);

    if (fileExtension === '.txt') {
      // Read and convert text files to HTML
      const txtContent = fs.readFileSync(inputFile, 'utf-8');
      const htmlContent = textToHtml(txtContent);
      const outputFileName = `${path.basename(inputFile, '.txt')}.html`;
      const outputPath = path.join(outputDir, outputFileName);
      fs.writeFileSync(outputPath, htmlContent);
    } else if (fileExtension === '.md') {
      // Read and convert Markdown files to HTML
      const mdContent = fs.readFileSync(inputFile, 'utf-8');
      const htmlContent = markdownToHtml(mdContent);
      const outputFileName = `${path.basename(inputFile, '.md')}.html`;
      const outputPath = path.join(outputDir, outputFileName);
      fs.writeFileSync(outputPath, htmlContent);
    } else {
      console.error(`Unsupported file extension: ${fileExtension}`);
    }

    console.log(`Successfully converted ${inputFile} to ${outputPath}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}


// Function to process a directory of .txt files
function processDirectory(inputDir, outputDir) {
  try {
    // Delete the existing 'til' folder, if it exists
    rimraf.sync(outputDir);

    // Create the output directory
    mkdirp.sync(outputDir);

    // Read the files in the input directory
    const files = fs.readdirSync(inputDir);

    // Process each .txt file
    files.forEach(file => {
      if (file.endsWith('.txt')) {
        const inputFile = path.join(inputDir, file);
        processFile(inputFile, outputDir);
      }
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: node txtToHtml.js <input-file-or-directory> [output-directory]');
    return;
  }

  const inputPath = args[0];
  const outputDir = args[1] || './til';

  if (fs.existsSync(inputPath)) {
    if (fs.lstatSync(inputPath).isDirectory()) {
      processDirectory(inputPath, outputDir);
    } else {
      processFile(inputPath, outputDir);
    }
  } else {
    console.error('Error: Input file or directory not found.');
  }
}

main();
