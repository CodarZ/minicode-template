export default function updateManager() {
  if (!wx.canIUse("getUpdateManager")) {
    return;
  }

  const updateManager = wx.getUpdateManager();

  updateManager.onCheckForUpdate((res) => {
    console.log("检查是否有新版本:", res);
  });

  updateManager.onUpdateReady(() => {
    wx.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate();
        }
      },
    });
  });

  updateManager.onUpdateFailed(() => {
    wx.showModal({
      title: "更新提示",
      content: "新版本下载失败",
      showCancel: false,
    });
  });
}
