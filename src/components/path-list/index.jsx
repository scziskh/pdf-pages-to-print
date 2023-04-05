import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const PathList = (props) => {
  const [value, setValue] = useState("");
  const { values } = props;

  useEffect(() => {
    if (values) {
      const array = Array.from(values);
      setValue(() => array.join("\n"));
    }
  }, [values]);
  return <TextArea readOnly={true} value={value} />;
};

export default PathList;

const TextArea = styled.textarea`
  width: 20%;
  height: 342px;
  padding: 5px 10px;
  font-size: 14px;
`;
