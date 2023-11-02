// main.js
const { FileProcessor } = require('./src/txtToHtml')
const {
  processFile,
  generateSidebar,
  generateIndexPage,
} = require('./fileProcessor')
const fs = require('fs')
const { parseCommandLineArgs } = require('./cli')

function main() {
  try {
    const args = process.argv.slice(2)
    const { lang, outputDir, inputPath } = parseCommandLineArgs(args)

    if (!inputPath) {
      console.error('Error: Input file or directory path not provided.')
      process.exit(1) // Exit with an error code
    }

    if (fs.existsSync(inputPath)) {
      if (fs.lstatSync(inputPath).isDirectory()) {
        const fileProcessor = new FileProcessor(null, outputDir, lang)
        fileProcessor.processDirectory(inputPath, outputDir)

        // Generate a sidebar and index page
        const files = fs.readdirSync(outputDir)
        generateSidebar(files, outputDir)
        generateIndexPage(files, outputDir)
      } else {
        processFile(inputPath, outputDir, lang)
      }
      console.log('Conversion completed successfully.')
      process.exit(0) // Exit with success code
    } else {
      console.error('Error: Input file or directory not found.')
      process.exit(1) // Exit with an error code
    }
  } catch (error) {
    console.error(`Unexpected Error: ${error.message}`)
    process.exit(1) // Exit with an error code
  }
}

module.exports = main
