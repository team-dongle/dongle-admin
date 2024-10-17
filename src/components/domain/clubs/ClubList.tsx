"use client";

import { clubApi } from "@/apis/club";
import Pagination from "@/components/common/Pagination";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ClubList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number | null>(null);
  const [clubList, setClubList] = useState<IClub[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<number | null>(null);

  const getClubList = async () => {
    await clubApi
      .getClubList(currentPage, 5)
      .then((res: AxiosResponse<ClubListResponse>) => {
        if (res.data.code === 200) {
          setTotalPage(res.data.result.totalPage);
          setClubList(res.data.result.rows);
          setLoading(false);
        }
      })
      .catch(() => {
        alert("데이터를 가져오는 도중 오류가 발생하였습니다.");
      });
  };

  const pageHandler = (currentPage: number) => setCurrentPage(currentPage);
  const deleteHandler = async (clubId: number) => {
    await clubApi
      .deleteClub(clubId)
      .then((res: AxiosResponse<GeneralResponse>) => {
        if (res.data.code === 200) {
          alert("동아리가 성공적으로 삭제되었습니다.");
          getClubList();
        }
      })
      .catch((e) => {
        alert("동아리 삭제중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.");
        console.log(e);
      });
  };

  useEffect(() => {
    getClubList();
  }, [currentPage]);

  return (
    <SC.Container>
      <Link href="/clubs/list">
        <SC.Title>동아리 관리</SC.Title>
      </Link>
      <SC.Divider />
      <SC.Table.Container>
        <SC.Table.Header.Container>
          <SC.Table.Header.Cell width={50}>선택</SC.Table.Header.Cell>
          <SC.Table.Header.Cell width={150}>번호</SC.Table.Header.Cell>
          <SC.Table.Header.Cell width={360}>동아리 이름</SC.Table.Header.Cell>
          <SC.Table.Header.Cell width={250}>동아리 회장</SC.Table.Header.Cell>
          <SC.Table.Header.Cell width={150}>분과</SC.Table.Header.Cell>
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
        {!loading && clubList.length < 1 && (
          <SC.Table.Row.Container>
            <SC.Table.Row.Cell width={960}>
              <span style={{ color: "#bbb", fontSize: "inherit" }}>
                데이터가 없습니다.
              </span>
            </SC.Table.Row.Cell>
          </SC.Table.Row.Container>
        )}
        {clubList.map((club) => (
          <SC.Table.Row.Container key={club._id}>
            <SC.Table.Row.Cell width={50}>
              <SC.SelectRadioButton
                selected={club._id === selected}
                onClick={() =>
                  setSelected(club._id === selected ? null : club._id)
                }
              ></SC.SelectRadioButton>
            </SC.Table.Row.Cell>
            <SC.Table.Row.Cell width={150}>{club._id}</SC.Table.Row.Cell>
            <SC.Table.Row.Cell width={350}>{club.name}</SC.Table.Row.Cell>
            <SC.Table.Row.Cell width={250}>
              {club.owner?.name}
            </SC.Table.Row.Cell>
            <SC.Table.Row.Cell width={150}>
              {club.category?.name}
            </SC.Table.Row.Cell>
          </SC.Table.Row.Container>
        ))}
      </SC.Table.Container>
      <SC.Bottom.Container>
        {selected && (
          <>
            <SC.Bottom.DeleteClub onClick={() => deleteHandler(selected)}>
              동아리 삭제
            </SC.Bottom.DeleteClub>
            <SC.Bottom.ModifyClub
              onClick={() => router.push(`/clubs/modify/${selected}`)}
            >
              동아리 수정
            </SC.Bottom.ModifyClub>
          </>
        )}
        <SC.Bottom.CreateClub href="/clubs/create">
          동아리 추가
        </SC.Bottom.CreateClub>
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
    CreateClub: styled(Link)`
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
    DeleteClub: styled.button`
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
    ModifyClub: styled.button`
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

export default ClubList;
