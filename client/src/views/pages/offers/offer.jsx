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
} from "reactstrap";
import Moment from "react-moment";

class Offer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className="table-">
        <td className="table-user">
          <b>{this.props.offer.airline}</b>
        </td>
        <td>
          <span className="text-muted">{this.props.offer.ticket_type}</span>
        </td>
        <td>
          <span className="text-muted">{this.props.offer.from.city}</span>
        </td>
        <td>
          <span className="text-muted">{this.props.offer.to.city}</span>
        </td>

        <td>
          <span className="text-muted">
            <Moment format="YYYY/MM/DD">
              {this.props.offer.departure_date}
            </Moment>
          </span>
        </td>
        <td>
          <span className="text-muted">
            <Moment format="YYYY/MM/DD">{this.props.offer.arrival_date}</Moment>
          </span>
        </td>
        <td>
          <span className="text-muted">{this.props.offer.price}</span>
        </td>
        <td>
          {this.props.offer.post_id === undefined ? (
            <Button
              onClick={() => this.props.publishToFacebook(this.props.offer)}
              color="primary"
            >
              Publish to Facebook
            </Button>
          ) : (
            <Button
              disabled
              onClick={() => this.props.publishToFacebook(this.props.offer)}
              color="primary"
            >
              Publish to Facebook
            </Button>
          )}
        </td>
      </tr>
    );
  }
}

export default Offer;
