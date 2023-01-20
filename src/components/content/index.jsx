import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getPdfsInfo,
  getPdfsTotalPages,
  getPdfsTotalSheets,
} from "../../helpers/pdf.helpers";
import SimpleFile from "../simple-file";

const Content = (props) => {
  const [files, setFiles] = useState();
  const [filesInfo, setFilesInfo] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalSheets, setTotalSheets] = useState();

  const handleFileChange = (e) => {
    // set array files when handleChange
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  useEffect(() => {
    // set array files info ([{name,pages}, ...])
    if (files) {
      getPdfsInfo(files).then((result) => setFilesInfo(result));
    }
  }, [files]);

  useEffect(() => {
    // set total pages
    if (filesInfo) {
      setTotalPages(() => getPdfsTotalPages(filesInfo));
      setTotalSheets(() => getPdfsTotalSheets(filesInfo));
    }
  }, [filesInfo]);

  return (
    <Wrapper>
      <div>Total pages: {totalPages}</div>
      <div>Total Sheets: {totalSheets}</div>

      <FileContainer>
        <File
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf"
          name="files"
        />
      </FileContainer>
      {filesInfo?.map((file, index) => (
        <SimpleFile key={index} file={file} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 50px 0;
  flex-grow: 1;
`;
const FileContainer = styled.form`
  padding: 20px 100px;
`;

const File = styled.input``;

export default Content;
