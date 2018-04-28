import request from '@/utils/request'

export function userSearch(name) {
  return request({
    url: '/search/user',
    method: 'GET',
    params: { name }
  })
}
