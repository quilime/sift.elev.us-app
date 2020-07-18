import React, { Component } from "react";
import { Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import styled from "styled-components";

import Dropzone from "./Dropzone";
import ProgressBar from "./ProgressBar";

import './Upload.css';

const ProgressWrapper = styled.div `
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;



class Upload extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      uploadComplete: false,
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
      uploadComplete: false,
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
    
    this.setState({ 
      uploadProgress: {}, 
      uploading: true 
    });

    const promises = [];

    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });

    try {
      let uploadedFiles;
      await Promise.all(promises)
        .then(function(_uploadedFiles) {
          console.log('uploadedFiles', _uploadedFiles);
          uploadedFiles = _uploadedFiles;
        });
      this.setState({ 
        uploadComplete: true, 
        uploading: false, 
        files: uploadedFiles
      });
    } catch (e) {

      // Not Production ready! Do some error handling here instead...
      this.setState({ 
        uploadComplete: true, 
        uploading: false 
      });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      xhr.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
      });

      xhr.onreadystatechange = function() {
        // complete
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      }      

      xhr.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(xhr.response);
      });

      xhr.upload.addEventListener("onload", event => {
        console.log("onload event");
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      const server = process.env.NODE_ENV === 'development' ? 
        'http://localhost:8000/upload' : 'https://img.elev.us/upload';

      xhr.open("POST", server);
      xhr.responseType = 'json';
      xhr.send(formData);

    });
  }

  renderProgress(file) {

    const uploadProgress = this.state.uploadProgress[file.name];
    // if (this.state.uploading || this.state.uploadComplete) {
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
    if (this.state.uploadComplete) {
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

    var st = this.state.files.length > 0 && (!this.state.uploadComplete || this.state.uploading);

    return (
      <div className="upload">
        <div className="content">
          <Dropzone
            showUploader={this.state.showUploader}
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.uploading || this.state.uploadComplete}
          />
          <div className="files">
            {this.state.files.map(file => {

              console.log(file);
      
              let href = ['http://localhost:3000/static', file.href, file.localName].join('/');

              return (
              <div className="row" key={file.name}>
                
                {!this.state.uploadComplete && (
                  <div>
                    {file.name}, <em>{this.fileSize(file.size)}</em>
                    <br />
                    {this.renderProgress(file)}
                  </div>
                )}
                
                {file && this.state.uploadComplete && (
                  <div className="uploadedImgDiv">
                      <img alt={file.localName} src={href} /><br />
                      <em>{file.type}, {file.dims.width}x{file.dims.height}, {this.fileSize(file.size)}</em>
                  </div>
                )}

              </div>
              );
            })}
          </div>
        </div>
        <div
          className="actions"
          style={{ "display" :  this.state.uploadComplete || this.state.files.length > 0 ? "" : "none"  }}
          >

          {!st && (
            <Button 
              type="normal" 
              icon={<UploadOutlined />}
              onClick={this.resetUploader}
            >
            Upload More Files
            </Button>
          )}

          {!this.state.uploadComplete && !this.state.uploading && ( 
            <Button
              className="UploadButton"
              type="primary"
              icon={<UploadOutlined />}
              onClick={this.uploadFiles}
            >
            Upload
            </Button>
          )}


        </div>
      </div>
    );
  }
}

export default Upload;
