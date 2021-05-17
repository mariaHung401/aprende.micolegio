
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";
import * as mainActions from "../../actions/mainActions";
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      codigo:"",
      accesoNegado:false,
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange = event => {
      this.setState({ codigo:event})
  }

  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }
  ir = async ()=>{
    const data = {
      codigo:this.state.codigo,

    };
    let url='https://webhooks.mongodb-realm.com/api/client/v2.0/app/aprendemicolegio-kmnsj/service/micolegio/incoming_webhook/accesoAlumno';
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
    if(result[0].length>0){
      this.setState({accesoNegado:false});
      this.props.setAlumno(result)
      this.props.history.push("/admin/dashboard");
    }else{
      this.setState({accesoNegado:true});
    }
  }
  render() {
    let codigo = this.state.codigo;
    return (
      <div className="login-page">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form action="" className="form" method="">
                <Card className="card-login">
                  <CardHeader>
                    <CardHeader>
                      <h3 className="header text-center">Ingresa tu codigo web</h3>
                    </CardHeader>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Codigo Web"
                        type="text"
                        value={codigo}
                        onChange={(texto)=>this.handleChange(texto.target.value)}
                      />
                    </InputGroup>

                    <br />

                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="btn-round mb-3"
                      color="warning"
                      href="#pablo"
                      onClick={(e) => this.ir()}
                    >
                      Ingresar
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
          {this.state.accesoNegado ? (
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Alert color="danger">
                  <span>Acceso Negado</span>
                </Alert>
              </Col>
            </Row>
          ) : (null)}
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage:  `url(${require("assets/img/loginmicol.jpg")})`,
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
