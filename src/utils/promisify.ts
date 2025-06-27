/** 对函数 Promise 化 */
export function promisify<T extends (...args: any) => any>(
  func: T,
  args?: Parameters<T>[0]
): Promise<ReturnType<T> extends void ? unknown : Awaited<ReturnType<T>>> {
  return new Promise((resolve, reject) => {
    func(
      Object.assign(args || {}, {
        success: resolve,
        fail: reject,
      })
    );
  });
}
