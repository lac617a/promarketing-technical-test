import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class APIRequest {
  private axiosInstance: AxiosInstance;
  private controller = new AbortController();

  constructor() {
    this.axiosInstance = Axios.create({
      timeout: 30000,
      baseURL: "https://64b68442df0839c97e15b2a0.mockapi.io/api/v1",
      signal: this.controller.signal,
    });
  }

  public async get<T>(url: string, headers?: AxiosRequestConfig<T>) {
    const response = await this.axiosInstance.get(url, headers);
    return response.data;
  }

  public async post<T, D = any>(
    url: string,
    data?: D,
    headers?: AxiosRequestConfig<D>
  ) {
    const response = await this.axiosInstance.post(url, data, headers);
    return response.data;
  }
}

export const apiAxios = new APIRequest();
