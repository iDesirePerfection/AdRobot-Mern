import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import ReactDatetime from "react-datetime";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
} from "reactstrap";
import moment from "moment";

class AllPeopleHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    person: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      dateOfBirth: "",
    },
  };
  toggleModal = (state) => {
    console.log(this.state);
    this.setState({
      [state]: !this.state[state],
    });
  };

  changeFirstNameHandler = (event) => {
    const person = this.state.person;
    person.firstName = event.target.value;
    this.setState({
      person: person,
    });
  };
  changeLastNameHandler = (event) => {
    const person = this.state.person;
    person.lastName = event.target.value;
    this.setState({
      person: person,
    });
  };
  changeEmailHandler = (event) => {
    const person = this.state.person;
    person.email = event.target.value;
    this.setState({
      person: person,
    });
  };
  changeAddressHandler = (event) => {
    const person = this.state.person;
    person.address = event.target.value;
    this.setState({
      person: person,
    });
    console.log(this.state.person);
  };
  changeDobHandler = (date) => {
    const person = this.state.person;
    person.dateOfBirth = date;
    this.setState({
      person: person,
    });
  };

  submitFormHandler = (event) => {
    const person = this.state.person;
    const people = this.props.allPeople.state.people;
    people.push(person);
    this.props.allPeople.setState({ people: people });
    this.toggleModal("formModal");
    const defaultPerson = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      dateOfBirth: moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"),
    };
    this.setState({ person: defaultPerson });
  };
  render() {
    return (
      <>
        <div className="header header-dark bg-info pb-6 content__title content__title--calendar">
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6" xs="7">
                  <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                    {this.props.name}
                  </h6>
                  <Breadcrumb
                    className="d-none d-md-inline-block ml-lg-4"
                    listClassName="breadcrumb-links breadcrumb-dark"
                  >
                    <BreadcrumbItem>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <i className="fas fa-home" />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        {this.props.parentName}
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem aria-current="page" className="active">
                      {this.props.name}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
                <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                  <Button
                    onClick={() => this.toggleModal("formModal")}
                    className="btn-neutral"
                    color="default"
                    size="sm"
                  >
                    New User
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <Modal
          className="modal-dialog-centered"
          size="md"
          isOpen={this.state.formModal}
          toggle={() => this.toggleModal("formModal")}
        >
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Add a new user</small>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="First Name"
                            type="text"
                            onChange={this.changeFirstNameHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            onChange={this.changeLastNameHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onChange={this.changeEmailHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Address"
                            type="text"
                            onChange={this.changeAddressHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <ReactDatetime
                      inputProps={{
                        placeholder: "Date Of Birth",
                      }}
                      timeFormat={false}
                      onChange={this.changeDobHandler}
                    />
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      onClick={(e) => this.submitFormHandler(e)}
                      className="my-4"
                      color="primary"
                      type="button"
                    >
                      Add
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Modal>
      </>
    );
  }
}

AllPeopleHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default AllPeopleHeader;
