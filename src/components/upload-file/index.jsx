import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPdfInfo } from "../../helpers/pdf.helpers";
import SimpleFile from "./simple-file";

const UploadFile = (props) => {
  const [files, setFiles] = useState();
  const [filesInfo, setFilesInfo] = useState();

  const handleFileChange = (e) => {
    // set array files when handleChange
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  useEffect(() => {
    // set array files info ([{name,pages}, ...])
    if (files) {
      getPdfInfo(files).then((result) => setFilesInfo(result));
    }
  }, [files]);

  return (
    <>
      <Wrapper>
        <File type="file" multiple onChange={handleFileChange} />
      </Wrapper>
      {filesInfo?.map((file, index) => (
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
