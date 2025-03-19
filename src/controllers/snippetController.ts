import { SnippetManager } from "../models/snippetManager";
import { TableView } from "../views/tableView";
import inquirer from "inquirer";
import chalk from "chalk";
import { SNIPMAN } from "../constants/constants";

export class SnippetController {
  private snippetManager: SnippetManager;
  private tableView: TableView;

  constructor() {
    this.snippetManager = new SnippetManager();
    this.tableView = new TableView();
  }

  async greet() {
    console.log(chalk.bgGreen(SNIPMAN));
  }

  async askName() {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
        validate: (input) => (input ? true : "Name cannot be empty"),
      },
    ]);
    console.log(chalk.bgGreen(`Hello, ${name}! Nice to meet you.`));
  }

  async listSnippets({ wrap }: { wrap: boolean }) {
    const snippets = this.snippetManager.getAllSnippets();
    if (snippets.length === 0) {
      return console.log(chalk.bgRed("No snippets found."));
    }

    snippets.forEach((snippet) => {
      const { wrappedFolder, wrappedName, wrappedSnippet } =
        snippet.getDetails(wrap);
      this.tableView.addRow(wrappedFolder, wrappedName, wrappedSnippet);
    });

    console.log(`\n${chalk.bgGreen(this.tableView.render())}\n`);
  }

  async addSnippet() {
    const { snippetFolder, snippetName, snippetCode } = await inquirer.prompt([
      {
        type: "input",
        name: "snippetFolder",
        message: "Folder name:",
        validate: (input) => (input ? true : "Folder name cannot be empty"),
      },
      {
        type: "input",
        name: "snippetName",
        message: "Snippet name:",
        validate: (input) => (input ? true : "Snippet name cannot be empty"),
      },
      {
        type: "input",
        name: "snippetCode",
        message: "Snippet code:",
        validate: (input) => (input ? true : "Snippet code cannot be empty"),
      },
    ]);

    this.snippetManager.addSnippet(snippetFolder, snippetName, snippetCode);
    console.log(
      chalk.bgCyan(`Snippet "${snippetName}" added to "${snippetFolder}"`)
    );
  }

  async removeSnippet({
    all,
    folder,
    name,
  }: {
    all: boolean;
    folder?: string;
    name?: string;
  }) {
    if (all) {
      const { confirm } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "Are you sure you want to delete all snippets?",
        },
      ]);
      if (confirm) this.snippetManager.deleteAllSnippets();
      return;
    }

    if (folder && name) {
      this.snippetManager.deleteSnippet(folder, name);
    }
  }
}
