import styled from "styled-components";

export const BaseDiv = styled.div`
  padding-top: 55px;
  display: flex;
  justify-content: center;
`;

export const BaseDivTopZero = styled(BaseDiv)`
  padding-top: 0;
  justify-content: space-around;
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
  margin: 0 auto;
  flex-direction: column;
  width: 30%;
  min-width: 350px;
  justify-content: center;
  align-content: space-around;
`;

export const LineFlexBaseDiv = styled(BaseDiv)`
  padding: 0;
  justify-content: center;
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

export const FlexCenteredTopHundred = styled(LineFlexBaseDiv)`
  justify-content: center;
  margin-top: 100px;
`;
