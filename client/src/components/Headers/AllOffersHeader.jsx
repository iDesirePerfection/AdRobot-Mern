import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import ReactDatetime from "react-datetime";
import axios from 'axios';
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

class AllOffersHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    offer: {
      title: "",
      description: "",
      field: "",
      from: "",
      to: "",
      minimumPrice: '',
      discount: ''
    },
  };
  toggleModal = (state) => {
    console.log(this.state);
    this.setState({
      [state]: !this.state[state],
    });
  };

  changeTitleHandler = (event) => {
    const offer = this.state.offer;
    offer.title = event.target.value;
    this.setState({
      offer: offer,
    });
  };
  changeDescriptionHandler = (event) => {
    const offer = this.state.offer;
    offer.description = event.target.value;
    this.setState({
      offer: offer,
    });
  };
  changeFieldHandler = (event) => {
    const offer = this.state.offer;
    offer.field = event.target.value;
    this.setState({
      offer: offer,
    });
  };
  changeMinHandler = (event) => {
    const offer = this.state.offer;
    offer.minimumPrice = event.target.value;
    this.setState({
      offer: offer,
    });
  };
  changeDiscountHandler = (event) => {
    const offer = this.state.offer;
    offer.discount = event.target.value;
    this.setState({
      offer: offer,
    });
  };
  changeFromHandler = (event) => {
    const offer = this.state.offer;
    offer.from = event.target.value;
    this.setState({
      offer: offer,
    });

  };
  changeToHandler = (event) => {
    const offer = this.state.offer;
    offer.to = event.target.value;
    this.setState({
      offer: offer,
    });
  };

  submitFormHandler = (event) => {

    const offer = this.state.offer;
    console.log(offer);

    const offers = this.props.alloffers.state.offers;
    offers.push(offer);
    this.props.alloffers.setState({ offers: offers });
    this.toggleModal("formModal");

    const defaultOffer = {
      itle: "",
      description: "",
      field: "",
      from: "",
      to: "",
      minimumPrice: '',
      discount: ''
    };
    this.setState({ offer: defaultOffer });
    console.log(offer);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ offer });
    axios.post(`136.144.244.254:5000/api/offers`, body, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

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
                    New Offer
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
                  <small>Add a new Offer</small>
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
                            placeholder="Title"
                            type="text"
                            onChange={this.changeTitleHandler}
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
                            placeholder="Description"
                            type="text"
                            onChange={this.changeDescriptionHandler}
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
                            placeholder="Field"
                            type="text"
                            onChange={this.changeFieldHandler}
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
                            placeholder="From"
                            type="date"
                            onChange={this.changeFromHandler}
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
                            placeholder="Minimum Price "
                            type="text"
                            onChange={this.changeMinHandler}
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
                            placeholder="Discount"
                            type="text"
                            onChange={this.changeDiscountHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="to"
                        type="date"
                        onChange={this.changeToHandler}
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

AllOffersHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default AllOffersHeader;
