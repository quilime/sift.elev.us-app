import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from 'antd';

// import { UploadOutlined } from '@ant-design/icons';

import './Settings.css'

const Settings = (props) => {

  const user = useSelector(state => state.reducers.user);
  const dispatch = useDispatch();

  const url = process.env.REACT_APP_API + '/settings';
  const [data, setData] = useState(null);
  const [responseText, setResponseText] = useState();

  const fetchData = async () => {
    let response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }
    });
    const json = await response.json();
    setData(json);
  }
  useEffect(() => {
    fetchData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const logout = async () => {
    let res = await fetch(process.env.REACT_APP_API + '/logout',{
      method: 'POST',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' }),
    });
    let data = await res.json();
    console.log(data);
    dispatch({ type: 'SET_USER', user: null });
    props.history.push("/");
  };


  const onSubmit = async (values) => {
    let res = await fetch(process.env.REACT_APP_API + '/settings',{
      method: 'POST',
      credentials: 'include',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(values)
    });
    let data = await res.json();
    dispatch({ type: 'SET_USER', user: typeof data.user === "undefined" ? null : data.user });
    setResponseText("Settings Saved!");
    setTimeout(() => {
      setResponseText('');
    }, 3000);
  }


  const onFinishFailed = async() => {
    console.log('onFinishFailed');
  }

  if (!data) return(<div>loading...</div>);

  return (
    <div style={{ maxWidth: "400px" }}>
      <p>
        Logged in as <strong>{user.email}</strong>
      </p>
      <p>
        User ID <a href={`/users/${user.uuid}`}>{user.uuid}</a>
      </p>

      <Form
        name="basic"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        initialValues={{ username : data.username }}
      >
        <Form.Item label="Display Name" name="username">
          <Input placeholder="Display Name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Settings
          </Button> {responseText}
        </Form.Item>
      </Form>

      <br />

      <Button type="danger" onClick={logout}>
        Logout
      </Button>
    </div>
  );

};

export default withRouter(Settings);