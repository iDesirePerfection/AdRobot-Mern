import React from "react";
import PropTypes from 'prop-types';
import { getCustomers } from '../../../actions/customer'
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';
import Offer from './offer';
import accessInfo from "../../../context/TokenContext";

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
            offers: [],
            post: {
              description: "",
              previewUrl: null,
            },
          }
        };
    componentDidMount() {
      axios.get(`http://localhost:5000/api/flights`)
        .then(res => {
          const offers = res.data;
          this.setState({ offers });
        })
    } 

  async addPersonHandler(person) {
    
    
  }
  deleteOffer(offerId){
      // console.log(offerId);
      // axios.delete(`http://localhost:5000/api/offer/${offerId}`)
      // .then(res =>{
      //   console.log(res);
      //   console.log(res.data);
      // });
  }

  publishToFacebookHandler = (offer) => {
    const data = new FormData();
    const toPost = {
      ...this.state.post,
    };
    let d_date =new Date(offer.departure_date).getFullYear()+'-'+new Date(offer.departure_date).getDate()+'-'+new Date(offer.departure_date).getMonth();
    let a_date =new Date(offer.arrival_date).getFullYear()+'-'+new Date(offer.arrival_date).getDate()+'-'+new Date(offer.arrival_date).getMonth()

    let message =`Airline: ${offer.airline}\nFrom: ${offer.from.city}\nTo: ${offer.to.city}\nDeparture Date: ${d_date}\nArrival Date: ${a_date}\nPrice: ${offer.price}TND only`
    console.log(message);

    data.append("message", message);
    axios
      .post(
        `https://graph.facebook.com/v6.0/100773638277656/feed?access_token=${accessInfo.pageToken}`,
        data,
        {}
      )
      .then((r) => {
       axios.put(`http://localhost:5000/api/flights?flight_id=${offer._id}&post_id=${r.data.id}`) 
      })
      .catch((error) => {
        console.log(error);
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
                  <th>Airline</th>
                  <th>Ticket Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Departure Date</th>
                  <th>Arrival Date</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              

                {this.state.offers.map((offer, index) => {
                  return <Offer key={offer._id} offer={offer} publishToFacebook={this.publishToFacebookHandler}></Offer>;
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
