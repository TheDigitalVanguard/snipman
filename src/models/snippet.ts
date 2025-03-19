export class Snippet {
  folder: string;
  name: string;
  snippetCode: string;

  constructor(folder: string, name: string, snippetCode: string) {
    this.folder = folder;
    this.name = name;
    this.snippetCode = snippetCode;
  }

  // Returns the snippet details in a formatted object
  getDetails(wrap: boolean): {
    wrappedFolder: string;
    wrappedName: string;
    wrappedSnippet: string;
  } {
    const wrappedFolder = wrap ? this.wrapText(this.folder) : this.folder;
    const wrappedName = wrap ? this.wrapText(this.name) : this.name;
    const wrappedSnippet = wrap
      ? this.wrapText(this.snippetCode)
      : this.snippetCode;

    return { wrappedFolder, wrappedName, wrappedSnippet };
  }

  // Helper method to wrap text based on a max length (could use constants or settings)
  private wrapText(text: string): string {
    const MAX_LENGTH = 30; // Adjust this to be dynamic if needed, or import from constants
    const wrappedText = [];
    while (text.length > MAX_LENGTH) {
      wrappedText.push(text.slice(0, MAX_LENGTH));
      text = text.slice(MAX_LENGTH);
    }
    wrappedText.push(text); // Add the last part of the text

    return wrappedText.join("\n");
  }
}
