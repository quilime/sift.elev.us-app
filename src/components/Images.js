import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";
import Image from "./Image";
import './Images.css'

const filterData = data => {
  return data.map((image, i) => {
    return {
      src: `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`,
      name: image.name,
      uuid: image.uuid,
      createdAt: image.createdAt,
      username: image.username
    };
  });
}

const useFetch = url => {

  const [data, setData] = useState(null);

  async function fetchData() {

    let response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }
    });

    const json = await response.json();

    const filteredData = filterData(json);

    setData(filteredData);
    console.log(json);
  }

  useEffect(() => {fetchData()},[url]);

  return data;
};


const Images = (props) => {

  const images = useFetch(process.env.REACT_APP_API + '/images' + (props.uploadedBy ? '/uploadedby/' + props.uploadedBy : ''));

  if (!images || !images.length) return(<div>loading...</div>);

  return (
    <div className="Images">
    {images.map((image, key) =>
      <Image image={image} key={key} />
    )}
    </div>
  );
};

export default withRouter(Images);

