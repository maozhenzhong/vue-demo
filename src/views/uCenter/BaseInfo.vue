<template>
  <div class="container-fluid">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('userInfo.userInfo')" name="userInfo">
        <el-form class="user-info-form edit-form" :model="userInfoForm" status-icon :rules="userInfoRules" ref="userInfoForm">
          <el-form-item>
            <el-upload 
              class="avatar-uploader"
              action='http://upload.qiniu.com/'
              :show-file-list='false'
              :on-success="handleSuccess"
              :on-error="handleError"
              :before-upload="beforeUpload"
              :data='postData'>
              <img v-if="userInfoForm.avatar" :src="userInfoForm.avatar" width="128" height="128" class="avatar">
              <!-- <img v-else :src="uploadAvatar"> -->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="cellphone">
            <el-input name="cellphone" ref="cellphone" v-model="userInfoForm.cellphone" autoComplete="off" :placeholder="$t('form.cellphone')"></el-input>
          </el-form-item>
          <el-form-item prop="staff">
            <el-input name="staff" ref="staff" v-model="userInfoForm.staff" autoComplete="off" :placeholder="$t('form.staff')"></el-input>
          </el-form-item>
          <el-form-item prop="bank">
            <el-input name="bank" ref="bank" v-model="userInfoForm.bank.name" autoComplete="off" :placeholder="$t('form.bank')" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input name="name" ref="name" v-model="userInfoForm.name" autoComplete="off" :placeholder="$t('form.name')"></el-input>
          </el-form-item>
           <el-form-item>
            <el-col :span="24" style="padding-left: 0; padding-right: 0;">
              <el-button class="el-button-block" type="success" @click.native.prevent="updateInfoSubmit" plain>{{$t('crew.submit')}}</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('userInfo.changePassword')" name="changePassword">
        <el-form class="forget-password-form edit-form" :model="changePasswordForm" status-icon :rules="changePasswordRules" ref="changePasswordForm">
          <el-form-item prop="oldPassword">
            <el-input name="oldPassword" type="password" ref="oldPassword" v-model="changePasswordForm.oldPassword" autoComplete="off" :placeholder="$t('form.oldPassword')"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" type="password" ref="password" v-model="changePasswordForm.password" autoComplete="off" :placeholder="$t('form.password')"></el-input>
          </el-form-item>
          <el-form-item prop="rePassword">
            <el-input name="rePassword" type="password" ref="rePassword" v-model="changePasswordForm.rePassword" autoComplete="off" :placeholder="$t('form.rePassword')"></el-input>
          </el-form-item>
           <el-form-item>
            <el-col :span="24" style="padding-left: 0; padding-right: 0;">
              <el-button class="el-button-block" type="success" @click.native.prevent="updatePassword" plain>{{$t('crew.submit')}}</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="$t('changePassword.authentication')" :visible.sync="dialogFormVerify">
      <el-form :model="smsVerifyForm" status-icon :rules="smsVerifyRules" ref="smsVerifyForm">
        <el-form-item prop="smsCellphone">
          <el-input name="smsCellphone" ref="smsCellphone" v-model="smsVerifyForm.smsCellphone" autoComplete="off" :placeholder="$t('changePassword.smsCellphone')"></el-input>
        </el-form-item>
        <el-form-item class="input-group" prop="verifcationCode">
          <el-input name="verifcationCode" type="tel" v-model="smsVerifyForm.verifcationCode" ref="verifcationCode" autoComplete="off" :placeholder="$t('changePassword.verifcationCode')">
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
import {
  updateUserInfo,
  getUserInfo,
  sendSmsVerifcationCode,
  updatePassword
} from '@/api/baseInfo'
import {
  isvalidCellphone,
  isvalidCrewStaff,
  isvalidCrewRealname,
  isvalidOldPassword,
  isvalidPassword,
  isvalidRePassword,
  isvalidVerifcationCode
} from '@/utils/validate'
import promptConfig from '@/promptConfig'
import errorConfig from '@/errorConfig'
// import uploadAvatar from '@/assets/img/default_upload.png'

