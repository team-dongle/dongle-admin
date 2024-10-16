"use client";

import { noticeApi } from "@/apis/notice";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

interface Props {
  changeHandler: (files: IFile[]) => void;
}

const FileUpload = ({ changeHandler }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<IFile[]>([]);

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      await noticeApi
        .uploadAttachment(formData)
        .then((res: AxiosResponse<AttachmentUploadResponse>) => {
          if (res.data.code === 200) {
            setFileList((prev) => [
              ...prev,
              {
                id: v4(),
                name: res.data.result.name,
                url: res.data.result.url,
              },
            ]);
          }
        })
        .catch((e) => {
          alert("파일 업로드 도중 오류가 발생했습니다.");
          console.log(e);
        });
    }
  };

  const deleteHandler = (id: string) =>
    setFileList(fileList.filter((file) => file.id !== id));

  useEffect(() => {
    changeHandler(fileList);
  }, [fileList]);

  return (
    <SC.Container>
      <SC.FileInput type="file" ref={fileRef} onChange={uploadHandler} />
      <SC.FileList>
        {fileList.map((file) => (
          <SC.FileItem key={file.id}>
            {file.name}
            <SC.DeleteButton onClick={() => deleteHandler(file.id)}>
              삭제
            </SC.DeleteButton>
          </SC.FileItem>
        ))}
      </SC.FileList>
      <SC.UploadButton
        type="button"
        onClick={() => {
          if (fileList.length >= 5) return;
          fileRef.current?.click();
        }}
      >
        파일 업로드
      </SC.UploadButton>
    </SC.Container>
  );
};

const SC = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    height: auto;
  `,
  UploadButton: styled.button`
    width: 140px;
    height: 35px;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: #ededed;
    color: #737373;
  `,
  FileInput: styled.input`
    display: none;
    width: 0;
    height: 0;
  `,
  FileList: styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    height: auto;
  `,
  FileItem: styled.li`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 20px;
    font-size: 1.5rem;
  `,
  DeleteButton: styled.button`
    width: auto;
    height: auto;
    border: none;
    outline: none;
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff7575;
    background-color: transparent;
  `,
};

export default FileUpload;
