import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import accessInfo from "../../../context/TokenContext";
import classnames from "classnames";

import AdCreative from "./AdCreative";
import AdSetForm from "./AdSetForm";
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
  CardTitle,
  CardText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import Axios from "axios";
class AdsHeader extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    newAdFormModal: false,
    campaigns: [],
    createNewCampaign: false,
    newCampaignForm: {
      name:'',
      objective:'',
      status:'',
      specialAdCategory:''
    },
    adsets: [],
    createNewAdSet: false,
    step: 2,
    selectedCampaign: null,
    selectedAdSet: null,
    selectedPost: null,
    adName: "",
    postId: "Select a Post",
    formHeader: "Select a campaign",
    posts: [],
    checked: false,
    publishing: false,
  };

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  componentDidMount() {
    // axios
    //   .get(
    //     `https://graph.facebook.com/v6.0/${accessInfo.sandboxAdId}/campaigns?fields=name,objective,status&access_token=${accessInfo.sandboxAdToken}`
    //   )
    //   .then((campaignResponse) => {
    //     this.setState({ campaigns: campaignResponse.data.data });
    //   });
    // axios
    //   .get(
    //     `https://graph.facebook.com/v6.0/100773638277656/posts?fields=attachments,created_time,admin_creator&access_token=${accessInfo.pageToken}`
    //   )
    //   .then((res) => {
    //     this.setState({ posts: res.data.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  changeCampaignHandler = (selectedCampaign) => {
    this.setState({ selectedCampaign }, () =>
      console.log(`Option selected:`, this.state.selectedCampaign)
    );
  };
  changeAdSetHandler = (selectedAdSet) => {
    this.setState({ selectedAdSet }, () =>
      console.log(`Option selected:`, this.state.selectedAdSet)
    );
  };
  nextStepHandler = () => {
    switch (this.state.step) {
      case 1:
        this.setState({ step: this.state.step + 1 });
        this.setState({ formHeader: "Select an adSet" });
        axios
          .get(
            `https://graph.facebook.com/v6.0/${this.state.selectedCampaign.value}/adsets?fields=name,optimization_goal,status&access_token=${accessInfo.sandboxAdToken}`
          )
          .then((adsetResponse) => {
            this.setState({ adsets: adsetResponse.data.data }, () =>
              console.log(this.state.adsets)
            );
          });
        break;
      case 2:
        this.setState({ step: this.state.step + 1 });
        this.setState({ formHeader: "Create An ad" });
    }
  };
  changeCheckboxHandler = (event) => {
    this.setState({ checked: !this.state.checked });
  };
  changeAdNameHandler = (event) => {
    this.setState({ adName: event.target.value });
  };
  selectHandler = (post) => {
    this.setState({ selectedPost: post });
    this.setState({ postId: post.id });
  };

  publishAdHander = () => {
    this.setState({ publishing: true });
    axios
      .post(
        `https://graph.facebook.com/v6.0/${accessInfo.sandboxAdId}/adcreatives?name=${this.state.adName} creative&object_story_id=${this.state.postId}&access_token=${accessInfo.sandboxAdToken}`
      )
      .then((createCreativeResponse) => {
        console.log(createCreativeResponse.data.id);
        axios
          .post(
            `https://graph.facebook.com/v6.0/${accessInfo.sandboxAdId}/ads?name=${this.state.adName}&adset_id=${this.state.selectedAdSet.value}&creative={"creative_id":${createCreativeResponse.data.id}}&status=ACTIVE&access_token=${accessInfo.sandboxAdToken}`
          )
          .then((adCreateResponse) => {
            this.props.adPublished();
            this.toggleModal("formModal");
            this.setState({ publishing: false });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  newCampaignNameHandler = (event) =>{
   const updatedCampaignForm = {
     ...this.state.newCampaignForm
   }

   updatedCampaignForm.name=event.target.value;
   this.setState({newCampaignForm: updatedCampaignForm});

  }

  newCampaignSelectHandler = (selectedObject,inputIdentifier) => {
    const updatedCampaignForm = {
      ...this.state.newCampaignForm
    }
 
    updatedCampaignForm[inputIdentifier]= selectedObject;
    this.setState({newCampaignForm: updatedCampaignForm},()=>console.log(this.state.newCampaignForm));
  }

  newCampaignSubmitHandler = () => {
    axios
      .post(`https://graph.facebook.com/v6.0/${accessInfo.sandboxAdId}/campaigns?name=${this.state.newCampaignForm.name}&objective=${this.state.newCampaignForm.objective.value}&status=${this.state.newCampaignForm.status.value}&special_ad_category=${this.state.newCampaignForm.specialAdCategory.value}&access_token=${accessInfo.sandboxAdToken}`)
      .then(newCampaignResponse => {
        this.setState({selectedCampaign: {
          label:'',
          value:newCampaignResponse.data.id
        }},()=>console.log(this.state.selectedCampaign));
        this.nextStepHandler();
        console.log('seperator');
        console.log(newCampaignResponse.data);
      })
      .catch(error=> {
        console.log(error);
      });
  }



  render() {
    const { selectedCampaign } = this.state;
    const { selectedAdSet } = this.state;
    const {newCampaignForm} = this.state;

    const step1 = (
      <>
        {this.state.createNewCampaign ? (
          <>
            <Form>
              <Row>
                <Col lg="6">
                  <FormGroup className="mb-3">
                    <label className="form-control-label">Campaign Name</label>
                    <InputGroup
                      className={classnames("input-group-merge")}
                    >
                      <Input
                        placeholder="Campaign Name"
                        type="text"
                         onChange={this.newCampaignNameHandler}
                        value={newCampaignForm.name}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="6">
                <label className="form-control-label">Objective</label>
                      <Select
                      placeholder="Objective"
                        value={newCampaignForm.objective}
                         onChange={(event)=>this.newCampaignSelectHandler(event,'objective')}
                        options={[
                          {
                            value:"LINK_CLICKS",
                            label:"Link Clicks"
                          },
                          {
                            value:"POST_ENGAGEMENT",
                            label:"Post Engagement"
                          },
                          {
                            value:"PAGE_LIKES",
                            label:"Page Likes"
                          },
                        ]}
                      />
                </Col>
              </Row>
              <Row>
              <Col lg="6">
                <label className="form-control-label">Status</label>
                      <Select
                      placeholder="Objective"
                        value={newCampaignForm.status}
                         onChange={(event)=>this.newCampaignSelectHandler(event,'status')}
                        options={[
                          {
                            value:"ACTIVE",
                            label:"Active"
                          },
                          {
                            value:"PAUSED",
                            label:"Paused"
                          }
                        ]}
                      />
                </Col>
                <Col lg="6">
                <label className="form-control-label">Special Ad Category</label>
                      <Select
                      placeholder="Objective"
                        value={newCampaignForm.specialAdCategory}
                         onChange={(event)=>this.newCampaignSelectHandler(event,'specialAdCategory')}
                        options={[
                          {
                            value:"NONE",
                            label:"None"
                          },
                          {
                            value:"HOUSING",
                            label:"Housing"
                          },
                          {
                            value:"CREDIT",
                            label:"Credit"
                          },
                          {
                            value:"EMPLOYMENT",
                            label:"Employment"
                          }
                          
                        ]}
                      />
                </Col>
              </Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Button
                  className="pull-right"
                  size="sm"
                  color="primary"
                  type="button"
                  onClick={this.newCampaignSubmitHandler}
                >
                  next
                </Button>
              </div>
            </Form>
          </>
        ) : (
          <>
            <Form>
              <Select
                value={selectedCampaign}
                onChange={this.changeCampaignHandler}
                options={this.state.campaigns.map((camp) => {
                  return {
                    value: camp.id,
                    label: `${camp.name} : obj: ${camp.objective} (status: ${camp.status})`,
                  };
                })}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Button
                  className="pull-right"
                  size="sm"
                  color="primary"
                  type="button"
                  onClick={this.nextStepHandler}
                >
                  next
                </Button>
              </div>
            </Form>
            <p className="text-primary">Or</p>
            <Button
              onClick={() => this.setState({ createNewCampaign: true })}
              size="sm"
              color="info"
              type="button"
            >
              Create New
            </Button>
          </>
        )}
      </>
    );
    const step2 = (
      
      <>
      {this.state.createNewAdSet ? <AdSetForm></AdSetForm> : (
        <>
        <Form>
          <Select
            value={selectedAdSet}
            onChange={this.changeAdSetHandler}
            options={this.state.adsets.map((adset) => {
              return {
                value: adset.id,
                label: `${adset.name} : goal: ${adset.optimization_goal} (status: ${adset.status})`,
              };
            })}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button
              className="pull-right"
              size="sm"
              color="primary"
              type="button"
              onClick={this.nextStepHandler}
            >
              next
            </Button>
          </div>
        </Form>
        <p className="text-primary">Or</p>{" "}
        <Button 
        onClick={() => this.setState({ createNewAdSet: true })}
        size="sm" color="info" type="button">
          Create New
        </Button>
        </>
        )}
      </>
      

    );
    const step3 = (
      <>
        <Form>
          {/* <Select
            value={selectedAdSet}
            onChange={this.changeCampaignHandler}
            options={this.state.adsets.map((adset) => {
              return {
                value: adset.id,
                label: `${adset.name} : goal: ${adset.optimization_goal} (status: ${adset.status})`,
              };
            })}
          /> */}

          <Row>
            <Col lg="12">
              <FormGroup className="mb-3">
                <label className="form-control-label">Ad Name</label>
                <InputGroup
                  className={classnames("input-group-merge", {
                    focused: this.state.adNameStyle,
                  })}
                >
                  <Input
                    placeholder="Ad Name"
                    type="text"
                    onFocus={(e) => this.setState({ adNameStyle: true })}
                    onBlur={(e) => this.setState({ adNameStyle: false })}
                    onChange={this.changeAdNameHandler}
                    value={this.state.adName}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <FormGroup className="mb-3">
                <label className="form-control-label">
                  Choose a post (toggle yes/no to show/hide)
                </label>

                <InputGroup
                  className={classnames("input-group-merge", {
                    focused: this.state.adPost,
                  })}
                >
                  <Input
                    disabled={true}
                    value={this.state.postId}
                    type="text"
                    onFocus={(e) => this.setState({ adPost: true })}
                    onBlur={(e) => this.setState({ adPost: false })}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <label className="custom-toggle mr-1">
                <input
                  onChange={this.changeCheckboxHandler}
                  value={this.state.checked}
                  type="checkbox"
                  ref="check_box"
                />
                <span
                  className="custom-toggle-slider rounded-circle"
                  data-label-off="No"
                  data-label-on="Yes"
                />
              </label>
            </Col>
          </Row>

          {this.state.checked ? (
            <div
              style={{
                maxHeight: "20rem",
                overflow: "scroll",
                overflowX: "hidden",
                width: "100%",
              }}
            >
              <Row>
                {this.state.posts.map((post, index) => {
                  return (
                    <AdCreative
                      select={this.selectHandler}
                      key={post.id}
                      post={post}
                    ></AdCreative>
                  );
                })}
              </Row>
            </div>
          ) : (
            <></>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            {this.state.publishing ? (
              <div className="loader"></div>
            ) : (
              <Button
                className="pull-right"
                size="sm"
                color="primary"
                type="button"
                onClick={this.publishAdHander}
              >
                Publish Ad
              </Button>
            )}
          </div>
        </Form>
      </>
    );
    let currentStep = null;
    switch (this.state.step) {
      case 1:
        currentStep = step1;
        break;
      case 2:
        currentStep = step2;
        break;
      case 3:
        currentStep = step3;
        break;
      default:
        currentStep = <h1>no steps to show</h1>;
    }
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
                    New Ad
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
          <Card>
            <CardHeader>
              <h3 className="mb-0">
                {this.state.formHeader} (step {this.state.step}/3)
              </h3>
            </CardHeader>
            <CardBody>{currentStep}</CardBody>
          </Card>
        </Modal>
      </>
    );
  }
}

export default AdsHeader;
