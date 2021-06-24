import axios from 'axios'
import {notification} from 'antd'
const request = axios.create()
request.interceptors.request.use((config) => {
  return config
},(err)=>Promise.reject(err))
request.interceptors.response.use((response) => {
  return response
},(err)=>Promise.reject(err))
export default request