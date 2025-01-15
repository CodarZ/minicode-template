const env = wx.getAccountInfoSync().miniProgram.envVersion

const ENV = {
  develop: {
    env: 'develop',
    envName: '开发版',
    SERVER_URL: 'https://xxxxxxxx:8080',
  },
  trial: {
    env: 'trial',
    envName: '体验版',
    SERVER_URL: 'https://xxxxxxxx:8080',
  },
  release: {
    env: 'release',
    envName: '正式版',
    SERVER_URL: 'https://xxxxxxxx:8080',
  },
}

const BaseENV = ENV[env]

export { BaseENV }
