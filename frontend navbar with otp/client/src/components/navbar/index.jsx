import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { Logo } from "../logo";
import { NavLinks } from "./navLinks";
import { size } from "../responsive";
import { device } from "../responsive";
import { MobileNavLinks } from "./mobileNavLinks";
import { Accessibility } from "./accessibility";
import { Ability } from "./ability";

const NavbarContainer = styled.div`
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(40, 15, 15, 0.13);
  display: flex;
  align-items: center;
  padding: 0 1.5em;
`;

const LeftSection = styled.div`
  display: flex;
  @media ${device.laptop} {
    margin-left: 15%;
  }
  margin-left: 0px;
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  @media ${device.laptop} {
    margin-right: 25%;
  }
  margin-right: 0px;
`;

export function Navbar(props) {
  const isMobile = useMediaQuery({ maxWidth: size.tablet });

  return (
    <NavbarContainer>
      <LeftSection>
        <Logo />
      </LeftSection>
      <MiddleSection>{!isMobile && <NavLinks />}</MiddleSection>
      <RightSection>
        {!isMobile && <Ability />}
        {isMobile && <MobileNavLinks />}
      </RightSection>
    </NavbarContainer>
  );
}
