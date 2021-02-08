
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  Table,
} from "reactstrap";
import * as mainActions from "../../actions/mainActions";
import { connect } from 'react-redux';
import Select from "react-select";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      codigo:"",
      archivos:[],
      singleSelect: null,
      tareas: [],
      materias:null,
      seccion:null,
      asignatura:null,
      archivosfiltro:[],
      archivosPrimaria:[],
      primaria:["B11-1", "B11-2","B11-3","B11-4","B11-5","B11-6"],
      archivosSecundaria:[],
      secundaria:["B11-7", "B11-8","B11-9","D18-1","D18-2"],
      archivosSinfiltro:[],
    }
    this.handleChange = this.handleChange.bind(this);
  }

    
  handleChange = event => {
      this.setState({ codigo:event})
  }
  
  setGrado = (value) => {
    this.setState({ singleSelect: value })
    if(value.value>6){
      this.setState({materias:this.props.Secundaria})
    }else{
      this.setState({materias:this.props.Primaria})
    }
  }

  setSeccion = (value) => {
    this.setState({ seccion: value })
  }

  componentDidMount() {
    document.body.classList.toggle("login-page");
    this.ir(this.props.match.params.id);
  }

  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  marcarDescarga = async (size, colegio, archivo )=>{
    const data = {
      codigoweb:colegio,
      archivo:size,
      nombre:archivo
    };
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/descargaWebColegio';
    let respuesta = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
    })
    .catch(error => {
        console.log(error);
    });
  }

  ir = async (codigo)=>{
    const data = {
      codigo:codigo,
      
    };
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/accesoPublico';
    let respuesta = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
    })
    .catch(error => {
        console.log(error);
    });
    let result = await respuesta.json();
    if(result[0]!==undefined){
      this.setState({archivos:result});
      //this.props.setAlumno(result)
      //this.props.history.push("/admin/dashboard");
    }
  }

  filtrar = () => {
    let filtro = [];
    let sinfiltro = [];
    let archivosPrimaria = [];
    let archivosSecundaria = [];
    if(this.state.seccion===null){
      filtro=this.state.archivos.filter(archivo=>archivo.grado==this.state.singleSelect.value);
    }else{
      filtro=this.state.archivos.filter(archivo=>archivo.grado==this.state.singleSelect.value 
        && archivo.seccion==this.state.seccion.value);
    }
    if(this.state.primaria.find(grado=>grado===this.state.singleSelect.value)){
      sinfiltro=this.state.archivos.filter(archivo=>(archivo.grado==this.state.singleSelect.value 
          && archivo.seccion=="*") || archivo.grado=="*" );
      archivosPrimaria=this.state.archivos.filter(archivo=>archivo.label=="Primaria")
    }
    if(this.state.secundaria.find(grado=>grado===this.state.singleSelect.value)){
      sinfiltro=this.state.archivos.filter(archivo=>(archivo.grado==this.state.singleSelect.value 
        && archivo.seccion=="*") || archivo.grado=="*" );
      archivosSecundaria=this.state.archivos.filter(archivo=>archivo.label=="Secundaria")
    }
    this.setState({archivosfiltro:filtro, archivosSinfiltro:sinfiltro, 
      archivosPrimaria:archivosPrimaria,
      archivosSecundaria:archivosSecundaria,
    });
  }

  verFecha = (fecha) => {
    fecha = fecha.substr(0,10);
    let dateFecha=fecha.split("-");
    return (
      <b>{dateFecha[2]}/{dateFecha[1]}</b>
    );
  } 

  render() {
    let codigo = this.state.codigo;
    return (
      <div className="login-page">
        <Container>
          <Row>
            <Col md="12">
              <CardHeader>
                <CardTitle tag="h4">Archivos disponibles para Descargar</CardTitle>
              </CardHeader>
              <CardBody>
              <Row>
                <Label md="2">Grado o año</Label>
                <Col md="3">
                  <Select
                    className="react-select primary"
                    classNamePrefix="react-select"
                    name="singleSelect"
                    value={this.state.singleSelect}
                    onChange={(value) =>
                      this.setGrado(value )
                    }
                    options={this.props.Grado}
                    placeholder="Seleccion el Grado o año"
                  />
                  </Col>
                  <Col md="2">
                  <Select
                    className="react-select primary"
                    classNamePrefix="react-select"
                    name="seccion"
                    value={this.state.seccion}
                    onChange={(value) =>
                      this.setSeccion(value )
                    }
                    options={this.props.Seccion}
                    placeholder="Seccion"
                  />
                  </Col>
                  <Col md="3">
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="singleSelect"
                      value={this.state.asignatura}
                      onChange={(value) =>
                        this.setState({ asignatura: value })
                      }
                      options={this.state.materias}
                      placeholder="Selecciona el Area o Asignatura"
                    />
                  </Col>
                  <Col md="2">
                  <Button color="success"
                    onClick={()=>this.filtrar()}
                  >
                    Ver
                  </Button>
                  </Col>
              </Row>
              <Row>
                    <Col md="6">
                      <Table responsive>
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Materia</th>
                          <th>Titulo</th>
                          <th>Grado</th>
                          <th>Venc</th>
                          <th></th>
                        </tr>
                      </thead>
                        <tbody>
                        {this.state.archivosfiltro.map(archivo=>(
                            <>
                              <tr>
                                <td>{archivo.fecha} </td>
                                <td>{archivo.materia} </td>
                                <td>{archivo.titulo} </td>
                                <td>{archivo.label} {archivo.seccion} </td>
                                <td>{this.verFecha(archivo.vencimiento)} </td>
                                <td className="td-actions text-left">
                                    {archivo.direccion ? (
                                      <div className="timeline-footer">
                                      
                                      <Button className="btn-round" 
                                        color="primary" 
                                        outline
                                        href={archivo.direccion}
                                        target="_blank"
                                        onClick={()=>this.marcarDescarga(archivo.size, 
                                          archivo.plantel, archivo.titulo)}
                                      >
                                        <i className="fa fa-download" />
                                      </Button>
                                      </div>
                                    ) : (null)}
                                </td>
                              </tr>
                            </>
                          ))}
                          
                        </tbody>
                        
                      </Table>
                    </Col>
                    <Col md="6">
                      <Table responsive>
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Materia</th>
                          <th>Titulo</th>
                          <th>Venc</th>
                          <th></th>
                        </tr>
                      </thead>
                        <tbody>
               
                        {this.state.archivosSinfiltro.map(archivo=>(
                            <>
                              <tr>
                                <td>{archivo.fecha} </td>
                                <td>{archivo.materia} </td>
                                <td>{archivo.titulo} </td>
                                <td>{this.verFecha(archivo.vencimiento)} </td>
                                <td className="td-actions text-left">
                                    {archivo.direccion ? (
                                      <div className="timeline-footer">
                                      
                                      <Button className="btn-round" 
                                        color="primary" 
                                        outline
                                        href={archivo.direccion}
                                        target="_blank"
                                        onClick={()=>this.marcarDescarga(archivo.size, 
                                          archivo.plantel, archivo.titulo)}
                                      >
                                        <i className="fa fa-download" />
                                      </Button>
                                      </div>
                                    ) : (null)}
                                </td>
                              </tr>
                            </>
                          ))}
                          {this.state.archivosPrimaria.map(archivo=>(
                            <>
                              <tr>
                                <td>{archivo.fecha} </td>
                                <td>{archivo.materia} </td>
                                <td>{archivo.titulo} </td>
                                <td>{this.verFecha(archivo.vencimiento)} </td>
                                <td className="td-actions text-left">
                                    {archivo.direccion ? (
                                      <div className="timeline-footer">
                                      
                                      <Button className="btn-round" 
                                        color="primary" 
                                        outline
                                        href={archivo.direccion}
                                        target="_blank"
                                        onClick={()=>this.marcarDescarga(archivo.size, 
                                          archivo.plantel, archivo.titulo)}
                                      >
                                        <i className="fa fa-download" />
                                      </Button>
                                      </div>
                                    ) : (null)}
                                </td>
                              </tr>
                            </>
                          ))}
                          {this.state.archivosSecundaria.map(archivo=>(
                            <>
                              <tr>
                                <td>{archivo.fecha} </td>
                                <td>{archivo.materia} </td>
                                <td>{archivo.titulo} </td>
                                <td>{this.verFecha(archivo.vencimiento)} </td>
                                <td className="td-actions text-left">
                                    {archivo.direccion ? (
                                      <div className="timeline-footer">
                                      
                                      <Button className="btn-round" 
                                        color="primary" 
                                        outline
                                        href={archivo.direccion}
                                        target="_blank"
                                        onClick={()=>this.marcarDescarga(archivo.size, 
                                          archivo.plantel, archivo.titulo)}
                                      >
                                        <i className="fa fa-download" />
                                      </Button>
                                      </div>
                                    ) : (null)}
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                        </Table>
                    </Col>
                  </Row>
                         
              </CardBody>
            </Col>
          </Row>
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage:  `url(${require("assets/img/bg/rawpixel-comm.jpg")})`,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
    return reducers.mainReducer;
}

export default connect(mapStateToProps, mainActions )(Login);
