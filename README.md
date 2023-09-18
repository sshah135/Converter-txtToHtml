# Converter-txtToHtml

# Text-to-HTML Converter

This command-line tool converts plain text files into valid HTML5 files. It can process single text files or all text files within a directory.

## Installation

Before using this tool, make sure you have [Node.js](https://nodejs.org/) installed on your system.

1. Clone or download this repository to your local machine.

2. Open your terminal or command prompt and navigate to the project directory.

3. Install the required dependencies by running:


## Usage

You can use this tool to convert text files to HTML with various options.

### Basic Usage

To convert a single text file to HTML:
```bash
node txtToHtml.js <input-file> [options]
```

### Options

- `-o, --output <output-directory>`: Specify the output directory for the generated HTML files. If not specified, the default is `./til`.

  Example:
```bash  
node txtToHtml.js ./example.txt -o ./output_folder
```
### Additional Features

#### Title Parsing

- If your input file contains a title, it should be the first line followed by two blank lines. The title will be used as the `<title>` and as an `<h1>` element in the HTML file.

#### Default Behavior

- By default, the tool creates an output directory named `til` (short for "text-to-HTML") in the current directory to store the generated HTML files. Existing content in the `til` directory is removed before generating new output.

## Examples

Here are some usage examples:

Convert a single text file and specify an output directory
```bash
node txtToHtml.js ./example.txt -o ./custom_output
```

Convert a directory of text files
```bash
node txtToHtml.js ./text_files -o ./output
```

Convert a text file with a specified stylesheet URL
```bash
node txtToHtml.js ./example.txt -s https://example.com/styles.css
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
