import styled from "styled-components";

const Header = (props) => {
  return (
    <Wrapper>
      <Img src="/assets/copy-logo2.png" />
      <Form>
        <Button>Очистити список файлів</Button>
      </Form>
    </Wrapper>
  );
};

const Img = styled.img`
  height: 64px;
`;

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  padding: 20px;
  background-color: #212121;
`;

const Form = styled.form`
  position: absolute;
  height: 64px;
  right: 20px;
`;
const Button = styled.button`
  height: 100%;
  padding: 20px;
`;

export default Header;
