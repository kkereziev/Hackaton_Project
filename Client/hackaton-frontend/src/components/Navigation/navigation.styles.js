import styled from "styled-components";

export const NavTab = styled.span`
  padding-right: 3px;
  font-size: 18px;
  margin-right: 3px;
  font-weight: 500;
  color: #08374e;
  :hover {
    color: #669999;
  }
`;

export const NavTabUser = styled(NavTab)`
  color: #669999;
  margin-right: 6px;
`;

export const NavTabDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NavIconDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-self: center;
  color: #08374e;
`;

export const NavFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-right: 30px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const Logo = styled.img`
  margin-left: 20px;
  width: 100px;
`;
