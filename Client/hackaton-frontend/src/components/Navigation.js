import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BsPlusSquare, BsFileCheck } from "react-icons/bs";
import monochrome from "src/assets/monochrome.svg";
import { connect } from "react-redux";
import { logout } from "../store/slice/auth";
import {
  NavTab,
  NavTabUser,
  NavTabDiv,
  NavIconDiv,
  NavFlex,
  Logo,
} from "src/components/Navigation/navigation.styles";

const Navigation = ({ user, logout }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Navbar expanded={expanded} expand="lg" bg="light" variant="light">
        <Navbar.Brand as={NavLink} to="/dashboard">
          <Logo src={monochrome} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user ? (
            <NavFlex>
              <div>
                <Nav className="ml-auto">
                  <Nav.Link
                    onClick={() => setExpanded(false)}
                    className="ml-5"
                    as={NavLink}
                    to="/dashboard"
                  >
                    {" "}
                    <NavTabDiv>
                      <NavTab>Dashboard </NavTab>
                      <NavIconDiv>
                        <BsFileCheck />
                      </NavIconDiv>
                    </NavTabDiv>{" "}
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => setExpanded(false)}
                    className="ml-5"
                    as={NavLink}
                    to="/createTimesheet"
                  >
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
              </div>
              <div>
                <Nav>
                  <NavTabUser>User: {user.username}</NavTabUser>
                </Nav>
              </div>
            </NavFlex>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link
                onClick={() => setExpanded(false)}
                className="ml-5"
                as={NavLink}
                to="/login"
              >
                <NavTab>Log in</NavTab>
              </Nav.Link>
              <Nav.Link
                onClick={() => setExpanded(false)}
                className="ml-5"
                as={NavLink}
                to="/register"
              >
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
