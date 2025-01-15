import { StatusCodeMessage } from '@/constants/enums'
import {
  requestInterceptor,
  responseInterceptor,
  uploadResponseInterceptor,
  uploadResquestInterceptor,
} from './interceptor/index'
import { Log } from './log'

const DEFAULT_TIMEOUT = 60000
const UPLOAD_TIMEOUT = 300000

function _httpRequest<T>(
  url: string,
  method: WechatMiniprogram.RequestOption['method'],
  data: WechatMiniprogram.RequestOption['data'],
  options?: Omit<WechatMiniprogram.RequestOption, 'url' | 'method' | 'data'>,
) {
  const { formatURL, configs } = requestInterceptor(url, options)

  Log.INFO(`【发起请求】 |  ${method}`, formatURL, '附带参数: ', data)
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
          // TODO 处理 responseData 太多太长的问题
          Log.INFO(`【请求成功】 |  ${title}`, responseData)
          resolve(responseData)
        } else {
          // TODO 处理 responseData 太多太长的问题
          Log.ERROR(`【请求失败】 |  ${title}`, responseData)
          reject(new Error(title))
        }
      },
      fail: (err) => {
        // 只要开发者的服务器有响应，就不会走这里
        Log.ERROR(`【请求服务器无响应】 |  ${err.errno} ${err.errMsg}`)
        console.log(`${err.errno}: ${err.errMsg}`)
        reject(new Error(err.errMsg || '请求服务器无响应'))
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
  Log.INFO(`【发起上传文件请求】 | `, formatURL, '附带参数:', formData)
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
          // TODO 处理 responseData 太多太长的问题
          Log.INFO(`【文件上传成功】 |  ${title}`, responseData)
          resolve(responseData)
        } else {
          // TODO 处理 responseData 太多太长的问题
          Log.ERROR(`【文件上传失败】 |  ${title}`, responseData)
          reject(new Error(title))
        }
      },
      fail: (err) => {
        // 只要开发者的服务器有响应，就不会走这里
        Log.ERROR(`【上传文件服务器无响应】 |  ${err.errMsg}`)
        reject(new Error(err.errMsg || '上传文件服务无响应'))
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
