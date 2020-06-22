import React from 'react';
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";

const Wrapper = styled.div `
  display: flex;
  align-items: center;
  padding: 0 40px;
  margin-bottom: 40px;
  background: #ddd;
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
    font-weight:bold;
    &:hover {
      background: #eee;
    }
    &.active {
      background: #eee;
    }
  }
`;

const Banner = ({ setModalEvent }) => (
  <Wrapper>
    <Flex>
      <NavLink to={`/`} exact>Sift</NavLink>
      <NavLink to={`/upload`}>Upload</NavLink>
    </Flex>
  </Wrapper>
);

export default withRouter(Banner);