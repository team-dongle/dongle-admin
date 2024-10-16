"use client";

import React from "react";
import styled from "styled-components";
import ServiceLogo from "@/assets/images/service-logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authApi } from "@/apis/auth";
import { AxiosError, AxiosResponse } from "axios";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    await authApi
      .logout()
      .then((res: AxiosResponse<GeneralResponse>) => {
        if (res.data.code === 200) return router.push("/login");
      })
      .catch((e: AxiosError) => {
        if (e.status !== 200) alert("로그아웃 도중 오류가 발생했습니다.");
      });
  };

  return (
    <SC.Container>
      <Link href="/">
        <ServiceLogo />
      </Link>
      <SC.Navbar>
        {pathname !== "/login" && (
          <>
            <SC.NavItem href="/clubs/list">동아리 관리</SC.NavItem>
            <SC.NavItem href="/notices/list">공지사항 관리</SC.NavItem>
            <SC.Button onClick={logoutHandler}>로그아웃</SC.Button>
          </>
        )}
      </SC.Navbar>
    </SC.Container>
  );
};

const SC = {
  Container: styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #e9e9e9;
  `,
  Navbar: styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: auto;
    height: 100%;
  `,
  NavItem: styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 50px;
    border-radius: 8px;
    color: #8b8b8b;
    font-size: 1.5rem;
    transition: 0.2s all ease;
    cursor: pointer;
    &:hover {
      background-color: #f3f3f3;
      color: #4b4b4b;
    }
  `,
  Button: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 50px;
    border: none;
    border-radius: 8px;
    outline: none;
    color: #8b8b8b;
    font-size: 1.5rem;
    transition: 0.2s all ease;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      background-color: #f3f3f3;
      color: #4b4b4b;
    }
  `,
};

export default Header;
