import Toast, { hideToast as hToast } from "tdesign-miniprogram/toast/index";

const useToastBehavior = Behavior({
  methods: {
    showToast(selector: string = "#t-toast", message: string) {
      Toast({
        context: this,
        selector,
        message,
      });
    },

    hideToast(selector: string = "#t-toast") {
      hToast({
        context: this,
        selector,
      });
    },
  },
});

export default useToastBehavior;
