import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 50
let listLength = 0

for (listLength; listLength < count; listLength++) {
  List.push(Mock.mock({
    id: '@increment',
    'crewStaff': 2018000000,
    crewRealname: '@cname',
    'crewCellPhone|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
    'crewRole|1': ['人行管理人员', '银行工作人员', '银行管理人员'],
    'crewUsergroup|1': ['BOC', 'CMB', 'CCB', 'CEB', 'ABC', 'CMBC', 'CIB'],
    'crewStatus|1': [0, 1],
    'avatar|1': ['../assets/img/default_avatar.png', '../assets/img/user_avatar.png']
  }))
}

export default {
  getList: config => {
    const { crewStaff, crewRole, crewRealname, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (crewStaff && item.crewStaff !== +crewStaff) return false
      if (crewRole && item.crewRole !== crewRole) return false
      if (crewRealname && item.crewRealname.indexOf(crewRealname) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  }
}
