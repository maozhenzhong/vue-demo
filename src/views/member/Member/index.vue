<template>
  <div class="container-fluid">
    <!-- 搜索 -->
    <div class="filter-bar">
      <div class="left">
        <div class="search-component filter-item">
          <el-input :placeholder="$t('member.searchValue')" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <!-- 列表 -->
    <el-table :data="memberList" v-loading="listLoading" :element-loading-text="$t('table.loadingText')" border :default-sort="{prop: 'status', order: 'descending'}">
      <el-table-column type="index" :label="$t('member.number')" align="center" prop="number" width="80"></el-table-column>
      <el-table-column class-name="hidden-md" :label="$t('member.cellphone')" prop="cellphone" align="center" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.cellphone }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="hidden-md" :label="$t('member.createTime')" prop="role" align="center" min-width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.createTimeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="hidden-md" align="center" :label="$t('member.status')" prop="status" sortable width="100">
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
                <router-link :to="'/member/showmember/' + scope.row.id">{{$t('table.show')}}</router-link>
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
  </div>
</template>

<script>
import { fetchList } from '@/api/member'
import promptConfig from '@/promptConfig'
import config from '@/config'
export default {
  name: 'Member',
  data() {
    return {
      total: 0,
      memberList: [],
      memberInfo: {
        cellphone: null,
        createTime: null,
        status: 0
      },
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      memberDialogVisible: false
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
          this.memberList = responseData.list
          this.total = responseData.count
          console.log(this.memberList)
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
      }).then(() => {
        this.$message({
          message: promptConfig.SUCCESSFUL_OPERATION,
          type: 'success'
        })
        row.status = status
      }).catch(() => {
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
    }
  }
}
</script>
