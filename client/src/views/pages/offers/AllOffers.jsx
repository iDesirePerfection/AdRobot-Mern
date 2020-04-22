import React from "react";
import PropTypes from 'prop-types';
import { getCustomers } from '../../../actions/customer'
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';

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
import AllOffersHeader from "components/Headers/AllOffersHeader.jsx";
import moment from "moment";

class AllOffers extends React.Component {
  constructor(props) {
    super(props)
           this.state = {
            offers: []
          }
        };
    componentDidMount() {
      axios.get(`http://localhost:5000/api/offer`)
        .then(res => {
          const offers = res.data;
          this.setState({ offers });
        })
    } 

  async addPersonHandler(person) {
    console.log(this.state.people);
    
  }
  deleteOffer(offerId){
      console.log(offerId);
      axios.delete(`http://localhost:5000/api/offer/${offerId}`)
      .then(res =>{
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    return (
      <>
        <AllOffersHeader
          alloffers={this}
          name="All Offers"
          parentName="Offers"
        />

        <Container className="mt--6" fluid>
          <Card>
            <Table className="align-items-center table-flush" hover responsive>
              <thead className="thead-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Field</th>
                  <th>Available from</th>
                  <th>Expiry date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.offers.map((offer) => {
                  return (
                    <tr className="table-">
                      <td className="table-user">
                        <b>{offer.title}</b>
                      </td>
                      <td>
                        <span className="text-muted">{offer.description}</span>
                      </td>
                      <td>
                        <a
                          className="font-weight-bold"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {offer.field}
                        </a>
                      </td>
                      <td>
                        <span className="text-muted">
                        <Moment format="YYYY/MM/DD">{offer.from}</Moment>
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">
                        <Moment format="YYYY/MM/DD">{offer.to}</Moment>
                        </span>
                      </td>
                      <td>
                        <Button
                          className="btn-round btn-icon"
                          color="danger"
                          href="#pablo"
                          size="sm"
                          onClick={()=> this.deleteOffer(offer._id)}
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

// AllOffers.propTypes = {
//   getCustomers: PropTypes.func.isRequired,
//   customer: PropTypes.object.isRequired
// }
// const mapStateToProps = state => ({
//   customer: state.customer
// })
// export default connect(mapStateToProps, { getCustomers })(AllOffers);
export default AllOffers;
