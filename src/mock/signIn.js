import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '管理员',
    avatar: './src/assets/img/default_avatar.png',
    name: '宜昌市中国银行'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: './src/assets/img/default_avatar.png',
    name: 'Normal Editor'
  }
}

export default {
  signInByUsername: config => {
    return userMap['admin']
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  signOut: () => 'success'
}
