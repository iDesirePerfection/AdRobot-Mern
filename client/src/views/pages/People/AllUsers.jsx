import React from "react";

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

class AllUsers extends React.Component {
  state = {
    people: [
      {
        firstName: "Fahd",
        lastName: "Chargui",
        email: "fahd.charugi@esprit.tn",
        address: "01 rue gabes ariana",
        dateOfBirth: moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"),
      },
      {
        firstName: "test",
        lastName: "Chargui",
        email: "fahd.charugi@esprit.tn",
        address: "01 rue gabes ariana",
        dateOfBirth: moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"),
      },
      {
        firstName: "Fahd",
        lastName: "Chargui",
        email: "fahd.charugi@esprit.tn",
        address: "01 rue gabes ariana",
        dateOfBirth: moment("2010-10-20 4:30", "YYYY-MM-DD HH:mm"),
      },
    ],
  };
  
  async addPersonHandler(person) {
    //console.log(person);
    console.log(this.state.people);
    // people.push(person);
    // this.setState({ people: people });
    // console.log(this.state.people);
  }
  render() {
    return (
      <>
        <AllPeopleHeader
          allPeople={this}
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
                    <tr className="table-">
                      <td className="table-user">
                        <b>{person.firstName + " " + person.lastName}</b>
                      </td>
                      <td>
                        <span className="text-muted">{person.email}</span>
                      </td>
                      <td>
                        <a
                          className="font-weight-bold"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {person.address}
                        </a>
                      </td>
                      <td>
                        <span className="text-muted">
                          {person.dateOfBirth.format("YYYY-MM-DD")}
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
                })}
              </tbody>
            </Table>
          </Card>
        </Container>
      </>
    );
  }
}

export default AllUsers;
