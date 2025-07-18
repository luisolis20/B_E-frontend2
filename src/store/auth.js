import { ref } from 'vue';
import axios from 'axios';
import store from "@/store";

const logged = ref(false);
const user = ref('');
const meURL = 'http://vinculacionconlasociedad.utelvt.edu.ec/backendbolsaempleo/api/b_e/me'; // ajusta la URL según tu backend

const apiClient = axios.create({
  baseURL: meURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('token_type');
    if (token && tokenType) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getMe = async () => {
  try {
    const response = await apiClient.get('');
    localStorage.setItem('user', JSON.stringify(response.data));
    logged.value = true;
    user.value = response.data;
    //console.log(response.data);
    return response.data;
  } catch (error) {
    localStorage.clear();
    window.location.href = '/';
    console.error('Error al obtener perfil data:', error);
    throw error;
  }
};
