import styled from "styled-components";

const Button = styled.button`
  padding: 3px;
  width: 90px;
  border: solid 2px;
  border-radius: 50px;
  background-color: white;
  cursor: pointer;
`;

export const LogBtn = styled(Button)`
  width: 150px;
  background-color: lightseagreen;
  border-color: lightseagreen;
  margin-bottom: 5px;
  color: white;
  &:hover {
    color: lightseagreen;
    background-color: white;
  }
`;
