<template>
  <div class="container-fluid">
    <go-back></go-back>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('bank.title')" name="bankInfo">
        <div class="show-content" v-loading="bankLoading" :element-loading-text="$t('table.loadingText')">
          <router-link class="edit-link" :to="'/bank/editbank/' + bankId"><el-button type="success" size="small" icon="el-icon-edit" plain>编辑</el-button></router-link>
          <dl class="dl-horizontal">
            <dt>{{$t('bank.name')}}</dt>
            <dd>{{bankInfo.name}}</dd>
            <dt>{{$t('bank.contactPhone')}}</dt>
            <dd>{{bankInfo.contactPhone}}</dd>
            <dt>{{$t('bank.logo')}}</dt>
            <dd><img :src="bankInfo.logo" :alt="bankInfo.name" /></dd>
            <dt>{{$t('bank.briefIntroduction')}}</dt>
            <dd>{{bankInfo.briefIntroduction}}</dd>
            <dt>{{$t('bank.status')}}</dt>
            <dd><el-tag :type="bankInfo.status | statusFilterByTag">{{bankInfo.status | statusFilter}}</el-tag></dd>
            <dt>{{$t('bank.updateTime')}}</dt>
            <dd>{{bankInfo.updateTimeFormat}}</dd>
          </dl>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { fetchInfo } from '@/api/bank'
import errorConfig from '@/errorConfig'
import goBack from '@/components/GoBack'
const SUCCESS_STATUS = 1
export default {
  name: 'showBank',
  components: {
    goBack
  },
  data() {
    return {
      bankLoading: true,
      activeName: 'bankInfo',
      bankId: null,
      bankInfo: {}
    }
  },
  created() {
    this.getBankInfo(this.getBankId())
  },
  methods: {
    getBankId() {
      this.bankId = this.$route.params.id
      return this.bankId
    },
    getBankInfo(id) {
      this.bankLoading = true
      if (id && id !== 'null') {
        fetchInfo(id).then(responst => {
          const responseData = responst.data
          if (responseData.status === SUCCESS_STATUS) {
            this.bankInfo = responseData.data
            this.bankLoading = false
          } else {
            this.$message({
              message: errorConfig.ER_PARAMETER,
              type: 'error'
            })
            this.$router.push({ path: '/bank' })
          }
        })
      } else {
        this.$message({
          message: errorConfig.ER_PARAMETER,
          type: 'error'
        })
        this.$router.push({ path: '/bank' })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
