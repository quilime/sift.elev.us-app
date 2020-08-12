import React from 'react';
import { NavLink, withRouter } from "react-router-dom";


const Nav = (props) => {
  return(
    <div id="nav">
      <NavLink to={`/`} exact>S I F T</NavLink>
      <NavLink to={`/upload`} exact>upload</NavLink>
      <NavLink to={`/users`} exact>users</NavLink>
      <NavLink to={`/settings`} exact>settings</NavLink>
    </div>
  );
};

export default withRouter(Nav);