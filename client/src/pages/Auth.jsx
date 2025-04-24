import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { Button, Col, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/constants";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: `${window.innerHeight - 100}px` }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Login" : "Sign Up"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="Email..." />
          <Form.Control className="mt-3" placeholder="Password..." />
          <Row className="d-flex flex-column flex-md-row justify-content-between mt-3">
            <Col xs="auto">
              {isLogin ? (
                <div>
                  Don't have an account?{" "}
                  <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
                </div>
              ) : (
                <div>
                  Do you already have an account?{" "}
                  <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                </div>
              )}
            </Col>
            <Col xs="auto">
              {isLogin ? (
                <Button variant="outline-primary">Login</Button>
              ) : (
                <Button variant="outline-primary">Sign up</Button>
              )}
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
