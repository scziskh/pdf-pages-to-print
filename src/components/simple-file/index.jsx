import { useEffect, useState } from "react";
import styled from "styled-components";
import { resetPagesCount } from "../../helpers/default-values";
import { PdfPagesToPrint } from "../../helpers/pdf-pafes-to-print.class";
import { getPdf } from "../../helpers/pdf.helpers";

const SimpleFile = (props) => {
  const { file } = props;
  const [fileProps, setFileProps] = useState({});

  const [formState, setFormState] = useState({
    sides: 2,
    print: `grayscale-print`,
    binding: `none`,
    perforation: false,
    count: 1,
  });

  const formChange = (e) => {
    setFormState((state) => {
      const name = e.target.name;
      const value = e.target.value;
      state[name] = value;

      return state;
    });
  };

  useEffect(() => {
    const setterFileProps = async () => {
      const pdf = await getPdf(file);
      const pdfptp = new PdfPagesToPrint(pdf, formState);
      const pagesCount = await pdfptp.getPagesCount();
      const totalPagesCount = pagesCount * Number(formState.count);
      const pages = resetPagesCount();
      pages[formState.print] = totalPagesCount;
      const binding = await pdfptp.getBinding();
      const perforationCount = await pdfptp.getPerforationCount();
      const sheetsCount = await pdfptp.getSheetsCount();
      setFileProps({
        totalPagesCount,
        pagesCount,
        binding,
        perforationCount,
        sheetsCount,
        pages,
      });
    };
    setterFileProps();
  }, [file, formState]);

  console.log({ fileProps, formState });

  return (
    <Wrapper onChange={(e) => formChange(e)}>
      <FileName>{file.name}</FileName>
      <Select name={`sides`} defaultValue={formState.sides}>
        <option value={1}>Односторонній друк</option>
        <option value={2}>Двосторонній друк</option>
      </Select>
      <Select name={`print`} defaultValue={formState.print}>
        <option value={`color-print`}>Кольоровий друк</option>
        <option value={`grayscale-print`}>Ч/б друк</option>
        <option value={`color-paper`}>Кольоровий папір</option>
      </Select>
      <Select name={`binding`} defaultValue={formState.binding}>
        <option value={`none`}>Без сшивки</option>
        <option value={`staple`}>Степлер</option>
        <option value={`folder`}>Швидкосшивач</option>
      </Select>
      <Input type={`number`} value={formState.count} onChange={formChange} />
      <PagesNumber>{fileProps.pages?.total}</PagesNumber>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  padding: 10px;
  border: 1px solid #212121;
  color: #212121;
`;

const FileName = styled.div`
  padding: 10px;
  width: 40%;
`;

const Select = styled.select`
  width: 10%;
  padding: 10px;
  margin: 0 5px;
`;
const Input = styled.input`
  width: 10%;
  padding: 10px;
  margin: 0 5px;
`;
const PagesNumber = styled.div`
  padding: 10px;
  width: 20%;
  text-align: center;
  font-weight: bold;
`;

export default SimpleFile;
