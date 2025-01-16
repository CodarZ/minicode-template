import { pickerBehavior } from '@/mixins/picker'

Page({
  behaviors: [pickerBehavior],
  data: {
    list: 100,
  },
  onLoad() {
    console.log('Home')
  },
})
