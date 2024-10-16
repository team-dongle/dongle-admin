import { instance } from "./instance";

export const noticeApi = {
  async getNoticesList(page?: number, size?: number) {
    return await instance().get(
      `/v1/notices/list${page ? `?page=${page.toString()}` : ``}${size ? `&size=${size.toString()}` : ``}`,
    );
  },
  async getNoticeDetail(id: number) {
    return await instance().get(`/v1/notices/${id}/detail`);
  },
  async createNotice(data: NoticeFormType) {
    return await instance().post(`/v1/notices/write`, { ...data });
  },
  async deleteNotice(id: number) {
    return await instance().delete(`/v1/notices/${id}/delete`);
  },
  async uploadAttachment(fileData: FormData) {
    return await instance().post(`/v1/upload/file`, fileData);
  },
};
