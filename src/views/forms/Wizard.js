
import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import Step1 from "./WizardSteps/Step1.js";
import Step2 from "./WizardSteps/Step2.js";
import Step3 from "./WizardSteps/Step3.js";

var steps = [
  {
    stepName: "Usuario",
    stepIcon: "nc-icon nc-single-02",
    component: Step1,
  },
  {
    stepName: "Cuenta",
    stepIcon: "nc-icon nc-touch-id",
    component: Step2,
  },
  {
    stepName: "Detalles",
    stepIcon: "nc-icon nc-pin-3",
    component: Step3,
  },
];

class Wizard extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title="Registra tu perfil"
              description="Información del Estudiante"
              headerTextCenter
              finishButtonClasses="btn-wd"
              nextButtonClasses="btn-wd"
              previousButtonClasses="btn-wd"
            />
          </Col>
        </div>
      </>
    );
  }
}

export default Wizard;
