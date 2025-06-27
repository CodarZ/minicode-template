const opt = Object.prototype.toString;

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === "[object Array]";
}

export function isNull(obj: any): obj is null {
  return opt.call(obj) === "[object Null]";
}

export function isBoolean(obj: unknown): obj is boolean {
  return opt.call(obj) === "[object Boolean]";
}

export function isObject<T>(obj: T): obj is Extract<T, Record<string, any>> {
  return opt.call(obj) === "[object Object]";
}

export function isArrayBuffer(value: any): boolean {
  return Object.getPrototypeOf(value) === ArrayBuffer.prototype;
}

export function isPromise<T>(obj: unknown): obj is Promise<T> {
  return opt.call(obj) === "[object Promise]";
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === "[object String]";
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === "[object Number]" && obj === obj;
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === "function";
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isDate(obj: any) {
  return opt.call(obj) === "[object Date]";
}
