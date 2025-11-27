import { TdPopupProps } from "tdesign-miniprogram/popup/type";

/**
 * Tdesign 的 Picker 选择器通用封装
 *
 * 用于单个选择器使用，多列选择需要再适配
 *
 * @description 提供普通 单列 选择器通用封装
 * @module behaviors/picker
 */
const pickerBehavior = Behavior({
  data: {
    /** 记录当前激活的选择器字段名称 */
    _pickedProp: "",
    /** 记录当前激活的选择器选项 */
    _pickedPropDict: [], // 选择器选项数据
    _pickedPropVisible: false, // 选择器是否可见
    _pickedPropValue: [], // 选择器的显示值

    /** Picker 选择器弹出层属性 */
    _PickerPopupProps: {
      usingCustomNavbar: true,
    } as unknown as TdPopupProps,
  },
  methods: {
    /**
     * 自动显示 data-prop 绑定的对应的 Picker 选择器
     *
     * @example <view data-prop="propName" bindtap="_showPicker"></view>
     */
    _showPicker(e: WechatMiniprogram.CustomEvent) {
      const { prop } = e.currentTarget.dataset;
      // @ts-ignore
      const dict = this.data[`${prop}Dict`] || [];

      this.setData(
        {
          _pickedPropDict: dict,
          _pickedProp: prop,
          // @ts-ignore
          _pickedPropValue: [this.data[prop]],
        },
        () => {
          this.setData({
            _pickedPropVisible: true,
          });
        },
      );
    },

    /**
     * 自动关闭当前激活的选择器
     *
     * @example this._closePicker()
     */
    _closePicker(e: WechatMiniprogram.CustomEvent) {
      const trigger = e.detail.trigger;

      if (trigger === "confirm-btn") return;

      this.setData({
        _pickedProp: "",
        _pickedPropValue: [],
        _pickedPropVisible: false,
      });
    },

    /**
     * 普通选择器确认事件处理函数
     *
     * @remarks
     * - 普通选择器 `Picker` 的值为数组类型
     */
    _confirmPicker(e: WechatMiniprogram.CustomEvent) {
      const { value, label } = e.detail;
      const { _pickedProp } = this.data;

      this.setData(
        {
          [`${_pickedProp}`]: value[0],
          [`${_pickedProp}Label`]: label?.[0] || value[0],
          _pickedPropVisible: false,
          _pickedPropValue: value,
        },
        () => {
          console.group(`Picker: ${_pickedProp}`);
          console.log("value:", value);
          console.log("label:", label);
          // @ts-ignore
          console.log(_pickedProp, this.data[_pickedProp]);
          // @ts-ignore
          console.log(`${_pickedProp}Label`, this.data[`${_pickedProp}Label`]);
          console.groupEnd();

          // this._closePicker(e);
        },
      );
    },
  },
});

export default pickerBehavior;
