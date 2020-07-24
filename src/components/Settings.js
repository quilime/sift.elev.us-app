import React /*, { useState, useEffect }*/  from 'react';
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

import './Settings.css' 

const Settings = (props) => {

  const user = useSelector(state => state.reducers.user);
  const dispatch = useDispatch();  

  const logout = () => {
    fetch(process.env.REACT_APP_API + '/logout',{
      method: 'POST',
      credentials: 'include',
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
      <p>
      Logged in as<br />
      <strong>{user.email}</strong>
      </p>
      <p>
      User ID<br />
      <strong>{user.uuid}</strong>
      </p>      
      <br />
      <Button type="danger" onClick={logout}>
        Logout
      </Button>
    </div>
  );

};

export default withRouter(Settings);