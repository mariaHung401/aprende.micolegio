import React from "react";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import * as mainActions from "../actions/mainActions";
import { connect } from 'react-redux';

class Widgets extends React.Component {

  componentDidMount = async () => {
    this.props.getAlumno();
    await this.props.verTareas(this.props.alumno);
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col className="text-center" lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                <CardTitle tag="h4">Impulsos</CardTitle>
                  <h5 className="card-category">Resumen de Actividades</h5>
                </CardHeader>
                <CardBody>
                <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                      {this.props.tareas.map(tarea=>(
                          <tr>
                            <td >
                              <div className="timeline-badge danger">
                                <i className="nc-icon nc-single-copy-04" />
                              </div>
                            </td>
                            <td className="text-left">
                              {tarea.grado}
                            </td>
                            <td className="text-left">
                              {tarea.materia}
                            </td>
                            <td className="td-actions text-right">
                              <Button
                                className="btn-round btn-icon btn-icon-mini btn-neutral"
                                color="info"
                                id="tooltip42906017"
                                title=""
                                type="button"
                              >
                                <i className="nc-icon nc-ruler-pencil" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip42906017"
                              >
                                Editar
                              </UncontrolledTooltip>
                              <Button
                                className="btn-round btn-icon btn-icon-mini btn-neutral"
                                color="danger"
                                id="tooltip570363224"
                                title=""
                                type="button"
                              >
                                <i className="nc-icon nc-simple-remove" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip570363224"
                              >
                                Quitar
                              </UncontrolledTooltip>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-refresh spin" />
                    Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardText tag="div">
                    <CardTitle tag="h4">Contenidos</CardTitle>
                    <p className="card-category">
                      Recomendados
                    </p>
                  </CardText>
                </CardHeader>
                <CardBody className="table-responsive">
                  <Table className="table-hover">
                    <thead className="text-warning">
                      <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Recurso</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Ejercicios de activación </td>
                        <td>YouTube</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Historia del Arte </td>
                        <td>Wikipedia</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>La Celula</td>
                        <td>Prezzi</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-timeline card-plain">
                <CardBody>
                  <ul className="timeline timeline-simple">
                    <li className="timeline-inverted">
                      <div className="timeline-badge danger">
                        <i className="nc-icon nc-single-copy-04" />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="danger" pill>
                          Ciencias Naturales
                          </Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                          La digestión humana
                          </p>
                        </div>
                        <h6>
                          <i className="ti-time" />
                          hace 11 horas
                          <hr />
                        </h6>
                        <div className="timeline-footer">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              className="btn-round"
                              color="info"
                              data-toggle="dropdown"
                              type="button"
                            >
                              <i className="nc-icon nc-settings-gear-65" />
                            </DropdownToggle>
                            <DropdownMenu persist>
                              <DropdownItem
                                href="https://s3.amazonaws.com/bumerapp.com/aprende/pdfs/ciencias.pdf"
                                target="_blank"
                              >
                                Descargar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-inverted">
                      <div className="timeline-badge success">
                        <i className="nc-icon nc-sun-fog-29" />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="success" pill>
                          Educación Física
                          </Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                          Vallas y pistas de carreras con atletas miniaturas
                          </p>
                        </div>
                        <h6>
                          <i className="ti-time" />
                          hace 22 horas
                          <hr />
                        </h6>
                        <div className="timeline-footer">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              className="btn-round"
                              color="info"
                              data-toggle="dropdown"
                              type="button"
                            >
                              <i className="nc-icon nc-settings-gear-65" />
                            </DropdownToggle>
                            <DropdownMenu persist>
                              <DropdownItem
                                href="https://s3.amazonaws.com/bumerapp.com/aprende/pdfs/edfisica.pdf"
                                target="_blank"
                              >
                                Descargar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-inverted">
                      <div className="timeline-badge success">
                        <i className="nc-icon nc-sun-fog-29" />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="success" pill>
                          Geografía
                          </Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                          Burguesía y capitalismo
                          </p>
                        </div>
                        <h6>
                          <i className="ti-time" />
                          hace 1 dia
                          <hr />
                        </h6>
                        <div className="timeline-footer">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              className="btn-round"
                              color="info"
                              data-toggle="dropdown"
                              type="button"
                            >
                              <i className="nc-icon nc-settings-gear-65" />
                            </DropdownToggle>
                            <DropdownMenu persist>
                              <DropdownItem
                                href="https://s3.amazonaws.com/bumerapp.com/aprende/pdfs/geografia.pdf"
                                target="_blank"
                              >
                                Descargar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-inverted">
                      <div className="timeline-badge success">
                        <i className="nc-icon nc-sun-fog-29" />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="success" pill>
                          Matematicas
                          </Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                          Modelos matemáticos para la elaboración de costos, Funciones polinómicas, Polinomios, tipos, suma de Polinomios, resta de polinomios
                          </p>
                        </div>
                        <h6>
                          <i className="ti-time" />
                          hace 2 dias
                          <hr />
                        </h6>
                        <div className="timeline-footer">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              className="btn-round"
                              color="info"
                              data-toggle="dropdown"
                              type="button"
                            >
                              <i className="nc-icon nc-settings-gear-65" />
                            </DropdownToggle>
                            <DropdownMenu persist>
                              <DropdownItem
                                href="https://s3.amazonaws.com/bumerapp.com/aprende/pdfs/matematicas.pdf"
                                target="_blank"
                              >
                                Descargar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-inverted">
                      <div className="timeline-badge success">
                        <i className="nc-icon nc-sun-fog-29" />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="success" pill>
                          Orientación
                          </Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                          La Sexualidad
                          </p>
                        </div>
                        <h6>
                          <i className="ti-time" />
                          hace 2 dias
                          <hr />
                        </h6>
                        <div className="timeline-footer">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              className="btn-round"
                              color="info"
                              data-toggle="dropdown"
                              type="button"
                            >
                              <i className="nc-icon nc-settings-gear-65" />
                            </DropdownToggle>
                            <DropdownMenu persist>
                              <DropdownItem
                                href="https://s3.amazonaws.com/bumerapp.com/aprende/pdfs/orientacion.pdf"
                                target="_blank"
                              >
                                Descargar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-inverted">
                      <div className="timeline-badge success">
                        <i className="nc-icon nc-sun-fog-29" />
                      </div>
                      <div className="timeline-panel">
                        <div className="timeline-heading">
                          <Badge color="success" pill>
                          Castellano
                          </Badge>
                        </div>
                        <div className="timeline-body">
                          <p>
                          Redacción de textos expositivos. *Recomendación para escribir textos argumentativos. *Cualidades que debetener un escrito.
                          </p>
                        </div>
                        <h6>
                          <i className="ti-time" />
                          hace 2 dia
                          <hr />
                        </h6>
                        <div className="timeline-footer">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              className="btn-round"
                              color="info"
                              data-toggle="dropdown"
                              type="button"
                            >
                              <i className="nc-icon nc-settings-gear-65" />
                            </DropdownToggle>
                            <DropdownMenu persist>
                              <DropdownItem
                                href="https://s3.amazonaws.com/bumerapp.com/aprende/pdfs/castellano.pdf"
                                target="_blank"
                              >
                                Descargar
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.mainReducer;
}

export default connect(mapStateToProps, mainActions )(Widgets);