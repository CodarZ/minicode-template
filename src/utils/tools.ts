import { isEmpty, isObject } from "./is";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 过滤掉对象中的空值属性，保留有效值 */
export function filterValidFields(obj: any): Record<string, any> {
  // 如果不是对象，直接返回原值
  if (!isObject(obj)) {
    return obj;
  }

  const result: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (!isEmpty(value)) {
      result[key] = value;
    }
  });

  return result;
}
