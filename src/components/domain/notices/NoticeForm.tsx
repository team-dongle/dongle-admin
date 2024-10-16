"use client";

import { Editor, EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { forwardRef, useRef } from "react";
import { styled } from "styled-components";
import StyledInput from "@/components/common/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "@toast-ui/editor/dist/toastui-editor.css";
import FileUpload from "./FileUpload";
import { noticeApi } from "@/apis/notice";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

const WrappedEditor = dynamic(
  () => import("../clubs/WrappedEditor").then((m) => m.default),
  { ssr: false },
);

const EditorWithForwardedRef = forwardRef(
  (props: EditorProps, forwardedRef: React.ForwardedRef<Editor>) => {
    return <WrappedEditor {...props} forwardedRef={forwardedRef} />;
  },
);

EditorWithForwardedRef.displayName = "EditorWithForwardedRef";

const NoticeForm = () => {
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoticeFormType>();

  const submitHandler: SubmitHandler<NoticeFormType> = async (
    data: NoticeFormType,
  ) => {
    await noticeApi
      .createNotice(data)
      .then((res: AxiosResponse<GeneralResponse>) => {
        if (res.data.code === 200) {
          alert("성공적으로 공지사항을 작성하였습니다.");
          router.push("/notices/list");
        }
      })
      .catch((e) => {
        alert("공지사항 등록 도중 오류가 발생하였습니다.");
        console.log(e);
      });
  };

  return (
    <SC.Container>
      <SC.Title>공지사항 작성</SC.Title>
      <SC.Divider />
      <SC.CreateForm.Container onSubmit={handleSubmit(submitHandler)}>
        <SC.NoticeInput.Container>
          <SC.NoticeInput.Label required>공지사항 제목</SC.NoticeInput.Label>
          <StyledInput
            type="text"
            placeholder="공지사항 제목을 입력해 주세요."
            {...register("title", {
              required: "공지사항 제목을 입력해 주세요.",
            })}
          />
        </SC.NoticeInput.Container>
        {errors.title && (
          <SC.NoticeInput.Error>{errors.title.message}</SC.NoticeInput.Error>
        )}

        <SC.NoticeInput.Container>
          <SC.NoticeInput.Label required>공지사항 내용</SC.NoticeInput.Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <SC.NoticeInput.EditorContainer>
                <EditorWithForwardedRef
                  height="100%"
                  hideModeSwitch
                  ref={editorRef}
                  onChange={() =>
                    field.onChange(editorRef.current!.getInstance().getHTML())
                  }
                />
              </SC.NoticeInput.EditorContainer>
            )}
          />
        </SC.NoticeInput.Container>

        <SC.NoticeInput.Container>
          <SC.NoticeInput.Label>첨부파일</SC.NoticeInput.Label>
          <Controller
            name="attachment"
            control={control}
            render={({ field }) => (
              <FileUpload
                changeHandler={(files: IFile[]) => field.onChange(files)}
              />
            )}
          />
        </SC.NoticeInput.Container>
        <SC.Bottom.Container>
          <SC.Bottom.CancelButton href="/notices/list">
            취소
          </SC.Bottom.CancelButton>
          <SC.Bottom.CreateButton>작성</SC.Bottom.CreateButton>
        </SC.Bottom.Container>
      </SC.CreateForm.Container>
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
  `,
  Divider: styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    outline: none;
    background-color: #f0f0f0;
  `,
  CreateForm: {
    Container: styled.form`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
      height: auto;
    `,
  },
  NoticeInput: {
    Container: styled.div`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 24px;
      width: 100%;
    `,
    Label: styled.span<{ required?: boolean }>`
      width: 140px;
      font-size: 1.75rem;
      font-weight: 500;
      color: black;
      ${({ required }) =>
        required &&
        `
      &:after {
        content:"*";
        color: #FA3B3B;
      }
    `}
    `,
    EditorContainer: styled.div`
      width: 100%;
      height: 400px;
      font-size: 100% !important;
      font-weight: 500;
      & * {
        font-size: 100% !important;
      }
    `,
    Error: styled.span`
      padding-left: 150px;
      font-size: 1.5rem;
      color: red;
    `,
  },
  Bottom: {
    Container: styled.div`
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: auto;
      gap: 24px;
    `,
    CreateButton: styled.button`
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
    CancelButton: styled(Link)`
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

export default NoticeForm;
