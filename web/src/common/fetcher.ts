import axios from 'axios';

export const fetcher = axios.create({
  baseURL: '/api',
});

fetcher.interceptors.response.use(
  ({ data: retData }) => {
    if (!retData.success) {
      throw new Error(retData.message);
    }
    const responseData = retData.data;
    return responseData;
  },
  (error) => {
    return Promise.reject(error);
  }
);
