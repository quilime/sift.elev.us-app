import React from 'react'; // , { useEffect, useState }
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import "antd/dist/antd.css";

import Upload from "./components/Upload";
import Auth from "./components/Auth";

const Site = styled.div `
  padding-left:120px;
  height:100%;
`;


function App() {

  // const [loggedIn, setLoggedIn] = useState(false);

   // useEffect(() => {

   //    // axios.get('/checkAuthentication')
   //    //   .then(res => {
   //    //     setLoggedIn(res.data.authenticated);
   //    //   })
   //    //   .catch((error) => {
   //    //     setLoggedIn(false)
   //    // });
   //  }, []);  
 
  return (
    <Router>
      <div id="nav">
        <NavLink to={`/`} exact>Aggregate</NavLink>
        <NavLink to={`/upload`} exact>Upload</NavLink>
        <NavLink to={`/login`} exact>Login</NavLink>
      </div>
      <Site>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/upload" render={(props) => (
            <Upload />
          )}/>
          <Route exact path="/login" render={(props) => (
            <Auth />
          )} />
        </Switch>
      </Site>
    </Router>
  );
}

export default App;
