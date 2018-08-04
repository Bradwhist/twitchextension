const { execFile } = require('child_process');
const path = require('path');

const optionDefinitions = [
  { name: "account", alias: "a", type: String, defaultValue: "twitchdev" },
  { name: "repo", alias: "r", type: String, defaultValue: "extensions-hello-world" },
  { name: "directory", alias: "d", type: String },
  { name: "help", alias: "h" },
];

function usageAndExit() {
  console.log("Usage: node extension-init.js -a [github_account] -r [github_repo] -d [directory]");
  process.exit(0);
}

if (require.main === module) {
  const cli = require("command-line-args");
  const args = cli(optionDefinitions);
  const directory = args["directory"];
  if (directory === undefined || "help" in args) {
    usageAndExit();
  }

  const extensionRepo = `https://github.com/${args["account"]}/${args["repo"]}.git`;

  execFile("git", ["clone", extensionRepo, path.resolve(directory)], (err, stdout, stderr) => {
    if (err) {
      console.log(`ERROR: Remove the directory "${directory}" before re-running.`);
      console.log(err);
    } else {
      console.log(`Finished cloning ${extensionRepo}@master into ${directory}`);
    }
  });
}
