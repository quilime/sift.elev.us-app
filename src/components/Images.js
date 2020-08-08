import React, { useState, useEffect  }  from 'react';
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { Pagination } from 'antd';
// import { AppstoreOutlined, TableOutlined } from '@ant-design/icons';
import { List, Radio } from 'antd';
//import styled from "styled-components";

import Loader from './Loader.js';
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


const Images = (props) => {

  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(props.page);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();

  const imageViewSize = useSelector(state => state.reducers.imageViewSize);


  useEffect(() => {

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
      setData(filterData(json));
    }
    fetchData();

  }, [props.url]);


  const onViewChange = e => {
    dispatch({ type: 'SET_IMAGEVIEWSIZE', imageViewSize: e.target.value });
  };


  const setUrl = (page) => {
    props.history.push("/images/page/" + page);
  };


  if (!data || !data.length) return(<Loader />);

  return (
    <div className={`Images ${imageViewSize}`}>
    <div className="View">
      View&nbsp;
      <Radio.Group defaultValue={imageViewSize} size="small" onChange={onViewChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="compact">Compact</Radio.Button>
      </Radio.Group>
    </div>
    <List
    pagination={{
      total: data.length,
      showTotal: (total, range) => `${range[0]}—${range[1]} of ${total}`, //total => `${total} images`,
      onChange: (page, pageSize) => {
        window.scrollTo(0, 0);
        setPageNumber(page);
        setPageSize(pageSize);
        setUrl(page);
      },
      showSizeChanger: false,
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
