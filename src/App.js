import React, { Component } from "react";
import "./App.css";
import Upload from "./upload/Upload";

class App extends Component {

  state = {
     uploaderActive: false
  }

  render() {
    return (
      <div className="App">
         {this.state.uploaderActive ? (
          <div className="Card">
            <Upload />
            <button 
              className="closeUploader"
              onClick={() => this.setState({ uploaderActive : false }) }
            >
              CloseUploader
            </button>   
          </div>       
         ) : (
          <button onClick={() => this.setState({ uploaderActive : true }) }>
            Upload
          </button>
         )}        
      </div>
    );
  }
}

export default App;
