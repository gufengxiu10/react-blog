import axios, { AxiosResponse, AxiosError } from "axios";
const request = axios.create({
  timeout: 10000,
});

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default request;
