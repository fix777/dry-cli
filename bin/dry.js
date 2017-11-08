#!/usr/bin/env node

const program = require("commander");

const pkg = require("./../package.json");
const generateCli = require("./../lib/generate");

program
  .version(pkg.version)
  .option("-g, --generate", "Generate a template")
  .parse(process.argv);

if (program.generate) {
  generateCli(process.argv.slice(2));
}
