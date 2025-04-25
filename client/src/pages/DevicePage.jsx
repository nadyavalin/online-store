import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from "../assets/bigStar.png";

const DevicePage = () => {
  const device = {
    id: 1,
    name: "IPhone 12 PRO",
    price: 100000,
    rating: 5,
    img: `./img/iPhone.jpg`,
    brandId: 2,
  };

  const description = [
    { id: 1, title: "RAM", description: "5GB" },
    { id: 2, title: "Camera", description: "12Mp" },
    { id: 3, title: "CPU", description: "Pentium 3" },
    { id: 4, title: "Number of cores", description: "2" },
    { id: 5, title: "Battery", description: "4000A" },
  ];
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={device.img} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column justify-content-around align-items-center"
            style={{ width: 300, height: 300, fontSize: 32, border: "5px solid light-gray" }}
          >
            <h3>${device.price}</h3>
            <Button variant={"outline-dark"}>Add to cart</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column mt-3 ms-2">
        <h3>Characteristics:</h3>
        {description.map((info, index) => (
          <Row key={info.id} style={{ background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
