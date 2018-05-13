<template>
  <div class="container-fluid">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('branches.baseInfo')" name="baseInfo">
        <div class="show-content">
          <dl class="dl-horizontal">
            <dt>{{$t('bank.name')}}</dt>
            <dd>中国人民银行</dd>
            <dt>{{$t('bank.briefIntroduction')}}</dt>
            <dd>Id vero perspiciatis nulla nihil.</dd>
            <dt>{{$t('bank.logo')}}</dt>
            <dd><img src="http://p855bfudy.bkt.clouddn.com/bank-11.png" /></dd>
            <dt>{{$t('bank.contactPhone')}}</dt>
            <dd>95566</dd>
          </dl>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('branches.branches')" name="branches">
        <!-- 搜索 -->
        <div class="filter-bar">
          <div class="left">
            <!-- <div class="search-component filter-item">
              <el-input :placeholder="$t('branches.name')" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div> -->
          </div>
          <div class="right">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <router-link to="/branches/editBranches/null">
                  <el-button class="btn-add" type="success" icon="el-icon-edit" plain>{{$t('filter.add')}}</el-button>
                </router-link>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 列表 -->
        <el-table :data="branchesList" v-loading="listLoading" :element-loading-text="$t('table.loadingText')" border :default-sort="{prop: 'status', order: 'descending'}">
          <el-table-column :label="$t('branches.name')" prop="name" min-width="180">
            <template slot-scope="scope">
              <a class="link-type" @click="handleView(scope.row)">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column :label="$t('branches.contactAddress')" prop="contactAddress" align="center" min-width="240">
            <template slot-scope="scope">
              <span>{{ scope.row.contactAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('branches.contactPhone')" prop="contactPhone" align="center" min-width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.contactPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('branches.status')" prop="status" align="center" min-width="80">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilterByTag">{{scope.row.status | statusFilter}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('branches.updateTime')" prop="updateTime" align="center" min-width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTimeFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.actions')" width="120">
            <template slot-scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{$t('table.actions')}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <router-link :to="'/branches/showBranches/' + scope.row.id">{{$t('table.show')}}</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link :to="'/branches/editBranches/' + scope.row.id"> {{$t('table.edit')}}</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.status !== 0">
                    <a @click="handleEditStatus(scope.row, 0)">{{$t('table.enable')}}</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.status !== -2">
                    <a @click="handleEditStatus(scope.row, -2)">{{$t('table.disabled')}}</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" :total="total">
          </el-pagination>
        </div>
        <!-- 弹框显示银行信息 -->
        <el-dialog :title="$t('branches.title')" :visible.sync="branchesDialogVisible" width="390px">
          <div class="info-content">
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
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="branchesDialogVisible=false" size="small" plain>{{$t('form.submit')}}</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { fetchList } from '@/api/branches'
import config from '@/config'
import promptConfig from '@/promptConfig'

export default {
  name: 'branches',
  data() {
    return {
      listLoading: true,
      branchesDialogVisible: false,
      activeName: 'baseInfo',
      branchesList: [],
      branchesInfo: {
        name: null,
        contactAddress: null,
        contactPhone: null,
        contactName: null,
        status: 0,
        updateTimeFormat: null
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    getBranchesList(query) {
      this.listLoading = true
      fetchList(query).then(response => {
        const responseStatus = response.data.status
        const responseData = response.data.data

        if (responseStatus === config.STATUS_SUCCESS) {
          this.branchesList = responseData.list
          this.total = responseData.count
          console.log(this.branchesList)
        } else {
          this.$message({
            message: responseData.detail,
            type: 'error'
          })
        }
        this.listLoading = false
      })
    },
    getBankInfo() {
      console.log('bankInfo')
    },
    handleClick(tab, event) {
      const paneName = tab.paneName
      if (paneName === 'branches') {
        this.getBranchesList(this.listQuery)
      } else if (paneName === 'baseInfo') {
        this.getBankInfo()
      }
    },
    handleView(row) {
      this.branchesInfo = row
      this.branchesDialogVisible = true
    },
    handleEditStatus(row, status) {
      this.$confirm('确认执行该操作吗？', '启用', {
        confirmButtonText: '确定',
        confirmButtonClass: 'is-plain el-button--success el-button--medium',
        cancelButtonText: '取消',
        cancelButtonClass: 'is-plain el-button--medium',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            message: promptConfig.SUCCESSFUL_OPERATION,
            type: 'success'
          })
          row.status = status
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          })
        })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getLists()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getLists()
    }
  }
}
</script>
