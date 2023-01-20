import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getPdfsInfo,
  getPdfsTotalFolders,
  getPdfsTotalPages,
  getPdfsTotalSheets,
  getPdfsTotalStaples,
} from "../../helpers/pdf.helpers";
import SimpleFile from "../simple-file";

const Content = (props) => {
  const [files, setFiles] = useState();
  const [filesProps, setFilesProps] = useState();
  const [filesTotalProps, setFilesTotalProps] = useState();

  const handleFileChange = (e) => {
    // set array files when handleChange
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  useEffect(() => {
    // set array files info ([{name,pages}, ...])
    if (files) {
      getPdfsInfo(files).then((result) => setFilesProps(result));
    }
  }, [files]);

  useEffect(() => {
    // set total pages, sheets etc
    if (filesProps) {
      setFilesTotalProps(() => {
        return {
          pages: getPdfsTotalPages(filesProps),
          sheets: getPdfsTotalSheets(filesProps),
          folders: getPdfsTotalFolders(filesProps),
          staples: getPdfsTotalStaples(filesProps),
        };
      });
    }
  }, [filesProps]);

  const { pages, sheets, staples, folders } = filesTotalProps ?? {
    pages: 0,
    sheets: 0,
    staples: 0,
    folders: 0,
  };

  return (
    <Wrapper>
      <div>Total Pages: {pages}</div>
      <div>Total Sheets: {sheets}</div>
      <div>Total Staples: {staples}</div>
      <div>Total Folders: {folders}</div>

      <FileContainer>
        <File
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf"
          name="files"
        />
      </FileContainer>
      {filesProps?.map((file, index) => (
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
