<template>
  <div class="container-fluid">
    <el-row :gutter="12">
      <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="3">
        <userinfo-bar :userInfo="avatarInfo"></userinfo-bar>
      </el-col>
      <el-col :xs="24" :sm="18" :md="20" :lg="20" :xl="21">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserinfoBar from './components/UserinfoBar'
const userInfoData = {
  cellphone: '18800000000',
  employeeId: '201804000000000',
  affiliatedBank: '中国银行',
  name: '宜昌市中国银行',
  avatarUrl: './src/assets/img/default-avatar.png'
}

export default {
  name: 'BankInfo',
  data() {
    return {
      avatarInfo: {
        name: userInfoData.name,
        avatarUrl: userInfoData.avatarUrl
      }
    }
  },
  components: {
    'userinfo-bar': UserinfoBar
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
</style>
