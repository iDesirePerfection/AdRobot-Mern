import React from "react";
import axios from "axios";
import accessInfo from "../../../context/TokenContext";
import Ad from "./Ad";
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
import AdsHeader from "../../../components/Headers/AdsHeader/AdsHeader";

class Ads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adInfo: [
        // {
        //   // ad:{},
        //   // previewUrl:null,
        //   // adSetInfo:{},
        // }
      ],

      loading: true,
    };
  }
  componentDidMount() {
    //get ads
    axios
      .get(
        `https://graph.facebook.com/v6.0/${accessInfo.sandboxAdId}/ads?fields=adset_id,creative,name&access_token=${accessInfo.sandboxAdToken}`
      )
      .then((res) => {
        res.data.data.forEach((ad) => {
          // get ad set info
          axios
            .get(
              `https://graph.facebook.com/v6.0/${ad.adset_id}?fields=name,lifetime_budget,start_time,end_time,bid_amount,billing_event,optimization_goal,targeting,status&access_token=${accessInfo.sandboxAdToken}`
            )
            .then((r) => {
              axios
                .get(
                  `https://graph.facebook.com/v6.0/${ad.creative.id}?fields=object_story_id&access_token=${accessInfo.sandboxAdToken}`
                )
                .then((creativeRes) => {
                  let postId = creativeRes.data.object_story_id.split("_");
                  console.log(creativeRes.data);
                  const updatedAdInfo = [...this.state.adInfo];
                  let oneAdInfo = {
                    ad: ad,
                    adSetInfo: r.data,
                    imageUrl: 'https://scontent.ftun4-1.fna.fbcdn.net/v/t1.0-9/95121103_118865726468447_5320380812250578944_n.jpg?_nc_cat=110&_nc_sid=8024bb&_nc_oc=AQk41uLynzLg8R7kwTOBsZrr2xHjGzm--uW6AUYewjoONlbgJGTkSkKM1k9dwlD3uss&_nc_ht=scontent.ftun4-1.fna&oh=56dc7ac95f6ffcc73343d2b385e91524&oe=5ED1145A'
                  };
                  updatedAdInfo.push(oneAdInfo);
                  this.setState({ adInfo: updatedAdInfo });
                  this.setState({ loading: false });
                  // axios
                  //   .get(
                  //     `https://graph.facebook.com/v6.0/${postId[1]}?fields=images&access_token=${accessInfo.sandboxAdToken}`
                  //   )
                  //   .then((postResponse) => {
                  //     // update state with ads info and its adset
                  //     const updatedAdInfo = [...this.state.adInfo];
                  //     let oneAdInfo = {
                  //       ad: ad,
                  //       adSetInfo: r.data,
                  //       imageUrl: postResponse.data.images[0].source,
                  //     };
                  //     updatedAdInfo.push(oneAdInfo);
                  //     this.setState({ adInfo: updatedAdInfo });
                  //     this.setState({ loading: false });
                  //   })
                  //   .catch((error) => {
                  //     console.log(error);
                  //   });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  adPublishedHandler = () => {
    this.setState({ loading: true });
    this.componentDidMount();
  };

  render() {
    return this.state.loading ? (
      <>
        <AdsHeader
          adPublished={this.adPublishedHandler}
          name="Ads"
          parentName="Outbound"
        />
        <div
          className="loader"
          style={{
            width: "6rem",
            height: "6rem",
          }}
        ></div>
      </>
    ) : (
      <>
        <AdsHeader
          adPublished={this.adPublishedHandler}
          name="Ads"
          parentName="Outbound"
        />

        <Container className="mt--6" fluid>
          {
            <Row className="card-wrapper">
              {this.state.adInfo.map((ad) => {
                return <Ad key={ad.ad.id} oneAd={ad}></Ad>;
              })}
            </Row>
          }
        </Container>
      </>
    );
  }
}

export default Ads;
