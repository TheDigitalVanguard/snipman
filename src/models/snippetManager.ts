import { Snippet } from "./snippet";
import { readData, saveData, deleteAll } from "../data/io";
import { SnippetProps } from "../types/types";

export class SnippetManager {
  // Gets all snippets
  getAllSnippets(): Snippet[] {
    const data = readData();
    if (!data) return [];

    const parsed: SnippetProps = JSON.parse(data);
    const snippets: Snippet[] = [];

    Object.entries(parsed).forEach(([folder, names]) => {
      Object.entries(names).forEach(([name, snippetsArray]) => {
        snippetsArray.forEach((snippet: string) => {
          snippets.push(new Snippet(folder, name, snippet));
        });
      });
    });

    return snippets;
  }

  // Add a new snippet
  addSnippet(folder: string, name: string, snippet: string) {
    const currentSnipman = readData();
    const parsed = currentSnipman ? JSON.parse(currentSnipman) : {};

    if (!parsed[folder]) parsed[folder] = {};
    if (!parsed[folder][name]) parsed[folder][name] = [];

    parsed[folder][name].push(snippet);
    saveData(parsed);
  }

  // Remove all snippets
  deleteAllSnippets() {
    deleteAll();
  }

  // Delete a specific snippet
  deleteSnippet(folder: string, name: string) {
    const data = readData();
    if (!data) return;

    const parsed = JSON.parse(data);
    if (parsed[folder]) {
      delete parsed[folder][name];
      saveData(parsed);
    }
  }
}
