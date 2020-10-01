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

export const NextBtn = styled.button`
  width: 100px;
  border-radius: 5px;
  background-color: #008d64;
  border: solid 2px;
  border-color: #008d64;
  margin: 30px;
  color: white;
  &:hover {
    color: white;
    border-color: #669999;
    background-color: #669999;
  }
`;

export const EditBtn = styled(NextBtn)`
  padding: 5px 5px;
  display: flex;
  justify-content: center;
  width: 40px;
  background-color: #008d64;
  border: solid 2px;
  border-color: #008d64;
  margin: 0;
  &:hover {
    border-color: #669999;
    background-color: #669999;
  }
`;

export const DeleteBtn = styled(EditBtn)`
  background-color: #8a1d00;
  border: solid 2px;
  border-color: #8a1d00;
  &:hover {
    border-color: #ca4f44;
    background-color: #ca4f44;
  }
`;

export const ViewBtn = styled(EditBtn)`
  margin: 0 auto;
  background-color: dimgray;
  border: solid 2px;
  border-color: dimgray;
  &:hover {
    border-color: lightgray;
    background-color: lightgray;
  }
`;

export const IconBtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
