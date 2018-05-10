<template>
  <div class="container-fluid">
     <go-back></go-back>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('crew.title')" name="crewInfo">
        <div class="crew-info" v-loading="crewLoading" :element-loading-text="$t('table.loadingText')">
          <router-link class="edit-link" :to="'/crew/editCrew/' + crewId"><el-button type="success" size="small" icon="el-icon-edit" plain>编辑</el-button></router-link>
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
import { getCrewsInfo } from '@/api/crew'
import promptConfig from '@/promptConfig'
import goBack from '@/components/GoBack'

export default {
  name: 'show',
  data() {
    return {
      crewLoading: true,
      crewId: null,
      activeName: 'crewInfo',
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '启用',
        1: '禁用'
      }
      return statusMap[status]
    },
    statusFilterByTag(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getCrewId()
    this.getCrewInfo()
  },
  methods: {
    getCrewId() {
      this.crewId = this.$route.params.id
    },
    getCrewInfo() {
      this.crewLoading = true
      getCrewsInfo(this.crewId).then(responst => {
        const responseData = responst.data
        if (responseData.status === 1) {
          this.crewInfo = responseData.data
          console.log(this.crewInfo)
          this.crewLoading = false
        } else {
          this.$message({
            message: promptConfig.SUCCESSFUL_OPERATION,
            type: 'success'
          })
        }
      })
    }
  },
  components: {
    goBack
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>

