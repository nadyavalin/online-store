import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Context } from "../main";
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/constants";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { observer } from "mobx-react-lite";

const NavBar = () => {
  const { user } = useContext(Context);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <NavLink to={SHOP_ROUTE}>buyDevice</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {user.isAuth ? (
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Button variant="outline-dark">Admin Panel</Button>
              <Button variant="outline-dark" className="ms-2" onClick={() => user.setIsAuth(false)}>
                Log out
              </Button>
            </Nav>
          ) : (
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Button
                variant="outline-dark"
                onClick={() => user.setIsAuth(true)}
              >
                Login
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default observer(NavBar);
