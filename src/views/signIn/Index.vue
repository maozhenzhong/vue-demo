<template>
  <div class="signIn-container">
    <div class="signIn-wrap">
      <!-- 系统平台简介 -->
      <div class="system-introduction">
        <h1 class="system-logo">{{$t('signIn.title')}}</h1>
        <div class="system-description">{{$t('signIn.description')}}</div>
        <div class="index-link">{{$t('signIn.loginIndex')}}
          <a href="javascript:;" target="_blank">
            <i class="iconfont icon-link"></i>
          </a>
        </div>
      </div>

      <!-- 系统登录表单 -->
      <el-form novalidate class="signIn-form" name="login" autoComplete="off" :model="signInForm" :rules="signInRules" ref="signInForm" label-position="left">
        <!-- 登录标题 -->
        <div class="title-container">
          <h3 class="title">{{$t('signIn.logIn')}}</h3>
        </div>

        <div class="mobile-signIn-content">
          <!-- 账户 -->
          <el-form-item prop="cellphone">
            <i class="icon-container iconfont icon-sign-user"></i>
            <el-input name="cellphone" ref="cellphone" type="tel" v-model="signInForm.cellphone" autoComplete="off" :placeholder="$t('signIn.cellphone')" />
          </el-form-item>

          <!-- 密码 v-model="signInForm.password"  -->
          <el-form-item prop="password">
            <i class="icon-container iconfont icon-sign-pwd"></i>
            <el-input name="password" ref="password" :type="passwordType" autoComplete="off" @blur="encryptPassword" :placeholder="$t('signIn.password')" />
            <i class="show-pwd iconfont" :class="showIcon" @click="showPwd"></i>
          </el-form-item>
        </div>

        <!-- 验证码 -->
        <aliyun-capcha class="ali-verify-cody" appkey='FFFF00000000017761E1' scene='signIn' @callback='onCaptcha'></aliyun-capcha>
        <el-button class="signIn-btn" type="success" :loading="loading" @click.native.prevent="handleSignIn" plain>{{$t('signIn.logIn')}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isvalidSignInUsername, isvalidSignInPassword } from '@/utils/validate'
import { getSignInHash, signInByCellphone } from '@/api/signIn'
import AliyunCaptcha from 'vue-aliyun-captcha'
import errorConfig from '@/errorConfig'
import CryptoJS from 'crypto-js'
import CryptoJSAesJson from '@/utils/aesJsonFormat'

export default {
  name: 'signIn',
  components: {
    'aliyun-capcha': AliyunCaptcha
  },
  data() {
    const validatecellphone = (rule, value, callback) => {
      const inputcellphone = this.$refs.cellphone
      if (isvalidSignInUsername(inputcellphone, value)) {
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
        cellphone: '',
        password: '',
        csessionid: '',
        sig: '',
        token: '',
        scene: ''
      },
      signInRules: {
        cellphone: [
          { required: true, trigger: 'blur', validator: validatecellphone }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      showIcon: 'icon-hide-pwd'
    }
  },
  methods: {
    encryptPassword() {
      getSignInHash().then(response => {
        const hash = response.data.data[0]
        const password = this.$refs.password.currentValue
        this.signInForm.password = CryptoJS.AES.encrypt(JSON.stringify(password), hash, { format: CryptoJSAesJson }).toString()
      })
    },
    onCaptcha(data) {
      this.signInForm.csessionid = data.csessionid
      this.signInForm.sig = data.sig
      this.signInForm.token = data.token
      this.signInForm.scene = data.scene
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
        if (!valid) {
          return false
        }

        if (!this.nc) {
          this.$message({
            message: errorConfig.ER_SLIDING_CAPTCHA,
            type: 'error'
          })
          return false
        }
        this.loading = true
        signInByCellphone(this.signInForm).then(response => {
          const responseData = response.data
          if (responseData.status === 1) {
            this.loading = true
            this.$store.dispatch('GetUserInfo', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.$message({
              message: responseData.data.title,
              type: 'error'
            })
            return false
          }
        }).catch(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '../../styles/signIn.scss';
</style>
