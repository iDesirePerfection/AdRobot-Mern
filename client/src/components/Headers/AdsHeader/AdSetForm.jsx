import React, { Component } from "react";
import Select from "react-select";
import classnames from "classnames";
import ReactDatetime from "react-datetime";
import axios from 'axios';
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  InputGroup,
  Input,
} from "reactstrap";
class AdSetForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: "",
    lifetimeBudget: "",
    startTime: "",
    endTime: "",
    bidAmount: "",
    billingEvent: "",
    optimizationGoal: "",
    // targeting: null,
    status: "",
    magique:false
  };

  componentDidMount() {
    axios.get('136.144.244.254:5000/api/search/target/5eba233599abdd16ac80f066')
    .then(
      r=> {

        this.setState({ targeting:r.data },()=>this.setState({magique:true}));
      }
    );
  }

  changeTextHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state,
    };

    updatedForm[inputIdentifier] = event.target.value;
    this.setState({ ...updatedForm });
  };

  changeDateHandler = (date, inputIdentifier) => {
    const updatedForm = {
      ...this.state,
    };
    updatedForm[inputIdentifier] = date;
    this.setState({ ...updatedForm });
  };
  changeSelectHandler = (event,inputIdentifier) => {
    
    let updatedForm = {
      ...this.state
    }

    updatedForm[inputIdentifier] = event;
    this.setState({...updatedForm});
  }
  newAdSetSubmitHandler = ()=> {
    
  }
  render() {
    return (
      <>
        <Form>
          <Row>
            <Col lg="6">
              <FormGroup className="mb-3">
                <label className="form-control-label">Adset Name</label>
                <InputGroup className={classnames("input-group-merge")}>
                  <Input
                    placeholder="Adset Name"
                    type="text"
                    onChange={(event) => this.changeTextHandler(event, "name")}
                    value={this.state.name}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup className="mb-3">
                <label className="form-control-label">Lifetime Budget</label>
                <InputGroup className={classnames("input-group-merge")}>
                  <Input
                    placeholder="Lifetime Budget"
                    type="text"
                    onChange={(event) =>
                      this.changeTextHandler(event, "lifetimeBudget")
                    }
                    value={this.state.lifetimeBudget}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label">Start Time</label>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Start Time",
                  }}
                  timeFormat={false}
                  onChange={(event) =>
                    this.changeDateHandler(event, "startTime")
                  }
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label">End Time</label>
                <ReactDatetime
                  inputProps={{
                    placeholder: "End Time",
                  }}
                  timeFormat={false}
                  onChange={(event) => this.changeDateHandler(event, "endTime")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup className="mb-3">
                <label className="form-control-label">Bid Amount</label>
                <InputGroup className={classnames("input-group-merge")}>
                  <Input
                    placeholder="Bid Amount"
                    type="text"
                    onChange={(event) =>
                      this.changeTextHandler(event, "bidAmount")
                    }
                    value={this.state.bidAmount}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col lg="6">
              <label className="form-control-label">Billing Event</label>
              <Select
                placeholder="Billing Event"
                value={this.state.billingEvent}
                onChange={(event) =>
                  this.changeSelectHandler(event, "billingEvent")
                }
                options={[
                  {
                    value: "LINK_CLICKS",
                    label: "Link Clicks",
                  },
                  {
                    value: "POST_ENGAGEMENT",
                    label: "Post Engagement",
                  },
                  {
                    value: "PAGE_LIKES",
                    label: "Page Likes",
                  },
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <label className="form-control-label">Optimization Goal</label>
              <Select
                placeholder="Optimization Goal"
                value={this.state.optimizationGoal}
                onChange={(event) =>
                  this.changeSelectHandler(event, "optimizationGoal")
                }
                options={[
                  {
                    value: "LINK_CLICKS",
                    label: "Link Clicks",
                  },
                  {
                    value: "REACH",
                    label: "Reach",
                  },
                  {
                    value: "PAGE_LIKES",
                    label: "Page Likes",
                  },
                ]}
              />
            </Col>
            <Col lg="6">
              <label className="form-control-label">Status</label>
              <Select
                placeholder="Status"
                value={this.state.status}
                onChange={(event) => this.changeSelectHandler(event, "status")}
                options={[
                  {
                    value: "ACTIVE",
                    label: "Active",
                  },
                  {
                    value: "PAUSED",
                    label: "Paused",
                  },
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              
            
            {this.state.magique === true ? ( <>
              <label className="form-control-label">Targeting:</label>
              <br></br>
              <small className="text-muted">Min Age: {this.state.targeting.age_min}</small>
              <br></br>
              <small className="text-muted">Max Age: {this.state.targeting.age_max}</small>
              <br></br>
              <small className="text-muted">Behavior: {this.state.targeting.behaviors[0].name}</small>
            </>) :'' }
            
                
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
                 onClick={()=>this.props.newAdSet(this.state)}
            >
              next
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

export default AdSetForm;
