import axios from "axios";
import { store } from "../app/store";

const api = axios.create({
  baseURL:"https://ai-task-manager-backend-clean.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
