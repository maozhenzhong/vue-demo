import request from '@/utils/request'

export function signInByCellphone(cellphone, password, csessionid, sig, token, scene) {
  const data = {
    cellphone,
    password,
    csessionid,
    sig,
    token,
    scene
  }
  return request({
    url: '/crews/signIn',
    method: 'POST',
    data
  })
}

export function signOut() {
  return request({
    url: '/crews/signOut',
    method: 'GET'
  })
}

export function getSignInHash() {
  return request({
    url: '/crews/signIn',
    method: 'GET'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/personalCenter',
    method: 'GET',
    params: { token }
  })
}

