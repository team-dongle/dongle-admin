/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ChevronUp from "@/assets/images/chevron-up.svg";
import ChevronDown from "@/assets/images/chevron-down.svg";

interface Props {
  placeholder?: string;
  options?: { _id: number; slug: string; name: string }[];
  selectHandler(categoryId: number): void;
}

const Categories = ({ placeholder, options, selectHandler }: Props) => {
  const [selected, setSelected] = useState<{
    _id: number;
    slug: string;
    name: string;
  } | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const buttonClickHandler = () => setExpanded((prev) => !prev);

  useEffect(() => {
    setExpanded(false);
  }, [selected]);

  return (
    <SC.Container>
      <SC.OptionButton type="button" onClick={buttonClickHandler}>
        {!selected ? placeholder : selected.name}
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </SC.OptionButton>
      {expanded && (
        <SC.OptionList.Container>
          {options?.map((option) => (
            <SC.OptionList.Item key={option._id}>
              <SC.OptionList.Button
                type="button"
                onClick={() => {
                  setSelected(option);
                  selectHandler(option._id);
                }}
              >
                {option.name}
              </SC.OptionList.Button>
            </SC.OptionList.Item>
          ))}
        </SC.OptionList.Container>
      )}
    </SC.Container>
  );
};

const SC = {
  Container: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
    height: 48px;
  `,
  OptionButton: styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: min(300px, 100%);
    height: 48px;
    padding: 10px 16px;
    border: 1px solid #dfdfdf;
    border-radius: 8px;
    background-color: white;
    font-size: 1.5rem;
    font-weight: 500;
    color: #5c6368;
  `,
  HiddenInput: styled.input`
    display: none;
    width: 0;
    height: 0;
  `,
  OptionList: {
    Container: styled.ul`
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      gap: 0;
      width: 300px;
      min-height: 48px;
      max-height: 240px;
      border-radius: 8px;
      overflow-y: auto;
      background-color: white;
      box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.1);
      z-index: 999;
    `,
    Item: styled.li`
      width: 100%;
      height: 48px;
    `,
    Button: styled.button`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 48px;
      padding: 4px 12px;
      font-size: 1.5rem;
      border: none;
      outline: none;
      background-color: transparent;
    `,
  },
};

export default Categories;
