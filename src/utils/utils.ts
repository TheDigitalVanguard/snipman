import {
  MAX_FOLDER_STRING_SIZE,
  MAX_NAME_STRING_SIZE,
  MAX_SNIPPET_STRING_SIZE,
} from "../constants/constants";

export const wrapText = (text: string, maxLength: number) => {
  const wrappedText = [];
  while (text.length > maxLength) {
    wrappedText.push(text.slice(0, maxLength));
    text = text.slice(maxLength);
  }
  wrappedText.push(text);
  return wrappedText;
};

export const wrapDetails = (
  folder: string,
  name: string,
  snippet: string,
  wrap: boolean
) => {
  const wrappedFolder = wrap
    ? wrapText(folder, MAX_FOLDER_STRING_SIZE).join("\n")
    : folder;
  const wrappedName = wrap
    ? wrapText(name, MAX_NAME_STRING_SIZE).join("\n")
    : name;
  const wrappedSnippet = wrap
    ? wrapText(snippet, MAX_SNIPPET_STRING_SIZE).join("\n")
    : snippet;

  return { wrappedFolder, wrappedName, wrappedSnippet };
};
