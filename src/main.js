// main.js
const { parseCommandLineArgs } = require("./cli");
const { processFile, processDirectory } = require("./fileProcessor");

function main() {
  try {
    const args = process.argv.slice(2);
    const { lang, outputDir, inputPath } = parseCommandLineArgs(args);

    if (fs.existsSync(inputPath)) {
      if (fs.lstatSync(inputPath).isDirectory()) {
        processDirectory(inputPath, outputDir, lang);
      } else {
        processFile(inputPath, outputDir, lang);
      }
      console.log("Conversion completed successfully.");
      process.exit(0); // Exit with success code
    } else {
      console.error("Error: Input file or directory not found.");
      process.exit(1); // Exit with an error code
    }
  } catch (error) {
    console.error(`Unexpected Error: ${error.message}`);
    process.exit(1); // Exit with an error code
  }
}

module.exports = main;
