import { BaseENV } from './env'

// const canIUseLogManage = wx.canIUse('getLogManager')
const logManager = wx.getLogManager({ level: 1 }) // log info warn debug
const realtimeLogManager = wx.getRealtimeLogManager() // info warn error

/** 日志转为字符串存储 */
function formatLog(notRealtime: boolean, ...args: any[]): string {
  let currentPath = ''
  if (notRealtime) {
    const pages = getCurrentPages() // 获取页面栈
    if (pages.length) {
      const currentPage = pages[pages.length - 1]
      currentPath = currentPage.route
    } else {
      currentPath = 'App'
    }
  }

  return `${BaseENV.envName} ${currentPath} | ${args.map((a) => JSON.stringify(a)).join(' ')}`
}

function _log(type: 'error' | 'warn' | 'info', ...args: any[]) {
  const logStr = formatLog(true, ...args)
  const realtimeLog = formatLog(false, ...args)

  if (realtimeLogManager) {
    if (type === 'info') {
      console.log('%cInfo', 'background-color:#0052d9;border-raduis:4px;padding:0 4px', ...args)
      logManager.info(logStr)
      // info 不做实时日志
      // realtimeLogManager.info(realtimeLog)
    } else if (type === 'warn') {
      console.log('%cWran', 'background-color:#ff7d00;border-raduis:4px;padding:0 4px', ...args)
      logManager.warn(logStr)
      // warn 不做实时日志
      realtimeLogManager.warn(realtimeLog)
    } else if (type === 'error') {
      console.error(...args)
      logManager.debug(logStr)
      realtimeLogManager.error(realtimeLog)
    }
  }
}

function INFO(...args: any[]): void {
  _log('info', ...args)
}
function WARN(...args: any[]): void {
  _log('warn', ...args)
}
function ERROR(...args: any[]): void {
  _log('error', ...args)
}

const Log = {
  INFO,
  WARN,
  ERROR,
}

export { Log }
