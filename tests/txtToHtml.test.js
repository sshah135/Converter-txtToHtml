// __tests__/txtToHtml.test.js

const fs = require('fs')
const path = require('path')
const os = require('os')

const {
  textToHtml,
  markdownToHtml,
  generateSidebar,
  generateIndexPage,
} = require('../src/txtToHtml')

describe('txtToHtml', () => {
  const testOutputDir = path.join(os.tmpdir(), 'test_output') // Use a test-specific output directory

  beforeAll(() => {
    // Create the test-specific output directory before running the tests
    fs.mkdirSync(testOutputDir, { recursive: true })
  })

  test('textToHtml should convert text to HTML', () => {
    const text = 'Hello, world!'
    const html = textToHtml(text)
    expect(html).toContain('<p>Hello, world!</p>')
  })

  test('markdownToHtml should convert Markdown to HTML', () => {
    const markdown = '# Heading\n\n- List item'
    const html = markdownToHtml(markdown)
    expect(html).toContain('<h1>Heading</h1>')
    expect(html).toContain('<li>List item</li>')
  })

  // Add more tests for other functions...

  test('generateSidebar should generate a sidebar HTML', () => {
    const files = ['file1.html', 'file2.html']
    const sidebar = generateSidebar(files, testOutputDir)
    expect(sidebar).toContain('<a href="file1.html">file1.html</a>')
    expect(sidebar).toContain('<a href="file2.html">file2.html</a>')
  })

  test('generateIndexPage should generate an index page HTML', () => {
    const files = ['file1.html', 'file2.html']
    const indexPage = generateIndexPage(files, testOutputDir)
    expect(indexPage).toContain('<a href="file1.html">file1.html</a>')
    expect(indexPage).toContain('<a href="file2.html">file2.html</a>')
  })

  afterAll(() => {
    // Cleanup: Remove the test-specific output directory after running the tests
    fs.rmdirSync(testOutputDir, { recursive: true })
  })
})
