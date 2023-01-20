import { useState } from "react";
import styled from "styled-components";
import SimpleFile from "../simple-file";

const Content = (props) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    // set array files when handleChange
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const fileList = Object.keys(files)?.map((key, index) => (
    <SimpleFile key={index} file={files[key]} />
  ));

  return (
    <Wrapper>
      <FileContainer>
        <File
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf"
          name="files"
        />
      </FileContainer>
      {fileList}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 50px 0;
  flex-grow: 1;
`;
const FileContainer = styled.form`
  padding: 20px;
`;

const File = styled.input``;

export default Content;
