<template>
  <div class="container-fluid">
    <!-- 搜索 -->
    <div class="filter-bar">
      <div class="left">
        <el-select class="select-usergroup filter-item" v-model="listQuery.crewUsergroup" :placeholder="$t('filter.selectPlaceholder')">
          <el-option
            v-for="item in userGroupOptions"
            :key="item.key"
            :label="item.usergroup"
            :value="item.key">
          </el-option>
        </el-select>
        <div class="search-component filter-item">
          <el-input class="search-input" :placeholder="$t('filter.searchPlaceholder')">
          </el-input>
          <el-button class="search-btn" type="primary" icon="el-icon-search">{{$t('filter.searchBtn')}}</el-button>
        </div>
      </div>
      <div class="right">
        <el-button class="filter-item" type="primary" icon="el-icon-edit">{{$t('filter.add')}}</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table
      :data="crewList"
      v-loading="crewListLoading"
      :element-loading-text="$t('table.loadingText')"
      border
      fit
      style="width: 100%">
      <el-table-column
        :label="$t('crew.crewStaff')"
        align="center"
        width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.crewStaff }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('crew.crewRealname')"
        align="center"
        width="140">
        <template slot-scope="scope">
          <a class="link-type" @click="handleView(scope.row)">{{ scope.row.crewRealname }}</a>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('crew.crewCellPhone')"
        align="center"
        width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.crewCellPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('crew.crewRole')">
        <template slot-scope="scope">
          <span>{{ scope.row.crewRole }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('crew.crewUsergroup')">
        <template slot-scope="scope">
          <span>{{ scope.row.crewUsergroup | userGroupFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('crew.crewStatus')"
        width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.crewStatus | statusFilterByTag">{{scope.row.crewStatus | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        :label="$t('table.actions')"
        width="120">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{$t('table.actions')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{$t('table.modify')}}</el-dropdown-item>
              <el-dropdown-item>{{$t('table.view')}}</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.crewStatus!==0">
                <a @click="handleModifyStatus(scope.row, 0)">{{$t('table.enable')}}</a>
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.crewStatus!==1">
                <a @click="handleModifyStatus(scope.row, 1)">{{$t('table.disabled')}}</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page" 
        :page-sizes="[10, 20, 30, 50]" 
        :page-size="listQuery.limit" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      :title="$t('crew.viewTitle')"
      :visible.sync="crewDialogVisible"
      width="390px">
      <div class="crew-info-container">
        <div class="crew-info-avatar">
          <figure class="avatar">
            <img :src="crewInfo.avatar">
          </figure>
        </div>
        <div class="crew-info-content">
          <dl class="dl-horizontal">
            <dt>{{$t('crew.crewRealname')}}</dt>
            <dd>{{crewInfo.crewRealname}}</dd>
            <dt>{{$t('crew.crewStaff')}}</dt>
            <dd>{{crewInfo.crewStaff}}</dd>
            <dt>{{$t('crew.crewUsergroup')}}</dt>
            <dd>{{crewInfo.crewUsergroup.name}}</dd>
            <dt>{{$t('crew.crewCellPhone')}}</dt>
            <dd>{{crewInfo.crewCellPhone}}</dd>
            <dt>{{$t('crew.crewRole')}}</dt>
            <dd>{{crewInfo.crewRole}}</dd>
          </dl>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="crewDialogVisible=false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/crew'
import promptConfig from '@/promptConfig'

const userGroupOptions = [
  { key: 'BOC', usergroup: '中国银行' },
  { key: 'CMB', usergroup: '招商银行' },
  { key: 'CCB', usergroup: '中国建设银行' },
  { key: 'CEB', usergroup: '中国光大银行' },
  { key: 'ABC', usergroup: '中国农业银行' },
  { key: 'CMBC', usergroup: '中国民生银行' },
  { key: 'CIB', usergroup: '兴业银行' }
]
const userGroupOptionsValue = userGroupOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.usergroup
  return acc
}, {})
export default {
  name: 'crew',
  data() {
    return {
      userGroupOptions,
      selectedValue: '',
      crewList: [],
      crewInfo: {
        avatar: null,
        crewCellPhone: null,
        crewRealname: null,
        crewRole: null,
        crewStaff: null,
        crewStatus: null,
        crewUsergroup: {
          id: null,
          name: null
        }
      },
      total: 0,
      crewListLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        crewUsergroup: {
          id: null,
          name: null
        },
        sort: '+id'
      },
      crewDialogVisible: false
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
        0: 'primary',
        1: 'danger'
      }
      return statusMap[status]
    },
    userGroupFilter(type) {
      return userGroupOptionsValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.crewListLoading = true
      fetchList(this.listQuery).then(response => {
        this.crewList = response.data.items
        this.total = response.data.total
        this.crewListLoading = false
      })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: promptConfig.SUCCESSFUL_OPERATION,
        type: 'success'
      })
      row.crewStatus = status
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleView(row) {
      this.crewInfo = row
      this.crewDialogVisible = true
      console.log(this.crewInfo)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.select-usergroup {
  width: 120px;
}
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
