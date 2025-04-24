import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star.svg";

export const DeviceItem = ({ device }) => {
  console.log("Device:", device);

  return (
    <Col md={3} className="mb-4">
      <Card style={{ width: 152, cursor: "pointer" }} border="light">
        <Image width={150} height={150} src={device.img} alt={device.name} />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>Samsung...</div>
          <div className="d-flex align-items-center">
            <div className="me-1">{device.rating}</div>
            <Image width={18} height={18} src={star} alt="rating star" />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};
