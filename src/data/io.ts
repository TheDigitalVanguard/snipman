import getAppDataPath from "appdata-path";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { SnippetProps } from "../types/types";

const FILE_NAME = "snipman.json";
const DATA_DIRECTORY = getAppDataPath("snipman");
const FILE_PATH = path.join(DATA_DIRECTORY, FILE_NAME);

if (!fs.existsSync(DATA_DIRECTORY)) {
  fs.mkdirSync(DATA_DIRECTORY, { recursive: true });
}

export const readData = () => {
  return fs.existsSync(FILE_PATH) ? fs.readFileSync(FILE_PATH, "utf8") : null;
};

export const saveData = (data: SnippetProps) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(chalk.bgRed("Error saving snippets:"), chalk.bgRed(err));
  }
};

export const deleteAll = () => {
  try {
    if (fs.existsSync(FILE_PATH)) {
      fs.unlinkSync(FILE_PATH);
      console.log(chalk.bgGreen("Snippets deleted successfully"));
    } else {
      console.log(chalk.bgYellow("No snippets to delete"));
    }
  } catch (err) {
    console.error(chalk.bgRed("Error deleting snippets:"), chalk.bgRed(err));
  }
};

export const handleData = (folder: string, name: string, snippet: string) => {
  const currentSnipman = readData();
  const parsed = currentSnipman ? JSON.parse(currentSnipman) : {};

  if (!parsed[folder]) {
    parsed[folder] = {};
  }
  if (!parsed[folder][name]) {
    parsed[folder][name] = [];
  }

  parsed[folder][name].push(snippet);
  saveData(parsed);
};
