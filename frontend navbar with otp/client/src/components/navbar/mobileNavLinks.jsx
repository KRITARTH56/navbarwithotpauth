import React, { useState } from "react";
import styled from "styled-components";
import { Accessibility } from "./accessibility";
import { MenuToggle } from "./menuToggle";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
`;

const LinksWrapper = styled.ul`
  margin: 20px;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;

  margin-bottom: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

const Marginer = styled.div`
  height: 2em;
`;

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          <motion.li variants={variants} whileTap={{ scale: 1.1 }}>
            <LinkItem>
              <Link href="#">Home</Link>
            </LinkItem>
          </motion.li>
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
          <Marginer />
          <Accessibility />
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
