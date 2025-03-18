"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleData = exports.deleteAll = exports.saveData = exports.readData = void 0;
const appdata_path_1 = __importDefault(require("appdata-path"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const FILE_NAME = "snipman.json";
const DATA_DIRECTORY = (0, appdata_path_1.default)("snipman");
const FILE_PATH = path_1.default.join(DATA_DIRECTORY, FILE_NAME);
if (!fs_1.default.existsSync(DATA_DIRECTORY)) {
    fs_1.default.mkdirSync(DATA_DIRECTORY, { recursive: true });
}
const readData = () => {
    return fs_1.default.existsSync(FILE_PATH) ? fs_1.default.readFileSync(FILE_PATH, "utf8") : null;
};
exports.readData = readData;
const saveData = (data) => {
    try {
        fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    }
    catch (err) {
        console.error(chalk_1.default.bgRed("Error saving snippets:"), chalk_1.default.bgRed(err));
    }
};
exports.saveData = saveData;
const deleteAll = () => {
    try {
        if (fs_1.default.existsSync(FILE_PATH)) {
            fs_1.default.unlinkSync(FILE_PATH);
            console.log(chalk_1.default.bgGreen("Snippets deleted successfully"));
        }
        else {
            console.log(chalk_1.default.bgYellow("No snippets to delete"));
        }
    }
    catch (err) {
        console.error(chalk_1.default.bgRed("Error deleting snippets:"), chalk_1.default.bgRed(err));
    }
};
exports.deleteAll = deleteAll;
const handleData = (folder, name, snippet) => {
    const currentSnipman = (0, exports.readData)();
    const parsed = currentSnipman ? JSON.parse(currentSnipman) : {};
    if (!parsed[folder]) {
        parsed[folder] = {};
    }
    if (!parsed[folder][name]) {
        parsed[folder][name] = [];
    }
    parsed[folder][name].push(snippet);
    (0, exports.saveData)(parsed);
};
exports.handleData = handleData;
