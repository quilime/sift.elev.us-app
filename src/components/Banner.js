import React from 'react';
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";

const Wrapper = styled.div `
  display: flex;
  padding: 0 40px;
  margin-bottom: 40px;
  background: #333;
  height:3em;
`;
const Flex = styled.div `
  flex: 1;
  display: flex;
  a { 
    padding: 0.5em 2em;
    display: flex;
    height:3em;
    align-items: center;
    align-self: flex-end;
    font-weight:bold;
    &:hover {
      background: #aaa;
    }
    &.active {
      background: #fff;
    }
    &.upload {
      margin-left: auto;
    }    
  }
  .T {
    font-weight:bold;
  }
`;

const Banner = ({ setModalEvent }) => (
  <Wrapper>
    <Flex>
      <NavLink className="T" to={`/`} exact>Aggregate</NavLink>
      <NavLink to={`/sift`} exact>Sift</NavLink>
      <NavLink 
        className="upload"
        to={`/upload`}
      >
        Upload
      </NavLink>
    </Flex>
  </Wrapper>
);

export default withRouter(Banner);