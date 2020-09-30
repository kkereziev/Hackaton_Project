import React from "react";
//import styled from "styled-components";
import { Navbar, Nav } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { CgDatabase } from "react-icons/cg";
import DevCampLogo from "src/assets/DevCampLogo.png";
import styled from "styled-components";

const NavTab = styled.span`
  :hover {
    color: #ccffff;
  }
`;

export const Navigation = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <img width="70px" src={DevCampLogo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="ml-5">
              {" "}
              <NavTab>
                Dashboard <CgDatabase />
              </NavTab>{" "}
            </Nav.Link>
            <Nav.Link className="ml-5">
              {" "}
              <NavTab>
                Create Timesheet <BsPlusSquare />
              </NavTab>{" "}
            </Nav.Link>
            <Nav.Link className="ml-5">
              {" "}
              <NavTab>
                Logout <FiLogOut />{" "}
              </NavTab>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};