import styled from "styled-components";
import { Table as BootstrapTable } from "react-bootstrap";

export const Tbl = styled(BootstrapTable)`
  margin: 0 auto;
  background-color: #f8f9fa;
  height: fit-content;
  min-width: 350px;
  text-align: center;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: auto;
  border-color: whitesmoke;
  padding: 5px;
`;

export const TblHeading = styled.th`
  padding: 5px 10px;
  background-color: #ccffff;
  color: #08374e;
  font-size: 14px;
  font-weight: bold;
`;

export const TblData = styled.td`
  padding: 8px 8px;
  font-size: 14px;
`;

export const InputHours = styled.input`
  max-width: 30px;
  min-width: 20px;
  margin-top: 5px;
  border: solid;
  border-color: lightgrey;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  color: dimgray;
  :focus {
    outline: none;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const DropDownDiv = styled.div`
  width: 150px;
  min-width: 70px;
`;

export const TotalHours = styled(InputHours)`
  background-color: transparent;
  border-color: transparent;
  color: #08374e;
  font-weight: bold;
`;
