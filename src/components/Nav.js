import React, { useState } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { Button, Radio } from 'antd';
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

  .anticon-menu {
    display: ${({ open }) => open ? 'none' : 'block'};
  }

  & .nav {
    display: ${({ open }) => open ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width:150px;
    z-index:1000;
    background:#fff;
    padding:0.5em;
  }

  ul {
    padding:0;
    margin:0;
    padding-bottom:1em;


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
      margin:2em 0;
      display:block;
    }
    & a.active, a.active {
      border-bottom: 3px solid #000 !important;
    }
  }
`;





const radioStyle = {
  display: 'inline-block',
  height: '30px',
  width: '30px',
  padding: '2px',
  textAlign: 'center',
  fontWeight: 'bold'
};

const radioGroupStyle = {
  margin: '0 0 0 2em'
};


const Nav = (props) => {

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const imageViewSize = useSelector(state => state.reducers.imageViewSize);

  const onViewChange = e => {
    dispatch({ type: 'SET_IMAGEVIEWSIZE', imageViewSize: e.target.value });
  };

  const navClick = () => {
    setOpen(false);
  }

  return(
    <ResponsiveMenu open={open}>
      <MenuOutlined onClick={() => setOpen(!open)} />
      <div className="nav">
        <ul onClick={navClick}>
          <NavLink to={`/`} exact>S I F T</NavLink>
          <NavLink to={`/upload`} exact>upload</NavLink>
          <NavLink to={`/settings`} exact>settings</NavLink>
        </ul>
        <Radio.Group style={radioGroupStyle} defaultValue={imageViewSize} size="small" onChange={onViewChange}>
          <Radio.Button style={radioStyle} value="large">+</Radio.Button>
          <Radio.Button style={radioStyle} value="compact">-</Radio.Button>
        </Radio.Group>
        <Button onClick={navClick}>close</Button>
      </div>
    </ResponsiveMenu>
  );
};

export default withRouter(Nav);