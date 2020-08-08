import React, { useState }  from 'react';
import { withRouter } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';

import './Dropzone.css';

const Dropzone2 = (props) => {

  const [dragOver, setDragOver] = useState(false);
  const [dropped, setDropped] = useState(false);

  const fileInputRef = React.createRef();

  const onDragOver = event => {
    event.preventDefault();
    setDropped(false);
    if (!dragOver) {
      setDragOver(true);
      // console.log('on drag over', event.target);
    }
  };

  const onDragLeave = event => {
    // console.log('drag leave', event);
    setDragOver(false);
  };

  const onDrop = event => {
    // console.log('drop', event.target);
    event.preventDefault();
    setDropped(true);
    setDragOver(false);
    const files = event.dataTransfer.files;
    props.onFilesAdded(files);
    props.history.push("/upload");
  }

  window.addEventListener("dragenter", onDragOver, true);

  return(
    <div
      className={"Dropzone " + (dragOver && "over")}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          className="FileInput"
          type="file"
          multiple
          style={{ display: "none" }}
        />
      <div className="Title">
        <div>{dropped ? "Dropped" : "Drop files here to"}</div>
        <UploadOutlined /> upload jpg, png, or gifs
      </div>
    </div>
  );

};

export default withRouter(Dropzone2);