"use client";

import { ILogin } from "@/@types/login";
import { authApi } from "@/apis/auth";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { styled } from "styled-components";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const loginHandler: SubmitHandler<ILogin> = async (data) => {
    await authApi
      .login(data)
      .then((res: AxiosResponse<GeneralResponse>) => {
        if (res.data.code === 200) return router.push("/clubs/list");
      })
      .catch((e) => {
        if (e.status === 400) alert("계정 정보가 존재하지 않습니다.");
      });
  };

  return (
    <SC.Container onSubmit={handleSubmit(loginHandler)}>
      <SC.InputContainer>
        <SC.InputLabel>아이디</SC.InputLabel>
        <SC.Input
          type="text"
          placeholder="아이디를 입력하세요."
          autoComplete="off"
          {...register("username", { required: "아이디를 입력해 주세요." })}
        />
        {errors.username && <SC.Error>{errors.username.message}</SC.Error>}
      </SC.InputContainer>
      <SC.InputContainer>
        <SC.InputLabel>비밀번호</SC.InputLabel>
        <SC.Input
          type="password"
          placeholder="비밀번호를 입력하세요."
          autoComplete="off"
          {...register("password", { required: "비밀번호를 입력해 주세요." })}
        />
        {errors.password && <SC.Error>{errors.password.message}</SC.Error>}
      </SC.InputContainer>
      <SC.Button>로그인</SC.Button>
    </SC.Container>
  );
};

const SC = {
  Container: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    width: 100%;
    height: auto;
    padding-top: 64px;
  `,
  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
  `,
  InputLabel: styled.label`
    font-size: 1.75rem;
    font-weight: 500;
  `,
  Input: styled.input`
    width: 500px;
    height: 48px;
    padding: 0 16px;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: #f6f6f6;
    font-size: 1.5rem;
  `,
  Error: styled.span`
    font-size: 1.5rem;
    color: red;
  `,
  Button: styled.button`
    width: 500px;
    height: 60px;
    margin-top: 64px;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: #189ded;
    font-size: 2rem;
    font-weight: 700;
    color: white;
  `,
};

export default LoginForm;
