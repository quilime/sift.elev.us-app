import React /*, { useState, useEffect }*/  from 'react';
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

import './Settings.css' 

const Settings = (props) => {

  const user = useSelector(state => state.reducers.user);
  const dispatch = useDispatch();  

  console.log(user);

  const logout = () => {
    fetch(process.env.REACT_APP_API + '/logout',{
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      })
      .then(res => res.json())
      .then(result => {
        dispatch({ type: 'SET_USER', user: null });
        props.history.push("/");
      })    
  };

  return (
    <div>
      <h1>Settings</h1>
      <ul>
      <li><strong>email</strong> {user.email}</li>
      </ul>
      <p>
        <Button type="danger" onClick={logout}>
          Logout
        </Button>
      </p>
    </div>
  );

};

export default withRouter(Settings);