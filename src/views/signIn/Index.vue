<template>
  <div class="signIn-container">
    <div class="signIn-wrap">
      <!-- 系统平台简介 -->
      <div class="system-introduction">
        <h1 class="system-logo">{{$t('signIn.title')}}</h1>
        <div class="system-description">{{$t('signIn.description')}}</div>
        <div class="index-link">{{$t('signIn.loginIndex')}}<a href="javascript:;" target="_blank"><i class="iconfont icon-link"></i></a></div>
      </div>

      <!-- 系统登录表单 -->
      <el-form novalidate class="signIn-form" name="login" autoComplete="off" :model="signInForm" :rules="signInRules" ref="signInForm" label-position="left">
        <!-- 登录标题 -->
        <div class="title-container">
          <h3 class="title">{{$t('signIn.logIn')}}</h3>
        </div>

        <div class="mobile-signIn-content">
          <!-- 账户 -->
          <el-form-item prop="cellPhone">
            <i class="icon-container iconfont icon-sign-user"></i>
            <el-input name="cellPhone" ref="cellPhone" type="tel" v-model="signInForm.cellPhone" autoComplete="off" :placeholder="$t('signIn.cellPhonePlaceholder')" />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <i class="icon-container iconfont icon-sign-pwd"></i>
            <el-input name="password" ref="password" :type="passwordType" @keyup.enter.native="handleSignIn" v-model="signInForm.password" autoComplete="off" :placeholder="$t('signIn.passwordPlaceholder')" />
            <i class="show-pwd iconfont" :class="showIcon" @click="showPwd"></i>
          </el-form-item>
        </div>

        <!-- 验证码 -->
        <aliyun-capcha class="ali-verify-cody" appkey='FFFF00000000017761E1' scene='signIn' @callback='onCaptcha'></aliyun-capcha>
        <el-button class="signIn-btn" type="primary" :loading="loading" @click.native.prevent="handleSignIn">{{$t('signIn.logIn')}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isvalidSignInUsername, isvalidSignInPassword } from '@/utils/validate'
import AliyunCaptcha from 'vue-aliyun-captcha'
import errorConfig from '@/errorConfig'

export default {
  name: 'signIn',
  components: {
    'aliyun-capcha': AliyunCaptcha
  },
  data() {
    const validateCellphone = (rule, value, callback) => {
      const inputCellphone = this.$refs.cellPhone
      if (isvalidSignInUsername(inputCellphone, value)) {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const inputPassword = this.$refs.password
      if (isvalidSignInPassword(inputPassword, value)) {
        callback()
      }
    }
    return {
      signInForm: {
        cellPhone: '18800000000',
        password: 'admin8888'
      },
      signInRules: {
        cellPhone: [{ required: true, trigger: 'blur', validator: validateCellphone }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      showIcon: 'icon-hide-pwd'
    }
  },
  methods: {
    onCaptcha(data) {
      this.csessionid = data.csessionid
      this.sig = data.sig
      this.token = data.token
      this.scene = data.scene
      this.nc = data.nc
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.showIcon = 'icon-show-pwd'
      } else {
        this.passwordType = 'password'
        this.showIcon = 'icon-hide-pwd'
      }
    },
    handleSignIn() {
      this.$refs.signInForm.validate(valid => {
        if (valid) {
          if (this.nc) {
            this.loading = true
            this.$store.dispatch('SignInByCellPhone', this.signInForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
            this.nc.reset()
          } else {
            this.$message({
              message: errorConfig.ER_SLIDING_CAPTCHA,
              type: 'error'
            })
            return false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '../../styles/signIn.scss';
</style>
