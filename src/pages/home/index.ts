import { pickerBehavior } from '@/mixins/picker'

Page({
  behaviors: [pickerBehavior],
  data: {
    list: 100,
    cityOptions: [
      { label: '北京市', value: '北京市' },
      { label: '上海市', value: '上海市' },
      { label: '广州市', value: '广州市' },
      { label: '深圳市', value: '深圳市' },
      { label: '成都市', value: '成都市' },
    ],
  },
  onLoad() {
    console.log('Home')
  },
})
