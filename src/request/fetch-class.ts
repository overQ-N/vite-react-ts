type Interceptor = {
  request: ((config: object) => object) | null
  response: Function | null
}
type RequestFn = (url: string, options: object) => Promise<unknown>
class Request {
  public interceptor: Interceptor
  // public request:RequestFn
  constructor() {
    this.interceptor = {
      request: null,
      response: null,
    }
  }
  request(url: string, options = {}) {
    return new Promise((resolve, reject) => {
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        options = this.interceptor.request(options)
      }
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          if (this.interceptor.response && typeof this.interceptor.response === 'function') {
            const resInterceptors = this.interceptor.response(res)
            if (resInterceptors !== false) {
              resolve(resInterceptors)
            } else {
              reject(res)
            }
          } else {
            resolve(res)
          }
        })
        .catch((err) => reject(err))
    })
  }
}

export default new Request()
