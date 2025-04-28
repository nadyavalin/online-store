import { useContext } from "react";
import { Context } from "../main";
import { Row } from "react-bootstrap";
import { DeviceItem } from "./DeviceItem";
import { observer } from "mobx-react-lite";

export const DeviceList = observer(() => {
  const { device } = useContext(Context);

  return (
    <Row className="d-flex">
      {device.devices.length ? (
        device.devices.map((device) => <DeviceItem key={device.id} device={device} />)
      ) : (
        <div>No devices available</div>
      )}
    </Row>
  );
});
