const env = wx.getAccountInfoSync().miniProgram.envVersion;

const ENV = {
  // 开发版
  develop: {
    SERVER_URL: 'https://xxxxxxxx:8080',
  },
  // 体验版
  trial: {
    SERVER_URL: 'https://xxxxxxxx:8080',
  },
  // 正式版
  release: {
    SERVER_URL: 'https://xxxxxxxx:8080',
  },
};

const BaseENV = ENV[env];

export { BaseENV };
