import { instance } from "./instance";

export const userApi = {
  async getProfile() {
    return await instance().get("/v1/users/profile");
  },
};
