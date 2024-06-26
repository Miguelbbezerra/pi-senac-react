import axios from "axios";

export class HttpService {
  constructor(private readonly baseURL: string, private readonly authToken: string) {
    this.baseURL = baseURL;
    this.authToken = authToken
  }

  async get(endpoint: string, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params,
        headers: {Authorization: `Bearer ${this.authToken}`, 'Content-Type': 'application/json'}
    });
      return {statusCode: response?.status, data: response?.data};
    } catch (error: any) {
      return {statusCode: error.response?.statusCode, message: error.response?.data || error.message}
    }
  }

  async post(endpoint: string, data = {}) {
    try {
      const response = await axios.post(`${this.baseURL}${endpoint}`, data, {
        headers: {Authorization: `Bearer ${this.authToken}`, 'Content-Type': 'application/json'}
      });
      return {statusCode: response?.status, data: response?.data};
    } catch (error: any) {
      return {statusCode: error.response?.statusCode, message: error.response?.data || error.message}
    }
  }

}