import React, { useState, useEffect }  from 'react';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from "react-router-dom";
import { Switch, Button, Input, Form } from 'antd';
import { useSelector } from "react-redux";

import Loader from './Loader.js';

import './Images.css';


const md = require('markdown-it')({ html: true, linkify: true })
          .disable([ 'image' ])
          .use(require('markdown-it-hashtag'));

const Image = (props) => {

  const user = useSelector(state => state.reducers.user);

  const [image, setImage] = useState(props.image);
  const [editImage, setEditImage] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [responseText, setResponseText] = useState();
  const [descriptionHTML, setDescriptionHTML] = useState();

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
          console.log('image', image);
          image.src = `${process.env.REACT_APP_IMG_HOST}/${image.href}/${image.name}`
          setImage(image);
          if (image.description) {
            setDescriptionHTML(parseMarkdown(image.description));
          }
        });
    }
  }, [props.uuid]);

  const parseMarkdown = (text) => {
    if (!text) return '';
    return md.render( text, {
      html: false,
      xhtmlOut: true,
      breaks: true,
      linkify: true,
    });
  }

  const fileSize = (bytes) => {
    var exp = Math.log(bytes) / Math.log(1024) | 0;
    var result = (bytes / Math.pow(1024, exp)).toFixed(2);
    return result + ' ' + (exp === 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B');
  }

  const onDeleteImage = async () => {
    if (window.confirm("Delete delete? It'll be gone forever.")) {
      let res = await fetch(process.env.REACT_APP_API + '/images/' + props.uuid + "/delete",{
        method: 'POST',
        credentials: 'include',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ uuid: props.uuid })
      });
      let deleted = await res.json();
      console.log(deleted);
      props.history.push("/");
    }
  }

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
      setDescriptionHTML(parseMarkdown(image.description));
      setEditImage(false);
      setResponseText('');
    }
  }


  const onFinishFailed = async() => {
    console.log('onFinishFailed');
  }


  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const formattedDate =
      d.getFullYear() + "-" +
      (d.getMonth() + 1) + "-" +
      d.getDate() + " " +
      d.getHours() + ":" +
      d.getMinutes() + ":" +
      d.getSeconds();
    return formattedDate;
  }


  if (!image) return(<Loader />);

  return (
    <div className="Image">
      <div className={!user ? "nonLoggedInImage" : ""}>
      <a href={`/i/${image.uuid}`}>
        <img alt={image.name} src={image.src} />
      </a>
      </div>
      {user && (
      <p>
      via <a className="strong" href={`/u/${image.username}`}>{image.username}</a>
      </p>
      )}
      {props.edit && (
        <div className="edit">

          {!editImage && (
          <div className="description">
            { ReactHtmlParser (descriptionHTML) }
          </div>
          )}

          {image.uploader === user.uuid && !editImage && (
            <Button
              onClick={onEditImage}
            >
            Edit
            </Button>
          )}

          {image.uploader === user.uuid && !editImage && (
            <Button
              onClick={onDeleteImage}
              type="danger"
            >
            Delete
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
              <Input.TextArea placeholder="Image Description" rows={11} />
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
            meta&nbsp;&nbsp;
            <Switch size="small" onChange={(checked, event) => { setShowMeta(checked) }} />
            {showMeta && (
              <ul>
                <li>Uploaded By: <a className="strong" href={`/u/${image.username}`}>{image.username}</a></li>
                <li>Upload Date: {formatDate(image.createdAt)}</li>
                <li>Updated At: {formatDate(image.updatedAt)}</li>
                <li>Size: {fileSize(image.size)}</li>
                <li>Dims: {image.width} x {image.height}</li>
                <li>Type: {image.type}</li>
                <li>UUID: {image.uuid}</li>
                <li>Static: <a href={image.src}>{image.src}</a></li>
              </ul>
            )}
          </div>
        </div>
        )}

    </div>
  );
};

export default withRouter(Image);