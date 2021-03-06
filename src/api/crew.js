import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/crews',
    method: 'GET',
    params: query
  })
}

export function fetchInfo(id) {
  return request({
    url: '/crews/' + id,
    method: 'GET'
  })
}
