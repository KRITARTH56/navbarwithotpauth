import React, { useState } from "react";
import styled from "styled-components";
import { MenuToggle } from "./menuToggle";
import { motion } from "framer-motion";
import MobileInput from "../otp-auth/MobileInput";

const LinksWrapper = styled.div`
  margin-top: 0px;
  padding: 0;
  height: 100%;
  background-color: #fff;
  width: 100%;
  flex-direction: inline;
  float: left;
  position: fixed;
  top: 13px;
  left: relative;
  max-height: 0px;
  max-width: 200px;
  background: white;
  display: inline-block;
  vertical-align: top;
`;

export function Ability(props) {
  return (
    <LinksWrapper>
      <MobileInput />
    </LinksWrapper>
  );
}
