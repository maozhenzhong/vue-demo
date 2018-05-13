<template>
  <div class="container-fluid">
     <go-back></go-back>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('crew.title')" name="crewInfo">
        <div class="show-content" v-loading="pageLoading" :element-loading-text="$t('table.loadingText')">
          <router-link class="edit-link" :to="'/crew/editCrew/' + crewId"><el-button type="success" size="small" icon="el-icon-edit" plain>{{$t('table.edit')}}</el-button></router-link>
          <dl class="dl-horizontal">
            <dt>{{$t('crew.staff')}}</dt>
            <dd>{{crewInfo.staff}}</dd>
            <dt>{{$t('crew.name')}}</dt>
            <dd>{{crewInfo.name}}</dd>
            <dt>{{$t('crew.avatar')}}</dt>
            <dd><img :src="crewInfo.avatar" width="128" height="128" /></dd>
            <dt>{{$t('crew.cellphone')}}</dt>
            <dd>{{crewInfo.cellphone}}</dd>
            <dt>{{$t('crew.bank')}}</dt>
            <dd>{{crewInfo['bank']['name']}}</dd>
            <dt>{{$t('crew.status')}}</dt>
            <dd><el-tag :type="crewInfo.status | statusFilterByTag">{{crewInfo.status | statusFilter}}</el-tag></dd>
            <dt>{{$t('crew.role')}}</dt>
            <dd>{{crewInfo['role']['name']}}</dd>
          </dl>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { fetchInfo } from '@/api/crew'
import errorConfig from '@/errorConfig'
import goBack from '@/components/GoBack'
import config from '@/config'

export default {
  name: 'show',
  components: {
    goBack
  },
  data() {
    return {
      pageLoading: true,
      activeName: 'crewInfo',
      crewId: null,
      crewInfo: {
        staff: null,
        userName: null,
        avatar: null,
        cellphone: null,
        bank: {
          id: 0,
          name: null
        },
        status: null,
        role: {
          id: 0,
          name: null
        }
      }
    }
  },
  created() {
    this.getCrewInfo(this.getCrewId())
  },
  methods: {
    getCrewId() {
      this.crewId = this.$route.params.id
      return this.crewId
    },
    getCrewInfo(id) {
      this.pageLoading = true
      if (id && id !== 'null') {
        fetchInfo(id).then(response => {
          const responseData = response.data
          if (responseData.status === config.STATUS_SUCCESS) {
            this.crewInfo = responseData.data
            this.pageLoading = false
          } else {
            this.$message({
              message: errorConfig.ER_PARAMETER,
              type: 'error'
            })
            this.$router.push({ path: '/crew' })
          }
        })
      } else {
        this.$message({
          message: errorConfig.ER_PARAMETER,
          type: 'error'
        })
        this.$router.push({ path: '/crew' })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
