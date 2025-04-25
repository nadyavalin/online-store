import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Context } from "../main";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/constants";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to={SHOP_ROUTE}>buyDevice</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {user.isAuth ? (
            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Button
                variant="outline-dark"
                onClick={() => {
                  navigate(ADMIN_ROUTE);
                }}
              >
                Admin Panel
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  user.setIsAuth(false);
                  navigate(LOGIN_ROUTE);
                }}
                className="ms-2"
              >
                Log out
              </Button>
            </Nav>
          ) : (
            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Button
                variant="outline-dark"
                onClick={() => {
                  user.setIsAuth(true);
                  navigate(SHOP_ROUTE);
                }}
              >
                Login
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});
