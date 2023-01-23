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
export const getPdf = async (file) => {
  // read file as array buffer (UTF-8)
  const arrayBuffer = await readFileAsArrayBuffer(file);
  // load pdf file with pdf-lib
  const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  return pdf;
};

const getBinding = (sheetsCount, maxSheetsStaples) => {
  if (sheetsCount > maxSheetsStaples) {
    return "folder";
  }

  if (sheetsCount > 1) {
    return "staple";
  }

  return "none";
};

export const getSheetsCount = (pagesCount, sides) => {
  const result = Math.ceil(pagesCount / Number(sides));
  return result;
};

export const getPdfsProps = async (files, config) => {
  const {
    sides,
    isPerforation,
    isBinding,
    maxSheetsStaples,
    print,
    copiesCount,
  } = config;

  return Object.keys(files)?.reduce(async (accum, key) => {
    const temp = await accum;
    const file = files[key];
    const pdf = await getPdf(file);

    const { name } = file;
    const pagesCount = pdf.getPageCount();
    const sheetsCount = getSheetsCount(pagesCount, sides);
    const binding = isBinding
      ? getBinding(sheetsCount, maxSheetsStaples)
      : "none";

    temp.push({
      print,
      pagesCount,
      sheetsCount,
      sides,
      isPerforation,
      binding,
      copiesCount,
      name,
    });

    return temp;
  }, Promise.resolve([]));
};
