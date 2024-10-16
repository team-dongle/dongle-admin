"use client";

import React from "react";
import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface Props {
  register: UseFormRegister<ClubFormType>;
}

const RecruitState = ({ register }: Props) => {
  return (
    <SC.Container>
      <SC.Label>
        <SC.Radio {...register("isRecruiting", {})} type="checkbox" />
        <SC.Text>모집중</SC.Text>
      </SC.Label>
    </SC.Container>
  );
};

const SC = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
    width: 100%;
    height: 48px;
  `,
  Label: styled.label`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
  `,
  Radio: styled.input`
    appearance: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border: 1px solid #bcbcbc;
    border-radius: 4px;
    &:checked {
      border: none;
      background-color: #31a6ec;
      &::before {
        content: "";
        display: block;
        width: 60%;
        height: 60%;
        background-color: white;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      }
    }
  `,
  Text: styled.p`
    display: block;
    width: auto;
    height: 100%;
    font-size: 1.5rem;
    font-weight: 500;
    color: #4e4e4e;
  `,
};

export default RecruitState;
