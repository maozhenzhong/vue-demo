import Mock from 'mockjs'
import signInAPI from './signIn'
import baseInfoAPI from './baseInfo'
import articleAPI from './article'
import crewAPI from './crew'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', signInAPI.signInByUsername)
Mock.mock(/\/login\/logOut/, 'post', signInAPI.signOut)
Mock.mock(/\/user\/info\.*/, 'get', signInAPI.getUserInfo)

// 银行信息
Mock.mock(/\/baseInfo\/getUserInfo/, 'get', baseInfoAPI.getUserInfo)
Mock.mock(/\/baseInfo\/update/, 'post', baseInfoAPI.updateUserInfo)
Mock.mock(/\/baseInfo\/getPassword/, 'get', baseInfoAPI.getPassword)
Mock.mock(/\/baseInfo\/sendSmsVerifcationCode/, 'post', baseInfoAPI.sendMessage)
Mock.mock(/\/baseInfo\/changePwd/, 'post', baseInfoAPI.changePassword)

// 人员管理
Mock.mock(/\/crew\/list/, 'get', crewAPI.getCrewList)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'get', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
