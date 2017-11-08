const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");

const cwd = process.cwd();

function inquireTarget(srcPath) {
  const targetQuestions = [
    {
      type: "input",
      name: "target",
      message: "Please input the target path(default is current path):",
    },
  ];

  inquirer.prompt(targetQuestions).then(answers => {
    try {
      fs.copySync(srcPath, path.join(cwd, answers.target || "./"));
      console.log(chalk.green("Generated successfully."));
    } catch (error) {
      console.error(error);
    }
  });
}

function custom() {
  const srcQuestions = [
    {
      type: "input",
      name: "source",
      message: "Please input the boilerplate path(default is current path):",
    },
  ];

  inquirer.prompt(srcQuestions).then(answers => {
    inquireTarget(path.join(cwd, answers.source || "./"));
  });
}

function page() {
  const questions = [
    {
      type: "list",
      name: "type",
      message: "What do you want to generate?",
      choices: ["custom", "detail page"],
    },
  ];

  inquirer.prompt(questions).then(answers => {
    switch (answers.type) {
      case "custom":
        custom();
        break;
      case "detail page":
        console.log("😬  Not support it yet.");
        break;
      default:
        break;
    }
  });
}

module.exports = function(args) {
  const type = args[1];

  switch (type) {
    case "page":
      page();
      break;
    default:
      console.log(chalk.red(`🙁  Type "${type}" is invalid.`));
      // normal();
      break;
  }
};
