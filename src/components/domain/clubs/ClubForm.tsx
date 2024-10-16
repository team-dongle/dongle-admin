"use client";

import { categoryApi } from "@/apis/category";
import StyledInput from "@/components/common/Input";
import Categories from "@/components/domain/clubs/Category";
import { regex } from "@/lib/regex";
import {
  Editor,
  EditorProps,
  Editor as EditorType,
} from "@toast-ui/react-editor";
import { AxiosResponse } from "axios";
import Link from "next/link";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { styled } from "styled-components";
import dynamic from "next/dynamic";
import RecruitState from "./RecruitState";
import { clubApi } from "@/apis/club";
import { useRouter } from "next/navigation";
import LogoUpload from "./LogoUpload";
import "@toast-ui/editor/dist/toastui-editor.css";

const WrappedEditor = dynamic(
  () => import("./WrappedEditor").then((m) => m.default),
  { ssr: false },
);

const EditorWithForwardedRef = forwardRef(
  (props: EditorProps, forwardedRef: React.ForwardedRef<Editor>) => {
    return <WrappedEditor {...props} forwardedRef={forwardedRef} />;
  },
);

EditorWithForwardedRef.displayName = "EditorWithForwardedRef";

interface Props {
  clubId?: number;
  type?: "create" | "modify";
}

