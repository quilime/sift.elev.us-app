import React /*, { useState, useEffect }*/  from 'react';
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import './Index.css' 

const Index = (props) => {

  const user = useSelector(state => state.reducers.user);

  return (
    <div>
      <h1>Index</h1>
      <p>
        Logged in as {user.email}
      </p>
      <p>
        Logout in <a href="/settings">settings</a>
      </p>
    </div>
  );
};

export default withRouter(Index);