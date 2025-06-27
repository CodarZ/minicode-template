import { RequestStatus, RequestStatusKey } from "@/constants/enums";
import { BaseENV } from "./env";
import { Log } from "./log";

/** 请求拦截器 */
export function _requestInterceptor(
  url: string,
  options?: Omit<WechatMiniprogram.RequestOption, "url" | "method" | "data">
) {
  let formatURL = url;

  if (url.startsWith("/api")) {
    const noPrefixURL = url.replace(/^\/api/, "");
    formatURL = `${BaseENV.SERVER_URL}${noPrefixURL}`;
  }

  const token = wx.getStorageSync<string>("token") || null;

  let configs = {};

  if (token) configs = { header: { authorization: token } };
  if (options) Object.assign(configs, options);

  return { formatURL, configs };
}

export function _responseInterceptor<T>(
  res:
    | WechatMiniprogram.RequestSuccessCallbackResult
    | WechatMiniprogram.UploadFileSuccessCallbackResult,
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
) {
  const { data, statusCode } = res;

  let responseData: WechatMiniprogram.IAnyObject = {};
  try {
    if (typeof data === "string") {
      responseData = JSON.parse(data) as WechatMiniprogram.IAnyObject;
    } else if (typeof data === "object" && data !== null) {
      responseData = data as WechatMiniprogram.IAnyObject;
    }
  } catch (error) {
    Log.ERROR(`【无法解析返回数据】 ${responseData}`);
  }

  const title =
    `${responseData.msg}` ||
    `${RequestStatus[responseData.code as RequestStatusKey]}` ||
    "系统异常";

  if (statusCode === 200) {
    Log.INFO(`【请求成功】| 200 |  ${data}`);
    if (responseData.code === 200) {
      resolve(data as T);
    } else if (responseData.code === 401) {
      Log.WARN(`【未授权登录】| 401 |  ${responseData.msg}`);

      wx.showToast({
        title,
        icon: "none",
        duration: 4000,
        success() {
          wx.removeStorageSync("token");
          wx.clearStorageSync();
          // wx.redirectTo({
          //   url: "/pages/login/index",
          // });
        },
      });
    }
  } else {
    Log.ERROR(`【请求失败】| ${statusCode} | ${title} ${responseData}`);
    reject(new Error(title));
  }
}
