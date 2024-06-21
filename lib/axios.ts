
import axios, { AxiosRequestConfig } from "axios"
import interceptor from "./interceptor"

axios.defaults.withCredentials = false

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = process.env.VITE_API_URL

axiosInstance.defaults.headers.post["Content-Type"] = "application/json"

type ResponseRefresh ={
  access_token : string 
  refresh_token : string
}
export type RefreshTokenResponse = {
  data : ResponseRefresh
}

// Authorization
function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = localStorage.getItem('access_token')
  if (token && token !== 'undefined' && config.headers) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
axiosInstance.interceptors.request.use(authRequestInterceptor);
axiosInstance.interceptors.response.use(undefined, interceptor(axiosInstance))
export { axiosInstance }
