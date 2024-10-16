"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { styled } from "styled-components";
import ChevronLeft from "@/assets/images/chevron-left.svg";
import ChevronRight from "@/assets/images/chevron-right.svg";

interface Props {
  limit: number;
  maxPage: number;
  pageHandler?(page: number): void;
  pageState: {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
  };
}

const Pagination = ({ limit, maxPage, pageHandler, pageState }: Props) => {
  const { currentPage, setCurrentPage } = pageState;
  const [pageRange, setPageRange] = useState<number[]>(
    Array.from({ length: maxPage < limit ? maxPage : limit }, (_, i) => i + 1),
  );

  const pageRefresher = (currentPage: number) => {
    setPageRange(
      Array.from(
        {
          length:
            maxPage - currentPage < limit ? maxPage - currentPage + 1 : limit,
        },
        (_, i) => currentPage + i,
      ),
    );
  };

  const prevPage = () => {
    if (currentPage - 1 <= 0) return;
    if ((currentPage - 1) % limit === 0) pageRefresher(currentPage - limit);
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    if (currentPage + 1 > maxPage) return;
    if (currentPage % limit === 0) pageRefresher(currentPage + 1);
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (pageHandler) pageHandler(currentPage);
  }, [currentPage]);

  if (maxPage <= 1) return <></>;
  return (
    <SC.Container>
      <SC.Button.Chevron onClick={prevPage}>
        <ChevronLeft />
      </SC.Button.Chevron>
      {pageRange.map((page) =>
        currentPage === page ? (
          <SC.Button.Item key={page} selected>
            {page}
          </SC.Button.Item>
        ) : (
          <SC.Button.Item key={page} onClick={() => setCurrentPage(page)}>
            {page}
          </SC.Button.Item>
        ),
      )}
      <SC.Button.Chevron onClick={nextPage}>
        <ChevronRight />
      </SC.Button.Chevron>
    </SC.Container>
  );
};

const SC = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: auto;
    height: 32px;
  `,
  Button: {
    Chevron: styled.button`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 10px;
      outline: none;
      background-color: transparent;
    `,
    Item: styled.button<{ selected?: boolean }>`
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 10px;
      outline: none;
      background-color: transparent;
      color: #9c9c9c;
      font-size: 1.5rem;
      font-weight: 600;
      transition: 0.2s all ease;
      ${({ selected }) =>
        selected
          ? `
        background-color: #619ABC;
        color: white;
      `
          : `&:hover {
        background-color: #f0f0f0;
      }`}
    `,
  },
};

export default Pagination;
