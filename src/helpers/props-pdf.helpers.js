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

  return Object.values(files)?.reduce(async (accum, file) => {
    const temp = await accum;
    const webkitRelativePath = file.webkitRelativePath;
    const pathArray =
      webkitRelativePath === "" ? [] : webkitRelativePath.split(`/`);
    pathArray.pop();
    console.log(`ok`);
    const path = pathArray.length === 0 ? file.name : pathArray.join("/");
    const pdf = file.type === `application/pdf` ? await getPdf(file) : null;
    const { name } = file;
    let href;
    try {
      href = URL.createObjectURL(file);
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
    let pagesCount;
    try {
      if (pdf) {
        pagesCount = pdf.getPageCount();
      } else {
        pagesCount = 0;
      }
    } catch {
      pagesCount = 0;
    }
    const sheetsCount = getSheetsCount(pagesCount, sides);
    const binding = isBinding
      ? getBinding(sheetsCount, maxSheetsStaples)
      : "no-binding";

    const result = {
      print,
      pagesCount,
      isPerforation,
      binding,
      copiesCount,
      name,
      sides,
      href,
    };

    temp[path] ? temp[path].push(result) : (temp[path] = [result]);
    return temp;
  }, Promise.resolve({}));
};

export const getAmountsPdfProps = (pdfsProps) => {
  const defaultParams = totalPdfsPropsParamsArray.reduce((accum, curr) => {
    accum[curr] = 0;
    return accum;
  }, {});

  // eslint-disable-next-line array-callback-return
  const result = Object.values(pdfsProps).reduce((accum, pdfProps) => {
    const {
      pagesCount,
      copiesCount,
      sides,
      isPerforation,
      isTwoPerPage,
      binding,
      print,
    } = pdfProps;

    const realPagesCount = isTwoPerPage
      ? Math.ceil(pagesCount / 2)
      : pagesCount;

    const sheetsCount = getSheetsCount(realPagesCount, sides);
    accum[print] += realPagesCount * copiesCount;
    accum.sheetsCount += sheetsCount * copiesCount;

    if (isPerforation) {
      accum.perforationCount += sheetsCount * copiesCount;
    }

    accum[binding] += Number(copiesCount);

    if (realPagesCount === 0) {
      accum.badFiles++;
    }

    return accum;
  }, defaultParams);

  return result;
};
