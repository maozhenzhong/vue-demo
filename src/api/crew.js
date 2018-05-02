import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/crew/list',
    method: 'GET',
    params: query
  })
}
