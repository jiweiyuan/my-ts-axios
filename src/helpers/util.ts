
export function isPlainObject(x: any): x is Object {
  return Object.prototype.toString.call(x) === "[object Object]"
}


export function isDate(x: any): x is Date {
  return Object.prototype.toString.call(x) === "[object Date]"
}
