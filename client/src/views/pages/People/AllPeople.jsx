import React from "react";
import axios from "axios";
import Person from "./Person";

import { Card, Table, Container,Spinner } from "reactstrap";
import AllPeopleHeader from "components/Headers/AllPeopleHeader.jsx";
import { Redirect } from "react-router";

class AllPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      viewCustomer: {
        redirect: false,
        id: null,
      },
    };
  }
  componentDidMount() {
    axios.get(`136.144.244.254:5000/api/customers`).then((res) => {
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
      dateOfBirth: person.dateOfBirth.format("MM/DD/YYYY"),
      city: person.address.city,
      fieldOfWork: person.fieldOfWork,
      gender: person.gender,
      religion: person.religion,
      hobbies: person.hobbies,
      phoneNumber: person.phoneNumber,
      maritalStatus: person.maritalStatus,
      childrenNumber: person.childrenNumber,
    };

    //config for axios post request

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // axios post request to add or update user to database
    axios
      .post("136.144.244.254:5000/api/customers", finalPerson, config)
      .then((res) => {
        // change person state immutably
        const people = [...this.state.people];
        people.push(res.data);
        this.setState({ people: people });
      })
      .catch((error) => {
        //handling post request errors
        console.log(error.response);
      });
  };

  viewCustomerHandler = (id) => {
    const updatedViewCustomer = {
      ...this.state.viewCustomer,
    };
    updatedViewCustomer.redirect = true;
    updatedViewCustomer.id = id;
    this.setState({ viewCustomer: updatedViewCustomer });
  };

  deleteCustomerHandler = (id) => {

    // change state immutably
    const updatedPeople = [
      ...this.state.people
  ]
    updatedPeople.forEach((p,index)=> {
      if(p._id === id) {
        updatedPeople.splice(index,1)
      return;
    }
  });
  this.setState({people:updatedPeople});

  // send delete request to server

  axios.delete(`136.144.244.254:5000/api/customers/${id}`)
  .then(res => {
    //handle resolve
    console.log(res.data);
  })
  .catch(err=>{
    // handle reject
    console.log(err);
  }) 

  
  };
  render() {
    if (this.state.viewCustomer.redirect === true) {
      console.log("rerendering");
      return (
        <Redirect
          to={{
            pathname: "/admin/customer",
            state: { id: this.state.viewCustomer.id },
          }}
        ></Redirect>
      );
    }
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
                      viewClicked={() => this.viewCustomerHandler(person._id)}
                      deleteClicked={() =>
                        this.deleteCustomerHandler(person._id)
                      }
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
export default AllPeople;
