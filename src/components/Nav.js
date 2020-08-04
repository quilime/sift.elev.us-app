import React, { useEffect } from 'react';
import { NavLink, useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";

const Nav = (props) => {

  // const location = useLocation();

  // const SortingDiv = styled.div `
  //   background:#00f;
  //   margin-left:2em;
  // `;

  // useEffect(() => {

  //   console.log('effect', props.history);

  // }, [props.history]);

  // console.log('hist', props.history.location.pathname);

  // console.log('loc', location);

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