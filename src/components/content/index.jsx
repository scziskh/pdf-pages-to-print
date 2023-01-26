import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { defaultFormData } from "../../helpers/config";
import { getPdfsProps } from "../../helpers/props-pdf.helpers";
import Loader from "../loader";
import SimpleFile from "../simple-file";
import TableResult from "../table-result";

const Content = (props) => {
  const [files, setFiles] = useState(null); // curr files in input files
  const [pdfsProps, setPdfsProps] = useState(() => []); // properties of pdf files
  const [isLoading, setIsLoading] = useState(false); // if isLoading - true, else - false
  const [formData, setFormData] = useState(defaultFormData); // state of form with params printing

  const dublicatePdfProps = () => {
    setPdfsProps((state) => {
      const result = state.concat(state);
      return result;
    });
  };

  // action when file(s) choosed
  const handleFileChange = (e) => {
    setIsLoading(true);
    console.log(document.getElementById("files").value);
    setFiles(e.target.files);
  };

  // action when params prinding changed form with params printing
  const handleChange = () => {
    const result = getValues();
    setFormData(result);
  };

  //set pdf props
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // init react-hook-form
  const { register, getValues } = useForm({
    mode: `onBlur`,
    defaultValues: formData,
  });

  // JSX component with params of each pdf file
  const filesList = pdfsProps.map((pdfProps, index) => (
    <SimpleFile
      key={`${index}key${pdfProps.name}`}
      props={pdfProps}
      index={index}
    />
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
        <Checkbox>
          <input
            type={`checkbox`}
            {...register(`isPerforation`)}
            id={`isPerforation`}
          />
          <label htmlFor={`isPerforation`}>Перфорація</label>
        </Checkbox>
        <Checkbox>
          <input
            type={`checkbox`}
            {...register(`isBinding`)}
            id={`isBinding`}
          />
          <label htmlFor={`isBinding`}>Степлер/швидкосшивач</label>
        </Checkbox>
        <Input
          type={`number`}
          placeholder={`Максимум аркушів на скобу `}
          {...register(`maxSheetsStaples`)}
          disabled={!formData.isBinding}
        />
        <Checkbox>
          <input
            type={`checkbox`}
            id={`isTwoPerPage`}
            {...register(`isTwoPerPage`)}
          />
          <label htmlFor={`isTwoPerPage`}>2 на 1 стор.</label>
        </Checkbox>
        <Input
          type={`number`}
          placeholder={`Копій`}
          {...register(`copiesCount`)}
        />
      </Form>
      <FileContainer>
        <File
          type="file"
          onChange={handleFileChange}
          name="files"
          id="files"
          accept=".pdf"
          multiple
          disabled={isLoading}
        />
        <FileLabel htmlFor="files">
          Додати файли PDF (Додано: {pdfsProps.length} файлів)
        </FileLabel>
        <DublicatePdfProps onClick={dublicatePdfProps}>
          Дублювати файли
        </DublicatePdfProps>
      </FileContainer>
      <FixedHeightDiv>
        {isLoading ? <Loader /> : <TableResult totalFiles={pdfsProps.length} />}
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
`;

const File = styled.input`
  display: none;
  &:disabled ~ label {
    color: #212121;
    background-color: lightgray;
    border-color: darkgrey;
    cursor: auto;
  }
`;
const FileLabel = styled.label`
  display: block;
  margin: auto;
  cursor: pointer;
  color: #212121;
  border: 1px solid #212121;
  padding: 20px;
  transition: all 0.25s;
  width: 50%;
  text-align: center;
  &:hover {
    background-color: #212121;
    color: white;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  width: auto;
  margin: auto;
  padding: 20px;
  display: flex;
`;
const Select = styled.select`
  width: 12%;
  margin: 0 5px;
  padding: 10px;
`;
const Input = styled.input`
  width: 12%;
  padding: 10px;
  margin: 0 5px;
`;
const Checkbox = styled.div`
  width: 12%;
  margin: 0 5px;
  label {
    padding: 10px;
    display: block;
    text-align: center;
    width: 100%;
    cursor: pointer;
    border: 1px solid #212121;
    border-radius: 3px;
    white-space: nowrap;
    overflow: hidden;
  }
  input:checked ~ label {
    background-color: #212121;
    color: white;
  }
  input {
    display: none;
  }
`;

const FixedHeightDiv = styled.div`
  padding: 20px;
  height: 400px;
`;

const DublicatePdfProps = styled.div`
  margin: auto;
  width: fit-content;
  text-decoration: underline;
  cursor: pointer;
`;

export default Content;
