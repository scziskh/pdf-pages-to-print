import { PDFDocument } from "pdf-lib";

// read file as array buffer
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

// get pdf info (name and count of pages)
export const getPdfsInfo = async (files) => {
  // reduce array with each number of file (like as [0,1,2...n])
  return Object.keys(files).reduce(async (accum, key) => {
    // file is current file
    const file = files[key];

    // read file as array buffer (UTF-8)
    const arrayBuffer = await readFileAsArrayBuffer(file);
    // load pdf file with pdf-lib
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    // temp accum async
    const temp = await accum;
    // get number of pages
    const pages = pdf.getPageCount();

    // push info about curr file (name, pages)
    temp.push({ name: file.name, pages });

    return temp;
  }, Promise.resolve([])); // async accum
};

export const getPdfsTotalPages = (pdfsInfo) => {
  let sum = 0;
  for (var i = 0; i < pdfsInfo.length; i++) {
    sum += pdfsInfo[i].pages;
  }
  return sum;
};

export const getPdfsTotalSheets = (pdfsInfo) => {
  let sum = 0;
  for (var i = 0; i < pdfsInfo.length; i++) {
    sum += Math.ceil(pdfsInfo[i].pages / 2);
  }
  return sum;
};

export const getPdfsTotalFolders = (pdfsInfo) => {
  let sum = 0;
  for (var i = 0; i < pdfsInfo.length; i++) {
    if (pdfsInfo[i].pages > 70) {
      sum++;
    }
  }
  return sum;
};

export const getPdfsTotalStaples = (pdfsInfo) => {
  let sum = 0;
  for (var i = 0; i < pdfsInfo.length; i++) {
    if (pdfsInfo[i].pages <= 70 && pdfsInfo[i].pages > 2) {
      sum++;
    }
  }
  return sum;
};
