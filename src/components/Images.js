import React, { useState, useEffect  }  from 'react';
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Pagination } from 'antd';
import { List } from 'antd';

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

  const url = props.url;
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(props.page);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(url, {
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
  }, [url]);


  const setUrl = (page) => {
    props.history.push("/images/page/" + page);
  }


  if (!data || !data.length) return(<div>loading...</div>);

  return (
    <div className="Images">
    <List
    itemLayout="vertical"
    pagination={{
      total: data.length,
      showTotal: (total, range) => `${range[0]}—${range[1]} of ${total}`, //total => `${total} images`,
      onChange: (page, pageSize) => {
        window.scrollTo(0, 0);
        setPageNumber(page);
        setPageSize(pageSize);
        setUrl(page);
      },
      showSizeChanger: true,
      showQuickJumper: true,
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
