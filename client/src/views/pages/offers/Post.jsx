import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col
} from "reactstrap";

class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      
        <Col lg="4">
          <Card>
            <CardBody>
              <small className="text-muted">
                Created by xx@ {this.props.post.created_time}
              </small>
              <CardText className="mt-4">
                {this.props.post.attachments.data[0].description}
              </CardText>
            </CardBody>
            <CardImg
              alt="..."
              src={this.props.post.attachments.data[0].media.image.src}
              top
            />
          </Card>
        </Col>
    );
  }
}

export default Post;
