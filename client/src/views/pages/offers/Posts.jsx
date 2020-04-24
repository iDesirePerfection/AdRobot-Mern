import React from "react";
import axios from "axios";
import Post from "./Post";
import token from "../../../context/TokenContext";
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
import PostsHeader from "../../../components/Headers/PostsHeader";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://graph.facebook.com/v6.0/100773638277656/posts?fields=attachments,created_time,admin_creator&access_token=${token}`
      )
      .then((res) => {
        this.setState({ posts: res.data.data });
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  postPublishedHandler = (id) => {
    if (id !== null) {
      axios
        .get(
          `https://graph.facebook.com/v6.0/${id}?fields=attachments,created_time,admin_creator&access_token=${token}`
        )
        .then((r) => {
          const updatedPosts = [...this.state.posts];

          updatedPosts.unshift(r.data);
          this.setState({ posts: updatedPosts });
        });
    }
  };

  render() {
    return (
      <>
        <PostsHeader
          postPublished={this.postPublishedHandler}
          name="Posts"
          parentName="Posts"
        />

        <Container className="mt--6" fluid>
          <Row className="card-wrapper">
            {this.state.posts.map((post, index) => {
              return <Post key={post.id} post={post}></Post>;
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
