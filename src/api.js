import axios from "axios";

const api = axios.create({
  baseURL: "https://vceleb-backend.onrender.com"
});

export default api;
