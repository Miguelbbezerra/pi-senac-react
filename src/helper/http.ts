import axios, { AxiosInstance } from 'axios';

// Define your service class
class HttpService {
  private baseURL: string;
  private authToken: string;
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, authToken: string) {
    // Set the base URL for your requests
    this.baseURL = baseURL;
    // Set the authorization token
    this.authToken = authToken;

    // Create an instance of Axios with default configuration
    this.axiosInstance = axios.create({
      baseURL: this.baseURL
    });

    // Add request interceptor to add authorization header
    this.axiosInstance.interceptors.request.use(
      config => {
        // Add Authorization header with Bearer token
        config.headers.Authorization = `Bearer ${this.authToken}`;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  // Method to make a GET request
  async get(endpoint: string, params: object = {}): Promise<any> {
    try {
      // Make the GET request using Axios
      const response = await this.axiosInstance.get(endpoint, { params });
      return response.data; // Return the data from the response
    } catch (error:any) {
      // Handle any errors
      console.error('Error making GET request:', error.response?.data || error.message);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  // Method to make a POST request
  async post(endpoint: string, data: object = {}): Promise<any> {
    try {
      // Make the POST request using Axios
      const response = await this.axiosInstance.post(endpoint, data);
      return response.data; // Return the data from the response
    } catch (error:any) {
      // Handle any errors
      console.error('Error making POST request:', error.response?.data || error.message);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
}
 