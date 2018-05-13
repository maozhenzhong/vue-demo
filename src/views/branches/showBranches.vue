<template>
  <div class="container-fluid">
    <go-back></go-back>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('branches.title')" name="branchesInfo">
        <div class="show-content" v-loading="pageLoading" :element-loading-text="$t('table.loadingText')">
          <router-link class="edit-link" :to="'/branches/editBranches/' + branchesId">
            <el-button type="success" size="small" icon="el-icon-edit" plain>{{$t('table.edit')}}</el-button>
          </router-link>
          <el-row :gutter="10" style="margin-top: 34px;">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <dl class="dl-horizontal">
                <dt>{{$t('branches.name')}}</dt>
                <dd>{{branchesInfo.name}}</dd>
                <dt>{{$t('branches.contactAddress')}}</dt>
                <dd>{{branchesInfo.contactAddress}}</dd>
                <dt>{{$t('branches.contactPhone')}}</dt>
                <dd>{{branchesInfo.contactPhone}}</dd>
                <dt>{{$t('branches.contactName')}}</dt>
                <dd>{{branchesInfo.contactName}}</dd>
                <dt>{{$t('branches.status')}}</dt>
                <dd>
                  <el-tag :type="branchesInfo.status | statusFilterByTag">{{branchesInfo.status | statusFilter}}</el-tag>
                </dd>
                <dt>{{$t('branches.updateTime')}}</dt>
                <dd>{{branchesInfo.updateTimeFormat}}</dd>
              </dl>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <baidu-map class="bm-view" :ak="baduAppKey" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import goBack from '@/components/GoBack'
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
import { fetchInfo } from '@/api/branches'
import errorConfig from '@/errorConfig'
import config from '@/config'

export default {
  name: 'showBranches',
  components: {
    goBack,
    BaiduMap
  },
  data() {
    return {
      pageLoading: true,
      activeName: 'branchesInfo',
      branchesId: null,
      branchesInfo: {
        name: null,
        contactAddress: null,
        contactPhone: null,
        contactName: null,
        status: 0,
        updateTimeFormat: null
      },
      baduAppKey: 'q8XIcm2cPeYEMqpdTF75zAXvGbXnoMGj',
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 12
    }
  },
  created() {
    this.getBranchesInfo(this.getBranchesId())
  },
  methods: {
    getBranchesId() {
      this.branchesId = this.$route.params.id
      return this.branchesId
    },
    getBranchesInfo(id) {
      this.pageLoading = true
      if (id && id !== 'null') {
        fetchInfo(id).then(response => {
          const responseData = response.data
          if (responseData.status === config.STATUS_SUCCESS) {
            this.branchesInfo = responseData.data
            this.pageLoading = false
            console.log(this.branchesInfo)
          } else {
            this.$message({
              message: errorConfig.ER_PARAMETER,
              type: 'error'
            })
            this.$router.push({ path: '/branches' })
          }
        })
      } else {
        this.$message({
          message: errorConfig.ER_PARAMETER,
          type: 'error'
        })
        this.$router.push({ path: '/branches' })
      }
    },
    handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.bm-view {
  width: 100%;
  height: 300px;
}
</style>

