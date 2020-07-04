import React from "react"; // { useState, useEffect }
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "antd/dist/antd.css";

import DocumentTitle from "react-document-title";
import Upload from "./components/Upload";
import Banner from "./components/Banner";

function App() {
  return (
    <DocumentTitle title='Sift'>
      <Router>
        <Banner/>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/upload" render={(props) => (
            <Upload />
          )} />
        </Switch>
    </Router>
    </DocumentTitle>
  );
}

export default App;
