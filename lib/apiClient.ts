import { URL_BE } from "@/constants/api"
import axios from "axios"

const timeOut = 5000

const apiClient = axios.create({
    baseURL: URL_BE,
    timeout: timeOut,
    withCredentials: true,
    headers:{
        Accept: "application/json"
    }
})

apiClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)

export default apiClient