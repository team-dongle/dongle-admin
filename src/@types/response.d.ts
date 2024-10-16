/* eslint-disable @typescript-eslint/no-explicit-any */
interface GeneralResponse {
  code: number;
  message: string;
}

interface ClubListResponse extends GeneralResponse {
  result: {
    totalPage: number;
    count: number;
    rows: IClub[];
  };
}

interface CategoryListResponse extends GeneralResponse {
  result: {
    count: number;
    rows: ICategory[];
  };
}
interface ClubDetailResponse extends GeneralResponse {
  result: IClub;
}

interface LogoUploadResponse extends GeneralResponse {
  result: {
    url: string;
  };
}

interface NoticeDetailResponse extends GeneralResponse {
  result: INotice;
}

interface NoticeListResponse extends GeneralResponse {
  result: {
    totalPage: number;
    count: number;
    rows: INotice[];
  };
}

interface AttachmentUploadResponse extends GeneralResponse {
  result: {
    name: string;
    url: string;
  };
}
