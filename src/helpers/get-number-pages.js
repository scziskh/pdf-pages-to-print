/* eslint-disable no-unused-expressions */
export const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result.match(/\/Type[\s]*\/Page[^s]/g)?.length);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};
