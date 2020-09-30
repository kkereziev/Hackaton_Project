import styled from "styled-components";

export const TableDiv = styled.div`
  margin: 0 auto;
  width: 85%;
  display: flex;
  justify-content: center;
`;
export const Tbl = styled.table`
  background-color: white;
  height: fit-content;
  min-height: 200px;
  min-width: 350px;
  text-align: center;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  border-color: whitesmoke;
  padding: 10px;
`;

export const TblHeading = styled.th`
  padding: 5px 10px;
  background-color: #ccffff;
  color: dimgray;
  font-size: 20px;
  font-weight: bold;
`;

export const TblData = styled.td`
  padding: 5px 10px;
`;

export const InputHours = styled.input`
  max-width: 40px;
  min-width: 25px;
  margin: 15px;
  border: solid;
  border-color: lightgrey;
  border-radius: 5px;
  text-align: center;
  color: dimgray;
  :focus {
    outline: none;
  }
`;
export const DropDownDiv = styled.div`
  width: 250px;
  min-width: 70px;
`;
