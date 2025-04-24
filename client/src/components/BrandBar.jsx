import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../main";
import { Card, Row, Col } from "react-bootstrap";

export const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.brands.map((brand) => (
        <Col key={brand.id} xs="auto" className="px-1 mx-0 mb-2">
          <Card
            style={{ cursor: "pointer" }}
            key={brand.id}
            className="p-2"
            onClick={() => device.setSelectedBrand(brand)}
            border={brand.id === device.selectedBrand.id ? "dark" : "light"}
          >
            {brand.name}
          </Card>
        </Col>
      ))}
    </Row>
  );
});
