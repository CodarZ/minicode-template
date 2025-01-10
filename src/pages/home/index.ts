import { request } from '@/utils/request';

Page({
  async onLoad() {
    try {
      const { data } = await request.post('/api/sdfsfsdf', {});
      console.log('请求信息: ', data);
    } catch (error: any) {
      wx.showToast({ title: error.message, icon: 'none' });
    }
    console.log('Home');
  },

  async test() {},
});
