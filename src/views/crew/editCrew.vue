<template>
  <div class="container-fluid">
    <go-back></go-back>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('crew.editCrew')" name="editCrew">
        <el-form :model="crewInfoForm" :rules="rules" status-icon ref="crewInfoForm">
          <el-form-item prop="name">
            <el-input name="name" type="text" ref="name" v-model="crewInfoForm.name" maxlength="10" autoComplete="off" :placeholder="$t('crew.name')"></el-input>
          </el-form-item>
          <el-form-item prop="staff">
            <el-input name="staff" type="text" ref="staff" v-model="crewInfoForm.staff" maxlength="10" autoComplete="off" :placeholder="$t('crew.staff')"></el-input>
          </el-form-item>
          <el-form-item prop="cellphone">
            <el-input name="cellphone" type="tel" ref="cellphone" v-model="crewInfoForm.cellphone" maxlength="11" autoComplete="off" :placeholder="$t('crew.cellphone')"></el-input>
          </el-form-item>
          <el-form-item prop="bank">
            <el-select v-model="crewInfoForm.bank.name" :placeholder="$t('crew.bank')">
              <el-option v-for="item in bankOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item prop="role">
            <el-radio-group v-model="crewInfoForm.role.id">
              <el-radio :label="1">系统管理员</el-radio>
              <el-radio :label="2">银行管理人员</el-radio>
              <el-radio :label="3">银行工作人员</el-radio>
              <el-radio :label="4">银行工作人员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" type="password" ref="password" v-model="crewInfoForm.password" minlength="6" maxlength="30" autoComplete="off" :placeholder="$t('form.password')"></el-input>
          </el-form-item>
          <el-form-item prop="rePassword">
            <el-input name="rePassword" type="password" ref="rePassword" v-model="crewInfoForm.rePassword" minlength="6" maxlength="30" autoComplete="off" :placeholder="$t('form.rePassword')"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="$t('crew.crewAvatar')">
            <el-upload 
              class="avatar-uploader"
              action='http://upload.qiniu.com/'
              :show-file-list='false'
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :data='postData'>
              <img v-if="crewInfoForm.avatarUrl" :src="crewInfoForm.avatarUrl" width="128" height="128" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item> -->
          <el-form-item>
            <el-col :span="24" style="padding-left: 0; padding-right: 0;">
              <el-button class="el-button-block" type="success" @click.native.prevent="submitCrewInfo" plain>{{$t('crew.submit')}}</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCrewsInfo } from '@/api/crew'
import goBack from '@/components/GoBack'
import errorConfig from '@/errorConfig'
import {
  isvalidCellphone,
  isvalidCrewStaff,
  isvalidCrewRealname,
  isvalidPassword,
  isvalidRePassword
} from '@/utils/validate'
const bankOptions = [
  { id: 0, name: '中国银行' },
  { id: 1, name: '招商银行' },
  { id: 2, name: '中国建设银行' },
  { id: 3, name: '中国光大银行' },
  { id: 4, name: '中国农业银行' },
  { id: 5, name: '中国民生银行' },
  { id: 6, name: '兴业银行' }
]

export default {
  name: 'editCrew',
  data() {
    const validateCrewRealname = (rule, value, callback) => {
      const inputCrewRealname = this.$refs.crewRealname
      if (isvalidCrewRealname(inputCrewRealname, value)) {
        callback()
      }
    }
    const validateCrewStaff = (rule, value, callback) => {
      const inputCrewStaff = this.$refs.crewStaff
      if (isvalidCrewStaff(inputCrewStaff, value)) {
        callback()
      }
    }
    const validateCellphone = (rule, value, callback) => {
      const inputCellphone = this.$refs.cellPhone
      if (isvalidCellphone(inputCellphone, value)) {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const inputPassword = this.$refs.password

      if (isvalidPassword(inputPassword, value)) {
        callback()
      }
    }
    const validateRePassword = (rule, value, callback) => {
      const inputRePassword = this.$refs.rePassword
      const passwordValue = this.$refs.password.currentValue
      if (isvalidRePassword(inputRePassword, value, passwordValue)) {
        callback()
      }
    }
    return {
      bankOptions,
      activeName: 'editCrew',
      crewInfoForm: {
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
          id: 1,
          name: null
        },
        password: '',
        rePassword: ''
      },
      rules: {
        name: [
          { required: true, validator: validateCrewRealname, trigger: 'blur' }
        ],
        staff: [
          { required: true, validator: validateCrewStaff, trigger: 'blur' }
        ],
        cellphone: [
          { required: true, validator: validateCellphone, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, validator: validateRePassword, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    goBack
  },
  created() {
    this.getCrewInfo(this.getCrewId())
  },
  methods: {
    getCrewId() {
      // this.crewId = this.$route.params.id
      // console.log(this.crewId)
      return this.$route.params.id
    },
    getCrewInfo(crewId) {
      if (crewId && crewId !== '-1') {
        getCrewsInfo(crewId).then(response => {
          this.crewInfoForm = response.data.data
          console.log(this.crewInfoForm)
          console.log('update')
        })
      } else if (crewId === '-1') {
        console.log('add')
      } else {
        this.$message({
          message: errorConfig.ER_PARAMETER,
          type: 'error'
        })
      }
    },
    submitCrewInfo() {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
