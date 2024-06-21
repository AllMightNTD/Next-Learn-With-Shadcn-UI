import Axios from 'axios'
import { RefreshTokenResponse } from './axios'
const baseURL = process.env.VITE_API_URL as string
const refetchTokenURL = `${baseURL}/user/refresh-token`

// for multiple requests
let isRefreshing = false
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: any = null) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

async function refreshToken(access_token:string , refresh_token: string) {
  try {
    const res = await Axios.request<RefreshTokenResponse>({
      method: 'POST',
      baseURL: refetchTokenURL,
      headers: {
        Authorization: 'Bearer ' + access_token
      },
      data: {
        refresh_token: refresh_token
      }
    })

    return res.data
  } catch (error) {
    throw Error('refetching token failed.')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const interceptor = (axiosInstance: any) => (error: any) => {
  const _axios = axiosInstance
  const originalRequest = error.config

  if (error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject })
      })
        .then(() => {
          //   originalRequest.headers["Authorization"] = "Bearer " + token;
          return _axios.request(originalRequest)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }

    originalRequest._retry = true
    isRefreshing = true

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const refresh_token = localStorage.getItem('refresh_token')
      const access_token = localStorage.getItem('access_token')
      try {
        if (refresh_token) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const response = await refreshToken(access_token, refresh_token)
          
          if (response && response.data.access_token && response.data.access_token) {        
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            processQueue(null, response.data.access_token)
            resolve(_axios(originalRequest))
          } else {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.replace('/dang-nhap')
          }
        }
      } catch (err) {
        processQueue(err, null)
        reject(err)
      } finally {
        isRefreshing = false
      }
    })
  }

  //   return Promise.reject(error);
  return Promise.reject(error.response.data)
}

export default interceptor
