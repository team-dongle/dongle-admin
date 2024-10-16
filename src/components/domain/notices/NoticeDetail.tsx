"use client";

import { noticeApi } from "@/apis/notice";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClipIcon from "@/assets/images/clip.svg";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicViewer = dynamic(() =>
  import("@toast-ui/react-editor").then((m) => m.Viewer),
);

interface Props {
  id: number;
}

const NoticeDetail = ({ id }: Props) => {
  const [notice, setNotice] = useState<INotice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getNoticeDetail = async (id: number) => {
    await noticeApi
      .getNoticeDetail(id)
      .then((res: AxiosResponse<NoticeDetailResponse>) => {
        if (res.data.code === 200) {
          setNotice(res.data.result);
          setLoading(false);
        }
      })
      .catch((e) => {
        alert("공지사항을 가져오는 도중 오류가 발생했습니다.");
        console.log(e);
      });
  };

  useEffect(() => {
    getNoticeDetail(id);
  }, []);

  if (loading) <></>;
  if (notice)
    return (
      <SC.Container>
        <SC.Title>{notice?.title}</SC.Title>
        <SC.CreateDate>
          {notice &&
            notice.createdAt &&
            `${new Date(notice.createdAt).getFullYear()}년 ${new Date(notice.createdAt).getMonth() + 1}월 ${new Date(notice.createdAt).getDate()}일`}
        </SC.CreateDate>
        <SC.Divider />
        <SC.Content>
          <DynamicViewer initialValue={notice!.content} />
        </SC.Content>
        <SC.Divider />
        <SC.Attachment.Container>
          {notice.attachment && notice.attachment.length >= 1 && (
            <>
              <SC.Attachment.Title>
                <ClipIcon />
                첨부파일
              </SC.Attachment.Title>
              <SC.Attachment.FileList>
                {notice?.attachment.map((file, index) => (
                  <SC.Attachment.FileItem key={index}>
                    <Link href={file.url}>{file.name}</Link>
                  </SC.Attachment.FileItem>
                ))}
              </SC.Attachment.FileList>
            </>
          )}
        </SC.Attachment.Container>
        <SC.Bottom.Container>
          <SC.Bottom.BackToList href="/notices/list">목록</SC.Bottom.BackToList>
        </SC.Bottom.Container>
      </SC.Container>
    );
};

const SC = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
    height: auto;
  `,
  Title: styled.h2`
    font-size: 3rem;
    font-weight: 600;
    color: #222;
  `,
  CreateDate: styled.span`
    font-size: 2rem;
    font-weight: 500;
    color: #c1c1c1;
  `,
  Divider: styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    outline: none;
    background-color: #f0f0f0;
  `,
  Content: styled.div`
    width: 100%;
    height: auto;
    font-size: 1.5rem;
    & * {
      font-size: 100%;
    }
  `,
  Attachment: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
      height: auto;
    `,
    Title: styled.span`
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      font-size: 1.5rem;
      font-weight: 600;
      color: #189ded;
    `,
    FileList: styled.ul`
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      height: auto;
    `,
    FileItem: styled.li`
      width: 100%;
      height: auto;
      padding-left: 25px;
      & > a {
        font-size: 1.5rem;
      }
    `,
  },
  Bottom: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;
      height: auto;
    `,
    BackToList: styled(Link)`
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

export default NoticeDetail;
