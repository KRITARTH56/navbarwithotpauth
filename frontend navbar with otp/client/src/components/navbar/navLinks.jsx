import React from "react";
import styled from "styled-components";
import MobileInput from "../otp-auth/MobileInput";
import { Accessibility } from "./accessibility";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  background-color:#d7ebf2;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
`;

const LinkItem = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #000;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;
  &:hover {
    border-bottom: 2px solid #d11919;
    border-top: 2px solid #d11919;
    color: #d11919;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

export function NavLinks(props) {
  return (
    <NavLinksContainer>
      <LinksWrapper>
        <LinkItem>
          <Link href="#">Home</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">Defence</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">Farming</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">Embedded</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">Scientific</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">VLSI</Link>
        </LinkItem>
        <LinkItem>
          <Link href="#">AI-ML</Link>
        </LinkItem>
      </LinksWrapper>
    </NavLinksContainer>
  );
}
