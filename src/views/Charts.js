
import React from "react";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample4,
  chartExample9,
  chartExample10,
  chartExample11,
  chartExample12,
} from "variables/charts.js";

class Charts extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          
          <Row>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle>Información 24x7</CardTitle>
                  <p className="card-category">Line Chart</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={chartExample1.data}
                    options={chartExample1.options}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle>Actividad del Grupo</CardTitle>
                  <p className="card-category">Interacciones</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={chartExample9.data}
                    options={chartExample9.options}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle>Vistas y descargas</CardTitle>
                  <p className="card-category">En megabytes</p>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={chartExample10.data}
                    options={chartExample10.options}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="car-chart">
                <CardHeader>
                  <CardTitle>Actividad del Docente</CardTitle>
                  <p className="card-category">Multiple Bars Chart</p>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle>Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={chartExample11.data}
                    options={chartExample11.options}
                    width={456}
                    height={300}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-info" />
                    Open
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" />
                    Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardHeader>
                  <CardTitle>Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={chartExample12.data}
                    options={chartExample12.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" />
                    Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Charts;
