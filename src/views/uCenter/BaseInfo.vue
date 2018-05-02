<template>
  <div class="container-fluid">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="3">
        <userinfo-bar :userInfo="avatarInfo"></userinfo-bar>
      </el-col>
      <el-col :xs="24" :sm="16" :md="18" :lg="20" :xl="21">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$t('userInfo.userInfo')" name="userInfo">
            <el-form class="user-info-form" :model="userInfoForm" status-icon :rules="userInfoRules" ref="userInfoForm" :label-width="formLabelWidth">
              <el-form-item label="头像">
                <div class="change-avatar">
                  <img id="zoom" :src="imgDataUrl">
                  <el-button type="primary" size="medium" @click="toggleShow">{{$t('userInfo.setAvatar')}}<i class="el-icon-upload el-icon--right"></i></el-button>
                  <avatar-upload field="img"
                    @crop-success="cropSuccess"
                    @crop-upload-success="cropUploadSuccess"
                    @crop-upload-fail="cropUploadFail"
                    v-model="show"
                    :width="128"
                    :height="128"
                    url="/upload"
                    :params="params"
                    :headers="headers"
                    img-format="png"></avatar-upload>
                </div>
              </el-form-item>
              <el-form-item prop="cellPhone" :label="$t('userInfo.cellPhone')">
                <el-input 
                  name="cellPhone" 
                  ref="cellPhone" 
                  v-model="userInfoForm.cellPhone" 
                  autoComplete="off" 
                  :placeholder="$t('userInfo.cellPhonePlaceholder')"></el-input>
              </el-form-item>
              <el-form-item prop="crewStaff" :label="$t('userInfo.crewStaff')">
                <el-input 
                  name="crewStaff" 
                  ref="crewStaff" 
                  v-model="userInfoForm.crewStaff" 
                  autoComplete="off" 
                  :placeholder="$t('userInfo.crewStaffPlaceholder')"></el-input>
              </el-form-item>
              <el-form-item prop="crewUserGroup" :label="$t('userInfo.crewUserGroup')">
                <el-input 
                  name="crewUserGroup" 
                  ref="crewUserGroup"
                  v-model="userInfoForm.crewUserGroup" 
                  autoComplete="off" 
                  :placeholder="$t('userInfo.crewUserGroupPlaceholder')" 
                  :disabled="true"></el-input>
              </el-form-item>
              <el-form-item prop="crewRealname" :label="$t('userInfo.crewRealname')">
                <el-input 
                  name="crewRealname" 
                  ref="crewRealname" 
                  v-model="userInfoForm.crewRealname" 
                  autoComplete="off" 
                  :placeholder="$t('userInfo.crewRealnamePlaceholder')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn-submit" type="primary" @click.native.prevent="updateInfoSubmit">{{$t('userInfo.submit')}}</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="$t('userInfo.changePassword')" name="changePassword">
            <el-form class="forget-password-form" :model="changePasswordForm" status-icon :rules="changePasswordRules" ref="changePasswordForm" :label-width="formLabelWidth">
              <el-form-item prop="oldPassword" :label="$t('changePassword.oldPassword')">
                <el-input 
                  name="oldPassword" 
                  type="password" 
                  ref="oldPassword" 
                  v-model="changePasswordForm.oldPassword" 
                  autoComplete="off" 
                  :placeholder="$t('changePassword.oldPasswordPlaceholder')"></el-input>
              </el-form-item>
              <el-form-item prop="password" :label="$t('changePassword.password')">
                <el-input 
                  name="password" 
                  type="password" 
                  ref="password" 
                  v-model="changePasswordForm.password" 
                  autoComplete="off" 
                  :placeholder="$t('changePassword.passwordPlaceholder')"></el-input>
              </el-form-item>
              <el-form-item prop="rePassword" :label="$t('changePassword.rePassword')">
                <el-input 
                  name="rePassword" 
                  type="password" 
                  ref="rePassword" 
                  v-model="changePasswordForm.rePassword" 
                  autoComplete="off" 
                  :placeholder="$t('changePassword.rePasswordPlaceholder')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn-submit" type="primary"  @click.native.prevent="updatePassword">{{$t('changePassword.submit')}}</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog :title="$t('changePassword.authentication')" :visible.sync="dialogFormVerify">
      <el-form :model="smsVerifyForm" status-icon :rules="smsVerifyRules" ref="smsVerifyForm" :label-width="formLabelWidth">
        <el-form-item prop="smsCellPhone" :label="$t('changePassword.smsCellPhone')">
          <el-input 
            name="smsCellPhone" 
            ref="smsCellPhone" 
            v-model="smsVerifyForm.smsCellPhone"
            autoComplete="off" 
            :placeholder="$t('userInfo.cellPhonePlaceholder')"></el-input>
        </el-form-item>
        <el-form-item class="input-group" prop="verifcationCode" :label="$t('changePassword.verifcationCode')">
          <el-input 
            name="verifcationCode"
            type="tel"
            v-model="smsVerifyForm.verifcationCode" 
            ref="verifcationCode" 
            autoComplete="off"
            :placeholder="$t('changePassword.verifcationCodePlaceholder')">
          </el-input>
          <div class="input-group-btn">
            <el-button class="send-message" type="primary" @click.native.prevent="sendMsg" :disabled="this.sendMsgDisabled">
              <span v-if="!sendMsgDisabled">{{$t('changePassword.sendMessages')}}</span>
              <span v-if="sendMsgDisabled">{{rTime + 'S'}}</span>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="messageLoading" @click="submitChangePassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateUserInfo, getUserInfo, sendSmsVerifcationCode, changePassword } from '@/api/baseInfo'
