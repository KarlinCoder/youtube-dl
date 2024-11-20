export const shrinkText = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length).concat("...");
  } else {
    return text;
  }
};
