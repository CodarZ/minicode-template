import updateManager from "./utils/update-manager";

App<IAppOption>({
  globalData: {},
  onShow() {
    updateManager();
  },
});
