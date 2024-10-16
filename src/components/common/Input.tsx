/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import { styled } from "styled-components";

interface Props {
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  [key: string]: any;
}

const StyledInput = (
  { type, placeholder, defaultValue, onChange, value, ...rest }: Props,
  ref?: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <SC.Input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      ref={ref}
      value={value}
      autoComplete="off"
      {...rest}
    />
  );
};

const SC = {
  Input: styled.input`
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: #f6f6f6;
    color: #5c6368;
    font-size: 1.5rem;
    font-weight: 500;
    &::placeholder {
      color: #929a9f;
    }
  `,
};

export default forwardRef(StyledInput);
