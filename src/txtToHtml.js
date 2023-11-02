const { FileProcessor, textToHtml, markdownToHtml, generateSidebar, generateIndexPage } = require('./main');
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf') // We'll use the 'rimraf' package to delete directories
const markdownIt = require('markdown-it')() // Require and initialize the markdown-it package



function textToHtml(text, lang = 'en-CA') {
  const paragraphs = text
    .split('\n\n')
    .map((para) => `<p>${para.trim()}</p>`)
    .join('\n')

  return generateHtmlTemplate(lang, paragraphs)
}

function generateHtmlTemplate(lang, content) {
  return `
    <!DOCTYPE html>
    <html lang="${lang}">
    <head>
      <meta charset="utf-8">
      <title>Filename</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      ${content}
    </body>
    </html>`
}

// Function to convert Markdown to HTML
function markdownToHtml(markdown, lang = 'en-CA') {
  markdownIt.use(require('markdown-it-container'), 'hljs', {
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        // Opening tag for a block of highlighted code
        return '<div class="hljs">'
      } else {
        // Closing tag for a block of highlighted code
        return '</div>'
      }
    },
  })

  // Set the language for the root <html> element
  markdownIt.options.langPrefix = `language-${lang}`

  // Use markdown-it to render Markdown as HTML
  return generateHtmlTemplate(lang, markdownIt.render(markdown))
}

function generateSidebar(files, outputDir) {
  const sidebarContent = files
    .filter((file) => file.endsWith('.html'))
    .map((file) => `<li><a href="${file}">${file}</a></li>`)
    .join('\n')

  const sidebarHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Sidebar</title>
    </head>
    <body>
      <ul>${sidebarContent}</ul>
    </body>
    </html>`

  const sidebarPath = path.join(outputDir, 'sidebar.html')
  fs.writeFileSync(sidebarPath, sidebarHtml)
  console.log(`Sidebar generated successfully: ${sidebarPath}`)
}

function generateIndexPage(files, outputDir) {
  const indexContent = files
    .filter((file) => file.endsWith('.html'))
    .map((file) => `<li><a href="${file}">${file}</a></li>`)
    .join('\n')

  const indexHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Index Page</title>
    </head>
    <body>
      <h1>Index Page</h1>
      <ul>${indexContent}</ul>
    </body>
    </html>`

  const indexPath = path.join(outputDir, 'index.html')
  fs.writeFileSync(indexPath, indexHtml)
  console.log(`Index page generated successfully: ${indexPath}`)
}

class FileProcessor {
  constructor(inputFile, outputDir, lang) {
    this.inputFile = inputFile
    this.outputDir = outputDir
    this._lang = lang || 'en'
  }
  processFile(inputFile, outputDir) {
    let outputPath
    try {
      const fileExtension = path.extname(inputFile)

      if (fileExtension === '.txt') {
        // Read and convert text files to HTML
        const txtContent = fs.readFileSync(inputFile, 'utf-8')
        const htmlContent = textToHtml(txtContent)
        const outputFileName = `${path.basename(inputFile, '.txt')}.html`
        const outputPath = path.join(outputDir, outputFileName)
        fs.writeFileSync(outputPath, htmlContent)
      } else if (fileExtension === '.md') {
        // Read and convert Markdown files to HTML
        const mdContent = fs.readFileSync(inputFile, 'utf-8')
        const htmlContent = markdownToHtml(mdContent)
        const outputFileName = `${path.basename(inputFile, '.md')}.html`
        const outputPath = path.join(outputDir, outputFileName)
        fs.writeFileSync(outputPath, htmlContent)
      } else {
        console.error(`Unsupported file extension: ${fileExtension}`)
      }

      console.log(`Successfully converted ${inputFile} to ${outputPath}`)
    } catch (err) {
      console.error(`Error: ${err.message}`)
    }
  }

  // Function to process a directory of .txt files
  processDirectory(inputDir, outputDir) {
    try {
      // Delete the existing 'til' folder, if it exists
      rimraf.sync(outputDir)

      // Create the output directory
      mkdirp.sync(outputDir)

      // Read the files in the input directory
      const files = fs.readdirSync(inputDir)

      // Process each .txt file
      files.forEach((file) => {
        if (file.endsWith('.txt')) {
          const inputFile = path.join(inputDir, file)
          this.processFile(inputFile, outputDir)
        }
      })
    } catch (err) {
      console.error(`Error: ${err.message}`)
    }
  }
}

module.exports = {
  textToHtml,
  markdownToHtml,
  generateSidebar,
  generateIndexPage,
  FileProcessor,
}
