import React, { Component } from "react";
import styled from "styled-components";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      hightlight: false, 
      visible: true 
    };

    this.fileInputRef = React.createRef();
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  onDragOver(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({ hightlight: true });
  }

  onDragLeave(event) {
    // this.setState({ hightlight: false });
  }

  onDrop(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }  

  render() {

    return (
      <DropzoneElem
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ 
          cursor : this.props.disabled ? "default" : "pointer", 
          display : this.props.showUploader ? "" : "none",
          backgroundColor : this.state.hightlight ? "rgb(180, 180, 180)" : ""
        }} 
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
          style={{ display: "none" }}
        />
        <img
          alt="upload"
          style={{
            opacity : "0.3",
            height : "64px",
            width : "64px",
            margin : "0 auto",
            display : "block",
            marginTop : "10%"
          }}
          src="baseline-cloud_upload-24px.svg"
        />
        <Title>
          Drop .jpg or .png Images Here
        </Title>
      </DropzoneElem>
    );
  }  
}


const Title = styled.div `
  display:block;
  text-align:center;
  font-weight:bold;
`;

const DropzoneElem = styled.div `
  position:absolute;
  top:3em;
  left:0;
  align-items: center;
  justify-content: center;
  width:100%;
  height: calc(100% - 3em);
  height: -moz-calc(100% - 3em);
  height: -webkit-calc(100% - 3em);
  height: -o-calc(100% - 3em);      
`;    



export default Dropzone;
