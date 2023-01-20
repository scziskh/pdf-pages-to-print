import styled from "styled-components";

const TableResult = ({ props }) => {
  return (
    <Wrapper>
      <Row>Сторінок ч/б: {props?.pagesGray}</Row>
      <Row>Сторінок кольорових: {props?.pagesColor}</Row>
      <Row>Листопідбір: {props?.sheets}</Row>
      <Row>Перфорація: {props?.perforation}</Row>
      <Row>Степлер: {props?.staples}</Row>
      <Row>Швидкосшивач: {props?.folders}</Row>
      <Row>
        <strong>Всього файлів: {props?.totalFiles}</strong>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Row = styled.div``;
export default TableResult;
