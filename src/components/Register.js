import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from 'antd';

import './Register.css';;

const Register = (props) => {

  const [response, setResponse] = useState('Already received a password?');
  const [showLogIn, setShowLogin] = useState(true);

  const onSubmit = async (values) => {
    let res = await fetch(process.env.REACT_APP_API + '/register', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify(values)
      });
    let data = await res.json();
    console.log(data);
    if (!data.error) {
      setResponse(`${data.msg}.`);
      setShowLogin(true);
      // props.history.push("/login");
    } else {
      setShowLogin(false);
      setResponse(data.error);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="formWrapper">
      <Form
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}>
        <p>
        Enter your email address to get a password
        </p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email' }]}>
          <Input
            placeholder="email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Get Password
          </Button>
        </Form.Item>
        <p>
          {response}&nbsp;&nbsp;
          {showLogIn && (
            <a href="/login">Log In</a>
          )}
        </p>
      </Form>
    </div>
  );
};

export default withRouter(Register);