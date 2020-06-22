import React, { Component } from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div `
  width: 100%;
  height: 8px;
  background-color: #ddd;
  border-radius: 5px;
`;
const Progress = styled.div `
  background-color: rgb(140, 140, 229);
  height: 100%;
  margin: 0;
  border-radius: 5px;
`;

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ProgressBarContainer>
        <Progress
          style={{ width: this.props.progress + "%" }}
        />
      </ProgressBarContainer>
    );
  }
}

export default ProgressBar;
