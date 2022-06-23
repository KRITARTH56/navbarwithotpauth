import React from "react";
import styled from "styled-components";
import UniLawmkrLogo from "../../assets/images/logo1.svg";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  width: 29px;
  height: 29px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h2`
  font-size: 16px;
  margin: 0;
  margin-left: 4px;
  color: #000;
  font-weight: 500;
`;

export function Logo(props) {
  return (
    <LogoWrapper>
      <LogoImg>
        <img src={UniLawmkrLogo} alt="UniLawmkr logo" />
      </LogoImg>
      <LogoText>UniLawmkr</LogoText>
    </LogoWrapper>
  );
}
