import React from "react"; // { useState, useEffect }
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";


import "antd/dist/antd.css";
import Upload from "./upload/Upload";
import Banner from "./components/Banner";

function App() {
  return (
    <Router>
      <Banner/>
      <Switch>
        <Route exact path="/"/>
        <Route exact path="/upload" render={(props) => (
          <Upload />
        )} />
      </Switch>
    </Router>
  );
}

export default App;
