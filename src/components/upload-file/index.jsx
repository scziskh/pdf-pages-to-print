import { useEffect, useState } from "react";
import styled from "styled-components";
import { getFilesArray } from "../../helpers/get-files-array";
import SimpleFile from "./simple-file";

const UploadFile = (props) => {
  const [files, setFiles] = useState();
  const [filesArray, setFilesArray] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  useEffect(() => {
    if (files) {
      getFilesArray(files).then((result) => setFilesArray(result));
    }
  }, [files]);

  return (
    <>
      <Wrapper>
        <File type="file" multiple onChange={handleFileChange} />
      </Wrapper>
      {filesArray?.map((file, index) => (
        <SimpleFile key={index} file={file} />
      ))}
    </>
  );
};

const Wrapper = styled.form`
  padding: 20px 100px;
`;

const File = styled.input``;

export default UploadFile;
