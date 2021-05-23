import React, { } from 'react';
import { withRouter, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { Button, Tooltip } from 'antd';
import { 
  SettingOutlined, 
  UploadOutlined, 
  HeatMapOutlined,
  EyeOutlined,
  LoginOutlined
} from '@ant-design/icons';


const NavDiv = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 20;

  & .ant-btn {
    display: block;
    margin-bottom: 0.5em;
  }
`;


const Nav = (props) => {

  const dispatch = useDispatch();
  const imageViewSize = useSelector(state => state.reducers.imageViewSize);
  const user = useSelector(state => state.reducers.user);
  const location = useLocation();
  const loc = location.pathname.substr(0, 2);

  const setView = (val) => {
    dispatch({ type: 'SET_IMAGEVIEWSIZE', imageViewSize: val });
  }

  if (!user) {
    return(
    <NavDiv>

      <Tooltip placement="right" title="S I F T" className="icon">
        <Button shape="circle" icon={<HeatMapOutlined />} href="/" />
      </Tooltip>

      <Tooltip placement="right" title="Login" classname="icon">
        <Button shape="circle" icon={<LoginOutlined />} href="/login" />
      </Tooltip>

      <div style={{ visibility : loc === '/i' ? "hidden" : "visible" }}>

        <Tooltip placement="right" title="Large Images" classname="icon">
          <Button disabled={ imageViewSize === "small" ? false : true } shape="circle" onClick={() => setView("large") } >A</Button>
        </Tooltip>

        <Tooltip placement="right" title="Small Images" classname="icon">
          <Button disabled={ imageViewSize === "small" ? true : false } shape="circle" onClick={() => setView("small") } >a</Button>
        </Tooltip>

      </div>

    </NavDiv>      )
  }

  return(
    <NavDiv>

      <Tooltip placement="right" title="S I F T" className="icon">
        <Button shape="circle" icon={<HeatMapOutlined />} href="/" />
      </Tooltip>

      <Tooltip placement="right" title="Upload" className="icon">
        <Button shape="circle" icon={<UploadOutlined />} href="/upload" />
      </Tooltip>

      <Tooltip placement="right" title="Settings" classname="icon">
        <Button shape="circle" icon={<SettingOutlined />} href="/settings" />
      </Tooltip>

      <Tooltip placement="right" title="Seen" classname="icon">
        <Button shape="circle" icon={<EyeOutlined />} href={"/u/" + user.username } />
      </Tooltip>

      <div style={{ visibility : loc === '/i' ? "hidden" : "visible" }}>

        <Tooltip placement="right" title="Large Images" classname="icon">
          <Button disabled={ imageViewSize === "small" ? false : true } shape="circle" onClick={() => setView("large") } >A</Button>
        </Tooltip>

        <Tooltip placement="right" title="Small Images" classname="icon">
          <Button disabled={ imageViewSize === "small" ? true : false } shape="circle" onClick={() => setView("small") } >a</Button>
        </Tooltip>

      </div>

    </NavDiv>
  );
};

export default withRouter(Nav);