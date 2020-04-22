import React, { Component } from "react";
import Moment from "react-moment";
import { Button } from "reactstrap";
class Person extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <tr className="table-">
        <td className="table-user">
          <b>
            {this.props.person.firstName + " " + this.props.person.lastName}
          </b>
        </td>
        <td>
          <span className="text-muted">{this.props.person.email}</span>
        </td>
        <td>
          <a
            className="font-weight-bold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {this.props.person.address.city}
          </a>
        </td>
        <td>
          <span className="text-muted">
            <Moment format="YYYY/MM/DD">{this.props.person.dateOfBirth}</Moment>
          </span>
        </td>
        <td>
          <Button
            onClick={this.props.viewClicked}
            className="btn-round btn-icon"
            color="primary"
            size="sm"
          >
            <span className="btn-inner--icon">
              <i className="fas fa-eye" />
            </span>
          </Button>
          <Button
          onClick={this.props.deleteClicked}
            className="btn-round btn-icon"
            color="danger"
            size="sm"
          >
            <span className="btn-inner--icon">
              <i className="fas fa-trash" />
            </span>
          </Button>
        </td>
      </tr>
    );
  }
}

export default Person;
