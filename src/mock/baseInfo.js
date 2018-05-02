// import Mock from 'mockjs'
export default {
  getUserInfo: () => ({
    cellPhone: '18800000000',
    crewStaff: 'ZHYH201802',
    affiliatedBank: '中国银行',
    crewRealname: '宜昌市中国银行',
    avatarUrl: './src/assets/img/user_avatar.png'
  }),
  updateUserInfo: () => ({
    data: 'success'
  }),
  getPassword: () => ({
    data: 'admin8888'
  }),
  sendMessage: () => ({
    data: '4406'
  }),
  changePassword: () => ({
    data: 'success'
  })
}
