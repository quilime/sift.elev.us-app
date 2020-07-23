import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import "antd/dist/antd.css";

import Register from "./components/Register";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Settings from "./components/Settings";
import Images from "./components/Images";
import Users from "./components/Users";

const App = (props) => { 

  const user = useSelector(state => state.reducers.user);
  const dispatch = useDispatch();  

  useEffect(() => {
    fetch(process.env.REACT_APP_API + '/login')
      .then(res => res.json())
      .then(result => {
        dispatch({ type: 'SET_USER', user: typeof result.user === "undefined" ? null : result.user });
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  if (typeof user === "undefined") {
    return(null);
  }

  if (!user) {
    return (
      <Router>
        <div className="siteWrapper">
          <Switch>
            <Route exact path="/" render={(props) => (
              <Register />
            )}/>
            <Route exact path="/login" render={(props) => (
              <Login />
            )} />
          </Switch>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div id="nav">
      <NavLink to={`/`} exact>Home</NavLink>
        <NavLink to={`/images`} exact>Images</NavLink>
        <NavLink to={`/upload`} exact>Upload</NavLink>
        <NavLink to={`/users`} exact>Users</NavLink>        
        <NavLink to={`/settings`} exact>Settings</NavLink>
      </div>
      <div className="siteWrapper">
        <Switch>
          <Route exact path="/images" render={(props) => (
            <Images />
          )}/>
          <Route exact path="/users" render={(props) => (
            <Users />
          )}/>          
          <Route exact path="/upload" render={(props) => (
            <Upload />
          )}/>
          <Route exact path="/settings" render={(props) => (
            <Settings />
          )} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
