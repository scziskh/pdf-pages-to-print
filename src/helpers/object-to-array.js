export const objectToArray = (files) => {
  const result = Object.keys(files).reduce(async (accum, key) => {
    return files[key];
  }, []);

  return result;
};
