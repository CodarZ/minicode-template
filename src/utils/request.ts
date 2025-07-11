import { _requestInterceptor, _responseInterceptor } from "./interceptor";
import { Log } from "./log";
import { filterValidFields } from "./tools";

type RequestOptions = Omit<
  WechatMiniprogram.RequestOption,
  "url" | "method" | "data"
> & {
  query?: string | WechatMiniprogram.IAnyObject | ArrayBuffer;
};

const DEFAULT_TIMEOUT = 60000;
const UPLOAD_TIMEOUT = 300000;

/**
 *
 * @param url  请求地址
 * @param method  请求方法
 * @param data 请求参数
 * @param options
 * @returns
 */
function _httpRequest<T>(
  url: string,
  method: WechatMiniprogram.RequestOption["method"],
  data: WechatMiniprogram.RequestOption["data"],
  options: RequestOptions = {}
) {
  const { noPrefixURL, formatURL, configs } = _requestInterceptor(url, options);

  Log.INFO("【发起请求】|", method, noPrefixURL, "|", data);

  return new Promise<T>((resolve, reject) => {
    wx.request({
      url: formatURL,
      data,
      method,
      dataType: "json",
      // enableCache: true,
      // enableHttp2: true,
      timeout: DEFAULT_TIMEOUT,
      useHighPerformanceMode: true,
      ...configs,
      success: (res) => {
        _responseInterceptor(res, noPrefixURL, resolve, reject);
      },
      fail: (err) => {
        // 只要开发者的服务器有响应，就不会走这里
        Log.ERROR(
          "【wx.request fail】| ",
          method,
          noPrefixURL,
          "|",
          err.errno,
          err.errMsg
        );
        wx.showToast({
          icon: "none",
          title: `${err.errno} ${err.errMsg}`,
          mark: true,
        });
        reject(new Error(err.errMsg || "服务异常"));
      },
    });
  });
}

function _createHttp(method: WechatMiniprogram.RequestOption["method"]) {
  return <T>(
    url: string,
    data: string | WechatMiniprogram.IAnyObject | ArrayBuffer = {},
    options?: RequestOptions
  ): Promise<T> => {
    return _httpRequest<T>(url, method, filterValidFields(data), options);
  };
}

/**
 *
 * @param url 请求地址
 * @param filePath 要上传文件资源的路径 (本地路径)
 * @param formData HTTP 请求中其他额外的 form data
 * @param options
 * @returns
 */
function upload<T>(
  url: string,
  filePath: string,
  formData?: WechatMiniprogram.UploadFileOption["formData"],
  options: RequestOptions = {}
) {
  const { formatURL, noPrefixURL, configs } = _requestInterceptor(url, options);

  Log.INFO("【发起上传文件请求】|", noPrefixURL, "|", formData);

  return new Promise<T>((resolve, reject) => {
    wx.uploadFile({
      url: formatURL,
      filePath,
      name: "file", // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
      timeout: UPLOAD_TIMEOUT,
      enableHttp2: false,
      useHighPerformanceMode: true,
      formData,
      ...configs,
      success: (res) => {
        _responseInterceptor(res, noPrefixURL, resolve, reject);
      },
      fail: (err) => {
        // 只要开发者的服务器有响应，就不会走这里
        Log.ERROR("【wx.uploadFile fail】| ", noPrefixURL, "|", err.errMsg);
        wx.showToast({
          icon: "none",
          title: ` 上传服务无响应: ${err.errMsg}`,
          mark: true,
        });
        reject(new Error(err.errMsg || "上传服务无响应"));
      },
    });
  });
}

const request = {
  get: _createHttp("GET"),
  put: _createHttp("PUT"),
  del: _createHttp("DELETE"),
  post: _createHttp("POST"),
  upload,
};

export { request };