import { isvalidCellphone, isvalidCrewStaff, isvalidCrewRealname, isvalidOldPassword, isvalidPassword, isvalidRePassword, isvalidVerifcationCode } from '@/utils/validate'
import avatarUpload from 'vue-image-crop-upload'
import UserinfoBar from './components/UserinfoBar'
import promptConfig from '@/promptConfig'
import errorConfig from '@/errorConfig'

export default {
  name: 'BaseInfo',
  data() {
    const validateCellphone = (rule, value, callback) => {
      const inputCellphone = this.$refs.cellPhone
      if (isvalidCellphone(inputCellphone, value)) {
        callback()
      }
    }
    const validateCrewStaff = (rule, value, callback) => {
      const inputCrewStaff = this.$refs.crewStaff
      if (isvalidCrewStaff(inputCrewStaff, value)) {
        callback()
      }
    }
    const validateCrewRealname = (rule, value, callback) => {
      const inputCrewRealname = this.$refs.crewRealname
      if (isvalidCrewRealname(inputCrewRealname, value)) {
        callback()
      }
    }
    const validateOldPassword = (rule, value, callback) => {
      const inputOldPassword = this.$refs.oldPassword

      if (isvalidOldPassword(inputOldPassword, value, callback)) {
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
    const validateVerifcationCode = (rule, value, callback) => {
      const inputVerifcationCode = this.$refs.verifcationCode
      if (isvalidVerifcationCode(inputVerifcationCode, value)) {
        callback()
      }
    }
    const validateSmsCellPhone = (rule, value, callback) => {
      const inputSmsCellPhone = this.$refs.smsCellPhone
      if (isvalidCellphone(inputSmsCellPhone, value)) {
        callback()
      }
    }
    return {
      show: false,
      activeName: 'userInfo',
      avatarInfo: {
        name: '',
        avatarUrl: ''
      },
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: './src/assets/img/default-avatar.png',
      userInfoForm: {
        oldPassword: '',
        password: '',
        rePassword: ''
      },
      changePasswordForm: {},
      dialogFormVerify: false,
      formLabelWidth: '120px',
      smsVerifyForm: {
        smsCellPhone: '',
        verifcationCode: ''
      },
      rTime: 60,
      sendMsgDisabled: false,
      messageLoading: false,
      userInfoRules: {
        cellPhone: [{ required: true, trigger: 'blur', validator: validateCellphone }],
        crewStaff: [{ required: true, trigger: 'blur', validator: validateCrewStaff }],
        crewRealname: [{ required: true, trigger: 'blur', validator: validateCrewRealname }]
      },
      changePasswordRules: {
        oldPassword: [{ required: true, trigger: 'blur', validator: validateOldPassword }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        rePassword: [{ required: true, trigger: 'blur', validator: validateRePassword }]
      },
      smsVerifyRules: {
        smsCellPhone: [{ required: true, trigger: 'blur', validator: validateSmsCellPhone }],
        verifcationCode: [{ required: true, trigger: 'blur', validator: validateVerifcationCode }]
      }
    }
  },
  components: {
    'avatar-upload': avatarUpload,
    'userinfo-bar': UserinfoBar
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getUserInfo().then(response => {
        console.log(response)
        this.userInfoForm = response.data
        this.avatarInfo.name = response.data.realname
        this.avatarInfo.avatarUrl = response.data.avatarUrl
        this.smsVerifyForm.smsCellPhone = response.data.cellPhone
      })
    },
    updateInfoSubmit() {
      this.$refs['userInfoForm'].validate((valid) => {
        if (valid) {
          const userInfoData = Object.assign({}, this.userInfoForm)
          updateUserInfo(userInfoData).then(() => {
            this.$notify({
              title: promptConfig.UPDATE_SUCCESS_TITLE,
              message: promptConfig.UPDATE_SUCCESS_MESSAGE,
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updatePassword() {
      this.$refs['changePasswordForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVerify = true
        } else {
          console.log('error')
        }
      })
    },
    sendMsg(e) {
      const InputSmsCellPhone = this.$refs.smsCellPhone
      const smsCellPhone = InputSmsCellPhone.currentValue

      if (!isvalidCellphone(InputSmsCellPhone, smsCellPhone)) {
        return false
      }

      sendSmsVerifcationCode(smsCellPhone).then(() => {
        this.$message({
          message: promptConfig.SEND_MESSAGE,
          type: 'success'
        })
      })

      this.sendMsgDisabled = true
      const rTime = this.rTime
      const _this = this

      const interval = window.setInterval(() => {
        if (--_this.rTime <= 0) {
          _this.rTime = rTime
          _this.sendMsgDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
    },
    submitChangePassword() {
      this.$refs['changePasswordForm'].validate((valid) => {
        if (valid) {
          const passwordData = Object.assign({}, this.changePasswordForm)
          changePassword(passwordData).then(() => {
            this.$notify({
              title: promptConfig.UPDATE_SUCCESS_TITLE,
              message: promptConfig.UPDATE_SUCCESS_MESSAGE,
              type: 'success',
              duration: 2000
            })
          })
          this.dialogFormVerify = false
          this.resetForm('changePasswordForm')
        } else {
          console.log('error')
        }
      })
    },
    handleClick(tab, event) {
      this.resetForm('changePasswordForm')
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    toggleShow() {
      this.show = !this.show
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG || !isPNG || !isGIF) {
        this.$message.error(errorConfig.IMAGE_FORMAT)
      }
      if (!isLt2M) {
        this.$message.error(errorConfig.IMAGE_SIZE)
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";

.user-info-form,
.forget-password-form {
  width: 50%;
  min-width: 360px;
}
.change-avatar {
  width: 128px;
  text-align: center;
}
.btn-submit {
  width: 50%;
}
.tab-pane {
  display: none;
  
  &.active {
    display: block;
  }
}
.send-message {
  width: 98px;
}
</style>
