import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/branches',
    methods: 'POST',
    params: query
  })
}

export function fetchInfo(id) {
  return request({
    url: '/branches/' + id,
    method: 'GET'
  })
}
