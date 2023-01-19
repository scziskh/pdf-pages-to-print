import styled from "styled-components";

const SimpleFile = (props) => {
  const { file } = props;

  console.log(Promise.resolve(file));
  return (
    <Wrapper {...props}>
      <FileName>{file.name}</FileName>
      <Select name={`sides`}>
        <option value={`one-sided`}>one-sided</option>
        <option value={`two-sided`}>two-sided</option>
      </Select>
      <Select name={`print`}>
        <option value={`color`}>color</option>
        <option value={`grayscale`}>grayscale</option>
      </Select>
      <Select name={`binder`}>
        <option value={`none`}>none</option>
        <option value={`staple`}>staple</option>
        <option value={`folder`}>folder</option>
      </Select>
      <PagesNumber>{file.pages ?? `—`}</PagesNumber>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  padding: 10px 100px;
  border: 1px solid #212121;
  color: #212121;
`;

const FileName = styled.div`
  padding: 10px;
  width: 50%;
`;

const Select = styled.select`
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
