import React, { useState, useEffect }  from 'react';
import { UploadOutlined } from '@ant-design/icons';

import './Dropzone.css';

const Dropzone2 = (props) => {

  const [dragOver, setDragOver] = useState(false);
  const [dropped, setDropped] = useState(false);

  const onDragOver = event => {
    event.preventDefault();
    setDropped(false);
    if (!dragOver) {
      setDragOver(true);
      console.log('on drag over', event.target);
    }
  };

  const onDragLeave = event => {
    console.log('drag leave', event);
    setDragOver(false);
  };

  const onDrop = event => {
    console.log('drop', event.target);
    event.preventDefault();
    setDropped(true);
    const files = event.dataTransfer.files;
    props.onFilesAdded(files);
  }

  useEffect(() => {

    // console.log('attach events');

    // ${dragOver && ("over")}

    // window.removeEventListener("dragenter", handleDragEnter, true);
    window.addEventListener("dragenter", onDragOver, true);
    // window.removeEventListener("dragleave", handleDragLeave, true);
    // window.addEventListener("dragleave", onDragLeave, true);
    // window.removeEventListener("drop", handleDrop, true);
    // window.addEventListener("drop", onDrop, true);
  }, []);

  return(
    <div
      className={"Dropzone " + (dragOver && "over")}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      >
      <div className="Title">
        <div>{dropped ? "Dropped" : "Drop files here"}</div>
        <UploadOutlined /> Upload jpg, png, or gifs
      </div>
    </div>
  );

};

export default Dropzone2;