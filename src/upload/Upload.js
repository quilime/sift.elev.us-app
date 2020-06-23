import React, { Component } from "react";
import { Button } from "antd";
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import ProgressBar from "../components/ProgressBar";



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

      req.open("POST", "http://localhost:8000/upload");
      req.send(formData);
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    // if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
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
        </div>
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
          onClick={this.resetUploader}>
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
    return (
      <div className="Upload">
        <div className="Content">
          <Dropzone
            showUploader={this.state.showUploader}
            onFilesAdded={this.onFilesAdded}
            disabled={this.state.uploading || this.state.successfullUploaded}
          />
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  <span className="Filesize">{this.fileSize(file.size)}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">
          { this.state.files.length > 0 ? 
            <Button 
              type="normal" 
              icon={<CloseCircleOutlined />}
              onClick={this.resetUploader}
            >
            Cancel
            </Button> : null }
          { (this.state.files.length > 0) ? 
            <Button
              className="UploadButton"
              type="primary"
              disabled={this.state.successfullUploaded || this.state.uploading}
              icon={<UploadOutlined />}
              onClick={this.uploadFiles}
            >
            Upload
            </Button> : null }
        </div>
      </div>
    );
  }
}

export default Upload;
