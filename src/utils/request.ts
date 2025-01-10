import { StatusCodeMessage } from '@/constants/enums'
import {
  requestInterceptor,
  responseInterceptor,
  uploadResponseInterceptor,
  uploadResquestInterceptor,
} from './interceptor/index'

const DEFAULT_TIMEOUT = 60000
const UPLOAD_TIMEOUT = 300000

function _httpRequest<T>(
  url: string,
  method: WechatMiniprogram.RequestOption['method'],
  data: WechatMiniprogram.RequestOption['data'],
  options?: Omit<WechatMiniprogram.RequestOption, 'url' | 'method' | 'data'>,
) {
  const { formatURL, configs } = requestInterceptor(url, options)

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    wx.request({
      url: formatURL,
      method,
      data,
      timeout: DEFAULT_TIMEOUT,
      ...configs,
      success: (res) => {
        const responseData = res.data as ApiResponse<T> // 开发者服务器返回的数据
        const title =
          `${responseData.msg}` || `${StatusCodeMessage[responseData.code]}` || '服务异常'

        const flag = responseInterceptor(res)
        if (flag) {
          resolve(responseData)
        } else {
          reject(new Error(title))
        }
      },
      fail: (err) => {
        // 只要开发者的服务器有响应，就不会走这里
        console.log(`${err.errno}: ${err.errMsg}`)
        reject(new Error(err.errMsg || '服务器异常'))
      },
      complete: () => {
        wx.hideLoading()
      },
    })
  })
}

function upload<T>(
  url: string,
  filePath: string,
  formData?: WechatMiniprogram.UploadFileOption['formData'],
  options?: Omit<WechatMiniprogram.UploadFileOption, 'url' | 'filePath' | 'formData'>,
) {
  const { formatURL, configs } = uploadResquestInterceptor(url, options)

  return new Promise<ApiResponse<T>>((resolve, reject) => {
    wx.showLoading({
      title: '正在上传中',
    })
    wx.uploadFile({
      url: formatURL,
      filePath,
      name: 'file',
      timeout: UPLOAD_TIMEOUT,
      useHighPerformanceMode: true,
      formData,
      ...configs,
      success: (res) => {
        const responseData = JSON.parse(res.data) as ApiResponse<T> // 开发者服务器返回的数据

        const title =
          `${responseData.msg}` || `${StatusCodeMessage[responseData.code]}` || '服务异常'

        const flag = uploadResponseInterceptor(res)
        if (flag) {
          resolve(responseData)
        } else {
          reject(new Error(title))
        }
      },
      fail: (err) => {
        // 只要开发者的服务器有响应，就不会走这里
        console.log(err.errMsg)
        reject(new Error(err.errMsg || '服务器异常'))
      },
      complete: () => {
        wx.hideLoading()
      },
    })
  })
}

function get<T>(
  url: string,
  params: WechatMiniprogram.IAnyObject,
  options?: Omit<WechatMiniprogram.RequestOption, 'url' | 'method' | 'data'>,
) {
  const data = JSON.stringify(params)
  return _httpRequest<T>(url, 'GET', data, options)
}

function post<T>(
  url: string,
  params: WechatMiniprogram.IAnyObject,
  options?: Omit<WechatMiniprogram.RequestOption, 'url' | 'method' | 'data'>,
) {
  return _httpRequest<T>(url, 'POST', params, options)
}

function put<T>(
  url: string,
  params: WechatMiniprogram.IAnyObject,
  config?: Omit<WechatMiniprogram.RequestOption, 'url' | 'method' | 'data'>,
) {
  return _httpRequest<T>(url, 'PUT', params, config)
}

function del<T>(
  url: string,
  params: WechatMiniprogram.IAnyObject,
  config?: Omit<WechatMiniprogram.RequestOption, 'url' | 'method' | 'data'>,
) {
  return _httpRequest<T>(url, 'DELETE', params, config)
}

const request = {
  get,
  post,
  put,
  del,
  upload,
}

export { request }
