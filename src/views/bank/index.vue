<template>
  <div class="container-fluid">
    <!-- 搜索 -->
    <div class="filter-bar">
      <div class="left">
        <div class="search-component filter-item">
          <el-input :placeholder="$t('bank.name')" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div class="right">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <router-link to="/bank/editBank/null">
              <el-button class="btn-add" type="success" icon="el-icon-edit" plain>{{$t('filter.add')}}</el-button>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 列表 -->
    <el-table :data="bankList" v-loading="listLoading" :element-loading-text="$t('table.loadingText')" border :default-sort="{prop: 'status', order: 'descending'}">
      <el-table-column :label="$t('bank.name')" prop="name" min-width="140">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.name }}</span> -->
          <a class="link-type" @click="handleView(scope.row)">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('bank.contactPhone')" prop="contactPhone" align="center" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('bank.logo')" prop="logo" align="center" min-width="140">
        <template slot-scope="scope">
          <img :src="scope.row.logo" :alt="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column :label="$t('bank.status')" prop="status" align="center" min-width="140">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilterByTag">{{scope.row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('bank.updateTime')" prop="updateTime" align="center" min-width="140">
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
                <router-link :to="'/bank/showBank/' + scope.row.id">{{$t('table.show')}}</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'/bank/editBank/' + scope.row.id"> {{$t('table.edit')}}</router-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.status!==0">
                <a @click="handleEditStatus(scope.row, 0)">{{$t('table.enable')}}</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.status!==1">
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
    <el-dialog :title="$t('bank.title')" :visible.sync="bankDialogVisible" width="390px">
      <div class="info-content">
        <dl class="dl-horizontal">
          <dt>{{$t('bank.name')}}</dt>
          <dd>{{bankInfo.name}}</dd>
          <dt>{{$t('bank.contactPhone')}}</dt>
          <dd>{{bankInfo.contactPhone}}</dd>
          <dt>{{$t('bank.logo')}}</dt>
          <dd><img :src="bankInfo.logo" :alt="bankInfo.name" /></dd>
          <dt>{{$t('bank.status')}}</dt>
          <dd><el-tag :type="bankInfo.status | statusFilterByTag">{{bankInfo.status | statusFilter}}</el-tag></dd>
          <dt>{{$t('bank.updateTime')}}</dt>
          <dd>{{bankInfo.updateTimeFormat}}</dd>
        </dl>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="bankDialogVisible=false" size="small" plain>{{$t('form.submit')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/bank'
import promptConfig from '@/promptConfig'
import config from '@/config'
export default {
  name: 'bank',
  data() {
    return {
      listLoading: true,
      bankDialogVisible: false,
      total: 0,
      bankList: null,
      bankInfo: {
        name: null,
        contactPhone: null,
        logo: null,
        status: 0,
        updateTime: null
      },
      listQuery: {
        page: 1,
        limit: 10
        // importance: undefined,
        // title: undefined,
        // bank: {
        //   id: null,
        //   name: null
        // },
        // sort: '+id'
      }
    }
  },
  created() {
    this.getLists(this.listQuery)
  },
  methods: {
    getLists(query) {
      this.listLoading = true
      fetchList(query).then(response => {
        const responseStatus = response.data.status
        const responseData = response.data.data
        if (responseStatus === config.STATUS_SUCCESS) {
          this.total = responseData.count
          this.bankList = responseData.list
        } else {
          this.$message({
            message: responseData.detail,
            type: 'error'
          })
        }
        this.listLoading = false
      })
    },
    handleView(row) {
      this.bankInfo = row
      this.bankDialogVisible = true
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
