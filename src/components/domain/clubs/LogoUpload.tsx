"use client";

import { clubApi } from "@/apis/club";
import { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  image?: string;
  changeHandler: (link: string) => void;
}

const LogoUpload = ({ image, changeHandler }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(image);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      await clubApi
        .uploadClubLogo(formData)
        .then((res: AxiosResponse<LogoUploadResponse>) => {
          if (res.data.code === 200) {
            setImageUrl(res.data.result.url);
          }
        })
        .catch((e) => {
          alert("이미지 업로드 도중 오류가 발생하였습니다.");
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (imageUrl) changeHandler(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    setImageUrl(image);
  }, [image]);

  return (
    <SC.Container>
      <SC.Image.Container>
        <SC.Image.Preview src={imageUrl} />
        <SC.Image.UploadButton
          type="button"
          onClick={() => fileRef.current?.click()}
        >
          로고 업로드
        </SC.Image.UploadButton>
        <SC.Image.DeleteButton
          type="button"
          onClick={() => setImageUrl(undefined)}
        >
          제거
        </SC.Image.DeleteButton>
        <SC.Image.FileInput
          type="file"
          ref={fileRef}
          onChange={uploadHandler}
        />
      </SC.Image.Container>
      <SC.Caution>
        최대 해상도는 140*140이며, 최대 용량은 10MB 입니다.
        <br />
        이미지 형식의 파일 (ex: jpg, jpeg, png 등) 업로드 가능합니다. <br />
        gif 파일은 성능상 업로드가 불가능 합니다.
      </SC.Caution>
    </SC.Container>
  );
};

const SC = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    height: auto;
  `,
  Image: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
      width: 140px;
      height: auto;
    `,
    Preview: styled.img`
      width: 140px;
      height: 140px;
      border: 1px solid #eee;
      border-radius: 8px;
      background-color: #eee;
      outline: none;
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
    DeleteButton: styled.button`
      width: 140px;
      height: 35px;
      border: none;
      border-radius: 8px;
      outline: none;
      background-color: transparent;
      color: #737373;
    `,
    FileInput: styled.input`
      display: none;
      width: 0;
      height: 0;
    `,
  },
  Caution: styled.span`
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2rem;
    color: #a8a8a8;
  `,
  LinkInput: styled.input`
    display: none;
    width: 0;
    height: 0;
  `,
};

export default LogoUpload;
