// commandHandler.ts
import { Command } from "commander";
import { SnippetController } from "./controllers/snippetController";
export class CommandHandler {
  private program: Command;
  private controller: SnippetController;

  constructor() {
    this.program = new Command();
    this.controller = new SnippetController();
    this.setupCommands();
  }

  private setupCommands() {
    this.program.version("1.0.0");

    // Greet command
    this.program
      .command("greet")
      .description("Print a greeting message")
      .action(() => this.controller.greet());

    // Ask command
    this.program
      .command("ask")
      .description("Ask the user for their name and greet them")
      .action(() => this.controller.askName());

    // List Snippets
    this.program
      .command("ls")
      .description("List all stored snippets")
      .option("-w, --wrap", "Wrap text in all cells")
      .action(({ wrap }) => this.controller.listSnippets({ wrap }));

    // Add Snippet
    this.program
      .command("add")
      .description("Add a new snippet")
      .action(() => this.controller.addSnippet());

    // Remove Snippets
    this.program
      .command("rm")
      .description("Delete snippets")
      .option("-a, --all", "Delete all snippets")
      .option("-f, --folder <folder>", "Delete specific folder")
      .option("-n, --name <name>", "Delete specific snippet")
      .action(({ all, folder, name }) =>
        this.controller.removeSnippet({ all, folder, name })
      );
  }

  // Parse the CLI arguments
  public parseArgs(args: string[]) {
    this.program.parse(args);
  }
}
