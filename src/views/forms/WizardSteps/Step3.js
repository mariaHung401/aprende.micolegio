
import React from "react";
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// reactstrap components
import { FormGroup, Input, Row, Col } from "reactstrap";

class Wizard extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Row className="justify-content-center">
          <Col sm="12">
            <h5 className="info-text">Para estar en contacto</h5>
          </Col>
          <Col sm="7">
            <FormGroup>
              <label>Número Celular</label>
              <Input type="text" />
            </FormGroup>
          </Col>
          
        </Row>
      </>
    );
  }
}

export default Wizard;
