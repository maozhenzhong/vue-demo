<template>
  <div class="container-fluid">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- <el-form-item label="头像">
            <div class="change-avatar">
              <img id="zoom" :src="imgDataUrl">
              <el-button type="primary" size="medium" @click="toggleShow">{{$t('userInfo.setAvatar')}}
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
              <avatar-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="show" :width="128" :height="128" url="/upload" :params="params" :headers="headers" img-format="png"></avatar-upload>
            </div>
          </el-form-item> -->
          <el-form-item prop="cellPhone" :label="$t('userInfo.cellPhone')">
            <el-input name="cellPhone" type="tel" ref="cellPhone" v-model="ruleForm.cellPhone" maxlength="11" autoComplete="off" :placeholder="$t('userInfo.cellPhonePlaceholder')"></el-input>
          </el-form-item>
          <el-form-item prop="crewStaff" :label="$t('userInfo.crewStaff')">
            <el-input name="crewStaff" ref="crewStaff" v-model="ruleForm.crewStaff" minlength="2" maxlength="10" autoComplete="off" :placeholder="$t('userInfo.crewStaffPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item prop="crewRealname" :label="$t('userInfo.crewRealname')">
            <el-input name="crewRealname" ref="crewRealname" v-model="ruleForm.crewRealname" minlength="2" maxlength="10" autoComplete="off" :placeholder="$t('userInfo.crewRealnamePlaceholder')"></el-input>
          </el-form-item>
          <el-form-item prop="oldPassword" :label="$t('changePassword.oldPassword')">
            <el-input name="oldPassword" type="password" ref="oldPassword" v-model="ruleForm.oldPassword" minlength="6" maxlength="30" autoComplete="off" :placeholder="$t('changePassword.oldPasswordPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item prop="password" :label="$t('changePassword.password')">
            <el-input name="password" type="password" ref="password" v-model="ruleForm.password" minlength="6" maxlength="30" autoComplete="off" :placeholder="$t('changePassword.passwordPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item prop="rePassword" :label="$t('changePassword.rePassword')">
            <el-input name="rePassword" type="password" ref="rePassword" v-model="ruleForm.rePassword" minlength="6" maxlength="30" autoComplete="off" :placeholder="$t('changePassword.rePasswordPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item prop="smsCellPhone" :label="$t('changePassword.smsCellPhone')">
            <el-input name="smsCellPhone" ref="smsCellPhone" v-model="ruleForm.smsCellPhone" maxlength="11" autoComplete="off" :placeholder="$t('userInfo.cellPhonePlaceholder')"></el-input>
          </el-form-item>
          <el-form-item class="input-group" prop="verifcationCode" :label="$t('changePassword.verifcationCode')">
            <el-input name="verifcationCode" type="tel" v-model="ruleForm.verifcationCode" ref="verifcationCode" maxlength="4" autoComplete="off" :placeholder="$t('changePassword.verifcationCodePlaceholder')">
            </el-input>
            <div class="input-group-btn">
              <el-button class="send-message" type="primary" @click.native.prevent="sendMsg" :disabled="this.sendMsgDisabled">
                <span v-if="!sendMsgDisabled">{{$t('changePassword.sendMessages')}}</span>
                <span v-if="sendMsgDisabled">{{rTime + 'S'}}</span>
              </el-button>
            </div>
          </el-form-item>
          <el-form-item prop="usergroup" :label="$t('form.usergroup')">
            <el-select name="usergroup" ref="usergroup" v-model="ruleForm.usergroup" :placeholder="$t('form.usergroupPlaseholder')">
              <el-option value="BOC" label="中国银行"></el-option>
              <el-option value="CMB" label="招商银行"></el-option>
              <el-option value="CCB" label="中国建设银行"></el-option>
              <el-option value="CEB" label="中国光大银行"></el-option>
              <el-option value="ABC" label="中国农业银行"></el-option>
              <el-option value="CMBC" label="中国民生银行"></el-option>
              <el-option value="CIB" label="兴业银行"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('form.role')" prop="role">
            <el-radio-group v-model="ruleForm.role">
              <el-radio :label="0">系统管理员</el-radio>
              <el-radio :label="1">银行管理人员</el-radio>
              <el-radio :label="2">银行工作人员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="question" :label="$t('question.question')">
            <el-input name="question" ref="question" v-model="ruleForm.question" autoComplete="off" :placeholder="$t('question.questionPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item prop="answer" :label="$t('question.answer')">
            <el-input name="answer" type="textarea" ref="answer" v-model="ruleForm.answer" autoComplete="off" :placeholder="$t('question.answerPlaceholder')"></el-input>
          </el-form-item>
          <el-form-item prop="updateTime" :label="$t('form.updateTime')">
            <el-date-picker type="date" ref="updateTime" v-model="ruleForm.updateTime" :placeholder="$t('form.updateTimePlaceholder')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('products.loanAmount')" required>
            <el-col :span="11">
              <el-form-item prop="loanAmountMin">
                <el-input name="loanAmountMin" type="number" ref="loanAmountMin" v-model="ruleForm.loanAmountMin" autoComplete="off" :placeholder="$t('products.loanAmountMinPlaceholder')"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-form-item prop="loanAmountMax">
                <el-input name="loanAmountMax" type="number" ref="loanAmountMax" v-model="ruleForm.loanAmountMax" autoComplete="off" :placeholder="$t('products.loanAmountMaxPlaceholder')"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sendSmsVerifcationCode } from '@/api/baseInfo'
