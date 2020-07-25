import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'antd';
// import { useSelector } from "react-redux";

import './Images.css'

const Image = (props) => {

  const [image, setImage] = useState(props.image);

  useEffect(() => {
    if (props.uuid) {
      fetch(process.env.REACT_APP_API + '/images/' + props.uuid, {
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          }
        })
        .then(res => res.json())
        .then(image => {
          image.src = `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`
          setImage(image);
        });
    }
  }, []);

  const fileSize = (bytes) => {
    var exp = Math.log(bytes) / Math.log(1024) | 0;
    var result = (bytes / Math.pow(1024, exp)).toFixed(2);
    return result + ' ' + (exp == 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B');
  }

  const del = () => {
    console.log('delete image');
  }

  if (!image) return(null);

  console.log(image);

  return (
    <div className="Image">
      <a href={`/images/${image.uuid}`}>
        <img alt={image.name} src={image.src} />
      </a>
      <div>
        Added By: <a href={`/users/${image.username}`}>{image.username}</a><br/>
      </div>
      {props.edit && (
        <div className="edit">
          Added On: {image.createdAt}<br/>
          Size: {fileSize(image.size)}<br/>
          Dimensions: {image.width} x {image.height}<br/>


          {/*<Button type="danger" onClick={del}>
            Delete
          </Button>*/}
        </div>
      )}
    </div>
  );
};

export default withRouter(Image);