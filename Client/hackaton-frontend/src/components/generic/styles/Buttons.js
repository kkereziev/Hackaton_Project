import styled from "styled-components";

export const NextBtn = styled.button`
  margin: 30px;
  width: 100px;
  border-radius: 5px;
  background-color: #08374e;
  border: solid 2px;
  border-color: #08374e;
  color: white;
  :focus {
    outline: none;
  }
  &:hover {
    color: white;
    border-color: #669999;
    background-color: #669999;
  }
`;

export const NoBtn = styled(NextBtn)`
  background-color: #8a1d00;
  border-color: #8a1d00;
  &:hover {
    border-color: #ca4f44;
    background-color: #ca4f44;
  }
`;

export const EditBtn = styled(NextBtn)`
  margin: 0;
  padding: 5px 5px;
  width: 40px;
  background-color: #008d64;
  border: solid 2px;
  border-color: #008d64;
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
  background-color: dimgray;
  border-color: dimgray;
  &:hover {
    border-color: lightgray;
    background-color: lightgray;
  }
`;

export const IconBtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const EditIconBtn = styled(EditBtn)` 
padding-bottom: 10px;
  background-color: #f8f9fa;
  border-color: transparent;
  color: #5CBE7D;
  font-size: 15px;
  &:hover {
    border-color: white;
    background-color: white;
    color: #008d64;
`;

export const DeleteIconBtn = styled(EditIconBtn)`
  color: #ca4f44;
  &:hover {
    color: #8a1d00;
  }
`;

export const ViewIconBtn = styled(EditIconBtn)`
  color: #669999;
  &:hover {
    color: #08374e;
  }
`;
