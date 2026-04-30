import axios from "axios"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const savedToken: string | null = localStorage.getItem("lop-token") ?? localStorage.getItem("change_password_token")
    const parsedToken: string | null = savedToken ? savedToken : null
    if (parsedToken) {
      config.headers.Authorization = `Bearer ${parsedToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    // if (error.response.status === 401) {
    //   //   localStorage.removeItem("lop-token")
    // }
    return Promise.reject(error)
  },
)

export default apiClient
