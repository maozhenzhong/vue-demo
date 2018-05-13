import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/personalCenter',
    method: 'GET'
  })
}

export function updateUserInfo(data, id) {
  return request({
    url: '/crews/' + id + '/edit',
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

export function updatePassword(data, id) {
  console.log(data, id)
  return request({
    url: '/crews/' + id + '/updatePassword',
    method: 'POST',
    data
  })
}
