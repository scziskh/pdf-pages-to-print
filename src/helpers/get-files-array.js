import { readFileAsync } from "./get-number-pages";

export const getFilesArray = async (files) => {
  return Object.keys(files).reduce(async (accum, key) => {
    const file = files[key];
    const pages = await readFileAsync(file);
    const temp = await accum;
    temp.push({ name: file.name, pages });
    return temp;
  }, Promise.resolve([]));
};
