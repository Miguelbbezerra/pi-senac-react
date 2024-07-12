import axios, { AxiosResponse, AxiosError } from 'axios';
import env from '../config/env'
import { SetItemLocalStorage, GetItemLocalStorage } from './localStorage'

// Cria uma instância do axios
const api = axios.create({
  baseURL: env.HOST_API, // Substitua pela URL da sua API
});

// Interceptor de requisição
api.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  
  const token = GetItemLocalStorage('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {

  }
  
  return config;
});

// Interceptor de resposta
api.interceptors.response.use((response: AxiosResponse) => {
  if (response.data && response.data.token) {
    SetItemLocalStorage('token', response.data.token);
  }
  
  return response;
}, (error: AxiosError) => {
  // Tratamento de erro
  return Promise.reject(error);
});

export default api;
 