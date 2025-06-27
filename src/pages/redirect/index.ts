Page({
  onLoad() {
    wx.showLoading({
      title: "加载中...",
    });

    // TODO 校验登录 token
    // TODO 校验跳转路径 query

    wx.reLaunch({
      url: "/pages/home/index",
      complete() {
        wx.hideLoading();
      },
    });
  },
});
