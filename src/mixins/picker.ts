import type { TdPopupProps } from '@/miniprogram_npm/tdesign-miniprogram/popup'
import dayjs from 'dayjs'

export interface PickerBehaviorData {
  _pickedProp: string
  _DateTimePickerPopupProps: TdPopupProps
  _DateTimePickerDefault: string
}

export interface PickerBehaviorMethods {
  _showPicker: (e: WechatMiniprogram.CustomEvent) => void
  _closePicker: () => void
  _onConfirm: (e: WechatMiniprogram.CustomEvent) => void
}

export const pickerBehavior = Behavior({
  data: {
    _pickedProp: '',

    /** Picker 选择器 */
    _PickerPopupProps: {},

    /** DateTimePicker 日期选择器 */
    _DateTimePickerPopupProps: { usingCustomNavbar: true },
    _DateTimePickerDefault: dayjs().format(),
  },
  methods: {
    /** 显示 */
    _showPicker(e: WechatMiniprogram.CustomEvent) {
      const { prop } = e.currentTarget.dataset
      this.setData({ _pickedProp: prop, [`${prop}Visible`]: true })
    },
    /** 关闭 */
    _closePicker() {
      const { _pickedProp } = this.data
      this.setData({ [`${_pickedProp}Visible`]: false })
    },
    /**
     * 日期选择器 `DateTimePicker`
     *  - 没有 `label`
     *
     * 普通选择器 `Picker`
     *  - 值 为数组类型
     */
    _onConfirm(e: WechatMiniprogram.CustomEvent) {
      const { value, label } = e.detail
      const { prop } = e.target.dataset

      this.setData({
        [`${prop}Value`]: value,
        [`${prop}Text`]: label || value,
        [`${prop}Visible`]: false,
      })
    },
  },
})
