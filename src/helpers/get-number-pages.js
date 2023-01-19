/* eslint-disable no-unused-expressions */
export const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const pages = reader.result.match(/\/Type[\s]*\/Page[^s]/g)?.length;
      resolve(pages);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};
