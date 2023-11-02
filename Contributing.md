# Contributing to Converter-txtToHtml

Thank you for considering contributing to the Converter-txtToHtml project! Before making your contribution, please take a moment to review the following guidelines.

## Setting Up the Project

1. Clone or download this repository to your local machine.

```bash
git clone https://github.com/sshah135/Converter-txtToHtml.git
```

2. Open your terminal or command prompt and navigate to the project directory.

```bash
cd Converter=txtToHtml
```

3. Install the required dependencies by running:

```bash
npm install
```

## Development Workflow

### Source Code Formatter

We use Prettier for code formatting. Make sure to run the following command before making any commits:

```bash
npm run format
```
### Linter
We use ESLint for code linting. Run the following command to check for linting issues:

```bash
npm run lint
```

### Editor/IDE Integration

Ensure that your code editor is configured to use the provided settings for Prettier and ESLint. Refer to .vscode/settings.json for VSCode settings.

### Git Pre-Commit Hook
To maintain code consistency, a pre-commit hook is set up to run the formatter and linter before each commit. Ensure that the code passes these checks before committing.

## Submitting Changes

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make your changes and run the formatter and linter.

4. Push your changes to your forked repository.

5. Submit a pull request with a clear title and description.

### Code of Conduct
Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.