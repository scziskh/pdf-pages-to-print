import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSumArraysObj } from "../../helpers/calculator";

const TableResult = (props) => {
  const pdfsProps = useSelector((state) => state.pdfPropsReducer);
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
    Object.keys(pdfsProps)?.map((key) => {
      const pdfProps = pdfsProps[key];
      objectArrays[pdfProps.print].push(
        pdfProps.pagesCount * pdfProps.copiesCount
      );
      objectArrays[`sheetsCount`].push(
        pdfProps.sheetsCount * pdfProps.copiesCount
      );
      if (pdfProps.binding === `staple`) {
        objectArrays[`staple`].push(Number(pdfProps.copiesCount));
      } else if (pdfProps.binding === `folder`) {
        objectArrays[`folder`].push(Number(pdfProps.copiesCount));
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
