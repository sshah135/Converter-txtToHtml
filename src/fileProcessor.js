// fileProcessor.js
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const { generateSidebar, generateIndexPage } = require("./txtToHtml");

function processFile(inputFile, outputDir, lang) {
    try {
        const fileExtension = path.extname(inputFile);
        let outputPath;
    
        if (fileExtension === ".txt") {
          // Read and convert text files to HTML
          const txtContent = fs.readFileSync(inputFile, "utf-8");
          const htmlContent = textToHtml(txtContent, lang);
          const outputFileName = `${path.basename(inputFile, ".txt")}.html`;
          outputPath = path.join(outputDir, outputFileName);
          fs.writeFileSync(outputPath, htmlContent);
        } else if (fileExtension === ".md") {
          // Read and convert Markdown files to HTML
          const mdContent = fs.readFileSync(inputFile, "utf-8");
          const htmlContent = markdownToHtml(mdContent);
          const outputFileName = `${path.basename(inputFile, ".md")}.html`;
          outputPath = path.join(outputDir, outputFileName);
          fs.writeFileSync(outputPath, htmlContent);
        } else {
          console.error(`Unsupported file extension: ${fileExtension}`);
        }
    
        console.log(`Successfully converted ${inputFile} to ${outputPath}`);
      } catch (err) {
        console.error(`Error: ${err.message}`);

      }
}

function processDirectory(inputDir, outputDir, lang) {
    try {
        // Delete the existing 'til' folder, if it exists
        rimraf.sync(outputDir);
    
        // Create the output directory
        mkdirp.sync(outputDir);
    
        // Read the files in the input directory
        const files = fs.readdirSync(inputDir);
        generateSidebar(files, outputDir);
        generateIndexPage(files, outputDir);

    
        // Process each .txt file
        files.forEach((file) => {
          if (file.endsWith(".txt")) {
            const inputFile = path.join(inputDir, file);
            processFile(inputFile, outputDir, lang);
          }
        });
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
}

module.exports = { processFile, processDirectory };
