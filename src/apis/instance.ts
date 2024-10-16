import axios from "axios";

export const instance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 10000,
    withCredentials: true,
  });
};