import {
  isvalidCellphone,
  isvalidCrewStaff,
  isvalidCrewRealname,
  isvalidOldPassword,
  isvalidPassword,
  isvalidRePassword,
  isvalidVerifcationCode,
  isvalidQuestion,
  isvalidAnswer,
  isvalidLoanAmountMin,
  isvalidLoanAmountMax
} from '@/utils/validate'
import avatarUpload from 'vue-image-crop-upload'
import errorConfig from '@/errorConfig'
import promptConfig from '@/promptConfig'
export default {
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

      if (isvalidOldPassword(inputOldPassword, value)) {
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
    const validateSmsCellPhone = (rule, value, callback) => {
      const inputSmsCellPhone = this.$refs.smsCellPhone
      if (isvalidCellphone(inputSmsCellPhone, value)) {
        callback()
      }
    }
    const validateVerifcationCode = (rule, value, callback) => {
      const inputVerifcationCode = this.$refs.verifcationCode
      if (isvalidVerifcationCode(inputVerifcationCode, value)) {
        callback()
      }
    }
    const validateQuestion = (rule, value, callback) => {
      const inputQuestion = this.$refs.question
      if (isvalidQuestion(inputQuestion, value)) {
        callback()
      }
    }
    const validateAnswer = (rule, value, callback) => {
      const inputAnswer = this.$refs.answer
      if (isvalidAnswer(inputAnswer, value)) {
        callback()
      }
    }
    const validateLoanAmountMin = (rule, value, callback) => {
      const inputLoanAmountMin = this.$refs.loanAmountMin
      if (isvalidLoanAmountMin(inputLoanAmountMin, value)) {
        callback()
      }
    }
    const validateloanAmountMax = (rule, value, callback) => {
      const inputLoanAmountMin = this.$refs.loanAmountMin
      const inputloanAmountMax = this.$refs.loanAmountMax
      const LoanAmountMinValue = this.$refs.loanAmountMin.currentValue
      if (isvalidLoanAmountMax(inputloanAmountMax, inputLoanAmountMin, value, LoanAmountMinValue)) {
        callback()
      }
    }
    return {
      ruleForm: {
        cellPhone: '',
        crewStaff: '',
        crewRealname: '',
        oldPassword: '',
        password: '',
        rePassword: '',
        smsCellPhone: '',
        verifcationCode: '',
        usergroup: '',
        role: 0,
        question: '',
        crewAdmin: '',
        answer: '',
        updateTime: '',
        loanAmountMax: '',
        LoanAmountMin: '',
        status: true
      },
      show: false,
      sendMsgDisabled: false,
      rTime: 60,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: './src/assets/img/default-avatar.png',
      rules: {
        cellPhone: [
          { required: true, validator: validateCellphone, trigger: 'blur' }
        ],
        crewStaff: [
          { required: true, validator: validateCrewStaff, trigger: 'blur' }
        ],
        crewRealname: [
          { required: true, validator: validateCrewRealname, trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        oldPassword: [
          { required: true, validator: validateOldPassword, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, validator: validateRePassword, trigger: 'blur' }
        ],
        smsCellPhone: [
          { required: true, validator: validateSmsCellPhone, trigger: 'blur' }
        ],
        verifcationCode: [
          { required: true, validator: validateVerifcationCode, trigger: 'blur' }
        ],
        question: [
          { required: true, validator: validateQuestion, trigger: 'blur' }
        ],
        answer: [
          { required: true, validator: validateAnswer, trigger: 'blur' }
        ],
        loanAmountMin: [
          { required: true, validator: validateLoanAmountMin, trigger: 'blur' }
        ],
        loanAmountMax: [
          { required: true, validator: validateloanAmountMax, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    'avatar-upload': avatarUpload
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toggleShow() {
      this.show = !this.show
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
.change-avatar {
  width: 128px;
}
.send-message {
  width: 98px;
}
</style>
