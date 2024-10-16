"use client";

import React from "react";
import Header from "./Header";
import { styled } from "styled-components";
import Footer from "./Footer";

const ServiceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <SC.Main>{children}</SC.Main>
      <Footer />
    </>
  );
};

const SC = {
  Main: styled.main`
    width: min(960px, 100%);
    min-height: 100vh;
    margin: 0 auto;
    padding: 36px;
  `,
};

export default ServiceLayout;
