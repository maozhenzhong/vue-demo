import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/baseInfo/getUserInfo',
    method: 'GET'
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/baseInfo/update',
    method: 'POST',
    data
  })
}

export function getOldPassword() {
  return request({
    url: '/baseInfo/getPassword',
    method: 'GET'
  })
}

export function sendSmsVerifcationCode(data) {
  return request({
    url: '/baseInfo/sendSmsVerifcationCode',
    method: 'POST'
  })
}

export function changePassword(data) {
  return request({
    url: '/baseInfo/changePwd',
    method: 'POST'
  })
}
