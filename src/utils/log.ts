import { BaseENV } from "./env";

const logManager = wx.getLogManager({ level: 1 });
const realtimeLogManager = wx.getRealtimeLogManager();

/** 日志转为字符串存储 */
function formatLog(notRealtime: boolean, ...args: any[]): string {
  let currentPath = "";
  if (notRealtime) {
    const pages = getCurrentPages(); // 获取页面栈
    if (pages.length) {
      const currentPage = pages[pages.length - 1];
      currentPath = currentPage.route;
    } else {
      currentPath = "Unknown Page";
    }
  }

  return `${BaseENV.envName} | ${currentPath} | ${args.map((a) => JSON.stringify(a)).join(" ")}`;
}

function _log(type: "error" | "warn" | "info", ...args: any[]) {
  const logStr = formatLog(true, ...args);
  const realtimeLog = formatLog(false, ...args);

  // 日志类型配置
  const logConfig = {
    info: {
      color: "#0052d9",
      consoleMethod: console.log,
      logMethod: (msg: string) => logManager?.info(msg),
      realtimeMethod: null,
    },
    warn: {
      color: "#ff7d00",
      consoleMethod: console.log,
      logMethod: (msg: string) => logManager?.warn(msg),
      realtimeMethod: (msg: string) => realtimeLogManager?.warn(msg),
    },
    error: {
      color: "#ff0000",
      consoleMethod: console.error,
      logMethod: (msg: string) => logManager?.debug(msg),
      realtimeMethod: (msg: string) => realtimeLogManager?.error(msg),
    },
  };

  const config = logConfig[type];

  // 控制台输出
  if (type !== "error") {
    config.consoleMethod(
      `%c${type.charAt(0).toUpperCase() + type.slice(1)}`,
      `background-color:${config.color};border-radius:4px;padding:0 4px`,
      ...args,
    );
  } else {
    config.consoleMethod(...args);
  }

  config.logMethod(logStr);

  // 实时日志管理器输出
  config.realtimeMethod && config.realtimeMethod(realtimeLog);
}

function INFO(...args: any[]): void {
  _log("info", ...args);
}
function WARN(...args: any[]): void {
  _log("warn", ...args);
}
function ERROR(...args: any[]): void {
  _log("error", ...args);
}

const Log = {
  INFO,
  WARN,
  ERROR,
};

export { Log };
