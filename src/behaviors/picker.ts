import { TdPopupProps } from "tdesign-miniprogram/popup/type";
import dayjs from "dayjs";

/**
 * Tdesign 的 Picker 选择器通用封装
 *
 * @description 提供了通用的选择器行为，包括普通选择器和日期时间选择器
 * @module behaviors/picker
 */
const pickerBehavior = Behavior({
  data: {
    /** 记录当前激活的选择器字段名称 */
    _pickedProp: "",

    /** Picker 选择器弹出层属性 */
    _PickerPopupProps: {
      usingCustomNavbar: true,
    } as unknown as TdPopupProps,

    /** DateTimePicker 日期选择器弹出层属性 */
    _DateTimePickerPopupProps: {
      usingCustomNavbar: true,
    } as unknown as TdPopupProps,

    /** 默认显示时间，默认为当前时间 */
    _DateTimePickerDefault: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  },
  methods: {
    /**
     * 自动显示 data-prop 绑定的对应的 Picker 选择器
     *
     * @example <view data-prop="propName" bindtap="_showPicker"></view>
     */
    _showPicker(e: WechatMiniprogram.CustomEvent) {
      const { prop } = e.currentTarget.dataset;
      this.setData({ _pickedProp: prop, [`${prop}Visible`]: true });
    },

    /**
     * 自动关闭当前激活的选择器
     *
     * @example this._closePicker()
     */
    _closePicker() {
      const { _pickedProp } = this.data;
      this.setData({ [`${_pickedProp}Visible`]: false, _pickedProp: "" });
    },

    /**
     * 默认的选择器确认事件处理函数
     *
     * @remarks
     * - 日期选择器 `DateTimePicker` 没有 `label` 属性
     * - 普通选择器 `Picker` 的值为数组类型
     */
    _onConfirm(e: WechatMiniprogram.CustomEvent) {
      const { value, label } = e.detail;
      const { prop } = e.target.dataset;

      this.setData({
        [`${prop}Value`]: value,
        [`${prop}Text`]: label || value,
        [`${prop}Visible`]: false,
      });
    },
  },
});

export default pickerBehavior;
