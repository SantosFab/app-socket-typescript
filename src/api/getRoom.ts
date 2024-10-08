import axios from "axios";

// Cria uma instância do Axios com a URL base definida
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/", // URL base
  timeout: 2000, // Opcional: tempo limite de 2 segundos para as solicitações
});
export default axiosInstance;
