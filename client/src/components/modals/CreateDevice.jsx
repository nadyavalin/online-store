import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row, Spinner } from "react-bootstrap";
import { Context } from "../../main";
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  console.log("Context device:", device);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (device) {
      fetchTypes().then((data) => device.setTypes(data));
      fetchBrands().then((data) => device.setBrands(data));
    }
  }, [device]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file chosen");
    console.log("Selected file:", selectedFile);
  };

  const addDevice = async () => {
    try {
      if (!name || !price || !file || !device.selectedType.id || !device.selectedBrand.id) {
        setError("Please fill all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", `${price}`);
      formData.append("img", file);
      formData.append("typeId", device.selectedType.id);
      formData.append("brandId", device.selectedBrand.id);
      formData.append("info", JSON.stringify(info));

      const newDevice = await createDevice(formData);
      console.log("Created device:", newDevice);

      const updatedDevices = await fetchDevices();
      device.setDevices(updatedDevices);

      setName("");
      setPrice(0);
      setFile(null);
      setFileName("No file chosen");
      setInfo([]);
      device.setSelectedType({});
      device.setSelectedBrand({});
      setError(null);
      onHide();
    } catch (e) {
      console.error("Error creating device:", e);
      setError(e.response?.data?.message || "Failed to create device");
    }
  };

  if (!device) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add new device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="text-danger mb-3">{error}</div>}
        <Form>
          <Dropdown className="mb-2">
            <Dropdown.Toggle>{device.selectedType.name || "Choose a type"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mb-2">
            <Dropdown.Toggle>{device.selectedBrand.name || "Choose a brand"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
            placeholder="Enter the device name"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mb-3"
            placeholder="Enter the cost of the device"
            type="number"
          />
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
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo("title", e.target.value, i.number)}
                  placeholder="Enter the name of the property"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo("description", e.target.value, i.number)}
                  placeholder="Enter the description of the property"
                />
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
        <Button variant="outline-success" onClick={addDevice}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
