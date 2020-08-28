import React, { } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { Button, Tooltip } from 'antd';
import { 
  SettingOutlined, 
  UploadOutlined, 
  HeatMapOutlined,
  PlusOutlined,
  MinusOutlined
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

  const setView = (e, val) => {
    dispatch({ type: 'SET_IMAGEVIEWSIZE', imageViewSize: val });
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

      <Tooltip placement="right" title="Large Images" classname="icon">
        <Button disabled={ imageViewSize === "small" ? false : true } shape="circle" icon={<PlusOutlined />} onClick={(e) => setView(e, "large") } />
      </Tooltip>

      <Tooltip placement="right" title="Small Images" classname="icon">
        <Button disabled={ imageViewSize === "small" ? true : false } shape="circle" icon={<MinusOutlined />} onClick={(e) => setView(e, "small") } />
      </Tooltip>

    </NavDiv>
  );
};

export default withRouter(Nav);