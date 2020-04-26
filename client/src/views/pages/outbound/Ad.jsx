import React, { Component } from "react";
import axios from 'axios';
import accessInfo from "../../../context/TokenContext";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Col,
  Modal,
} from "reactstrap";
import Axios from "axios";

class Ad extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    adPreviewModal: false,
  };

  componentDidMount() {}

  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  formatDate(d) {
    let date = new Date(d);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  getAdPreviewHandler= () => {
    axios
        .get(`https://graph.facebook.com/v6.0/${this.props.oneAd.ad.id}/previews?ad_format=DESKTOP_FEED_STANDARD&access_token=${accessInfo.sandboxAdToken}`)
        .then(res => {
            this.setState({previewUrl:res.data.data[0].body});
            this.toggleModal("adPreviewModal");
        })
  }

  render() {
    return (
        
      <Col lg="4">
        <Card>
          <CardImg
            alt="..."
            src={this.props.oneAd.imageUrl}
            top
          />

          <CardBody>
            <CardTitle className="h2 mb-0">
              {this.props.oneAd.ad.name}
            </CardTitle>
            <small className="text-muted">
              from{" "}
              {this.formatDate(
                Date.parse(this.props.oneAd.adSetInfo.start_time)
              )}{" "}
              to{" "}
              {this.formatDate(Date.parse(this.props.oneAd.adSetInfo.end_time))}
            </small>
            <CardText className="mt-4">
              <small style={{display:"block"}} className="text-uppercase text-muted font-weight-bold">
                Lifetime Budget:{" "}
                <span className="text-primary">
                  {" "}
                  &#36;{this.props.oneAd.adSetInfo.lifetime_budget}
                </span>
              </small>
              <small style={{display:"block"}} className="text-uppercase text-muted font-weight-bold">
                Optimization Goal:{" "}
                <span className='text-info'>
                  {" "}
                  {this.props.oneAd.adSetInfo.optimization_goal}
                </span>
              </small>
              <small className="text-uppercase text-muted font-weight-bold">
                Status:{" "}
                <span className={this.props.oneAd.adSetInfo.status === 'ACTIVE' ? 'text-success': 'text-danger'}>
                  {" "}
                  {this.props.oneAd.adSetInfo.status}
                </span>
              </small>
            </CardText>
            <Button
              type="button"
              color="primary"
              onClick={this.getAdPreviewHandler}
            >
              See Preview
            </Button>
            <Button
              type="button"
              color="info"
              onClick={this.getAdPreviewHandler}
            >
              See Estimation
            </Button>
            

            <Modal
              //   className="modal-dialog-centered"

              isOpen={this.state.adPreviewModal}
              toggle={() => this.toggleModal("adPreviewModal")}
              style={{
                overflow: "hidden",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.previewUrl,
                }}
              />
            </Modal>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Ad;
