export const wrapText = (text: string, maxLength: number) => {
  const wrappedText = [];
  while (text.length > maxLength) {
    wrappedText.push(text.slice(0, maxLength));
    text = text.slice(maxLength);
  }
  wrappedText.push(text);
  return wrappedText;
};
