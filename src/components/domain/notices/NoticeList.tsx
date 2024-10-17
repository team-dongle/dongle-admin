"use client";

import { noticeApi } from "@/apis/notice";
import Pagination from "@/components/common/Pagination";
import { AxiosResponse } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const NoticeList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [noticeList, setNoticeList] = useState<INotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getNoticeList = async () => {
    await noticeApi
      .getNoticesList()
      .then((res: AxiosResponse<NoticeListResponse>) => {
        if (res.data.code === 200) {
          setTotalPage(res.data.result.totalPage);
          setNoticeList(res.data.result.rows);
          setLoading(false);
        }
      })
      .catch((e) => {
        alert("공지사항 목록을 가져오던 도중 오류가 발생했습니다.");
        console.log(e);
      });
  };

  const pageHandler = (currentPage: number) => setCurrentPage(currentPage);
  const deleteHandler = async (noticeId: number) => {
    await noticeApi
      .deleteNotice(noticeId)
      .then((res: AxiosResponse<GeneralResponse>) => {
        if (res.data.code === 200) {
          alert("성공적으로 삭제하였습니다.");
          getNoticeList();
        }
      })
      .catch((e) => {
        alert("삭제 도중 오류가 발생하였습니다.");
        console.log(e);
      });
  };

  useEffect(() => {
    getNoticeList();
  }, [currentPage]);

  return (
    <SC.Container>
      <Link href="/notices/list">
        <SC.Title>공지사항 관리</SC.Title>
      </Link>
      <SC.Divider />
      <SC.Table.Container>
        <SC.Table.Header.Container>
          <SC.Table.Header.Cell width={50}>선택</SC.Table.Header.Cell>
          <SC.Table.Header.Cell width={660}>공지사항 제목</SC.Table.Header.Cell>
          <SC.Table.Header.Cell width={250}>작성일</SC.Table.Header.Cell>
        </SC.Table.Header.Container>
        {loading && (
          <SC.Table.Row.Container>
            <SC.Table.Row.Cell width={960}>
              <span style={{ color: "#bbb", fontSize: "inherit" }}>
                로딩 중...
              </span>
            </SC.Table.Row.Cell>
          </SC.Table.Row.Container>
        )}
        {!loading && noticeList.length < 1 && (
          <SC.Table.Row.Container>
            <SC.Table.Row.Cell width={960}>
              <span style={{ color: "#bbb", fontSize: "inherit" }}>
                데이터가 없습니다.
              </span>
            </SC.Table.Row.Cell>
          </SC.Table.Row.Container>
        )}
        {noticeList.map((notice) => (
          <SC.Table.Row.Container key={notice._id}>
            <SC.Table.Row.Cell width={50}>
              <SC.SelectRadioButton
                selected={selected === notice._id}
                onClick={() =>
                  setSelected(notice._id === selected ? null : notice._id)
                }
              ></SC.SelectRadioButton>
            </SC.Table.Row.Cell>
            <SC.Table.Row.Cell width={660}>
              <Link href={`/notices/detail/${notice._id}`}>{notice.title}</Link>
            </SC.Table.Row.Cell>
            <SC.Table.Row.Cell width={250}>
              {notice.createdAt &&
                `${new Date(notice.createdAt).getFullYear()}년 ${new Date(notice.createdAt).getMonth() + 1}월 ${new Date(notice.createdAt).getDay()}일`}
            </SC.Table.Row.Cell>
          </SC.Table.Row.Container>
        ))}
      </SC.Table.Container>
      <SC.Bottom.Container>
        {selected && (
          <SC.Bottom.DeleteNotice onClick={() => deleteHandler(selected)}>
            게시글 삭제
          </SC.Bottom.DeleteNotice>
        )}
        <SC.Bottom.WriteNotice href="/notices/write">
          게시글 작성
        </SC.Bottom.WriteNotice>
      </SC.Bottom.Container>
      <SC.PaginationContainer>
        {totalPage ? (
          <Pagination
            maxPage={totalPage || 0}
            limit={5}
            pageHandler={pageHandler}
            pageState={{ currentPage, setCurrentPage }}
          />
        ) : (
          <></>
        )}
      </SC.PaginationContainer>
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
    width: 100%;
    height: auto;
    gap: 36px;
  `,
  Title: styled.h1`
    font-size: 2.75rem;
    font-weight: 500;
    color: black;
  `,
  Divider: styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    outline: none;
    background-color: #f0f0f0;
  `,
  Table: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
    `,
    Header: {
      Container: styled.div`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 40px;
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        background-color: #f9f9f9;
      `,
      Cell: styled.div<{ width?: number }>`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: ${({ width }) => (width ? `${width}px` : `auto`)};
        height: 100%;
        font-size: 1.5rem;
        font-weight: 600;
        color: #999999;
      `,
    },
    Row: {
      Container: styled.div`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #e9e9e9;
      `,
      Cell: styled.div<{ width?: number }>`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: ${({ width }) => (width ? `${width}px` : `auto`)};
        height: 100%;
        font-size: 1.5rem;
        font-weight: 500;
        color: #4b4b4b;
        & a:link,
        a:visited {
          color: inherit;
        }
      `,
    },
  },
  SelectRadioButton: styled.button<{ selected?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border: 1px solid #bcbcbc;
    border-radius: 18px;
    outline: none;
    background-color: transparent;
    ${({ selected }) =>
      selected &&
      `
      border: 1px solid #31A6EC;
      &:after {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background-color: #31A6EC;
      }
    `}
  `,
  PaginationContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
  `,
  Bottom: {
    Container: styled.div`
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 24px;
      width: 100%;
      height: auto;
    `,
    WriteNotice: styled(Link)`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 140px;
      height: 40px;
      border: none;
      border-radius: 10px;
      outline: none;
      background-color: #189ded;
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
    `,
    DeleteNotice: styled.button`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 140px;
      height: 40px;
      border: none;
      border-radius: 10px;
      outline: none;
      background-color: #ededed;
      font-size: 1.5rem;
      font-weight: 700;
      color: #737373;
    `,
  },
};

export default NoticeList;
