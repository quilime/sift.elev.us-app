import React, { useState, useEffect }  from 'react';
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

import './Auth.css' 

const API_HOST = 'http://localhost:8000';

const Auth = (props) => {

  const [view, setView] = useState(props.view);
  const [email, setEmail] = useState();  

  const loggedIn = useSelector(state => state.reducers.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(API_HOST + '/login/check')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        dispatch({ type: 'SET_LOGGED_IN', loggedIn: result.loggedIn })
      })
  });  

  const onEmailSubmit = values => {
    fetch(API_HOST + '/login/gen', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        setEmail(data.email);
        setView('password');
        console.log(data);
        console.log('done with email submit');
      //   if (json.isAdmin) {
        // dispatch({ type: "SET_ADMIN", isAdmin: true })
      //     if (props.history.location.search)
      //       props.history.push(`/${props.history.location.search.split("?")[1]}`)
      //     else
      //       props.history.push("/admin");
      //   } else if (json.error)
      //     setError(json.error.message)
      });    
  };

  const onPasswordSubmit = values => {
    var data = { ...values, email: email };
    fetch(API_HOST + '/login', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({ type: "SET_LOGGED_IN", loggedIn: data.loggedIn })
      });      
  }
  
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const Login = () => {
    return (
      <Form
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onEmailSubmit}
        onFinishFailed={onFinishFailed}
      >
        <p>
        Enter your email address for a one-time password. 
        </p>
        <Form.Item
          name="email"
          defaultValue="sdfsdf"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input 
            placeholder="email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send New Password
          </Button>
        </Form.Item>
      </Form>
    );
  }

  const Password = () => {
    return (
      <Form
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onPasswordSubmit}
        onFinishFailed={onFinishFailed}
      >
        <p>
        Enter the one-time password you received at <strong>{email}</strong>
        </p>    
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input the password you received in your email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }  

  return (
    <div className="formWrapper">
      <div>
        <Login />
      </div>
    {view === 'password' && (
      <Password />
    )}
    </div>
  );

  // const [password, setPassword] = useState("");
  // const [error, setError] = useState();

//   const dispatch = useDispatch();

//   const logUserIn = () => {
//     setError(null)
//     fetch('/api/login', {
//         method: 'POST',
//         headers: new Headers({ 'content-type': 'application/json' }),
//         credentials: 'same-origin',
//         body: JSON.stringify({ password })
//       })
//       .then(res => res.json())
//       .then(json => {
//         if (json.isAdmin) {
//           dispatch({ type: "SET_ADMIN", isAdmin: true })

//           if (props.history.location.search)
//             props.history.push(`/${props.history.location.search.split("?")[1]}`)
//           else
//             props.history.push("/admin");

//         } else if (json.error)
//           setError(json.error.message)
//       });
//   }


  // return (
  //   <div>
  //       <TextField
  //         label="Password"
  //         value={password}
  //         type="password"
  //         onChange={e => setPassword(e.target.value)}
  //       />
  //       <div style={{ margin: "20px 0" }}>
  //         <Button
  //           variant="contained" color="primary" 
  //           onClick={logUserIn}
  //         >
  //           Log In
  //         </Button>
  //       </div>
  //       <div>{error}</div>
  //   </div>
  // );
};

export default withRouter(Auth);