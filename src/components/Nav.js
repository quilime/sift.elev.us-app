import React from 'react';
import { NavLink, withRouter } from "react-router-dom";


const Nav = (props) => {
  return(
    <div id="nav">
      <NavLink to={`/images`} exact>Images</NavLink>
      <NavLink to={`/upload`} exact>Upload</NavLink>
      <NavLink to={`/users`} exact>Users</NavLink>
      <NavLink to={`/settings`} exact>Settings</NavLink>
    </div>
  );
};

export default withRouter(Nav);