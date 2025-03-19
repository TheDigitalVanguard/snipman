#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const cli_table3_1 = __importDefault(require("cli-table3"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const io_js_1 = require("./io.js");
const utils_js_1 = require("./utils.js");
const constants_js_1 = require("./constants.js");
const program = new commander_1.Command();
const table = new cli_table3_1.default({
    style: { border: [] },
    head: [constants_js_1.FOLDER_COLUMN, constants_js_1.NAME_COLUMN, constants_js_1.SNIPPET_COLUMN],
});
const pushToTable = (folder, name, snippet, wrap) => {
    const { wrappedFolder, wrappedName, wrappedSnippet } = (0, utils_js_1.wrapDetails)(folder, name, snippet, wrap);
    table.push([wrappedFolder, wrappedName, wrappedSnippet]);
};
program.version("1.0.0");
// Greet command
program
    .command("greet")
    .description("Print a greeting message")
    .action(() => {
    console.log(chalk_1.default.bgGreen(constants_js_1.SNIPMAN));
});
// Ask command
program
    .command("ask")
    .description("Ask the user for their name and greet them")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = yield inquirer_1.default.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
            validate: (input) => (input ? true : "Name cannot be empty"),
        },
    ]);
    console.log(chalk_1.default.bgGreen(`Hello, ${name}! Nice to meet you.`));
}));
// List Snippets
program
    .command("ls")
    .description("List all stored snippets")
    .option("-f, --folder <folder>", "Filter by folder")
    .option("-n, --name <name>", "Filter by snippet name")
    .option("-w, --wrap", "Wrap text in all cells")
    .action(({ folder, name, wrap }) => {
    const data = (0, io_js_1.readData)();
    if (!data)
        return console.log(chalk_1.default.bgRed("No snippets found."));
    const parsed = JSON.parse(data);
    if (folder && parsed[folder]) {
        // Folder exists, filter within it
        if (name && parsed[folder][name]) {
            // Both folder and name exist, push directly
            parsed[folder][name].forEach((snippet) => {
                pushToTable(folder, name, snippet, wrap);
            });
        }
        else {
            // Only folder exists, iterate through names in folder
            Object.entries(parsed[folder]).forEach(([nameKey, snippetArr]) => {
                snippetArr.forEach((snippet) => {
                    pushToTable(folder, nameKey, snippet, wrap);
                });
            });
        }
    }
    else {
        // No folder filter, iterate normally (O(n * m * k))
        Object.entries(parsed).forEach(([folderKey, snippets]) => {
            Object.entries(snippets).forEach(([nameKey, snippetArr]) => {
                snippetArr.forEach((snippet) => {
                    if (!name || nameKey === name) {
                        pushToTable(folderKey, nameKey, snippet, wrap);
                    }
                });
            });
        });
    }
    console.log(`\n${chalk_1.default.bgGreen(table.toString())}\n`);
});
// Remove Snippets
program
    .command("rm")
    .description("Delete snippets")
    .option("-a, --all", "Delete all snippets")
    .option("-f, --folder <folder>", "Delete specific folder")
    .option("-n, --name <name>", "Delete specific snippet")
    .action((_a) => __awaiter(void 0, [_a], void 0, function* ({ all, folder, name }) {
    if (all) {
        const { confirm } = yield inquirer_1.default.prompt([
            {
                type: "confirm",
                name: "confirm",
                message: "Are you sure you want to delete all snippets?",
            },
        ]);
        if (confirm)
            (0, io_js_1.deleteAll)();
        return;
    }
    const data = (0, io_js_1.readData)();
    if (!data)
        return console.log(chalk_1.default.bgRed("No snippets found."));
    const parsed = JSON.parse(data);
    if (folder)
        delete parsed[folder];
    else if (name)
        Object.values(parsed).forEach((snippets) => delete snippets[name]);
    Object.keys(parsed).length ? (0, io_js_1.saveData)(parsed) : (0, io_js_1.deleteAll)();
}));
// Add Snippet
program
    .command("add")
    .description("Add a new snippet")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const { snippetFolder, snippetName, snippetCode } = yield inquirer_1.default.prompt([
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
    (0, io_js_1.handleData)(snippetFolder, snippetName, snippetCode);
    console.log(chalk_1.default.bgCyan(`Snippet "${snippetName}" added to "${snippetFolder}"`));
}));
// Parse CLI arguments
program.parse(process.argv);
