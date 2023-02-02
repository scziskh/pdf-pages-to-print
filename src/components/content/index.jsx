/* eslint-disable no-restricted-globals */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { defaultFormData } from "../../helpers/config";
import { getPdfsProps } from "../../helpers/props-pdf.helpers";
import Loader from "../loader";
import Path from "../path";
import SimpleFile from "../simple-file";
import TableResult from "../table-result";

const Content = (props) => {
  const [files, setFiles] = useState(null); // curr files in input files
  const [pdfsProps, setPdfsProps] = useState({}); // properties of pdf files
  const [isLoading, setIsLoading] = useState(false); // if isLoading - true, else - false
  const [formData, setFormData] = useState(defaultFormData); // state of form with params printing

  const ref = useRef();

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  const dublicatePdfProps = () => {
    const isTrue = confirm("Ви впевненні, що хочете продублювати файли?");

    if (isTrue) {
      setIsLoading(true);
      const dublicate = Object.keys(pdfsProps).reduce((accum, curr) => {
        accum[`${curr} --dublicated`] = pdfsProps[curr];
        return accum;
      }, {});
      setPdfsProps((state) => {
        const result = Object.assign(state, dublicate);
        return result;
      });
    }
  };

  // action when file(s) choosed
  const handleFileChange = (e) => {
    setIsLoading(true);
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
        const result = Object.assign(state, currPdfsProps);
        return result;
      });
      setIsLoading(false);
      setFiles(null);
    };

    if (files) {
      setterPdfsProps();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, isLoading]);

  useEffect(() => {
    setFiles(null);
    setIsLoading(false);
  }, [pdfsProps]);

  // init react-hook-form
  const { register, getValues } = useForm({
    mode: `onBlur`,
    defaultValues: formData,
  });

  let numFiles = 0;

  // JSX component with params of each pdf file
  const fileList = Object.keys(pdfsProps)?.map((pathname, index) => {
    return (
      <div key={`${index}key${pathname}`}>
        <Path pathname={pathname} />
        {pdfsProps[pathname].map((currPdfProps, index) => {
          ++numFiles;
          return (
            <SimpleFile
              key={`${index}key${currPdfProps.name}${pathname}`}
              props={currPdfProps}
              index={`${pathname} file${index}`}
            />
          );
        })}
      </div>
    );
  });
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
          min={0}
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
          min={0}
          placeholder={`Копій`}
          {...register(`copiesCount`)}
        />
      </Form>
      <FileContainer>
        <File
          type="file"
          ref={ref}
          onChange={handleFileChange}
          name="files"
          id="files"
          dir={`true`}
          multiple
          accept=".pdf"
          disabled={isLoading}
        />
        <FileLabel htmlFor="files">
          Додати теку з файлами (Додано: {numFiles} файлів)
        </FileLabel>
        <DublicatePdfProps onClick={dublicatePdfProps}>
          Дублювати файли
        </DublicatePdfProps>
      </FileContainer>
      <FixedHeightDiv>
        {isLoading ? <Loader /> : <TableResult totalFiles={numFiles} />}
      </FixedHeightDiv>
      {fileList}
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
