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

    /** DateTimePicker 日期选择器 */
    _DateTimePickerPopupProps: {
      usingCustomNavbar: true,
      overlayProps: { zIndex: 11599 },
      zIndex: 11700,
    },
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
    /** 确定 */
    _onConfirm(e: WechatMiniprogram.CustomEvent) {
      const { value, label } = e.detail
      const { _pickedProp } = this.data

      this.setData({
        [`${_pickedProp}Value`]: value,
        [`${_pickedProp}Text`]: label || value,
      })

      this._closePicker()
    },
  },
})