const ClubForm = ({ clubId, type = "create" }: Props) => {
  const [defaultValues, setDefaultValues] = useState<ClubFormType | undefined>(
    undefined,
  );
  const router = useRouter();
  const today = new Date();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const editorRef = useRef<EditorType>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ClubFormType>({ defaultValues: defaultValues });

  const submitHandler: SubmitHandler<ClubFormType> = async (
    data: ClubFormType,
  ) => {
    if (clubId && type === "modify") {
      await clubApi
        .modifyClub(clubId, data)
        .then((res: AxiosResponse<GeneralResponse>) => {
          if (res.data.code === 200) {
            alert("성공적으로 수정되었습니다.");
            router.push("/clubs/list");
          }
        })
        .catch((e) => {
          alert("동아리 수정 도중 오류가 발생하였습니다.");
          console.log(e);
        });
    } else {
      await clubApi
        .createClub(data)
        .then((res: AxiosResponse<GeneralResponse>) => {
          if (res.data.code === 200) {
            alert("성공적으로 등록되었습니다.");
            router.push("/clubs/list");
          }
        })
        .catch((e) => {
          alert("동아리 등록 도중 오류가 발생하였습니다.");
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (clubId && type === "modify")
      clubApi
        .getClubDetail(clubId)
        .then((res: AxiosResponse<ClubDetailResponse>) => {
          if (res.data.code === 200) {
            const club = res.data.result;
            setDefaultValues({
              name: club.name,
              contact: club.contact,
              applyUrl: club.applyUrl,
              location: club.location,
              sns: club.sns,
              detail: club.detail || "",
              recruitPeriod: undefined,
              isRecruiting: club.isRecruiting,
              logo: club.logo,
            });
          }
        })
        .catch(() => {
          alert("동아리 정보를 가져오는 도중 오류가 발생했습니다.");
        });

    categoryApi
      .getCategoryList()
      .then((res: AxiosResponse<CategoryListResponse>) => {
        if (res.data.code === 200) setCategories(res.data.result.rows);
      })
      .catch((e) => {
        alert("분과 목록을 가져오는 도중 오류가 발생했습니다.");
        console.log(e);
      });
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <SC.Container>
      <SC.Title>
        {!(clubId && type === "modify") ? `동아리 추가` : `동아리 수정`}
      </SC.Title>
      <SC.Divider />
      <SC.CreateForm.Container onSubmit={handleSubmit(submitHandler)}>
        <SC.ClubInput.Container>
          <SC.ClubInput.Label>동아리 로고</SC.ClubInput.Label>
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <LogoUpload
                image={type === "modify" ? defaultValues?.logo : undefined}
                changeHandler={(link: string) => field.onChange(link)}
              />
            )}
          />
        </SC.ClubInput.Container>
        {!(clubId && type === "modify") && (
          <SC.ClubInput.Container>
            <SC.ClubInput.Label required>회장 ID</SC.ClubInput.Label>
            <StyledInput
              type="text"
              placeholder="동아리 회장 ID를 입력해 주세요."
              {...register("ownerId", {
                required: "동아리 회장 ID를 입력해 주세요.",
              })}
            />
          </SC.ClubInput.Container>
        )}
        {errors.ownerId && (
          <SC.ClubInput.Error>{errors.ownerId.message}</SC.ClubInput.Error>
        )}
        <SC.ClubInput.Container>
          <SC.ClubInput.Label required>동아리명</SC.ClubInput.Label>
          <StyledInput
            type="text"
            placeholder="동아리명을 입력해 주세요."
            {...register("name", {
              required: "동아리 명을 입력해 주세요.",
            })}
          />
        </SC.ClubInput.Container>
        {errors.name && (
          <SC.ClubInput.Error>{errors.name.message}</SC.ClubInput.Error>
        )}
        <SC.ClubInput.Container>
          <SC.ClubInput.Label required>동아리 위치</SC.ClubInput.Label>
          <StyledInput
            type="text"
            placeholder="동아리 위치를 입력해 주세요."
            {...register("location", {
              required: "동아리 위치를 입력해 주세요.",
            })}
          />
        </SC.ClubInput.Container>
        {errors.location && (
          <SC.ClubInput.Error>{errors.location.message}</SC.ClubInput.Error>
        )}
        <SC.ClubInput.Container>
          <SC.ClubInput.Label required>대표 연락처</SC.ClubInput.Label>
          <StyledInput
            type="text"
            placeholder="대표 연락처를 입력해 주세요."
            {...register("contact", {
              required: "대표 연락처를 입력해 주세요.",
              pattern: {
                value: regex.phone,
                message: "유효한 전화번호를 입력해 주세요.",
              },
            })}
          />
        </SC.ClubInput.Container>
        {errors.contact && (
          <SC.ClubInput.Error>{errors.contact.message}</SC.ClubInput.Error>
        )}
        <SC.ClubInput.Container>
          <SC.ClubInput.Label>동아리 SNS</SC.ClubInput.Label>
          <StyledInput
            type="text"
            placeholder="동아리 대표 SNS 링크를 입력해 주세요. (ex: 인스타그램)"
            {...register("sns", {
              pattern: {
                value: regex.url,
                message: "유효한 링크를 입력해 주세요.",
              },
            })}
          />
        </SC.ClubInput.Container>
        {errors.sns && (
          <SC.ClubInput.Error>{errors.sns.message}</SC.ClubInput.Error>
        )}
        <SC.ClubInput.Container>
          <SC.ClubInput.Label required>지원 링크</SC.ClubInput.Label>
          <StyledInput
            type="text"
            placeholder="동아리 지원 링크를 입력해 주세요."
            {...register("applyUrl", {
              required: "동아리 지원 링크를 입력해 주세요.",
              pattern: {
                value: regex.url,
                message: "유효한 링크를 입력해 주세요.",
              },
            })}
          />
        </SC.ClubInput.Container>
        {errors.applyUrl && (
          <SC.ClubInput.Error>{errors.applyUrl.message}</SC.ClubInput.Error>
        )}
        <SC.ClubInput.Container>
          <SC.ClubInput.Label required>모집 기간</SC.ClubInput.Label>
          <StyledInput
            type="date"
            min={`${today.getFullYear()}-${today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`}
            placeholder="모집 기간을 입력해 주세요."
            {...register("recruitPeriod", {
              required: "동아리 모집 기간을 입력해 주세요.",
              valueAsDate: true,
            })}
          />
        </SC.ClubInput.Container>
        {errors.recruitPeriod && (
          <SC.ClubInput.Error>
            {errors.recruitPeriod.message}
          </SC.ClubInput.Error>
        )}
        {!(clubId && type === "modify") && (
          <SC.ClubInput.Container>
            <SC.ClubInput.Label required>동아리 분과</SC.ClubInput.Label>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "동아리 분과를 선택해 주세요." }}
              render={({ field }) => {
                return (
                  <Categories
                    placeholder="동아리 분과를 선택해 주세요."
                    options={categories}
                    selectHandler={(categoryId: number) =>
                      field.onChange(categoryId)
                    }
                  />
                );
              }}
            />
          </SC.ClubInput.Container>
        )}
        {errors.categoryId && (
          <SC.ClubInput.Error>{errors.categoryId.message}</SC.ClubInput.Error>
        )}
        <SC.ClubInput.Container>
          <SC.ClubInput.Label required>모집 상태</SC.ClubInput.Label>
          <RecruitState register={register} />
        </SC.ClubInput.Container>
        {errors.isRecruiting && (
          <SC.ClubInput.Error>{errors.isRecruiting.message}</SC.ClubInput.Error>
        )}
        <SC.ClubInput.Container>
          <SC.ClubInput.Label>상세 정보</SC.ClubInput.Label>
          <Controller
            name="detail"
            control={control}
            render={({ field }) => (
              <SC.ClubInput.EditorContainer>
                <EditorWithForwardedRef
                  height="100%"
                  hideModeSwitch
                  ref={editorRef}
                  onChange={() =>
                    field.onChange(editorRef.current!.getInstance().getHTML())
                  }
                />
              </SC.ClubInput.EditorContainer>
            )}
          />
        </SC.ClubInput.Container>

        <SC.Bottom.Container>
          <SC.Bottom.CancelButton href="/clubs/list">
            취소
          </SC.Bottom.CancelButton>
          <SC.Bottom.CreateButton>
            {!clubId && type === "modify" ? `추가` : `수정`}
          </SC.Bottom.CreateButton>
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
  ClubInput: {
    Container: styled.div`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 24px;
      width: 100%;
    `,
    Label: styled.span<{ required?: boolean }>`
      width: 120px;
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
      font-weight: 500;
      & * {
        font-size: 100% !important;
      }
    `,
    Error: styled.span`
      padding-left: 130px;
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

export default ClubForm;
