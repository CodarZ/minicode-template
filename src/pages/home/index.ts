import { Log } from '@/utils/log'

Page({
  data: {
    list: 100,
  },
  onLoad() {
    console.log('Home')

    Log.INFO('info', { a: 1, b: 2, c: 3, d: { e: 5 } })
    Log.WARN('warn', { a: 1, b: 2, c: 3, d: { e: 5 } })
    Log.ERROR('error', { a: 1, b: 2, c: 3, d: { e: 5 } })
  },
})
