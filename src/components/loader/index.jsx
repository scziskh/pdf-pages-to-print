import styled from "styled-components";

const Loader = () => (
  <Wrapper>
    <Circle />
  </Wrapper>
);
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 360px;
  justify-content: center;
`;
const Circle = styled.div`
  margin-top: 100px;
  display: block;
  background: linear-gradient(to left, #743ad5, #d53a9d);
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  border-radius: 50%;
  &:before {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    content: "";
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: -1;
    background: white;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
