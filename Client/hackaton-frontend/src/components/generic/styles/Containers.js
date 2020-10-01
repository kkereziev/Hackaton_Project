import styled from "styled-components";

export const BaseDiv = styled.div`
  padding-top: 55px;
  display: flex;
  justify-content: center;
`;

export const MainCard = styled.div`
  padding: 10px 5px;
  width: 45%;
  min-width: 350px;
  margin-bottom: 10px;
  background-color: white;
  border-width: 2px;
  border-color: whitesmoke;
  border-style: solid;
  border-radius: 10px;
`;

export const ColumnBaseDiv = styled(BaseDiv)`
  flex-direction: column;
  width: 25%;
  min-width: 350px;
  margin: 0 auto;
`;

export const LineFlexBaseDiv = styled(BaseDiv)`
  padding: 0;
`;

export const TitleWithBtnsDiv = styled(BaseDiv)`
  justify-content: space-between;
  align-content: center;
  width: 65%;
`;
export const BtnGroupFlexDiv = styled(LineFlexBaseDiv)`
  width: 25%;
  justify-content: space-between;
`;
