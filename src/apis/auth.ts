import { ILogin } from "@/@types/login";
import { instance } from "./instance";

export const authApi = {
  async login(loginData: ILogin) {
    return await instance().post("/v1/auth/login", { ...loginData });
  },
  async logout() {
    return await instance().post(`/v1/auth/logout`);
  },
};
