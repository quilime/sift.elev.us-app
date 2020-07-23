import React  from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from 'antd';

import './Auth.css' 

const Register = (props) => {

  const onSubmit = values => {
    console.log('on submit');
    fetch(process.env.REACT_APP_API + '/register', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          console.log(data);
          console.log('Please proceed to /login');
          // props.history.push("/login");
        } else {
          throw new Error("Try Again");
        }
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
          Already got a password? <a href="/login">Log In</a>
        </p>
      </Form>
    </div>
  );
};

export default withRouter(Register);