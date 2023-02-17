import { PDFDocument } from "pdf-lib";

// read file as array buffer
const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    // New File Reader
    const reader = new FileReader();

    // if reader read return result
    reader.onload = () => {
      const result = resolve(reader.result);
      return result;
    };

    // if reader error throw error
    reader.onerror = (error) => {
      const result = resolve(null);
      console.log(error);

      return result;
    };

    // read file as array buffer (UTF-8)
    reader.readAsArrayBuffer(file);
  });
};

// get pdf info (name and count of pages)
export const getPdf = async (file) => {
  // read file as array buffer (UTF-8)
  const arrayBuffer = await readFileAsArrayBuffer(file);
  let pdf;
  // load pdf file with pdf-lib
  try {
    if (arrayBuffer) {
      pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    } else {
      pdf = null;
    }
  } catch {
    pdf = null;
  }

  return pdf;
};
