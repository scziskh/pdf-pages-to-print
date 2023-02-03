import { useSelector } from "react-redux";
import styled from "styled-components";
import { getAmountsPdfProps } from "../../helpers/props-pdf.helpers";

const TableResult = (props) => {
  const pdfsProps = useSelector((state) => state.pdfPropsReducer);
  const ammountsPdfsProps = getAmountsPdfProps(pdfsProps);
  const badFiles = { background: `red` };
  const firstRow = ammountsPdfsProps[`badFiles`] ? (
    <>
      <Div {...badFiles}>Увага! Деякі файли не опрацьовані </Div>
      <Div {...badFiles}>{ammountsPdfsProps[`badFiles`]}</Div>
    </>
  ) : (
    <>
      <Div>Параметр</Div>
      <Div>Сума</Div>
    </>
  );

  return (
    <Wrapper>
      <Grid>
        {firstRow}
        <Div>Сторінок ч/б:</Div>
        <Div>{ammountsPdfsProps && ammountsPdfsProps[`grayscale-print`]}</Div>
        <Div>Сторінок кольорових:</Div>
        <Div>{ammountsPdfsProps && ammountsPdfsProps[`color-print`]}</Div>
        <Div>Сторінок на кольоровому папері:</Div>
        <Div>{ammountsPdfsProps && ammountsPdfsProps[`color-paper`]}</Div>
        <Div>Листопідбір:</Div>
        <Div>{ammountsPdfsProps && ammountsPdfsProps[`sheetsCount`]}</Div>
        <Div>Перфорація:</Div>
        <Div>{ammountsPdfsProps && ammountsPdfsProps[`perforationCount`]}</Div>
        <Div>Степлер:</Div>
        <Div>{ammountsPdfsProps && ammountsPdfsProps[`staple`]}</Div>
        <Div>Швидкозшивач:</Div>
        <Div>{ammountsPdfsProps && ammountsPdfsProps[`folder`]}</Div>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Div = styled.div`
  border: 1px solid #212121;
  padding: 10px;
  text-align: center;
  background-color: ${(props) => props.background ?? "white"};
`;
const Grid = styled.div`
  margin: auto;
  width: 50%;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;
export default TableResult;
