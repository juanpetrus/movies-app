import axios from 'axios';

// console.log(process.env.NODE_ENV) development | production
// const BackendHost = process.env.APP_BACKEND_HOST;
// const BackendPort = process.env.PORT || process.env.APP_BACKEND_PORT;

// export const baseURLApi = BackendPort ? ${BackendHost}:${BackendPort} : ${BackendHost}

export const api = axios.create({
  baseURL: 'http://localhost:5173',
});