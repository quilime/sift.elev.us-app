import React, { useState, useEffect }  from 'react';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from "react-router-dom";
import { Switch, Button, Input, Form } from 'antd';
import { useSelector } from "react-redux";
import './Images.css'

const showdown  = require('showdown');

const converter = new showdown.Converter()

const Image = (props) => {

  const user = useSelector(state => state.reducers.user);

  const [image, setImage] = useState(props.image);
  const [editImage, setEditImage] = useState();
  const [showMeta, setShowMeta] = useState(false);
  const [responseText, setResponseText] = useState();

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
  }, [props.uuid]);

  const fileSize = (bytes) => {
    var exp = Math.log(bytes) / Math.log(1024) | 0;
    var result = (bytes / Math.pow(1024, exp)).toFixed(2);
    return result + ' ' + (exp === 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B');
  }

  // const del = () => {
  //   console.log('delete image');
  // }

  const onEditImage = () => {
    setEditImage(true);
  }

  const onSubmit = async (values) => {
    setResponseText("Saving... ");
    let res = await fetch(process.env.REACT_APP_API + '/images/' + props.uuid,{
      method: 'POST',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(values)
    });
    let image = await res.json();
    if (image) {
      image.src = `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`;
      setImage(image);
      setEditImage(false);
      setResponseText('');
    }
  }

  const onFinishFailed = async() => {
    console.log('onFinishFailed');
  }

  if (!image) return(<div>loading...</div>);

  // {/*{initialValues={{ username : data.username }}}*/}

  return (
    <div className="Image">
      <a href={`/image/${image.uuid}`}>
        <img alt={image.name} src={image.src} />
      </a>
      <p>
        via <a href={`/images/${image.username}`}>{image.username}</a><br/>
      </p>
      {props.edit && (
        <div className="edit">

          <p className="description">
          { ReactHtmlParser (image.description.replace(/(?:\r\n|\r|\n)/g, '<br />')) }
          </p>


          {image.uploader === user.uuid && !editImage && (
            <Button
              onClick={onEditImage}
            >
            Edit
            </Button>
          )}


          {image.uploader === user.uuid && editImage && (
          <Form
            name="basic"
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            initialValues={{ description : image.description }}
          >
            <Form.Item name="description">
              <Input.TextArea placeholder="Image Description" rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button> {responseText}
            </Form.Item>
          </Form>
        )}
          {/*<Button type="danger" onClick={del}>*/}
            {/*Delete*/}
          {/*</Button>*/}
          <div className="meta">
            meta <Switch
              size="small"
              onChange={(checked, event) => { setShowMeta(checked) }}
              />
            {showMeta && (
              <p>
              <br />
              Added: {image.createdAt}<br/>
              Updated: {image.updatedAt}<br/>
              Size: {fileSize(image.size)}<br/>
              Dims: {image.width} x {image.height}<br/>
              Type: {image.type}
              </p>
            )}
          </div>
        </div>
        )}
    </div>
  );
};

export default withRouter(Image);