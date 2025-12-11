// // src/api/interceptors.ts
// import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

// export const API_ADDRESS = 'https://api.lambee.com.kg';

// const publicOptions: CreateAxiosDefaults = {
//   baseURL: API_ADDRESS,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: false,
// };

// export const PUBLIC_API = axios.create(publicOptions);

// // ✅ PRIVATE_API с автоматической подстановкой токена
// const privateOptions: CreateAxiosDefaults = {
//   baseURL: API_ADDRESS,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: false,
// };

// export const PRIVATE_API = axios.create(privateOptions);

// // Добавляем токен к каждому приватному запросу
// PRIVATE_API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// src/api/interceptors.ts
import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

export const API_ADDRESS = 'https://api.lambee.com.kg';

// ❌ Content-Type УБРАН
const publicOptions: CreateAxiosDefaults = {
  baseURL: API_ADDRESS,
  withCredentials: false,
};

export const PUBLIC_API = axios.create(publicOptions);

// ❌ Content-Type УБРАН
const privateOptions: CreateAxiosDefaults = {
  baseURL: API_ADDRESS,
  withCredentials: false,
};

export const PRIVATE_API = axios.create(privateOptions);

// ✅ interceptor
PRIVATE_API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ КРИТИЧНО: НЕ ТРОГАТЬ Content-Type для FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);
