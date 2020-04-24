import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import axios from "axios";
import token from "../../context/TokenContext";
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
  Modal,
  CardImg,
  Label,
} from "reactstrap";

class PostsHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    post: {
      description: "",
      selectedFile: null,
      previewUrl: null,
    },
    fileName: "Select an image to upload",
    loading: false,
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  changeDescriptionHandler = (event) => {
    const updatedPost = {
      ...this.state.post,
    };

    updatedPost.description = event.target.value;
    this.setState({ post: updatedPost });
  };

  changeFileHandler = (event) => {
    const updatedPost = {
      ...this.state.post,
    };
    updatedPost.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.addEventListener("load", (res) => {
      updatedPost.previewUrl = res.currentTarget.result;
      this.setState({ post: updatedPost });
    });
    this.setState({ fileName: event.target.files[0].name });

    // this.setState({
    //   selectedFile: event.target.files[0],
    //   loaded: 0,
    // });
  };

  submitPostHandler = () => {
    const data = new FormData();
    const toPost = {
      ...this.state.post,
    };
    data.append("file", toPost.selectedFile);
    data.append("message", toPost.description);
    this.setState({loading:true})
    axios
      .post(
        `https://graph.facebook.com/v6.0/100773638277656/photos?access_token=${token}`,
        data,
        {}
      )
      .then((r) => {
        this.toggleModal('formModal');
        this.setState({loading:false});
        this.props.postPublished(r.data.post_id);
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading:false});
        this.toggleModal('formModal');
        // this.props.postPublished(null);
      });
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
                    New Post
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
              <CardBody className="px-lg-5 py-lg-5">
              <h3 className="text-center">Publish a new post to facebook</h3>
                <Form role="form">
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="exampleFormControlTextarea1"
                        >
                          Description
                        </label>
                        <Input
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="textarea"
                          onChange={this.changeDescriptionHandler}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <div className="custom-file">
                        <input
                          className="custom-file-input"
                          id="customFileLang"
                          lang="en"
                          type="file"
                          label="hey"
                          onChange={this.changeFileHandler}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileLang"
                        >
                          {this.state.fileName}
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12" className="d-flex justify-content-center">
                      {this.state.post.previewUrl === null ? (
                        <Label
                          style={{
                            width: "15rem",
                            height: "15rem",
                            marginTop: "1rem",
                            textAlign: "center",
                            border: "1px solid black",
                            borderRadius: "5%",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                            }}
                            className="d-flex flex-column justify-content-center"
                          >
                            Image Preview
                          </div>
                        </Label>
                      ) : (
                        <CardImg
                          alt="..."
                          src={this.state.post.previewUrl}
                          style={{ width: "15rem", marginTop: "1.5rem" }}
                        />
                      )}
                    </Col>
                  </Row>

                  {this.state.loading ? (
                    <div className="loader"></div>
                  ) : (
                    <div className="text-center">
                      <Button
                        onClick={this.submitPostHandler}
                        className="my-4"
                        color="primary"
                      >
                        Publish
                      </Button>
                    </div>
                  )}
                </Form>
              </CardBody>
            </Card>
          </div>
        </Modal>
      </>
    );
  }
}

PostsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default PostsHeader;
