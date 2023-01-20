import styled from "styled-components";

const Header = (props) => {
  return (
    <Wrapper>
      <Img src="/assets/copy-logo2.png" />
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

export default Header;
