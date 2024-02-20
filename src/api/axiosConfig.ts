import axios, { AxiosInstance } from 'axios';

const baseURL: string = 'http://localhost:3000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
