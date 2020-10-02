import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BsPlusSquare, BsFileCheck } from "react-icons/bs";
import monochrome from "src/assets/monochrome.svg";
import styled from "styled-components";
import { connect } from "react-redux";
import { logout } from "../store/slice/auth";

const NavTab = styled.span`
  font-size: 18px;
  margin-right: 3px;
  font-weight: 500;
  align-self: center;
  color: #08374e;
  :hover {
    color: #669999;
  }
`;

const NavTabDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const NavIconDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-self: center;
  color: #08374e;
`;

const Navigation = ({ user, logout }) => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand as={NavLink} to="/dashboard">
          <img width="80px" src={monochrome} alt="logo" />
        </Navbar.Brand>
        {user && <span>{user.username}</span>}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user ? (
            <Nav className="ml-auto">
              <Nav.Link className="ml-5" as={NavLink} to="/dashboard">
                {" "}
                <NavTabDiv>
                  <NavTab>Dashboard </NavTab>
                  <NavIconDiv>
                    <BsFileCheck />
                  </NavIconDiv>
                </NavTabDiv>{" "}
              </Nav.Link>
              <Nav.Link className="ml-5" as={NavLink} to="/createTimesheet">
                {" "}
                <NavTabDiv>
                  <NavTab>Create Timesheet </NavTab>
                  <NavIconDiv>
                    <BsPlusSquare />
                  </NavIconDiv>
                </NavTabDiv>{" "}
              </Nav.Link>
              <Nav.Link className="ml-5" onClick={logout}>
                {" "}
                <NavTabDiv>
                  <NavTab>Logout</NavTab>
                  <NavIconDiv>
                    <FiLogOut />
                  </NavIconDiv>
                </NavTabDiv>{" "}
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link className="ml-5" as={NavLink} to="/login">
                <NavTab>Log in</NavTab>
              </Nav.Link>
              <Nav.Link className="ml-5" as={NavLink} to="/register">
                <NavTab>Register</NavTab>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

const ConnectedNavigation = connect(
  (state) => ({ user: state.auth.user }),
  (dispatch) => ({
    logout: () => dispatch(logout()),
  })
)(Navigation);

export { ConnectedNavigation as Navigation };
