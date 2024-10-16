import { instance } from "./instance";

export const clubApi = {
  async getClubList(page?: number, size?: number) {
    return await instance().get(
      `/v1/clubs/list${page ? `?page=${page.toString()}` : ``}${size ? `&size=${size.toString()}` : ``}`,
    );
  },
  async getClubDetail(clubId: number) {
    return await instance().get(`/v1/clubs/${clubId}/detail`);
  },
  async deleteClub(clubId: number) {
    return await instance().delete(`/v1/clubs/${clubId}/delete`);
  },
  async createClub(data: ClubFormType) {
    return await instance().post(`/v1/clubs/create`, { ...data });
  },
  async modifyClub(clubId: number, data: ClubFormType) {
    return await instance().patch(`/v1/clubs/${clubId}/update`, { ...data });
  },
  async uploadClubLogo(form: FormData) {
    return await instance().post(`/v1/upload/clubLogo`, form);
  },
};
