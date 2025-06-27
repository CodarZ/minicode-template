/** 判断当前是否是 Skyline 渲染 */
const SkylineBehavior = Behavior({
  data: {
    skylineRender: false,
  },
  lifetimes: {
    created() {
      this.setData({ skylineRender: this.renderer === "skyline" });
    },
  },
});

export default SkylineBehavior;
