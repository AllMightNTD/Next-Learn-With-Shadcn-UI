
import axios, { AxiosRequestConfig } from "axios"
import interceptor from "./interceptor"

axios.defaults.withCredentials = false

const axiosInstance = axios.create()

axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API

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
  const token =  localStorage.getItem('token_next')
  if (token && token !== 'undefined' && config.headers) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
}

// @ts-ignore
axiosInstance.interceptors.request.use(authRequestInterceptor);
axiosInstance.interceptors.response.use(undefined, interceptor(axiosInstance))
export { axiosInstance }
