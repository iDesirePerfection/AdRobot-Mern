/*!

=========================================================
* Argon Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDatetime from "react-datetime";
import TagsInput from "react-tagsinput";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  FormGroup,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Row,
  Col,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// core components
import CustomerHeader from "components/Headers/CustomerHeader.jsx";

class ViewPerson extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state.id);
    axios.get(`http://localhost:5000/api/customers/${this.props.location.state.id}`).then((res) => {
        const person = res.data;
      const finalPerson = {
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        dateOfBirth: person.dateOfBirth,
        city: person.address.city,
        fieldOfWork:person.fieldOfWork,
        gender:person.gender,
        religion:person.religion,
        hobbies:person.hobbies,
        phoneNumber:person.phoneNumber,
        maritalStatus:person.maritalStatus,
        childrenNumber:person.childrenNumber
      };
       this.setState({ person:finalPerson });
       console.log(this.state);
    
    });
  }
  state = {
    person: {
      firstName: "",
      lastName: "",
      email: "",
      address: {
        city: "",
      },
      dateOfBirth: "",

      fieldOfWork: "",
      gender: "",
      religion: "",
      hobbies: [],
      phoneNumber: "",
      maritalStatus: "",
      childrenNumber: 0,
    },
  };

  componentDidMount() {
    
  }

  changeAddressHandler = (event) => {
    const person = this.state.person;
    person.address.city = event.target.value;
    this.setState({
      person: person,
    });
  };
  changeDobHandler = (date) => {
    const person = this.state.person;
    person.dateOfBirth = date;
    this.setState({
      person: person,
    });
  };
  
  changeInputHandler = (event,inputIdentifier) => {
    const updatedPerson = {
      ...this.state.person
    }
    updatedPerson[inputIdentifier] = event.target.value;
    this.setState({person:updatedPerson});
  }

  changeHobbiesHandler = hobbies => {
    const updatedPerson = {
      ...this.state.person
    }
    updatedPerson.hobbies = hobbies;
     this.setState({person:updatedPerson});

  };

  submitFormHandler = (e) => {
      const person = this.state.person;
//Construct The person object
const finalPerson = {
    firstName: person.firstName,
    lastName: person.lastName,
    email: person.email,
    dateOfBirth: person.dateOfBirth,
    city: person.city,
    fieldOfWork:person.fieldOfWork,
    gender:person.gender,
    religion:person.religion,
    hobbies:person.hobbies,
    phoneNumber:person.phoneNumber,
    maritalStatus:person.maritalStatus,
    childrenNumber:person.childrenNumber
  };

  //config for axios post request

  const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }

  // axios post request to add or update user to database
  axios.post("http://localhost:5000/api/customers", finalPerson, config).then(res=> {
  // change person state immutably
   console.log(res);
  })
  .catch(error => {
    //handling post request errors
      console.log(error.response);
  });
  }
  render() {
    return (
      <>
        <CustomerHeader name={`${this.state.person.firstName} ${this.state.person.lastName}`} />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Edit profile</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Settings
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <h6 className="heading-small text-muted mb-4">
                User information
              </h6>
              <Form role="form">
                <Row>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">First Name</label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                        value={this.state.person.firstName || ''}
                          placeholder="First Name"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "firstName")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">Last Name</label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.lastName || ''}
                          placeholder="Last Name"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "lastName")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">Email</label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.email || ''}
                          placeholder="Email"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "email")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <label className="form-control-label">Address</label>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.city || ''}
                          placeholder="Address"
                          type="text"
                          onChange={this.changeAddressHandler}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <label className="form-control-label">Date Of Birth</label>
                  <ReactDatetime
                   value={this.state.person.dateOfBirth || ''}
                    inputProps={{
                      placeholder: "Date Of Birth",
                    }}
                    timeFormat={false}
                    onChange={this.changeDobHandler}
                  />
                </FormGroup>
                <Row>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">
                        Field Of Work
                      </label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.fieldOfWork || ''}
                          placeholder="Field Of Work"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "fieldOfWork")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">Gender</label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.gender || ''}
                          placeholder="Gender"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "gender")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">Phone Number</label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.phoneNumber || ''}
                          placeholder="Phone Number"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "phoneNumber")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">Religion</label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.religion || ''}
                          placeholder="Religion"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "religion")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">
                        Marital Status
                      </label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.maritalStatus || ''}
                          placeholder="Marital Status"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "maritalStatus")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <label className="form-control-label">
                        Number of children
                      </label>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText></InputGroupText>
                        </InputGroupAddon>
                        <Input
                         value={this.state.person.childrenNumber || ''}
                          placeholder="Children Number"
                          type="text"
                          onChange={(event) =>
                            this.changeInputHandler(event, "childrenNumber")
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <label className="form-control-label">Hobbies</label>
                  <InputGroup>
                    <TagsInput
                      onlyUnique
                      className="bootstrap-tagsinput"
                      onChange={this.changeHobbiesHandler}
                      value={this.state.person.hobbies || ''}
                      tagProps={{ className: "tag badge mr-1" }}
                      inputProps={{
                        className: "",
                        placeholder: "Hobbies",
                      }}
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button
                    onClick={(e) => this.submitFormHandler(e)}
                    className="my-4"
                    color="primary"
                    type="button"
                  >
                    Edit
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default ViewPerson;
