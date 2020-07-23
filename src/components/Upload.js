//TODO: error check files that are wrong type and didn't uploaddf
import React, { useState } from "react";
import { /*useSelector, useDispatch*/ } from "react-redux";
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

const Upload = (props) => {

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showUploader, setShowUploader] = useState(true);

  // const loggedIn = useSelector(state => state.reducers.loggedIn);
  // const dispatch = useDispatch();  

  // useEffect(() => {
  //   fetch(process.env.REACT_APP_API + '/login/check')
  //     .then(res => res.json())
  //     .then(result => {
  //       dispatch({ type: 'SET_LOGGED_IN', loggedIn: result.loggedIn })
  //       console.log('upload logged in:', loggedIn);
  //     })
  // });

  // const usePrevious = (value) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // };

  // const prevFilesRef = usePrevious(files);

  const resetUploader = () => {
    setFiles([]);
    setUploadComplete(false);
    setShowUploader(true);
  }

  const onFilesAdded = (files) => {
    // const prevFilesRef = usePrevious(files);
    setFiles(files);
    setShowUploader(false);
  }

  const uploadFiles = async () => {
    
    setUploadProgress({});
    setUploading(true);

    const promises = [];

    files.forEach(file => {
      promises.push(sendRequest(file));
    });

    try {
      let uploadedFiles;
      await Promise.all(promises)
        .then(function(_uploadedFiles) {
          console.log('uploadedFiles', _uploadedFiles);
          uploadedFiles = _uploadedFiles;
        });
        console.log('Upload Complete');
        setFiles(uploadedFiles);
        setUploadComplete(true);
        setUploading(false);
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      setUploadComplete(true);
      setUploading(false);
    }
  }

  const sendRequest = (file) => {
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          setUploadProgress(copy);
        }
      });

      xhr.upload.addEventListener("load", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        setUploadProgress(copy);
      });

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      }      

      xhr.upload.addEventListener("error", event => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        setUploadProgress(copy);
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

  const renderProgress = (file) => {

    const fUploadProgress = uploadProgress[file.name];
      return (
        <ProgressWrapper>
          <ProgressBar progress={fUploadProgress ? fUploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                fUploadProgress && fUploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </ProgressWrapper>
      );
  }

  const fileSize = (b) => {
      var u = 0, s=1024;
      while (b >= s || -b >= s) {
          b /= s;
          u++;
      }
      return (u ? b.toFixed(1) + ' ' : b) + ' KMGTPEZY'[u] + 'B';
  }

  return (
    <div className="upload">
      <div className="content">
        <Dropzone
          showUploader={showUploader}
          onFilesAdded={onFilesAdded}
          disabled={uploading || uploadComplete}
        />
        <div className="files">
          {files.map(file => {

            let href = ['http://localhost:3000/static', file.href, file.localName].join('/');

            return (
            <div className="row" key={file.name}>
              
              {!uploadComplete && (
                <div>
                  {file.name}, <em>{fileSize(file.size)}</em>
                  <br />
                  {renderProgress(file)}
                </div>
              )}
              
              {file && uploadComplete && (
                <div className="uploadedImgDiv">
                    <img alt={file.localName} src={href} /><br />
                    <em>{file.type}, {file.dims.width}x{file.dims.height}, {fileSize(file.size)}</em>
                </div>
              )}

            </div>
            );
          })}
        </div>
      </div>
      <div
        className="actions"
        style={{ "display" :  uploadComplete || files.length > 0 ? "" : "none"  }}
        >

        {(!files.length > 0 || uploadComplete) && (
        <Button 
          type="normal" 
          icon={<UploadOutlined />}
          onClick={resetUploader}
        >
        Upload More Files
        </Button>          
        )}

        {!uploadComplete && !uploading && ( 
          <Button
            className="UploadButton"
            type="primary"
            icon={<UploadOutlined />}
            onClick={uploadFiles}
          >
          Upload
          </Button>
        )}
      </div>
    </div>
  );

}

export default Upload;
