import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";

import './Images.css' 

const Index = (props) => {

  const [images, setImages] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/images',{
      credentials: 'include'
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.length) {
          let filteredImages = result.filter((image, key, array) => {
            image.src = `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`;
            array[key] = image;
            return true;
          });
          console.log(filteredImages);
          setImages(filteredImages);
        } else {
          setImages(null)
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  if (!images || !images.length) return(null);

  return (
    <div className="Images">    
    {images.map((image, key) => 
      <div className="Image" key={key}>
        <img alt={image.name} src={image.src} /> 
        <br/>
        <a href={image.src}>{image.src}</a>
        <br/>
        uploaded by {image.uploader}
        <br />
      </div>
    )}
    </div>
  );
};

export default withRouter(Index);