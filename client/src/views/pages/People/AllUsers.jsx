import React from "react";
import PropTypes from "prop-types";
import { getCustomers } from "../../../actions/customer";
import { connect } from "react-redux";
import axios from "axios";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import Person from "./Person";

import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import AllPeopleHeader from "components/Headers/AllPeopleHeader.jsx";
import moment from "moment";
import { Redirect } from "react-router";

class AllUsers extends React.Component {
  // state = {
  //   people: [
  //     {
  //       firstName: "Fahd",
  //       lastName: "Chargui",
  //       email: "fahd.charugi@esprit.tn",
  //       address: "01 rue gabes ariana",
  //       dateOfBirth: moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"),
  //     },
  //     {
  //       firstName: "test",
  //       lastName: "Chargui",
  //       email: "fahd.charugi@esprit.tn",
  //       address: "01 rue gabes ariana",
  //       dateOfBirth: moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"),
  //     },
  //     {
  //       firstName: "Fahd",
  //       lastName: "Chargui",
  //       email: "fahd.charugi@esprit.tn",
  //       address: "01 rue gabes ariana",
  //       dateOfBirth: moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"),
  //     },
  //   ],
  // };
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/customers`).then((res) => {
      const people = res.data;
      this.setState({ people });
    });
  }
  addPersonHandler = (person) => {

    //Construct The person object
    const finalPerson = {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      DateOfBirth: person.dateOfBirth.format("MM/DD/YYYY"),
      city: person.address.city,
      fieldOfWork:person.fieldOfWork,
      gender:person.gender,
      religion:person.religion,
      // hobbies:person.hobbies,
      phoneNumber:person.phoneNumber,
      maritalStatus:person.maritalStatus,
      ChildrenNumber:person.childrenNumber
    };

    //config for axios post request

    const config = {
          headers: {
            "Content-Type": "application/json",
          }
        }

    // axios post request to add or update user to database
    axios.post("http://localhost:5000/api/customers", finalPerson, config).then(res=> {
    // change person state immutably
      const people = [...this.state.people];
          people.push(res.data);
          this.setState({ people: people });
          console.log(this.state.people);
    })
    .catch(error => {
      //handling post request errors
        console.log(error.response);
    });
  };

  viewCustomerHandler() {
    // let path = `/profile`;
    // let history = useHistory();
    // history.push(path);
  }
  render() {
    return (
      <>
        <AllPeopleHeader
          addPerson={this.addPersonHandler}
          name="All Users"
          parentName="People"
        />

        <Container className="mt--6" fluid>
          <Card>
            <Table className="align-items-center table-flush" hover responsive>
              <thead className="thead-light">
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Date Of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.people.map((person) => {
                  return (
                    <Person
                      key={person._id}
                      person={person}
                      clicked={this.viewCustomerHandler}
                    ></Person>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Container>
      </>
    );
  }
}

// AllUsers.propTypes = {
//   getCustomers: PropTypes.func.isRequired,
//   customer: PropTypes.object.isRequired
// }
// const mapStateToProps = state => ({
//   customer: state.customer
// })
// export default connect(mapStateToProps, { getCustomers })(AllUsers);
export default AllUsers;
