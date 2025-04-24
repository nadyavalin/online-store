import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import { TypeBar } from "../components/TypeBar";
import { BrandBar } from "../components/BrandBar";

const Shop = () => {
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
