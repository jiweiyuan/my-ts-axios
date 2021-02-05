import { AxiosRequestConfig } from './types'
import { head } from 'shelljs'

export default function xhr (config: AxiosRequestConfig) {
  const {data = null, url, method = 'get', headers} = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  // 请求body 数据之前请求header
  Object.keys(headers).forEach((name) => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else  {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
