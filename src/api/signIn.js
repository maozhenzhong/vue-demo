import request from '@/utils/request'

export function signInByCellPhone(cellPhone, password) {
  const data = {
    cellPhone,
    password
  }
  return request({
    url: '/login/login',
    method: 'POST',
    data
  })
}

export function signOut() {
  return request({
    url: '/login/logOut',
    method: 'POST'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'GET',
    params: { token }
  })
}

