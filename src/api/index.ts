import axios, { AxiosError } from "axios";

const API_URL = "https://api_url_example";

export const Api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

Api.interceptors.request.use(
  (config: any) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "*",
      },
    };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(undefined, async (error: AxiosError) => {
  return error;
});
