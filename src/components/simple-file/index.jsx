import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SimpleFile = ({ props, index }) => {
  const [pdfProps, setPdfProps] = useState(props);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setIsLoading(true);
    const formValues = getValues();
    setPdfProps((state) => {
      const result = Object.assign(state, formValues);
      return result;
    });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [pdfProps, isLoading]);

  const { register, getValues } = useForm({
    mode: `onBlur`,
    defaultValues: pdfProps,
  });

  return (
    <Wrapper onChange={handleChange} {...pdfProps}>
      <FileName>{props.name}</FileName>
      <Select {...register(`sides`)}>
        <option value={1}>Односторонній друк</option>
        <option value={2}>Двосторонній друк</option>
      </Select>
      <Select {...register(`print`)}>
        <option value={`color-print`}>Кольоровий друк</option>
        <option value={`grayscale-print`}>Ч/б друк</option>
        <option value={`color-paper`}>Кольоровий папір</option>
      </Select>
      <Select {...register(`binding`)}>
        <option value={`none`}>Без сшивки</option>
        <option value={`staple`}>Степлер</option>
        <option value={`folder`}>Швидкосшивач</option>
      </Select>
      <Input type={`checkbox`} {...register("isPerforation")} />
      <Input type={`number`} {...register(`copiesCount`)} />
      <PagesNumber>{pdfProps.pagesCount}</PagesNumber>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  display: flex;
  padding: 10px;
  border: 1px solid #212121;
  color: ${(props) => {
    switch (props.print) {
      case `color-print`:
        return "DarkGreen";
      case `color-paper`:
        return "MediumVioletRed";
      default:
        return "#212121";
    }
  }};
  background-color: ${(props) => {
    switch (props.binding) {
      case `staple`:
        return "LemonChiffon";
      case `folder`:
        return "MediumSpringGreen";
      default:
        return "white";
    }
  }};
`;

const FileName = styled.div`
  padding: 10px;
  width: 40%;
`;

const Select = styled.select`
  width: 10%;
  padding: 10px;
  margin: 0 5px;
`;
const Input = styled.input`
  text-align: center;
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
