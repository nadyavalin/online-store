import { useContext, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../main";

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add new device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mb-2">
            <Dropdown.Toggle>Choose a type</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mb-2">
            <Dropdown.Toggle>Choose a brand</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control className="mb-3" placeholder="Enter the device name" />
          <Form.Control className="mb-3" placeholder="Enter the cost of the device" type="number" />
          <div>
            <Form.Group className="mb-3">
              <div className="d-flex align-items-center">
                <Button variant="outline-dark" onClick={handleButtonClick}>
                  Choose File
                </Button>
                <Form.Control type="file" ref={fileInputRef} className="d-none" onChange={handleFileChange} />
                <span className="ms-2">{fileName}</span>
              </div>
            </Form.Group>
          </div>
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Add new property
          </Button>
          {info.map((i) => (
            <Row className="mt-2" key={i.number}>
              <Col md={4}>
                <Form.Control placeholder="Enter the name of the property" />
              </Col>
              <Col md={4}>
                <Form.Control placeholder="Enter the description of the property" />
              </Col>
              <Col md={4}>
                <Button onClick={() => removeInfo(i.number)} variant={"outline-danger"}>
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={onHide}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
