// cli.js
const fs = require("fs");
const toml = require("toml");

function parseCommandLineArgs(args) {
  let lang = "en-CA";
  let outputDir = "./til";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "-c" || args[i] === "--config") {
      // Use config file
      const configFile = args[i + 1];
      const configData = fs.readFileSync(configFile, "utf-8");
      const config = toml.parse(configData);

      if (config.output) {
        outputDir = config.output;
      }

      if (config.lang) {
        lang = config.lang;
      }

      break; // Config file overrides other options
    } else if (args[i] === "-l" || args[i] === "--lang") {
      lang = args[i + 1] || "en-CA";
      // Skip the next argument as it has been processed as the language
      i++;
    }
  }

  const inputPath = args.find((arg) => !arg.startsWith("-"));

  return { lang, outputDir, inputPath };
}

module.exports = { parseCommandLineArgs };
