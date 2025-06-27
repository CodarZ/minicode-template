export const RequestStatus = {
  200: "请求成功",
  400: "请求错误",
  401: "未授权,请先登录",
  403: "权限不足,拒绝访问",
  404: "请求资源不存在",
  408: "请求超时",
  500: "服务器内部异常",
  501: "服务未实现",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时",
} as const;
export type RequestStatusKey = keyof typeof RequestStatus;
export type RequestStatusValue = (typeof RequestStatus)[RequestStatusKey];
