import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/constants";
import { login, registration } from "../http/userAPI";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      console.error("Auth error:", e.response?.data?.message || e.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: `${window.innerHeight - 100}px` }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Login" : "Sign Up"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex flex-column flex-md-row justify-content-between mt-3">
            <Col xs="auto">
              {isLogin ? (
                <div>
                  Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
                </div>
              ) : (
                <div>
                  Do you already have an account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                </div>
              )}
            </Col>
            <Col xs="auto">
              <Button variant="outline-primary" onClick={click}>
                {isLogin ? "Login" : "Sign up"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
