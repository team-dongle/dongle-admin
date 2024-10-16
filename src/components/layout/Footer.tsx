"use client";

import React from "react";
import { styled } from "styled-components";
import ServiceLogo from "@/assets/images/service-logo.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <SC.Container>
      <Link href="/">
        <ServiceLogo />
      </Link>
      <SC.Paragraph>
        Copyright ⓒ by dongle. All Right Reserved.
        <br />
        <Link href="mailto:team.dongle.biz@gmail.com">
          Contact: team.dongle.biz@gmail.com
        </Link>
      </SC.Paragraph>
    </SC.Container>
  );
};

const SC = {
  Container: styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    height: 200px;
    padding: 0 240px;
    background-color: #f6f6f6;
  `,
  Paragraph: styled.span`
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 2rem;
    color: #919191;
    & > a {
      font-size: inherit;
      color: inherit;
    }
  `,
};

export default Footer;
