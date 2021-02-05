import  { isPlainObject, isDate} from './util'
import has = Reflect.has

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any) {
  // 处理hash #
  let hashIndex = url.indexOf('#')
  if (hashIndex !== -1) {
    url = url.substring(0, hashIndex)
  }

  // 处理null undefined
  if(!params) return url


  let parts: string[] = []

  Object.keys(params).forEach((key) => {
    let result: string
    let value = params[key]
    if (value === null || value === undefined) return
    if(Array.isArray(value)) {
      return value.forEach((item, index)=> {
        parts.push(`${encode(key)}[]=${encode(item)}`)
      })
    }
    if(isPlainObject(value)) {
      return parts.push(`${encode(key)}=${encode(JSON.stringify(value))}`)
    }
    if(isDate(value)) {
      return parts.push(`${encode(key)}=${value.toISOString()}`)
    }
    parts.push(`${encode(key)}=${encode(value)}`)
  })
  let partsUrl: string = parts.join('&')

  let result = url.indexOf('?') === -1 ? (url + '?' + partsUrl) : (url + '&' + partsUrl)
  return result
}
