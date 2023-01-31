import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { pdfsPropsSlice } from "../../redux/reducers/fileList";

const SimpleFile = ({ props, index }) => {
  const [isLoading, setIsLoading] = useState(false);

  const pdfsProps = useSelector((state) => state.pdfPropsReducer);
  const { updatePdfProps } = pdfsPropsSlice.actions;
  const dispatch = useDispatch();

  const handleChange = () => {
    setIsLoading(true);
  };

  const { register, getValues, setValue } = useForm({
    mode: `onBlur`,
    defaultValues: props,
  });

  const handlePagesCountChange = () => {
    setIsLoading(true);
    setValue(`pagesCount`, getValues(`pagesCountUser`));
  };

  useEffect(() => {
    setIsLoading(false);
    dispatch(updatePdfProps({ index, pdfProps: getValues() }));
  }, [dispatch, getValues, index, isLoading, updatePdfProps]);

  return (
    <Wrapper onChange={handleChange} {...pdfsProps?.[index]}>
      <FileName>
        {
          <a href={pdfsProps?.[index]?.href} target={`_blank`}>
            {pdfsProps?.[index]?.name}
          </a>
        }
      </FileName>
      <Select {...register(`sides`)}>
        <option value={`1`}>Односторонній друк</option>
        <option value={`2`}>Двосторонній друк</option>
      </Select>
      <Select {...register(`print`)}>
        <option value={`color-print`}>Кольоровий друк</option>
        <option value={`grayscale-print`}>Ч/б друк</option>
        <option value={`color-paper`}>Кольоровий папір</option>
      </Select>
      <Select {...register(`binding`)}>
        <option value={`no-binding`}>Без сшивки</option>
        <option value={`staple`}>Степлер</option>
        <option value={`folder`}>Швидкосшивач</option>
      </Select>
      <Checkbox>
        <input
          type={`checkbox`}
          id={`isPerforation${index}`}
          {...register(`isPerforation`)}
        />
        <label htmlFor={`isPerforation${index}`}>Перфорація</label>
      </Checkbox>
      <Checkbox>
        <input
          type={`checkbox`}
          id={`isTwoPerPage${index}`}
          {...register(`isTwoPerPage`)}
        />
        <label htmlFor={`isTwoPerPage${index}`}>2 на 1 стор.</label>
      </Checkbox>
      <Input type={`number`} {...register(`copiesCount`)} />
      {pdfsProps?.[index]?.pagesCount ? (
        <PagesNumber>{pdfsProps?.[index]?.pagesCount}</PagesNumber>
      ) : (
        <SetPagesNumber>
          <input
            type={`number`}
            {...register(`pagesCountUser`)}
            onKeyDown={(e) => {
              if (e.key === `Enter`) {
                return handlePagesCountChange();
              }
            }}
          />
          <input
            type={`button`}
            value={`ok`}
            onClick={handlePagesCountChange}
          />
        </SetPagesNumber>
      )}
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
    if (props.pagesCount === 0) {
      return "red";
    }
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
  a {
    color: #212121;
  }
  overflow: hidden;
  padding: 10px;
  width: 45%;
  white-space: nowrap;
`;
const PagesNumber = styled.div`
  padding: 10px;
  width: 10%;
  text-align: center;
  font-weight: bold;
`;

const SetPagesNumber = styled.div`
  width: 10%;
  input[type="number"] {
    padding: 10px;
    width: 50%;
    margin: 0 5px;
  }
  input[type="button"] {
    padding: 10px;
    width: 30%;
  }
`;
const Select = styled.select`
  width: 10%;
  margin: 0 5px;
  padding: 10px;
`;
const Input = styled.input`
  width: 5%;
  padding: 10px;
  margin: 0 5px;
  text-align: center;
`;
const Checkbox = styled.div`
  background-color: white;
  width: 10%;
  margin: 0 5px;
  label {
    padding: 10px;
    display: block;
    text-align: center;
    width: 100%;
    cursor: pointer;
    border: 1px solid #212121;
    border-radius: 3px;
    white-space: nowrap;
    overflow: hidden;
  }
  input:checked ~ label {
    background-color: #212121;
    color: white;
  }
  input {
    display: none;
  }
`;

export default SimpleFile;
