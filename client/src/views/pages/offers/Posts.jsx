import React from "react";
import axios from "axios";
import Post from "./Post";

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

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      token:
        "EAAlK1ycigTUBABUEt3AiuqYr4kyyUQf7ijcShgzdcjzi0qk9puhjnc4UmUs0VR4O98EtwsxoXFiKMyuvGXwhZCvyrn3ZBuKnnfdDaPUcInJv7khZCLIqKYxZAW7jC86VgU4BjP1dx4yo0hfKzU3MPfFNEXPzICRj4VqOzRzn5UoZAnZBKr635dDNVHebDaY1Rxeiql6vXd8MPhXZA4uYyGP",
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://graph.facebook.com/v6.0/100773638277656/posts?fields=attachments,created_time,admin_creator&access_token=${this.state.token}`
      )
      .then((res) => {
          
        this.setState({posts: res.data.data});
        console.log(res.data.data);
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
          <Row className="card-wrapper">
            {this.state.posts.map((post,index) => {
              return <Post key={post.id}  post={post}></Post>;
            })}
          </Row>
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
export default Posts;
