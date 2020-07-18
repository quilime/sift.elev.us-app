import React from 'react';
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";

const Wrapper = styled.div `
  position: absolute;
  top: 0;
  left: 0;
  width:150px;
  z-index:1000;
  background:#fff;
  padding:0.5em;
  padding-bottom:1em;
  a { 
    color:#000;
    display: block;
    margin:1em;
    padding:0.25em;
    font-weight:bold;
    border-bottom: 3px solid #ddd;

    &:hover {
      border-bottom: 3px solid #aaa;
    }

    &.active {
      border-bottom: 3px solid #000;
    }
  }  
`;

const Nav = ({ setModalEvent }) => (
  <Wrapper>
    <NavLink to={`/`} exact>Aggregate</NavLink>
    <NavLink to={`/upload`} exact>Upload</NavLink>
    <NavLink to={`/login`} exact>Login</NavLink>
  </Wrapper>
);

export default withRouter(Nav);