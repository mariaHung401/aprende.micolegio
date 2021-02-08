
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  Alert,
  FormText,
  Row,
  Col,
} from "reactstrap";
import defaultAvatar from "assets/img/placeholder.jpg";
import { uploadFile } from 'react-s3';
import Select from "react-select";
import * as mainActions from "../../actions/mainActions";
import { connect } from 'react-redux';
import Compress from "browser-image-compression";
const Materias= [
  { value: "1", label:"Castellano", key:"100000" },
  { value: "2", label:"Inglés y otras Lenguas", key:"0" },
  { value: "3", label:"Matemáticas", key:"200000"  },
  { value: "4", label:"Educación Física", key:"0"  },
  { value: "5", label:"Arte y Patrimonio", key:"300000"  },
  { value: "6", label:"Ciencias Naturales", key:"400000"  },
  { value: "7", label:"Geog-Hist y Ciudadanía", key:"500000"  },
  { value: "8", label:"Orientación y Convivencia", key:"0"  },
  { value: "9", label:"Participación en Grupos CRP", key:"0"  },
  { value: "10", label:"Física", key:"0"  },
  { value: "11", label:"Química", key:"0"  },
  { value: "12", label:"Biología", key:"0"  },
  { value: "13", label:"Form. Soberanía Nacional", key:"0"  },
  { value: "14", label:"Ciencias de la Tierra", key:"0"  },
];
class Datos extends React.Component {
  constructor() {
    super();
    this.state = {
      asignatura:"",
      file: null,
      imagePreviewUrl:  defaultAvatar,
      modal:null,
      subiendo: null,
      guardado: null,
      representante:null,
      correo:null,
      movil:null,
      suscribir:false,
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0]
    const options = {
      // As the key specify the maximum size
      // Leave blank for infinity
      maxSizeMB: 0.05,
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
      imagePreviewUrl: defaultAvatar,
    });
    this.refs.fileInput.value = null;
  }

  componentDidMount = async () => {
    await this.props.verCredenciales();
    this.setState({imagePreviewUrl:this.props.foto,
      representante:this.props.datos.representante,
      correo:this.props.datos.correo,
      movil:this.props.datos.movil,
    
    });
  }

  
  async uploadFile() {
    let file = this.state.file;
    if (file) {
      let subiendo = (
        <Alert color="info">
          <span>Subiendo Recurso</span>
        </Alert>
      )
        this.setState({subiendo:subiendo});
        await  uploadFile(file, {
            bucketName: 'pruebareact',
            dirName: 'fotos',
            region: 'us-east-1',
            accessKeyId: this.props.as3, 
            secretAccessKey: this.props.ss3, 
        })
        .then(data => {
            this.props.setFoto(data.location);
            const datadir = {
                direccion:data.location,
                codigoweb:this.props.alumno.codigoweb,
            };
            let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/subirFoto';
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
                asignatura:null, singleSelect:null,
                subirRecurso:false, mensaje:null});
            })
            .catch(error => {
                console.log(error);
            });
            
        })
        .catch(err => console.error(err));
    }
  }

  guardarDatos = async () => {
      const data = {
        representante:this.state.representante,
        correo:this.state.correo,
        movil:this.state.movil,
        suscribir:this.state.suscribir,
        codigoweb:this.props.alumno.codigoweb,
      };
      let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/guardarDatos';
      fetch(url, {
          method: 'POST', 
          body: JSON.stringify(data),
          headers:{
              'Content-Type': 'application/json'
          },
          Accept: 'application/json',
      })
      .then(async resp  => {
          let nube = (
            <Alert color="success">
              <span>Datos guardados</span>
            </Alert>
          )
          this.setState({guardado:nube, 
          asignatura:null, singleSelect:null,
          subirRecurso:false, mensaje:null});
          this.props.setDatos({representante:this.state.representante,
            correo:this.state.correo,
            movil:this.state.movil});
      })
      .catch(error => {
          console.log(error);
      });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            
            <Col md="3">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Foto del Alumno</CardTitle>
                </CardHeader>
                <CardBody>
                <div className="fileinput text-center">
                  <input type="file" onChange={this.handleImageChange} ref="fileInput" />
                  <div className={"thumbnail" + (this.props.avatar ? " img-circle" : "")}>
                    <img src={this.state.imagePreviewUrl} alt="..." />
                  </div>
                  <div>
                    {this.state.file === null ? (
                      <Button className="btn-round" onClick={() => this.handleClick()}>
                        {this.props.avatar ? "Buscar Foto" : "Seleccionar Imagen"}
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
                     {this.state.subiendo}
                   </div>
                </CardBody>
                <CardFooter>
                  <Button className="btn-round" 
                    color="info" 
                    type="submit"
                    onClick={()=>this.uploadFile()}
                  >
                    Guardar
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="5">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Contacto</CardTitle>
                </CardHeader>
                <CardBody>

                  <Form action="#" method="#">
                    <label>Nombre del Representante</label>
                    <FormGroup>
                      <Input 
                        placeholder="Nombre y Apellido" 
                        type="text" 
                        value={this.state.representante}
                        onChange={(texto) =>
                          this.setState({ representante:texto.target.value })
                        }
                      />
                    </FormGroup>
                    <label>Numero movil celular</label>
                    <FormGroup>
                      <Input 
                        placeholder="Numero" 
                        type="number" 
                        value={this.state.movil}
                        onChange={(texto) =>
                          this.setState({ movil:texto.target.value })
                        }
                      />
                    </FormGroup>
                    <label>Correo Electronico</label>
                    <FormGroup>
                      <Input 
                        placeholder="Correo Electronico" 
                        type="email" 
                        value={this.state.correo}
                        onChange={(texto) =>
                          this.setState({ correo:texto.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup check className="mt-3">
                      <FormGroup check>
                        <Label check>
                          <Input 
                            defaultValue="" 
                            type="checkbox" 
                            value={this.state.suscribir}
                          />
                          Suscripcion a newsletter{" "}
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </Form>
                  {this.state.guardado}
                </CardBody>
                <CardFooter>
                  <Button 
                    className="btn-round" 
                    color="info" 
                    type="submit"
                    onClick={()=>this.guardarDatos()}
                  >
                    Registrar
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Preferencias</CardTitle>
                </CardHeader>
                <CardBody>
                    <Label >Asignatura Preferida</Label>
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="singleSelect"
                      value={this.state.asignatura}
                      onChange={(value) =>
                        this.setState({ asignatura: value })
                      }
                      options={Materias}
                      placeholder="Selecciona el Area o Asignatura"
                    />
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col md="3" />
                    <Col md="9">
                      <Button className="btn-round" color="info" type="submit">
                        Registrar
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
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

export default connect(mapStateToProps, mainActions )(Datos);

