import styled from "styled-components";

export const Title = styled.span`
  font-size: 22pt;
  color: #08374e;
  font-weight: bold;
`;

export const TitleDiv = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

export const ColumnTitlesDiv = styled(TitleDiv)`
  align-self: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;
export const SecondTitle = styled.span`
  color: #08374e;
  font-size: 18pt;
`;

export const ThirdTitle = styled(SecondTitle)`
  font-weight: normal;
  font-size: 14pt;
`;
