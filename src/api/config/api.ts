import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Configura la URL base desde variables de entorno
const API_URL = "http://localhost:8000";

// Crea una instancia de Axios para la API pública
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función genérica para solicitudes con Axios
export const fetchAPI = async<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data ?: any,
    config ?: AxiosRequestConfig
): Promise<T> => {
    try {
    const response: AxiosResponse<T> = await axiosInstance.request({
        url: endpoint,
        method,
        data,
        ...config,
    });
        return response.data;
    } catch (error) {
            console.error('Error in fetchAPI:', error);
        throw error;
    }
};

        export default axiosInstance;
