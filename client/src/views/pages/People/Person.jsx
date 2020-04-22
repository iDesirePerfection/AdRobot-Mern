import React, { Component } from 'react';
import Moment from 'react-moment';
import {
  Button,
} from "reactstrap";
class Person extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    
    return (
      <tr onClick={this.props.clicked} className="table-">
        <td className="table-user">
          <b>{this.props.person.firstName + " " + this.props.person.lastName}</b>
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
            className="btn-round btn-icon"
            color="danger"
            href="#pablo"
            size="sm"
          >
            <span className="btn-inner--icon mr-1">
              <i className="fas fa-trash" />
            </span>
          </Button>
        </td>
      </tr>
    );
  }
}

export default Person;
