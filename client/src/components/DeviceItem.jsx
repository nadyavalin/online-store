import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/constants";
import star from "../assets/star.svg";

export const DeviceItem = ({ device }) => {
  const navigate = useNavigate();

  return (
    <Col md={3} className="mt-3" onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
      <Card style={{ width: 162, cursor: "pointer" }} border="light" className="p-1">
        <Image width={150} height={150} src={device.img} alt={device.name} className="rounded" />
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
