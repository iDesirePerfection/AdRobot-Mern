import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

class AdCreative extends Component {
  constructor(props) {
    super(props);
    console.log(props.post.attachments)
  }

  clickHandler = (post) => {
    this.props.select(post);
  };
  render() {

    return this.props.post.attachments ?  (
      
      <Card
        style={{
          width: "100%",
        }}
      >
        <CardBody>
          <ListGroup flush>
            <ListGroupItem
              onClick={() => this.clickHandler(this.props.post)}
              className="list-group-item-action flex-column align-items-start py-4 px-4"
            >
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <div className="d-flex w-100 align-items-center">
                    <img
                      alt="..."
                      className="avatar avatar-xs mr-2"
                      src={this.props.post.attachments.data[0].media.image.src}
                    />
                    <h5 className="mb-1">AdRobot</h5>
                  </div>
                </div>
                <small>@{this.props.post.created_time}</small>
              </div>
              <h4 className="mt-3 mb-1">
                <span className="text-info mr-1">●</span>
                posted by adrobot
              </h4>
              <p className="text-sm mb-0">
                {this.props.post.attachments.data[0].description}
              </p>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
        {/* <CardImg
            alt="..."
            src={this.props.post.attachments.data[0].media.image.src}
            top
          /> */}
      </Card>
    ) : ''
  }
}

export default AdCreative;
