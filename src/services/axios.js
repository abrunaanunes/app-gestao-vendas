import axios from 'axios';

const jwt = localStorage.getItem('jwt');

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Authorization': jwt ? `Bearer ${jwt}` : '',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Token expirado ou inválido');
    }
    return Promise.reject(error);
  }
);

export default api;