export default {
  name: 'BaseInfo',
  data() {
    const validateCellphone = (rule, value, callback) => {
      const inputCellphone = this.$refs.cellphone
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
    const validateSmsCellphone = (rule, value, callback) => {
      const inputSmsCellphone = this.$refs.smsCellphone
      if (isvalidCellphone(inputSmsCellphone, value)) {
        callback()
      }
    }
    return {
      activeName: 'userInfo',
      postData: {
        token: 'Vg2moU86J1a8JJ8F86W_TpFfEd8NyADqdlESuM9c:xwAUPV9HicgsqodlWfO9yTUusxw=:eyJzY29wZSI6InlpY2hhbmciLCJkZWFkbGluZSI6MTUyNTQyNTkwMDAwfQ==',
        key: null,
        saveKey: false
      },
      // uploadAvatar,
      show: false,
      userInfoForm: {
        avatar: null,
        cellphone: null,
        name: null,
        staff: null,
        bank: {
          id: null,
          name: null
        },
        crewRealname: null
      },
      changePasswordForm: {
        oldPassword: '',
        password: '',
        rePassword: ''
      },
      dialogFormVerify: false,
      smsVerifyForm: {
        smsCellphone: '',
        verifcationCode: ''
      },
      rTime: 60,
      sendMsgDisabled: false,
      messageLoading: false,
      userInfoRules: {
        cellphone: [
          { required: true, trigger: 'blur', validator: validateCellphone }
        ],
        crewStaff: [
          { required: true, trigger: 'blur', validator: validateCrewStaff }
        ],
        crewRealname: [
          { required: true, trigger: 'blur', validator: validateCrewRealname }
        ]
      },
      changePasswordRules: {
        oldPassword: [
          { required: true, trigger: 'blur', validator: validateOldPassword }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        rePassword: [
          { required: true, trigger: 'blur', validator: validateRePassword }
        ]
      },
      smsVerifyRules: {
        smsCellphone: [
          { required: true, trigger: 'blur', validator: validateSmsCellphone }
        ],
        verifcationCode: [
          {
            required: true,
            trigger: 'blur',
            validator: validateVerifcationCode
          }
        ]
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      getUserInfo().then(response => {
        const responseData = response.data
        this.userInfoForm = responseData.data
        console.log(this.userInfoForm)
        this.smsVerifyForm.smsCellphone = responseData.data.cellphone
      })
    },
    updateInfoSubmit() {
      this.$refs['userInfoForm'].validate(valid => {
        if (valid) {
          const userInfoData = Object.assign({}, this.userInfoForm)
          const id = this.userInfoForm.id
          updateUserInfo(userInfoData, id).then(() => {
            this.$notify({
              title: promptConfig.UPDATE_SUCCESS_TITLE,
              message: promptConfig.UPDATE_SUCCESS_MESSAGE,
              type: 'success',
              duration: 2000
            })
          }).then(response => {
            console.log(response)
          })
        }
      })
    },
    updatePassword() {
      this.$refs['changePasswordForm'].validate(valid => {
        if (valid) {
          this.dialogFormVerify = true
        } else {
          console.log('error')
        }
      })
    },
    sendMsg(e) {
      const InputSmsCellphone = this.$refs.smsCellphone
      const smsCellphone = InputSmsCellphone.currentValue

      if (!isvalidCellphone(InputSmsCellphone, smsCellphone)) {
        return false
      }

      sendSmsVerifcationCode(smsCellphone).then(() => {
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
      this.$refs['changePasswordForm'].validate(valid => {
        if (valid) {
          const passwordData = Object.assign({}, this.changePasswordForm)
          const id = this.userInfoForm.id
          updatePassword(passwordData, id).then(() => {
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
    handleSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.userInfoForm.avatarUrl = URL.createObjectURL(file.raw)
      this.$message.success(errorConfig.ER_UPLOAD_AVATAR_SUCCESS)
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isGIF = file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error(errorConfig.ER_UPLOAD_AVATAR_FORMAT)
      }
      if (!isLt2M) {
        this.$message.error(errorConfig.ER_UPLOAD_AVATAR_SIZE)
      }

      this.postData.key = file.name
      return isJPG && isPNG && isGIF && isLt2M
    },
    handleError(error, response, file) {
      console.log(error)
      console.log(response)
      console.log(file)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
@import 'src/styles/variables.scss';

.change-avatar {
  width: 128px;
  text-align: center;
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
