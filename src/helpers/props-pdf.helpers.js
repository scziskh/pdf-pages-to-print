import { totalPdfsPropsParamsArray } from "./config";
import { getPdf } from "./pdf-lib.helpers";

export const getSheetsCount = (pagesCount, sides) => {
  const result = Math.ceil(pagesCount / Number(sides));
  return result;
};

const getBinding = (sheetsCount, maxSheetsStaples) => {
  if (sheetsCount > maxSheetsStaples) {
    return "folder";
  }

  if (sheetsCount > 1) {
    return "staple";
  }

  return "no-binding";
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
    let pagesCount;
    try {
      pagesCount = pdf.getPageCount();
    } catch {
      pagesCount = 0;
    }
    const sheetsCount = getSheetsCount(pagesCount, sides);
    const binding = isBinding
      ? getBinding(sheetsCount, maxSheetsStaples)
      : "no-binding";

    temp.push({
      print,
      pagesCount,
      isPerforation,
      binding,
      copiesCount,
      name,
      sides,
    });

    return temp;
  }, Promise.resolve([]));
};

export const getAmountsPdfProps = (pdfsProps) => {
  const defaultParams = totalPdfsPropsParamsArray.reduce((accum, curr) => {
    accum[curr] = 0;
    return accum;
  }, {});

  // eslint-disable-next-line array-callback-return
  const result = Object.keys(pdfsProps).reduce((accum, key) => {
    const pdfProps = pdfsProps[key];
    const { pagesCount, copiesCount, sides, isPerforation, binding, print } =
      pdfProps;
    const sheetsCount = getSheetsCount(pagesCount, sides);
    accum[print] += pagesCount * copiesCount;
    accum.sheetsCount += sheetsCount;

    if (isPerforation) {
      accum.perforationCount += sheetsCount * copiesCount;
    }

    accum[binding] += Number(copiesCount);

    return accum;
  }, defaultParams);

  return result;
};
