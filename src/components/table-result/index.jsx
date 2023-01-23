import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSumArraysObj } from "../../helpers/calculator";
import { getSheetsCount } from "../../helpers/pdf.helpers";

const TableResult = (props) => {
  const pdfsProps = useSelector((state) => state.pdfPropsReducer);

  console.log(pdfsProps);
  const getTotalPdfsProps = (pdfsProps) => {
    const objectArrays = {
      [`grayscale-print`]: [],
      [`color-print`]: [],
      [`color-paper`]: [],
      [`sheetsCount`]: [],
      [`perforationCount`]: [],
      [`staple`]: [],
      [`folder`]: [],
    };

    // eslint-disable-next-line array-callback-return
    Object.keys(pdfsProps)?.map((key) => {
      const pdfProps = pdfsProps[key];
      objectArrays[pdfProps.print].push(
        pdfProps.pagesCount * pdfProps.copiesCount
      );

      const sheetsCount = getSheetsCount(pdfProps.pagesCount, pdfProps.sides);
      objectArrays[`sheetsCount`].push(sheetsCount * pdfProps.copiesCount);

      if (pdfProps.isPerforation) {
        objectArrays[`perforationCount`].push(
          sheetsCount * pdfProps.copiesCount
        );
      }

      if (pdfProps.binding === `staple`) {
        objectArrays[`staple`].push(+pdfProps.copiesCount);
      } else if (pdfProps.binding === `folder`) {
        objectArrays[`folder`].push(+pdfProps.copiesCount);
      }
    });

    const result = getSumArraysObj(objectArrays);

    return result;
  };

  const totalPdfsProps = getTotalPdfsProps(pdfsProps);
  return (
    <Wrapper>
      <Row>
        Сторінок ч/б: {totalPdfsProps && totalPdfsProps[`grayscale-print`]}
      </Row>
      <Row>
        Сторінок кольорових: {totalPdfsProps && totalPdfsProps[`color-print`]}
      </Row>
      <Row>
        Сторінок на кольоровому папері:
        {totalPdfsProps[`color-paper`]}
      </Row>
      <Row>
        Листопідбір:
        {totalPdfsProps[`sheetsCount`]}
      </Row>
      <Row>
        Перфорація:
        {totalPdfsProps[`perforationCount`]}
      </Row>
      <Row>
        Степлер:
        {totalPdfsProps[`staple`]}
      </Row>
      <Row>
        Швидкосшивач:
        {totalPdfsProps[`folder`]}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Row = styled.div``;
export default TableResult;
