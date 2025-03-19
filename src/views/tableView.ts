import Table from "cli-table3";
import {
  FOLDER_COLUMN,
  NAME_COLUMN,
  SNIPPET_COLUMN,
} from "../constants/constants";

export class TableView {
  private table: Table;

  constructor() {
    this.table = new Table({
      style: { border: [] },
      head: [FOLDER_COLUMN, NAME_COLUMN, SNIPPET_COLUMN],
    });
  }

  addRow(folder: string, name: string, snippet: string) {
    this.table.push([folder, name, snippet]);
  }

  render(): string {
    return this.table.toString();
  }
}
