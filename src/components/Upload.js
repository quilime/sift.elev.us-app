import React, { Component } from "react";
import { Button } from "antd";
import { UploadOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styled from "styled-components";

import Dropzone from "./Dropzone";
import ProgressBar from "./ProgressBar";

const ProgressWrapper = styled.div `
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const UploadDiv = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  text-align: left;
  overflow: hidden;
  margin-right:1em;
`;

const Content = styled.div `
  display: flex;
  flex-direction: row;
  padding:2em;
  box-sizing: border-box;
  width: 100%;
`;

const Actions = styled.div `
  text-align:center;
  width: 100%;
  margin: 4em 0;
  & button {
    margin:0 1em;
  }
`; 

const Files = styled.div `
  margin-left: 32px;
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1;
  overflow-y: auto;
`;

const Row = styled.div `
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
`;

class Upload extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      showUploader: true
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.resetUploader = this.resetUploader.bind(this);
  }

  resetUploader() {
    this.setState({ 
      files: [], 
      successfullUploaded: false,
      showUploader: true 
    });
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files),
      showUploader : false
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      const server = process.env.NODE_ENV === 'development' ? 
        'http://localhost:8000/upload' : 'https://img.elev.us/upload';

      req.open("POST", server);
      req.send(formData);
    });
  }

  renderProgress(file) {

    const uploadProgress = this.state.uploadProgress[file.name];
    // if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <ProgressWrapper>
          <ProgressBar progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </ProgressWrapper>
      );
    // }
  }

  fileSize(b) {
      var u = 0, s=1024;
      while (b >= s || -b >= s) {
          b /= s;
          u++;
      }
      return (u ? b.toFixed(1) + ' ' : b) + ' KMGTPEZY'[u] + 'B';
  }   

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <Button 
          type="primary" 
          onClick={this.resetUploader}
        >
          Upload More Files
        </Button>
      );
    } else if (this.state.files.length > 0 && !this.state.uploading) {
      return (
        <Button
          className="UploadButton"
          type="primary"
          icon={<UploadOutlined />}
          onClick={this.uploadFiles}
        >
          Upload
        </Button>
      );
    }
  } 



  render() {

    var st = this.state.files.length > 0 && (!this.state.successfullUploaded || this.state.uploading);

    return (
      <UploadDiv>
        <Content>
          <Dropzone
            showUploader={this.state.showUploader}
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.uploading || this.state.successfullUploaded}
          />
          <Files>
            {this.state.files.map(file => {
              return (
                <Row key={file.name}>
                  {file.name}
                  <em>{this.fileSize(file.size)}</em>
                  {this.renderProgress(file)}
                </Row>
              );
            })}
          </Files>
        </Content>
        <Actions
          style={{ "display" :  this.state.successfullUploaded || this.state.files.length > 0 ? "" : "none"  }}
          >
          <Button 
            type="normal" 
            icon={st ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
            onClick={this.resetUploader}
          >
          { st ? "Cancel" : "OK" }
          </Button>
          <Button
            className="UploadButton"
            type="primary"
            disabled={this.state.successfullUploaded || this.state.uploading}
            icon={<UploadOutlined />}
            onClick={this.uploadFiles}
          >
          Upload
          </Button>
        </Actions>
      </UploadDiv>
    );
  }
}

export default Upload;
