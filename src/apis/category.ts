import { instance } from "./instance";

export const categoryApi = {
  async getCategoryList() {
    return await instance().get("/v1/categories/list");
  },
};
