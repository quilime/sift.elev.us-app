import React, { useState, useEffect  }  from 'react';
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { Pagination } from 'antd';
// import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import { List } from 'antd';
//import styled from "styled-components";

import Loader from './Loader.js';
import Image from "./Image";
import './Images.css'


const mapData = data => {
  return data.map((image, i) => {
    return {
      src: `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`,
      name: image.name,
      uuid: image.uuid,
      description: image.description,
      createdAt: image.createdAt,
      username: image.username
    };
  });
}


const Images = (props) => {

  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  const imageViewSize = useSelector(state => state.reducers.imageViewSize);
  const pageSize = useSelector(state => state.reducers.pageSize);


  useEffect(() => {

    console.log('hit');

    const fetchData = async () => {
      let res = await fetch(props.url, {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0
        }
      });
      const json = await res.json();
      if (json.length) {
        let arr = mapData(json);
        setData(arr);
      }
    }
    fetchData();

  }, [props.url]);


  // const setUrl = (page) => {
  //   props.history.push("/page/" + page);
  // };


  if (!data) return(<Loader />);

  if (data.length === 0) return(<div>No Images Found</div>);

  return (
    <div className={`Images ${imageViewSize}`}>
    <List
    pagination={{
      total: data.length,
      showTotal: (total, range) => `${range[0]}—${range[1]} of ${total}`, //total => `${total} images`,
      onChange: (page, pageSize) => {
        window.scrollTo(0, 0);
        setPageNumber(page);
        // setPageSize(pageSize);
        // setUrl(page);
        dispatch({ type: 'SET_PAGESIZE', pageSize: pageSize });
      },
      showSizeChanger: true,
      showQuickJumper: false,
      showLessItems: false,
      pageSize: pageSize,
      size: "small",
      defaultCurrent: 1,
      current: pageNumber
    }}
    dataSource={data}
    footer={
      <div></div>
    }
    renderItem={image => (
      <Image
        image={image}
        key={image.uuid}
      />
    )}
  />
  </div>
  );
};

export default withRouter(Images);
