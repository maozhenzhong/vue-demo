import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/members',
    method: 'GET',
    params: query
  })
}
