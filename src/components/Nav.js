import React, { useState } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import styled from 'styled-components';

import { MenuOutlined } from '@ant-design/icons';


const ResponsiveMenu = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 20;



  & .anticon-menu {
      display:none;
  }

  @media (max-width: 600px) {
    .anticon-menu {
      display: ${({ open }) => open ? 'none' : 'block'};
    }
  }

  ul {
    position: fixed;
    top: 0;
    left: 0;
    width:150px;
    z-index:1000;
    padding:0.5em;
    padding-bottom:1em;
background:#fff;


    @media (max-width: 600px) {
      display: ${({ open }) => open ? 'block' : 'none'};
    }

    & a:first-child {
      margin-top:0.5em;
      letter-spacing: 0.5em;
    }
    & a, & a.strong {
      display: block;
      font-weight:bold;
      border-bottom: 2px solid #ddd;
    }
    & a {
      margin:2em 1em;
      display:block;
    }
    & a.active, a.active {
      border-bottom: 3px solid #000 !important;
    }
  }
`;



const Nav = (props) => {

  const [open, setOpen] = useState(false);

  const navClick = () => {
    setOpen(false);
  }

  return(
    <ResponsiveMenu open={open}>
      <MenuOutlined onClick={() => setOpen(!open)} />
      <ul onClick={navClick}>
        <NavLink to={`/`} exact>S I F T</NavLink>
        <NavLink to={`/upload`} exact>upload</NavLink>
        <NavLink to={`/settings`} exact>settings</NavLink>
      </ul>
    </ResponsiveMenu>
  );
};

export default withRouter(Nav);