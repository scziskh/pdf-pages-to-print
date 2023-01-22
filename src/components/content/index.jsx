import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { defaultFormData } from "../../helpers/default-values";
import { getPdfsProps } from "../../helpers/pdf.helpers";
import SimpleFile from "../simple-file";
import TableResult from "../table-result";

const Content = (props) => {
  const [files, setFiles] = useState(null);
  const [pdfsProps, setPdfsProps] = useState(() => []);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleFileChange = (e) => {
    setIsLoading(true);
    setFiles(e.target.files);
  };

  const handleChange = () => {
    const result = getValues();
    setFormData(result);
  };

  useEffect(() => {
    const setterPdfsProps = async () => {
      const currPdfsProps = await getPdfsProps(files, formData);

      setPdfsProps((state) => {
        const result = state.concat(currPdfsProps);
        return result;
      });
      setIsLoading(false);
    };

    if (files) {
      setterPdfsProps();
    }
  }, [files]);

  console.log(formData);

  const { register, getValues } = useForm({
    mode: `onBlur`,
    defaultValues: formData,
  });

  const filesList = pdfsProps.map((pdfProps, index) => (
    <SimpleFile key={`${index}key${pdfProps.name}`} props={pdfProps} />
  ));

  return (
    <Wrapper>
      <Form onChange={handleChange}>
        <Select {...register(`sides`)}>
          <option value={1}>Односторонній друк</option>
          <option value={2}>Двосторонній друк</option>
        </Select>
        <Select {...register(`print`)}>
          <option value={`color-print`}>Кольоровий друк</option>
          <option value={`grayscale-print`}>Ч/б друк</option>
          <option value={`color-paper`}>Кольоровий папір</option>
        </Select>
        <Input
          type={`checkbox`}
          {...register(`isPerforation`)}
          id={`isPerforation`}
        />
        <label htmlFor={`isPerforation`}>Перфорація</label>
        <Input type={`checkbox`} {...register(`isBinding`)} id={`isBinding`} />
        <label htmlFor={`isBinding`}>Степлер/швидкосшивач</label>
        <Input type={`number`} {...register(`maxSheetsStaples`)} />
        <Input type={`number`} {...register(`copiesCount`)} />
      </Form>
      <FileContainer>
        <File
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf"
          name="files"
          id="files"
        />
        <FileLabel htmlFor="files">
          Додати файли PDF (Додано: {pdfsProps.length} файлів)
        </FileLabel>
      </FileContainer>
      <FixedHeightDiv>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <TableResult totalFiles={pdfsProps.length} />
        )}
      </FixedHeightDiv>
      {filesList}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex-grow: 1;
`;
const FileContainer = styled.form`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
`;

const File = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: flex;
  margin: auto;
  cursor: pointer;
  border: 1px solid #212121;
  padding: 20px;
  transition: all 0.25s;
  &:hover {
    background-color: #212121;
    color: white;
  }
`;

const Form = styled.form`
  width: 100%;
  padding: 20px;
`;

const FixedHeightDiv = styled.div`
  padding: 20px;
  height: 200px;
`;

const Select = styled.select``;
const Input = styled.input``;

export default Content;
