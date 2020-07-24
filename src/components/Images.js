import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";

import Image from "./Image";

import './Images.css' 

const Images = (props) => {

  const [images, setImages] = useState();

  useEffect(() => {
    console.log('use efect');
    fetch(process.env.REACT_APP_API + '/images' + (props.uploadedBy ? '/uploadedby/' + props.uploadedBy : ''),{
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.length) {
          const filteredImages = result.map((image, i) => {
            return {
              src: `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`,
              name: image.name,
              uuid: image.uuid,
              createdAt: image.createdAt,
              uploader: image.uploader
            };
          });
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
      <Image image={image} key={key} />
    )}
    </div>
  );
};

export default withRouter(Images);