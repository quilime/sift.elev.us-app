import React from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from 'antd';

import './Login.css' 

const Login = (props) => {

  const dispatch = useDispatch();

  const onSubmit = values => {
    console.log('on submit');
    fetch(process.env.REACT_APP_API + '/login', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(result => {
        if (result.error) throw result.error;
        console.log(result);
        dispatch({ type: 'SET_USER', user: typeof result.user === "undefined" ? null : result.user });
        props.history.push("/");
      })
      .catch(err => console.error(err));
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
        onFinishFailed={onFinishFailed}
      >
        <p>
          Enter your single-use password
        </p>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input the password you received in your email' }]}
        >
          <Input 
          placeholder="password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
        <p>
          Need a password? <a href="/">Get a new one</a>
        </p>        
      </Form>   
    </div>
  );
};

export default withRouter(Login);