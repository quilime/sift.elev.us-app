import React from "react"; // { useState, useEffect }
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from "styled-components";

import "antd/dist/antd.css";

import Upload from "./components/Upload";
import Nav from "./components/Nav";

const Site = styled.div `
  padding-left:120px;
  height:100%;
`;

function App() {
  return (
      <Router>
        <Nav/>
        <Site>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/upload" render={(props) => (
              <Upload />
            )} />
          </Switch>
        </Site>
    </Router>
  );
}

export default App;
