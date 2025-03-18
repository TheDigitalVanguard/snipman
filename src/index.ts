#!/usr/bin/env node

import { Command } from "commander";
import Table from "cli-table3";
import inquirer from "inquirer";
import chalk from "chalk";
import { handleData, readData, deleteAll, saveData } from "./io.js";
import { SnippetProps } from "./types.js";

const program = new Command();
const table = new Table({
  head: ["Folder", "Name", "Snippet"],
  colWidths: [20, 20, 60],
  wordWrap: true,
});

program.version("1.0.0");

// Greet command
program
  .command("greet")
  .description("Print a greeting message")
  .action(() => {
    console.log(
      chalk.bgGreen(`
      SSSSS   N   N  III  PPPP   M   M   A   N   N
     S        NN  N   I   P   P  MM MM  A A  NN  N
      SSSSS   N N N   I   PPPP   M M M AAAAA N N N
          S   N  NN   I   P      M   M A   A N  NN
      SSSSS   N   N  III  P      M   M A   A N   N
    `)
    );
  });

// Ask command
program
  .command("ask")
  .description("Ask the user for their name and greet them")
  .action(async () => {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?",
        validate: (input) => (input ? true : "Name cannot be empty"),
      },
    ]);
    console.log(chalk.bgGreen(`Hello, ${name}! Nice to meet you.`));
  });

// List Snippets
program
  .command("ls")
  .description("List all stored snippets")
  .option("-f, --folder <folder>", "Filter by folder")
  .option("-n, --name <name>", "Filter by snippet name")
  .action(({ folder, name }) => {
    const data = readData();
    if (!data) return console.log(chalk.bgRed("No snippets found."));

    const parsed: SnippetProps = JSON.parse(data);

    if (folder && parsed[folder]) {
      // Folder exists, filter within it
      if (name && parsed[folder][name]) {
        // Both folder and name exist, push directly
        parsed[folder][name].forEach((snippet) => {
          table.push([folder, name, snippet]);
        });
      } else {
        // Only folder exists, iterate through names in folder
        Object.entries(parsed[folder]).forEach(([nameKey, snippetArr]) => {
          snippetArr.forEach((snippet) =>
            table.push([folder, nameKey, snippet])
          );
        });
      }
    } else {
      // No folder filter, iterate normally (O(n * m * k))
      Object.entries(parsed).forEach(([folderKey, snippets]) => {
        Object.entries(snippets).forEach(([nameKey, snippetArr]) => {
          snippetArr.forEach((snippet) => {
            if (!name || nameKey === name) {
              table.push([folderKey, nameKey, snippet]);
            }
          });
        });
      });
    }

    console.log(`\n${chalk.bgGreen(table.toString())}\n`);
  });

// Remove Snippets
program
  .command("rm")
  .description("Delete snippets")
  .option("-a, --all", "Delete all snippets")
  .option("-f, --folder <folder>", "Delete specific folder")
  .option("-n, --name <name>", "Delete specific snippet")
  .action(async ({ all, folder, name }) => {
    if (all) {
      const { confirm } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "Are you sure you want to delete all snippets?",
        },
      ]);
      if (confirm) deleteAll();
      return;
    }

    const data = readData();
    if (!data) return console.log(chalk.bgRed("No snippets found."));

    const parsed: SnippetProps = JSON.parse(data);
    if (folder) delete parsed[folder];
    else if (name)
      Object.values(parsed).forEach((snippets) => delete snippets[name]);

    Object.keys(parsed).length ? saveData(parsed) : deleteAll();
  });

// Add Snippet
program
  .command("add")
  .description("Add a new snippet")
  .action(async () => {
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

    handleData(snippetFolder, snippetName, snippetCode);
    console.log(
      chalk.bgCyan(`Snippet "${snippetName}" added to "${snippetFolder}"`)
    );
  });

// Parse CLI arguments
program.parse(process.argv);
