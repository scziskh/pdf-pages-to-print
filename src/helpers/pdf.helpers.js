import { PDFDocument } from "pdf-lib";

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    // New File Reader
    const reader = new FileReader();

    // if reader read return result
    reader.onload = () => resolve(reader.result);

    // if reader error throw error
    reader.onerror = (error) => reject(error);

    // read file as array buffer (UTF-8)
    reader.readAsArrayBuffer(file);
  });
};

export const getPdfInfo = async (files) => {
  // reduce array with each number of file (like as [0,1,2...n])
  return Object.keys(files).reduce(async (accum, key) => {
    // file is current file
    const file = files[key];

    // read file as array buffer (UTF-8)
    const arrayBuffer = await readFileAsArrayBuffer(file);

    // load pdf file with pdf-lib
    const pdf = await PDFDocument.load(arrayBuffer);

    // temp accum async
    const temp = await accum;

    // get number of pages
    const pages = pdf.getPages().length;

    // push info about curr file (name, pages)
    temp.push({ name: file.name, pages });

    return temp;
  }, Promise.resolve([])); // async accum
};
