// src/types/cli-table3.d.ts
declare module "cli-table3" {
  type TableOptions = {
    head?: string[];
    style?: {
      border?: string[];
    };
    colWidths?: number[];
    colAligns?: string[];
  };

  export default class Table {
    constructor(options?: TableOptions);
    push(...rows: any[]): void;
    toString(): string;
    // Add missing `prototype` to fix the TypeScript error
    static prototype: any;
  }
}
