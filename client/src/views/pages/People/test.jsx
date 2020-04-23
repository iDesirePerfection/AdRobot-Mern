import React, { Component } from "react";
import Dropzone from "dropzone";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput,
} from "reactstrap";
class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      token:
        "EAAlK1ycigTUBABUEt3AiuqYr4kyyUQf7ijcShgzdcjzi0qk9puhjnc4UmUs0VR4O98EtwsxoXFiKMyuvGXwhZCvyrn3ZBuKnnfdDaPUcInJv7khZCLIqKYxZAW7jC86VgU4BjP1dx4yo0hfKzU3MPfFNEXPzICRj4VqOzRzn5UoZAnZBKr635dDNVHebDaY1Rxeiql6vXd8MPhXZA4uYyGP",
    };
  }

  componentDidMount() {}
  changeFileHandler = (event) => {
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  submitPostHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("message", "hello world");
    axios
      .post(
        `https://graph.facebook.com/v6.0/100773638277656/photos?access_token=${this.state.token}`,
        data,
        {}
      )
      .then((r) => {
        console.log(r);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className="custom-file">
          <input
            className="custom-file-input"
            id="customFileLang"
            lang="en"
            type="file"
            label="hey"
            onChange={this.changeFileHandler}
          />
          <label className="custom-file-label" htmlFor="customFileLang">
            {this.state.selectedFile !== null ? this.state.selectedFile.name : 'Select a file' }
          </label>
        </div>
        <Button onClick={this.submitPostHandler}>Submit</Button>
      </>
    );
  }
}

export default test;
