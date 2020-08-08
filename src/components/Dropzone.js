import React, { Component } from "react";
import styled from "styled-components";
import { UploadOutlined } from '@ant-design/icons';

const Title = styled.div `
  display:block;
  margin-top:2em;
  text-align:center;
  font-weight:bold;
`;

const DropzoneElem = styled.div `
  position:absolute;
  top:0;
  left:0;
  align-items: center;
  justify-content: center;
  height:100%;
  width:100%;
`;

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
    if (this.props.disabled) return;
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
        <Title>
          Click or drop files here to<br/>
          <UploadOutlined /> upload jpg, png, or gifs
        </Title>
      </DropzoneElem>
    );
  }
}






export default Dropzone;
