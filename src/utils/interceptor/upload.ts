import { StatusCodeMessage } from '@/constants/enums'
import { BaseENV } from '../env'
import { Log } from '../log'

export function uploadResquestInterceptor(
  url: string,
  options?: Omit<WechatMiniprogram.UploadFileOption, 'url' | 'filePath' | 'formData' | 'name'>,
) {
  let formatURL = url
  if (url.startsWith('/api')) {
    const noPrefixURL = url.replace(/^\/api/, '')
    formatURL = `${BaseENV.SERVER_URL}${noPrefixURL}`
  }

  const token = wx.getStorageSync<string>('token') || null
  let configs: Omit<WechatMiniprogram.UploadFileOption, 'url' | 'filePath' | 'formData' | 'name'> =
    {}

  if (token) configs = { header: { authorization: token } }
  if (options) Object.assign(configs, options)

  return { formatURL, configs }
}

export function uploadResponseInterceptor<T>(
  res: WechatMiniprogram.UploadFileSuccessCallbackResult,
): boolean {
  let responseData: ApiResponse<T> | null = null

  try {
    if (typeof res.data === 'string') {
      responseData = JSON.parse(res.data) as ApiResponse<T>
    } else if (res.data && typeof res.data === 'object') {
      responseData = res.data as ApiResponse<T>
    } else {
      Log.ERROR('【文件上传失败】 |  返回数据, 无法被解析: ', responseData)
      throw new Error('无效的响应数据')
    }
  } catch (err) {
    return false
  }

  const title = `${responseData?.msg}` || `${StatusCodeMessage[responseData?.code]}` || '服务异常'

  if (res.statusCode === 200) {
    if (responseData?.code === 200) {
      return true
    } else if (responseData?.code === 401) {
      // 重新登录
      wx.showToast({
        title,
        icon: 'none',
        duration: 4000,
        success() {
          wx.removeStorageSync('token')
          // wx.clearStorageSync()
          wx.reLaunch({
            url: '/pages/home/index',
          })
        },
      })
      return false
    } else {
      return false
    }
  } else {
    return false
  }
}
