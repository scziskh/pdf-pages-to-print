import styled from "styled-components";

const Loader = () => (
  <Wrapper>
    <Circle />
  </Wrapper>
);
const Wrapper = styled.div`
  width: 100%;
  height: 360px;
  text-align: center;
  vertical-align: middle;
`;
const Circle = styled.div`
  display: inline-block;
  border: 16px solid #ffd700;
  border-top: 16px solid #0057b8;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

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
