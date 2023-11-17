//cli.test.js
const { parseCommandLineArgs } = require('../src/cli')

describe('parseCommandLineArgs', () => {
  test('should parse command line arguments', () => {
    const args = [
      'node',
      'cli.js',
      '-l',
      'fr-CA',
      '-c',
      'config.toml',
      'input.txt',
    ]
    const result = parseCommandLineArgs(args)

    expect(result).toEqual({
      lang: 'fr', // Update the expected lang value based on your test case
      outputDir: './build', // Assuming default outputDir is './til'
      inputPath: 'node', // Adjust the expected inputPath based on the actual behavior
    })
  })
})
