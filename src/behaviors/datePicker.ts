import { TdPopupProps } from "tdesign-miniprogram/popup/type";
import dayjs from "dayjs";

/**
 * Tdesign 的 DateTime Picker 选择器通用封装
 */
const datePickerBehavior = Behavior({
  data: {
    _datePickedProp: "", // 记录当前激活的选择器字段名称
    _datePickedPropVisible: false, // 选择器是否可见
    _datePickedPropValue: "", // 选择器的显示值

    /** DateTimePicker 日期选择器弹出层属性 */
    _DateTimePickerPopupProps: {
      usingCustomNavbar: true,
    } as unknown as TdPopupProps,

    /** 默认显示时间，默认为当前时间 */
    _DateTimePickerDefault: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    _currentTime: new Date().getTime(),
  },
  methods: {
    /**
     * 显示 data-prop 绑定的对应的 DateTime Picker 选择器
     *
     * @example <view data-prop="propName" bindtap="_showDatePicker"></view>
     */
    _showDatePicker(e: WechatMiniprogram.CustomEvent) {
      const { prop } = e.currentTarget.dataset;

      this.setData(
        {
          _datePickedProp: prop,
          // @ts-ignore
          _datePickedPropValue: [this.data[prop]],
        },
        () => {
          this.setData({
            _datePickedPropVisible: true,
          });
        },
      );
    },

    /**
     * 关闭当前激活的选择器
     *
     * @example this._closeDatePicker()
     */
    _closeDatePicker(e: WechatMiniprogram.CustomEvent) {
      const trigger = e.detail.trigger;

      if (trigger === "confirm-btn") return;

      this.setData({
        _datePickedProp: "",
        _datePickedPropValue: "",
        _datePickedPropVisible: false,
      });
    },

    /**
     * 日期选择器确认事件处理函数
     *
     * - 日期选择器 `DateTimePicker` 没有 `label` 属性
     */
    _confirmDatePicker(e: WechatMiniprogram.CustomEvent) {
      const { value } = e.detail;
      const { _datePickedProp } = this.data;

      this.setData({ [`${_datePickedProp}`]: value }, () => {
        this._closeDatePicker(e);
        console.log(`Picker: ${_datePickedProp}`, value);
      });
    },
  },
});

export default datePickerBehavior;
