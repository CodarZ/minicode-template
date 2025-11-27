import { RequestStatus, RequestStatusKey } from "@/constants/enums";
import { BaseENV } from "./env";
import { Log } from "./log";

/** 请求拦截器 */
export function _requestInterceptor(
  url: string,
  options?: Omit<WechatMiniprogram.RequestOption, "url" | "method" | "data">,
) {
  let formatURL = url;
  let noPrefixURL = url;

  if (url.startsWith("/api")) {
    noPrefixURL = url.replace(/^\/api/, "");
    formatURL = `${BaseENV.SERVER_URL}${noPrefixURL}`;
  }

  const token = wx.getStorageSync<string>("token") || null;

  let configs = {};

  if (token) configs = { header: { authorization: token } };
  if (options) Object.assign(configs, options);

  return { formatURL, noPrefixURL, configs };
}

export function _responseInterceptor<T>(
  res: WechatMiniprogram.RequestSuccessCallbackResult | WechatMiniprogram.UploadFileSuccessCallbackResult,
  url: string,
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void,
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
    Log.ERROR("【无法解析返回数据】|", url, "|", responseData);
  }

  const title = responseData.msg || RequestStatus[responseData.code as RequestStatusKey] || "系统异常";

  if (statusCode === 200) {
    if (responseData.code === 200) {
      Log.INFO("【请求成功】| ", url, "|", responseData);

      resolve(responseData as T);
    } else if (responseData.code === 401) {
      wx.showToast({
        title,
        icon: "none",
        duration: 2000,
        mark: true,
        // complete() {
        //   wx.removeStorageSync("token");
        //   wx.clearStorageSync();
        //   setTimeout(() => {
        //     wx.reLaunch({
        //       url: "/pages/home/index",
        //     });
        //   }, 2000);
        // },
      });

      reject(new Error(title));
    } else {
      Log.ERROR("【请求失败】| ", url, "|", responseData.code, title, "|", responseData);

      wx.showToast({
        title,
        icon: "none",
        duration: 3000,
        mark: true,
      });

      reject(new Error(title));
    }
  } else {
    Log.ERROR("【wx.request】| ", url, statusCode, "|", responseData);

    wx.showToast({
      title,
      icon: "none",
      duration: 3000,
      mark: true,
    });
    reject(new Error(title));
  }
}
