<template>
  <div class="container-fluid">
    <!-- 搜索 -->
    <div class="filter-bar">
      <div class="left">
        <div class="search-component filter-item">
          <el-input :placeholder="$t('crew.cellphone')" class="input-with-select">
            <el-select v-model="listQuery.bank" slot="prepend" :placeholder="$t('crew.bank')">
              <el-option v-for="item in bankOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div class="right">
        <el-row :gutter="10">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <router-link to="/crew/editCrew/null">
              <el-button class="btn-add" type="success" icon="el-icon-edit" plain>{{$t('filter.add')}}</el-button>
            </router-link>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-button type="primary" :loading="downloadLoading" icon="el-icon-download" @click="handleDownload" plain>{{$t('filter.export')}}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 列表 -->
    <el-table :data="crewList" v-loading="listLoading" :element-loading-text="$t('table.loadingText')" border :default-sort="{prop: 'status', order: 'descending'}">
      <el-table-column :label="$t('crew.name')" prop="name" sortable align="center" min-width="160">
        <template slot-scope="scope">
          <a class="link-type" @click="handleView(scope.row)">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column class-name="hidden-md" :label="$t('crew.cellphone')" prop="cellphone" align="center" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.cellphone }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="hidden-md" :label="$t('crew.role')" prop="role" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.role.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="hidden-md" :label="$t('crew.bank')" prop="bank" sortable min-width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.bank.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="hidden-md" align="center" :label="$t('crew.status')" prop="status" sortable width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilterByTag">{{scope.row.status | statusFilter}}</el-tag>
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
                <router-link :to="'/crew/showCrew/' + scope.row.id">{{$t('table.show')}}</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'/crew/editCrew/' + scope.row.id"> {{$t('table.edit')}}</router-link>
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

    <!-- 弹出显示人员信息 -->
    <el-dialog :title="$t('crew.title')" :visible.sync="crewDialogVisible" width="390px">
      <div class="info-content">
        <dl class="dl-horizontal">
          <dt>{{$t('crew.name')}}</dt>
          <dd>{{crewInfo.name}}</dd>
          <dt>{{$t('crew.cellphone')}}</dt>
          <dd>{{crewInfo.cellphone}}</dd>
          <dt>{{$t('crew.bank')}}</dt>
          <dd>{{crewInfo.bank.name}}</dd>
          <dt>{{$t('crew.role')}}</dt>
          <dd>{{crewInfo.role.name}}</dd>
        </dl>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="crewDialogVisible=false" size="small" plain>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/crew'
import { parseTime } from '@/utils'
import promptConfig from '@/promptConfig'
import config from '@/config'

const bankOptions = [
  { id: '1', name: '中国银行' },
  { id: '2', name: '招商银行' },
  { id: '3', name: '中国建设银行' },
  { id: '4', name: '中国光大银行' },
  { id: '5', name: '中国农业银行' },
  { id: '6', name: '中国民生银行' },
  { id: '7', name: '兴业银行' }
]

export default {
  name: 'crew',
  data() {
    return {
      bankOptions,
      selectedValue: '',
      crewList: [],
      crewInfo: {
        name: '',
        cellphone: '',
        bank: {
          id: '',
          name: ''
        },
        role: {
          id: '',
          name: ''
        }
      },
      total: 0,
      listLoading: true,
      downloadLoading: false,
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
      },
      crewDialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const responseStatus = response.data.status
        const responseData = response.data.data
        if (responseStatus === config.STATUS_SUCCESS) {
          this.crewList = responseData.list
          this.total = responseData.count
        } else {
          this.$message({
            message: responseData.detail,
            type: 'error'
          })
        }
        this.listLoading = false
      })
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
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['name', 'cellphone', 'role.name', 'bank', 'status']
        const filterVal = ['name', 'cellphone', 'role.name', 'bank', 'status']
        const data = this.formatJson(filterVal, this.crewList)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'crew-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    handleView(row) {
      this.crewInfo = row
      this.crewDialogVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.crew-info-container {
  @include clearfix;
  .crew-info-avatar {
    margin: 0 auto;
    width: 128px;
    .avatar {
      margin: 0 auto;
      width: 100%;
      text-align: center;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .crew-info-content {
    margin: 0 auto;
    min-width: 218px;

    dl {
      dt {
        padding-top: 5px;
      }
      dd {
        line-height: 30px;
      }
    }
  }
}
@media (min-width: 768px) {
  .crew-info-container {
    @include clearfix;
    .crew-info-avatar {
      margin-right: 12px;
      float: left;
    }
    .crew-info-content {
      float: left;
    }
  }
}
</style>
