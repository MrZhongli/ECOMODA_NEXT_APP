import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Configura la URL base desde variables de entorno
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Crea una instancia de Axios para la API pública
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Función para realizar solicitudes genéricas con Axios
export const fetchAPI = async<T>(
    endpoint: string,
    config ?: AxiosRequestConfig
): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axiosInstance.get(endpoint, config)
        return response.data
    } catch (error) {
            console.error('Error in fetchAPI:', error)
        throw error
    }
}

        export default axiosInstance
