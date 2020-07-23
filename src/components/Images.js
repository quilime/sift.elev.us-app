import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";

import './Images.css' 

const Index = (props) => {

  const [images, setImages] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/images')
      .then(res => res.json())
      .then(images => {
        images = images.filter((image, key, array) => {
          image.src = `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`;
          array[key] = image;
          return true;
        });
        setImages(images)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  if (!images) return(null);
  return (
    <div className="Images">
    {images.map((image, key) => 
      <div className="Image" key={key}>
        <img alt={image.name} src={image.src} /> 
        <br/>
        uploader: {image.uploader}
      </div>
    )}
    </div>
  );
};

export default withRouter(Index);