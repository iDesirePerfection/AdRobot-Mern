import React, { Component } from 'react';
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
    Modal,
    CardImg,
    Label,
  } from "reactstrap";
class AdsHeader extends Component {
    render() {
        return (
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
                    New Ad
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        );
    }
}

export default AdsHeader;
