import React, { Component } from "react";
import "./App.css";

import { Button } from "antd";
import { CheckOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

import Upload from "./upload/Upload";

class App extends Component {

  state = {
     uploaderActive: false
  }

  render() {
    return (
      <div className="App">
         {this.state.uploaderActive ? (
          <div className="Uploader">
            <div className="Card">
              <Upload />
            </div>                 
            <Button
              type="primary" 
              icon={<CheckOutlined />}
              className="CloseUploader"
              onClick={() => this.setState({ uploaderActive : false }) }
            >
            Done
            </Button>
          </div>
         ) : (
          <Button 
            type="primary"
            onClick={() => this.setState({ uploaderActive : true }) }
          >
            Upload
          </Button>        
         )}        
      </div>
    );
  }
}

export default App;
