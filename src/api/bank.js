import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/banks',
    methods: 'GET',
    params: query
  })
}

export function fetchInfo(id) {
  return request({
    url: '/banks/' + id,
    methods: 'GET'
  })
}
