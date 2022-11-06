
import React from "react";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// reactstrap components
import {
  UncontrolledAlert,
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Collapse,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Label,
  FormGroup,
  Input,
  Alert,
  Table,
  Row,
  Col,
} from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
import * as mainActions from "../actions/mainActions";
import { connect } from 'react-redux';
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import { uploadFile } from 'react-s3';
import Select from "react-select";
import {
  chartExample4,
} from "variables/charts.js";
import Compress from "browser-image-compression";


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      nombre:null,
      apellido:null,
      grado:null,
      codigoweb:null,
      materias:null,
      fecha: null,
      tareas:[],
      enviadas:[],
      modal:null,
      subiendo: null,
      file: null,
      imagePreviewUrl: defaultImage,
      subirRecurso:null,
      mensaje:null,
      tarea:{},
      tipodoc:null,
      acepta:"*",
      asignatura:null,
      mensajes:[],
      horizontalTabs: "nuevo",
    }
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRefresh = () => {
    // by calling this method react re-renders the component
    // this.setState();
    this.props.verTareas(this.props.alumno)
    console.log("Pagina Refrescada")
  };

  handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const tiposimagen = ["jpg","jpeg","gif","png","tiff","tif","bmp"]
    const tiposdocs = ["doc","docx","pdf","xls","xlsx","ppt","pptx","csv","txt"]

    if(this.state.tipodoc=="i"){
      if (!file.type.includes("image")){
        alert("No es un archivo de imagen "+file.type.toLowerCase());
        return;
      }
      const options = {
        // As the key specify the maximum size
        // Leave blank for infinity
        maxSizeMB: 0.10,
        // Use webworker for faster compression with
        // the help of threads
        useWebWorker: true
      }
      Compress(file, options)
        .then(compressedBlob => {
            // Compressed file is of Blob type
            // You can drop off here if you want to work with a Blob file
            console.log(compressedBlob);

            // If you want to work with the File
            // Let's convert it here, by adding a couple of attributes
            compressedBlob.lastModifiedDate = new Date();

            // Conver the blob to file
            const convertedBlobFile = new File([compressedBlob],
              file.name, { type: file.type, lastModified: Date.now()});

            // Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
            let reader = new FileReader();
            reader.onloadend = () => {
              this.setState({
                file: convertedBlobFile,
                imagePreviewUrl: reader.result,
              });
            };
            reader.readAsDataURL(convertedBlobFile);
        })
        .catch(e => {
            // Show the user a toast message or notification that something went wrong while compressing file
        });
    }else{
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      e.preventDefault();
      const fileUnchange = file;
      const fileNew = new File([fileUnchange],
        String(rand)+fileUnchange.name,
        { type: fileUnchange.type, lastModified: Date.now()});
      if(fileNew.size<2000000){
        let doc = new FileReader();
        doc.onloadend = () => {
          this.setState({
            file: fileNew,
            imagePreviewUrl: doc.result,
          });
        };
        doc.readAsDataURL(fileNew);
      }else{
        let subiendo = (
          <Alert color="info">
            <span>Recurso invalido</span>
          </Alert>
        );
        this.setState({subirRecurso:false, mensaje:null,
          file:null, imagePreviewUrl:null, subiendo:subiendo,
        });
        alert("Solo se aceptan documentos menores a 2mb ");
      }
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
    });
    this.refs.fileInput.value = null;
  }

  verEnvios = async () => {
    let grado=this.props.gradofijo;
    if(grado!="" || grado!==undefined){
      grado=grado.substr(3,6).toUpperCase();
    }
    const data = {
      id:this.props.colegio.id,
      grado: grado
    };
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/masterside/incoming_webhook/verRespuestas';
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
    console.log(result)
    let alumnos=[];
    result[0].forEach(envio => {
      if(alumnos.filter(alumno=>alumno==envio.alumno).length==0){
        alumnos.push(envio.alumno)
      }
    });
    let totalrevisados = "0";
    if(result[2][0]!==undefined){
      totalrevisados = result[2][0].total;
    }else{
      totalrevisados = "0";
    }
    this.setState({envios:result[0], revisados:result[1],
      activos: alumnos, totalrevisados:totalrevisados});
  }

  setGrado = () => {
    let prescolar=["A11-0","A11-1","A11-2","A11-3"];
    let primaria=["B11-1","B11-2","B11-3","B11-4","B11-5","B11-6"];
    let valorPres = prescolar.find(grado=>grado==this.props.alumno.grado.substr(0,5));
    let valorPrim = primaria.find(grado=>grado==this.props.alumno.grado.substr(0,5));
    console.log(valorPres);
    console.log(valorPrim);
    if(valorPrim===undefined & valorPres===undefined){
      this.setState({materias:this.props.Secundaria})
    }else if(valorPrim!==undefined & valorPres===undefined) {
      this.setState({materias:this.props.Primaria})
    }else if(valorPrim===undefined & valorPres!==undefined) {
      this.setState({materias:this.props.Prescolar})
    }
  };

  componentDidMount = async () => {
    this.props.verCredenciales();
    if(!this.props.alumno.codigoweb){
      this.props.history.push("/login");
    }
    this.props.getAlumno();
    await this.props.verTareas(this.props.alumno);
    await this.verMensaje(this.props.alumno.codigoweb);
    this.setGrado();
    this.verMensaje(this.props.alumno.codigoweb);
  }

  verMensaje = async (codigo) => {
    if(codigo!=""){
      codigo=codigo.substr(0, 3);
    }
    let grado = null;
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/leerMensajes?codigo='+codigo;
    let respuesta = await fetch(url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        Accept: 'application/json',
    }).catch(error => {
        console.log(error);
    });
    let mensajes = await respuesta.json();
    if (this.props.alumno.grado.length>0){
      grado = this.props.alumno.grado.substr(0,5);
    }
    mensajes = mensajes.filter(mensaje=>(mensaje.grado.key=="*" || mensaje.grado.key==grado));
    this.setState({ mensajes:mensajes });
  }

  quitar = async (id) => {
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/quitarTarea';
    const datadir = {
      idtarea:id
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(datadir),
      headers:{
          'Content-Type': 'application/json'
      },
      Accept: 'application/json',
    })
    .then(async resp  => {
        await this.props.verTareas(this.props.alumno);
    })
    .catch(error => {
        console.log(error);
    });
  }

  async uploadFile() {
    let file = this.state.file;
    let materia = "*";
    let nummateria = "0";
    if(this.state.asignatura!==null){
      materia=this.state.asignatura.label;
      nummateria=this.state.asignatura.value;
    }
    if (file) {
        let subiendo = (
          <Alert color="info">
            <span>Subiendo Recurso</span>
          </Alert>
        );
        this.setState({subiendo:subiendo});
        await  uploadFile(file, {
            bucketName: 'pruebareact',
            dirName: 'aprende',
            region: 'us-east-1',
            accessKeyId: this.props.as3,
            secretAccessKey: this.props.ss3,
        })
        .then(data => {
            const datadir = {
                direccion:data.location,
                codigoweb:this.props.alumno.codigoweb,
                alumno:this.props.alumno.apellidos+", "+this.props.alumno.nombres,
                grado: this.props.alumno.grado,
                materia: materia,
                nummateria: nummateria,
                idtarea:this.state.tarea.id,
                titulo:this.state.tarea.titulo,
                mensaje:this.state.mensaje,
                tipodoc:this.state.tipodoc,
                size:this.state.file.size,
                tipo:this.state.file.type,
            };
            let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/subirTarea';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(datadir),
                headers:{
                    'Content-Type': 'application/json'
                },
                Accept: 'application/json',
            })
            .then(async resp  => {
                let nube = (
                  <Alert color="success">
                    <span>Recurso en la nube</span>
                  </Alert>
                )
                this.setState({subiendo:nube,
                asignatura:null, singleSelect:null});
                await this.props.verTareas(this.props.alumno);
                this.setState({subirRecurso:false, mensaje:null,
                  file:null, imagePreviewUrl:null,
                });
            })
            .catch(error => {
              let msjerror = (
                <Alert color="danger">
                  <span>Faltan Datos</span>
                </Alert>
              )
              this.setState({subiendo:msjerror});
            });
        })
        .catch(err =>
          {
            let msjerror = (
              <Alert color="danger">
                <span>Faltan Datos</span>
              </Alert>
            )
            this.setState({subiendo:msjerror});
          });
    }
  }

  ponerModal = () => {
    const inputValue = this.state.alert;
    this.setState({
      modal: (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.setState({modal:null})}
          onCancel={() => this.setState({modal:null})}
          confirmBtnBsStyle="info"
          btnSize=""
          title={
            <p>
              You entered: <b>{inputValue}</b>
            </p>
          }
          >
        </ReactBSAlert>
      ),
    });
  }

  render() {
    let tiposRecursos = [
        { value: "i", label:"Imagen",
          acepta:".jpg,.jpeg,.gif,.png,.tiff,.tif,.bmp"},
        { value: "d", label:"Documento",
          acepta:".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.csv,.txt" },
    ]
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="12" xs="12">
                      <div className="numbers">
                        <p className="card-category">
                        {this.props.alumno.apellidos}
                        {" "} {this.props.alumno.nombres}</p>
                        <p />
                        {this.props.alumno.codigoweb}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-check" />
                    Grado: {this.props.alumno.grado}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="">
                <CardHeader>
                  <Link to={
                        '/admin/datos'
                      }>
                    <img
                      alt="..."
                      src={this.props.foto}
                    />
                  </Link>
                </CardHeader>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardBody>
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                      <Nav id="tabs" role="tablist" tabs>
                        <NavItem>
                          <NavLink
                            aria-expanded={this.state.horizontalTabs === "nuevo"}
                            data-toggle="tab"
                            href="#nuevo"
                            role="tab"
                            className={
                              this.state.horizontalTabs === "nuevo"
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              this.setState({ horizontalTabs: "nuevo" })
                            }
                          >
                            <span
                              data-notify="icon"
                              className="nc-icon nc-chat-33"
                            /> Nuevo
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            aria-expanded={
                              this.state.horizontalTabs === "Historial de mensajes"
                            }
                            data-toggle="tab"
                            href="#historial"
                            role="tab"
                            className={
                              this.state.horizontalTabs === "Historial de mensajes"
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              this.setState({ horizontalTabs: "Historial de mensajes" })
                            }
                          >
                            <span
                              data-notify="icon"
                              className="nc-icon nc-bullet-list-67"
                            /> Historial de mensajes <span className="text-danger">{this.state.mensajes.length}</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </div>
                  <TabContent
                    className="text-center"
                    id="my-tab-content"
                    activeTab={this.state.horizontalTabs}
                  >
                    <TabPane tabId="nuevo" role="tabpanel">
                      <p className="card-category" />
                      {this.state.mensajes.slice(0, 1).map(mensaje=>(
                        <div>
                          <span>
                            {mensaje.grado.label} {mensaje.seccion}
                          </span>
                          <br />
                          <h6>
                            <span className="text-danger">{mensaje.fecha} ({mensaje.hora}):</span>{mensaje.titulo} {mensaje.mensaje}
                          </h6>
                        </div>
                      ))}
                    </TabPane>
                    <TabPane tabId="Historial de mensajes" role="tabpanel">
                      <p className="card-category" />
                      {this.state.mensajes.map(mensaje=>(
                        <div>
                          <span>
                            {mensaje.grado.label} {mensaje.seccion}
                          </span>
                          <br />
                          <h6>
                            <span className="text-danger">{mensaje.fecha} ({mensaje.hora}):</span>{mensaje.titulo} {mensaje.mensaje}
                          </h6>
                        </div>
                      ))}
                    </TabPane>
                  </TabContent>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="nc-icon nc-bell-55" />
                    Mensajes del docente
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
            {this.state.subirRecurso ? (
              <Col md="12">
                <Card className="card-tasks">
                  <CardHeader>
                  <CardTitle tag="h4">Subir Actividad</CardTitle>
                  </CardHeader>
                  <CardBody>
                  <Label md="3">Mensaje al Docente</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input placeholder="Comentario hacia el docente"
                          type="text"
                          value={this.state.mensaje}
                          onChange={(texto) =>
                              this.setState({ mensaje:texto.target.value })
                            }
                          />
                      </FormGroup>
                    </Col>
                    <Label md="3">Asignatura</Label>
                    <Col md="9">
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
                    <Label md="6">Tipo de Recurso</Label>
                    <Col md="9">
                      <Select
                        className="react-select primary"
                        classNamePrefix="react-select"
                        name="singleSelect"
                        value={this.state.tipodoc}
                        onChange={(value) =>
                          this.setState({ tipodoc: value.value,
                            acepta:value.acepta })
                        }
                        options={tiposRecursos}
                        placeholder="Selecciona el tipo de recurso"
                      />
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <div className="fileinput text-center">
                          <input type="file"
                            accept={this.state.acepta}
                            onChange={this.handleImageChange}
                            ref="fileInput"
                          />
                          {this.state.tipodoc=="i" ? (
                            <>
                              <div className={"thumbnail" + (this.props.avatar ? " img-circle" : "")}>
                              <img src={this.state.imagePreviewUrl} alt="..." />
                              </div>
                            </>
                          ) : (null)}
                          {this.state.tipodoc!=null ? (
                            <div>
                              { this.state.file === null ? (
                                <Button className="btn-round"
                                  onClick={() => this.handleClick()}>
                                {this.props.avatar ? "Add Photo" : "Selecciona el archivo"}
                                </Button>
                              ) : (
                                <span>
                                  <Button className="btn-round" onClick={() => this.handleClick()}>
                                    Modificar
                                  </Button>
                                  {this.props.avatar ? <br /> : null}
                                  <Button
                                    color="danger"
                                    className="btn-round"
                                    onClick={() => this.handleRemove()}
                                  >
                                    <i className="fa fa-times" />
                                    Quitar
                                  </Button>
                                </span>
                              )}
                            </div>
                          ) : (null)}
                            {this.state.subiendo}
                        </div>
                      </FormGroup>
                    </Col>
                  </CardBody>
                  <CardFooter>
                  {this.state.file ? (
                  <Row>
                    <Col md="3" />
                    <Col md="9">
                      <Button className="btn-round"
                      color="info" type="submit"
                      onClick={()=>this.uploadFile()}
                    >
                        Subir y registrar tarea
                      </Button>
                    </Col>
                  </Row>
                  ):(null)}
                </CardFooter>
                </Card>
              </Col>
            ) : (null)}
            <Col md="12">
              <Card className="card-tasks">
                <CardHeader>
                <CardTitle tag="h4">Recursos Educativos</CardTitle>
                  <h5 className="card-category">Resumen de Actividades</h5>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table responsive>
                    <thead>
                        <tr>
                          <th>Area</th>
                          <th>Titulo</th>
                          <th>Fecha</th>
                          <th>Descargar</th>
                          <th>Contestar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr></tr>
                        {this.props.tareas.map(tarea=>(
                          <tr>
                            <td className="text-left">
                              {tarea.materia}
                            </td>
                            <td className="text-left">
                              {tarea.titulo}
                            </td>
                            <td className="text-left">
                              {tarea.fecha}
                            </td>
                            <td className="td-actions">
                              {tarea.direccion ? (
                                <div className="timeline-footer">
                                <Button className="btn-round"
                                  color="primary"
                                  outline
                                  href={tarea.direccion}
                                      target="_blank"
                                >
                                  <i className="fa fa-download" />
                                </Button>
                                </div>
                              ) : (null)}
                            </td>
                            <td className="td-actions">
                              {tarea.direccion ? (
                                  <div className="timeline-footer">
                                  <Button className="btn-round"
                                    color="warning"
                                    onClick={()=>this.setState({subirRecurso:true,
                                      tarea:tarea, file:null, subiendo:null,
                                      file:null, imagePreviewUrl:defaultImage,
                                      tipodoc:null,
                                    })}
                                  >
                                    <i className="fa fa-upload" />
                                  </Button>
                                  </div>
                                ) : (null)}
                            </td>
                            <td className="td-actions"></td>
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
                  </div>
                </CardFooter>
              </Card>
            </Col>
            </Col>
            <Col md="6">
            <Col md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <CardTitle tag="h4">
                    <Button
                      onClick={this.handleRefresh}
                      className="btn-round btn-icon"
                      className="btn-link "
                      color="danger"
                    >
                      <i className="nc-icon nc-refresh-69" />
                    </Button>
                    Tareas Enviadas
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                    <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Titulo y Observación</th>
                          <th>Comentario del alumno</th>
                          <th>Descargar</th>
                          <th>Eliminar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr></tr>
                        {this.props.enviadas.map(tarea=>(
                          <tr>
                            <td>
                              {tarea.fecha}
                            </td>
                            <td>
                              {tarea.titulo}
                              {tarea.estatus=="2" ? (
                                <b>: {tarea.observacion}</b>
                              ):(null)}
                              {tarea.vista=="1" ? (
                                <i className="text-success fa fa-check" />
                              ):(
                                tarea.vista=="2" ? (
                                  <i className="text-info fa fa-plus" />
                                ) : (
                                  tarea.vista=="3" ? (
                                  <i className="text-danger fa fa-heart" />
                                ) : (null))
                              )}
                            </td>
                            <td>
                              <b class="text-danger">{tarea.mensaje}</b>
                            </td>
                            <td className="td-actions text-left">
                              {tarea.direccion ? (
                                <div className="timeline-footer">
                                  <Button className="btn-round"
                                    color="primary"
                                    outline
                                    href={tarea.direccion}
                                        target="_blank"
                                  >
                                    <i className="fa fa-download" />
                                  </Button>
                                </div>
                              ) : (null)}
                            </td>
                            <td className="td-actions text-left">
                              {tarea.estatus=="1" ? (
                                <div className="timeline-footer">
                                    <Button className="btn-round"
                                      color="danger"
                                      outline
                                      onClick={()=>this.quitar(tarea.id)}
                                      >
                                        <i className="fa fa-remove" />
                                    </Button>
                                  </div>
                              ) : (null)}
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
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardHeader>
                <CardTitle tag="h4">Ultimos 7 Dias</CardTitle>
                  <h5 className="card-category">Mi Actividad/Mi Salon</h5>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-info" />
                    {this.props.alumno.nombres} <i className="fa fa-circle text-danger" />
                    Mi salon
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-check" />
                    Información
                  </div>
                </CardFooter>
              </Card>
            </Col>
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

export default connect(mapStateToProps, mainActions )(Dashboard);
